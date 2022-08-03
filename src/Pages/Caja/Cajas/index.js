
import CajasProvider from './CajasProvider'
import DialogNuevo from './DialogNuevo'
import DialogEditar from './DialogEditar'

import ListaCajas from './ListaCajas'

import DialogApertura from './DialogApertura'


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