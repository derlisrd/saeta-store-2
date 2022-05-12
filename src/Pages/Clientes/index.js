import React from 'react'
import ClientesLista from './ClientesLista'
import ClientesProvider from './ClientesProvider'

const Clientes = () => {
  return (
    <ClientesProvider>
      <ClientesLista />
    </ClientesProvider>
  )
}

export default Clientes