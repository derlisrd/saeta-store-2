import React from 'react'
import DialogNuevaNota from './DialogNuevaNota'
import BuscarCliente from './Dialogs/BuscarCliente'
import BuscarProducto from './Dialogs/BuscarProductos'
import CambioCliente from './Dialogs/CambioCliente'
import RegistroCliente from './Dialogs/RegistroCliente'
import NotasLista from './NotasLista'
import NotasProvider from './NotasProvider'

const Notas = () => {
  return (
    <NotasProvider>
      <RegistroCliente />
      <BuscarProducto />
      <BuscarCliente />
      <CambioCliente />
      <DialogNuevaNota />
      <NotasLista />
    </NotasProvider>
  )
}

export default Notas
