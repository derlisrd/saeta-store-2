import React from 'react'
import DialogNuevaNota from './DialogNuevaNota'
import NotasLista from './NotasLista'
import NotasProvider from './NotasProvider'

const Notas = () => {
  return (
    <NotasProvider>
      <DialogNuevaNota />
      <NotasLista />
    </NotasProvider>
  )
}

export default Notas
