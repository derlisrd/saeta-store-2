import React from 'react'
import { useNotas } from './NotasProvider'
import Tablas from "../../../Components/UI/Tablas";
import { Button, Stack } from '@mui/material';
const NotasLista = () => {
  const {lista,cargas,lang} = useNotas();


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
      field: "fecha_pedido",
      title: "Fecha y hora",
      style: {fontWeight:"bold"}
    },
  ];

  const Acciones= ({rowProps})=>(<Stack direction="row" justifyContent='center' spacing={2}>
    <Button variant='outlined'>Procesar nota</Button>
    <Button variant='outlined'>Ver detalles</Button>
  </Stack>)




  return (
    <Tablas
      title={lang.notas_pedidos}
      columns={columns}
      datas={lista}
      icon={{ name:"receipt" }}
      Accions={Acciones}
      loading={cargas}
      showOptions
    />
  )
}

export default NotasLista
