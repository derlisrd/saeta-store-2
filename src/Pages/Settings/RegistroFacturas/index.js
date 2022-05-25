import React from 'react'
import RegistroFacturasProvider from './RegistroFacturasProvider'
import RegistroFacturasLista from './RegistroFacturasLista'
import DialogFacturaNew from './DialogFacturaNew'

const RegistroFacturas = () => {
  return (
    <RegistroFacturasProvider>
        <RegistroFacturasLista />
        <DialogFacturaNew />
    </RegistroFacturasProvider>
  )
}

export default RegistroFacturas
