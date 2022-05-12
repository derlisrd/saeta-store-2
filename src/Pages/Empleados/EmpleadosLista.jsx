import { Button, Icon, IconButton, Stack } from '@mui/material'
import React from 'react'
import Tablas from '../../Componentes/Tablas'
import { useEmpleados } from './EmpleadosProvider'

const EmpleadosLista = () => {

  const {lista,dialogs,setDialogs,setForm,loading} = useEmpleados()


const columnas = [
    {
      field:"id_empleado",
      title:"#",
    },
    {
      field:"apellido_empleado",
      title:"Apellido"
    },
    {
        field:"nombre_empleado",
        title:"Nombre"
    },
    {
        field:"doc_empleado",
        title:"Doc"
    }
];

const open = (f)=>{
  setForm(f);
  setDialogs({...dialogs,agregar:true});
}

const Acciones = ({filaProps})=>
  (<Stack direction="row" spacing={1} justifyContent="center" >
  <IconButton onClick={()=>open(filaProps)}>
    <Icon>edit</Icon>
  </IconButton>
    <IconButton onClick={()=>{}}>
    <Icon>visibility</Icon>
  </IconButton>
  </Stack>)

  const search = (
    <Button variant="outlined" onClick={()=>{ setDialogs({agregar:true})}}>Registrar</Button>
  );

  return (
    <Tablas 
        search={search}
        nombretabla="Empleados"
        subtitle="Lista de empleados"
        cargando={loading}
        icono="badge"
        columnas={columnas}
        filas={lista}
        Acciones={Acciones}
        showOptions
    />
  )
}

export default EmpleadosLista
