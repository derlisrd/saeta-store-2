import React from 'react'
import ClientesForm from './ClientesForm'
import ClientesLista from './ClientesLista'
import ClientesProvider from './ClientesProvider'

const Clientes = () => {
  return (
    <ClientesProvider>
      <ClientesForm />
      <ClientesLista />
    </ClientesProvider>
  )
}

export default Clientes