import { Button, Icon, IconButton } from '@mui/material'
import React from 'react'
import Tablas from '../../../Components/UI/Tablas'
import { useRegistroMovimientos } from './RegistroMovimientosProvider'

const RegistroMovimientosLista = () => {

    const {lista,dialogs,setDialogs,lang,loading}=useRegistroMovimientos()



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
        field: "tipo_registro",
        title: lang.tipo,
        compareField:"tipo_registro",
        items: {
          "0": lang.salida,
          "1": lang.entrada,
        },
        styleFieldCondition: "tipo_registro",
        styleCondition: {
          "0": {
            backgroundColor: "#ff7c6b",
            padding: "6px",fontWeight:"bold",
            borderRadius: "5px",
            color: "#780c00",
          },
          "1": {
            backgroundColor: "#2dec76",
            padding: "6px", fontWeight:"bold",
            borderRadius: "5px",
            color: "#007b02",
          },
        },
      },
    
];

const open = (f)=>{
  /* setDialogs({...dialogs,agregar:true})
  setForm(f); */
}

const Acciones = ({rowProps})=>
  (<>
  <IconButton onClick={()=>open(rowProps)}>
    <Icon>edit</Icon>
  </IconButton>
  </>)

  const search = (
    <Button variant="contained" onClick={()=> setDialogs({...dialogs,agregar:true})}>{lang.agregar}</Button>
  );

  return (
    <Tablas 
        inputs={search}
        title="Registro de movimientos"
        icon={{ name:"list_alt" }}
        columns={columnas}
        datas={lista}
        Accions={Acciones}
        showOptions={false}
        loading={loading}
    />
  )
}

export default RegistroMovimientosLista
