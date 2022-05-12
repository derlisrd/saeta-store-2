import React from 'react'
import NotasLista from './NotasLista'
import NotasProvider from './NotasProvider'

const Notas = () => {
  return (
    <NotasProvider>
      <NotasLista />
    </NotasProvider>
  )
}

export default Notas
