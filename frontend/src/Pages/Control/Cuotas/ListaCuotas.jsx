import { Button, Icon, IconButton, Stack, TextField } from '@mui/material'
import React from 'react'
import Tablas from '../../../Components/Tablas'
import { useCuotas } from './CuotasProvider'

const ListaCuotas = () => {
    const {lista,dialogs,setDialogs,setForm} = useCuotas();
    
    const columns = [
        {
            field:"id_cuota",
            title:"#",
        },
        {
            field:"nombre_cuota",
            title:"Nombre"
        },
        {
            field:"valor_cuota",
            title:"Valor",
            isNumber:true
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
        nombretabla="Cuotas"
        icono="account_balance_wallet"
        subtitle="Lista de cuotas"
        columnas={columns}
        filas={lista}
        Acciones={Acciones}
        search={Search}
        showOptions
     /> 
    </>
  )
}

export default ListaCuotas
