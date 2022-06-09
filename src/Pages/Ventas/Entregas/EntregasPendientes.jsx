import { Icon } from '@mui/material';
import React from 'react'
import Tablas from '../../../Components/UI/Tablas';
import { useEntregas } from './EntregasProvider'

const EntregasPendientes = () => {

    const {listaPendientes,lang} = useEntregas();

    

    const columnas = [
        {
          field: "codigo_producto",
          title: "CODIGO",
        },
        {
          field: "cantidad_producto",
          title: "CANT.",
          style:{backgroundColor:"#8a4ea191",padding:"2px 5px",borderRadius:"5px",cursor:"pointer",fontWeight:"bold"},
        },
        {
            field:"nro_factura",
            title:"Factura/Recibo NRO"
        },
        {
            field: "nombre_producto",
            title: "DESC.",
        },
    ]
    const Acciones = ()=>(<Icon color="primary">pending</Icon>);

  return (
    <Tablas
        icon={{ name:"pending_actions" }}
        title={lang.entregas_pendientes}
        subtitle="Productos con entregas pendientes que aún no salieron de stock"
        columns={columnas}
        datas={listaPendientes}
        Accions={Acciones}
        showOptions
    />
  )
}

export default EntregasPendientes
