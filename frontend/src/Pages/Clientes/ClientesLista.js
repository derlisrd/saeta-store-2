import {Stack,Icon,IconButton,InputAdornment,TextField,Button,Fab} from "@mui/material";
import React, { useState } from "react";
import Tablas from "../../Components/UI/Tablas";
import ClientesListaPager from "./ClientesListaPager";

import { useClientes } from "./ClientesProvider";


const ClientesLista = () => {
  const { lista, cargando,buscarRegistro,BorrarCliente,lang,openEdit,openAgregar } = useClientes();

  const [inputSearch, setInputSearch] = useState("");
  

  const FilterData = lista.filter(
    (e) =>
      e.nombre_cliente.toLowerCase().includes(inputSearch.toLowerCase()) ||
      e.ruc_cliente.toLowerCase().includes(inputSearch.toLowerCase())
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
          onClick={() => openEdit(rowProps)}
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
      <Button variant="contained" size="large" 
        onClick={() => openAgregar()}
      >
        {lang.agregar}
        </Button>
    </Stack>
  );


  return (
    <>
      <Tablas
        title={lang.clientes}
        subtitle={lang.lista_clientes}
        icon={{ name:"people" }}
        columns={columns}
        datas={FilterData}
        Accions={Acciones}
        showOptions
        loading={cargando.lista}
        inputs={search}
      />
  <ClientesListaPager />
    </>
  );
};

export default ClientesLista;
