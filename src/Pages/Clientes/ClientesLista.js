import {
  Stack,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
  Button,Fab
} from "@mui/material";
import React, { useState } from "react";
import Tablas from "../../Components/UI/Tablas";

import { useClientes } from "./ClientesProvider";


const ClientesLista = () => {
  const { lista, cargando,page, setPage,limite,buscarRegistro,countTotal,BorrarCliente,lang } = useClientes();

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

  const Acciones = ({rowProps})=>(
    <Stack direction="row" spacing={1} justifyContent="center">
      <Fab
          variant="round"
          color="primary"
          size="small"
          onClick={() => console.log(rowProps)}
        >
          <Icon>edit</Icon>
        </Fab>
        <Fab
          variant="round"
          color="secondary"
          size="small"
          onClick={() => BorrarCliente(rowProps)}
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
        label={lang.buscar}
      />
      <Button  color="primary" variant="outlined" size="large" 
        onClick={() => console.log(`clientes/new/`)}
      >
        {lang.agregar}
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
        title={lang.clientes}
        icon={{ name:"people" }}
        columns={columns}
        datas={FilterData}
        Accions={Acciones}
        showOptions
        inputs={search}
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
