import React from 'react'
import { useNotas } from './NotasProvider'
import Tablas from "../../../Components/UI/Tablas";
import { Button, Stack, Tooltip } from '@mui/material';
const NotasLista = () => {
  const {lista,cargas,lang,dialogs,setDialogs,getListas} = useNotas();


  const columns = [
    {
      field: "id_notas_pedido",
      title: "NRO",
      style: {fontWeight:"bold"}
    },
    {
      field: "ruc_cliente",
      title: "Doc.",
      style: {fontWeight:"bold"}
    },
    {
      field: "nombre_cliente",
      title: "CLIENTE",
      style: {fontWeight:"bold"}
    },
    {
      field: "nombre_empleado",
      title: "VENDEDOR",
      style: {fontWeight:"bold"}
    },
    {
      field: "fecha_pedido",
      title: "Fecha y hora",
      style: {fontWeight:"bold"}
    },
  ];

  const Acciones= ({rowProps})=>(<Stack direction="row" justifyContent='center' spacing={2}>
    <Button variant='outlined'>{lang.detalles}</Button>
  </Stack>)


const inputs = (
  <Stack direction="row" spacing={2}>
    <Button variant="contained" onClick={()=>{getListas()} }>{lang.ver_lista}</Button>
    <Tooltip title={lang.nueva_nota} arrow >
      <Button variant="contained" onClick={()=>{ setDialogs({...dialogs,nuevanota:true})}}>{lang.nueva_nota}</Button>
    </Tooltip>
  </Stack>
);


  return (
    <Tablas
      title={lang.notas_pedidos}
      subtitle={lang.notas_subtitle}
      columns={columns}
      inputs={inputs}
      datas={lista}
      icon={{ name:"receipt" }}
      Accions={Acciones}
      loading={cargas.listaPedidos}
      showOptions
    />
  )
}

export default NotasLista
