import {
  Stack,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
  Button,Fab
} from "@mui/material";
import React, { useState } from "react";
import Tablas from "../../Componentes/Tablas";
import { Funciones } from "../../Funciones/Funciones";
import { useClientes } from "./ClientesProvider";


const ClientesLista = () => {
  const { lista, cargando,page, setPage,limite,buscarRegistro,countTotal,BorrarCliente } = useClientes();

  const [inputSearch, setInputSearch] = useState("");
  


  const FilterData = lista.filter(
    (item) =>
      item.nombre_cliente.toLowerCase().includes(inputSearch.toLowerCase()) ||
      item.ruc_cliente.toLowerCase().includes(inputSearch.toLowerCase())
  ); 

  const columns = [
    {
      field: "id_cliente",
      title: "ID",
    },
    {
      field: "ruc_cliente",
      title: "Documento",
    },
    {
      field: "nombre_cliente",
      title: "Nombre",
    },
    
    { 
      field:"telefono_cliente",
      title:"Contacto",
    },
  ];

  const Acciones = ({id,extraprops})=>(
    <Stack direction="row" spacing={1} justifyContent="center">
      <Fab
          variant="round"
          color="primary"
          size="small"
          onClick={() => Funciones.goto(`clientes/new/${id}`)}
        >
          <Icon>edit</Icon>
        </Fab>
        <Fab
          variant="round"
          color="secondary"
          size="small"
          onClick={() => BorrarCliente(id, extraprops)}
        >
          <Icon>delete</Icon>
        </Fab>
    </Stack>
  )

  const search = (
    <Stack direction="row" spacing={2}>
      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={()=>{buscarRegistro(inputSearch)}}>
                <Icon>search</Icon>
              </IconButton>
            </InputAdornment>
          ),
        }}
        onKeyPress={e=>{if(e.key==='Enter'){buscarRegistro(inputSearch) } } }
        onChange={(e) => setInputSearch(e.target.value)}
        variant="outlined"
        label="Buscar"
      />
      <Button  color="primary" variant="outlined" size="large" 
        onClick={() => Funciones.goto(`clientes/new/`)}
      >
        AGREGAR
        </Button>
    </Stack>
  );

  const siguiente = ()=>{
    let i = parseInt(page)+parseInt(limite);
    setPage(i);
  }
  const atras = ()=>{
    if(page>0){
      let i = parseInt(page)-parseInt(limite);
      setPage(i);
    }
  }

  return (
    <>
      <Tablas
        nombretabla="Clientes"
        icono="people"
        bgicono="#3f51b5"
        namecolumnID={`id_cliente`}
        columnas={columns}
        filas={FilterData}
        Acciones={Acciones}
        extraprops={"nombre_cliente"}
        search={search}
        cargando={cargando}
        showOptions
      />
      <Stack direction="row" spacing={2} justifyContent="center" >
      {page>0 &&(<Button 
        onClick={atras}
        variant="outlined" >
          Atrás
        </Button>)}
        {
          ((countTotal>page) && ((page+limite)<countTotal) ) &&      
        <Button variant="outlined" 
        onClick={siguiente} >
          Siguiente
          </Button>
        }
      </Stack>
    </>
  );
};

export default ClientesLista;
