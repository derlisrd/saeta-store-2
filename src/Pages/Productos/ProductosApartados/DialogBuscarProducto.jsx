import { Dialog } from '@mui/material';
import React from 'react'
import { useProductosApartados } from './ProductosApartadosProvider'

const DialogBuscarProducto = () => {
  const {dialogs,setDialogs} = useProductosApartados();
  const cerrar = ()=> setDialogs({...dialogs,buscarProducto:false})
  return (
    <Dialog open={dialogs.buscarProducto} onClose={cerrar}>
      
    </Dialog>
  )
}

export default DialogBuscarProducto
