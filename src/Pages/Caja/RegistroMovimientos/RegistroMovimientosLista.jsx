import { Button, Icon, IconButton } from '@mui/material'
import React from 'react'
import Tablas from '../../../Componentes/Tablas'
import { useRegistroMovimientos } from './RegistroMovimientosProvider'

const RegistroMovimientosLista = () => {

    const {lista,dialogs,setDialogs,/* setForm,*/loading}=useRegistroMovimientos()



const columnas = [
    {
      field:"id_cajas_registro",
      title:"#",
    },
    {
        field:"descripcion_registro",
        title:"Descripcion",
      },
    {
        field:"tipo_registro",
        title:"Tipo",
        items: { 0: "SALIDA", 1: "ENTRADA" },
        comparaItem: "tipo_registro",
        style:{backgroundColor:"#3f51b591",padding:"2px",borderRadius:"5px",cursor:"pointer"},
    },
    
];

const open = (f)=>{
  /* setDialogs({...dialogs,agregar:true})
  setForm(f); */
}

const Acciones = ({filaProps})=>
  (<>
  <IconButton onClick={()=>open(filaProps)}>
    <Icon>edit</Icon>
  </IconButton>
  </>)

  const search = (
    <Button variant="outlined" onClick={()=> setDialogs({...dialogs,agregar:true})}>Agregar</Button>
  );

  return (
    <Tablas 
        search={search}
        nombretabla="Registro de movimientos"
        icono="list_alt"
        columnas={columnas}
        filas={lista}
        Acciones={Acciones}
        showOptions={false}
        cargando={loading}
    />
  )
}

export default RegistroMovimientosLista
