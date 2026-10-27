import React from 'react'
import DialogTransferir from './DialogTransferir'
import TransferenciasForm from './TransferenciasForm'
import TransferenciasProvider from './TransferenciasProvider'

const Transferencias = () => {
  return (
    <TransferenciasProvider>
      <DialogTransferir />
      <TransferenciasForm />
    </TransferenciasProvider>
  )
}

export default Transferencias
