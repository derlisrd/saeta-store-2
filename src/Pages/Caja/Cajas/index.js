import React from 'react'
import CajasProvider from './CajasProvider'
import DialogNuevo from './DialogNuevo'
import DialogEditar from './DialogEditar'
//import DialogTransferencia from './DialogTransferencia'
import ListaCajas from './ListaCajas'
//import DialogArqueo from './DialogArqueo'
import DialogApertura from './DialogApertura'

//import DialogArqueoFinal from './DialogArqueoFinal'
import DialogCierre from './DialogCierre'
import ResumenFinal from './ResumenFinal'

const Cajas = () => {
  return (
    <CajasProvider>
        <ListaCajas />
        <DialogNuevo />
        <DialogApertura />
        <DialogEditar />
        <DialogCierre />
        <ResumenFinal />

    </CajasProvider>
  )
}

export default Cajas