import { Button, Tooltip } from '@mui/material';
import React from 'react'
import { useVentas } from './VentasProvider'

const InfoCliente = () => {
    const {datosFacturas,indexFactura,setDialogs,dialogs} = useVentas();

    const cl = datosFacturas.facturas[indexFactura].datosCliente;

    const abrir = ()=> setDialogs({...dialogs,cambioCliente:true});
  return (
    <Tooltip arrow placement='right' title={<h3>Cambiar cliente</h3>}>
    <Button onClick={abrir} variant="text">
        Cliente: {cl.nombre_cliente} 
    </Button>
    </Tooltip>
  )
}

export default InfoCliente
