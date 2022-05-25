import React from 'react'
import CajasProvider from './CajasProvider'
import DialogNuevo from './DialogNuevo'
import DialogEditar from './DialogEditar'
import DialogTransferencia from './DialogTransferencia'
import ListaCajas from './ListaCajas'
import DialogArqueo from './DialogArqueo'
import DialogApertura from './DialogApertura'

import DialogArqueoFinal from './DialogArqueoFinal'

const Cajas = () => {
  return (
    <CajasProvider>
        <ListaCajas />
        <DialogNuevo />
        <DialogApertura />
        <DialogEditar />
        <DialogArqueo />
        <DialogArqueoFinal />
        <DialogTransferencia />
    </CajasProvider>
  )
}

export default Cajas