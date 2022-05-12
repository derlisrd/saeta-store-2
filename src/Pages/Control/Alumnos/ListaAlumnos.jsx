import { Button, Icon, IconButton, Stack, TextField } from '@mui/material'
import React from 'react'
import Tablas from '../../../Components/Tablas'
import { useAlumnos } from './AlumnosProvider'

const ListaAlumnos = () => {
    const {lista,dialogs,setDialogs,setForm} = useAlumnos();
    
    const columns = [
        {
            field:"id_alumno",
            title:"#",
        },
        {
            field:"doc_alumno",
            title:"Doc.",
            isNumber:true
        },
        {
            field:"apellido_alumno",
            title:"Apellido",
          },
        {
          field:"nombre_alumno",
          title:"Nombre",
        },
    ]
const openEdit = f=>{
    setForm(f);
    setDialogs({...dialogs,form:true});
}
const Acciones = ({filaProps}) =>(
    <Stack direction="row" justifyContent="center">
        <IconButton onClick={()=>{openEdit(filaProps)}}><Icon color="warning" >edit</Icon></IconButton>
        <IconButton><Icon color="error">delete</Icon></IconButton>
    </Stack>
)
const Search = (
    <Stack spacing={2}>
    <Stack direction="row" justifyContent="flex-end">
        <Button size="large" onClick={()=>setDialogs({...dialogs,form:true})} variant='contained'>Agregar</Button>
    </Stack>
    <Stack direction="row">
        <TextField label="Buscar" />
    </Stack>
    </Stack>
)
  return (
    <>
     <Tablas
        nombretabla="Alumnos"
        icono="person"
        subtitle="Lista de alumnos"
        columnas={columns}
        filas={lista}
        Acciones={Acciones}
        search={Search}
        showOptions
     /> 
    </>
  )
}

export default ListaAlumnos
