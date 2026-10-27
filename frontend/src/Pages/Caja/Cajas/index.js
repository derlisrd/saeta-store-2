
import CajasProvider from './CajasProvider'
import DialogNuevo from './DialogNuevo'
import DialogEditar from './DialogEditar'
import ListaCajas from './ListaCajas'
import DialogApertura from './DialogApertura'
import DialogCierre from './DialogCierre'
import ResumenFinal from './ResumenFinal'
import DialogMontos from './DialogMontos'
import DialogEditarAsignaciones from './DialogEditarAsignaciones'


const Cajas = () => {
  return (
    <CajasProvider>
        <ListaCajas />
        <DialogEditarAsignaciones />
        <DialogMontos />
        <DialogNuevo />
        <DialogApertura />
        <DialogEditar />
        <DialogCierre />
        <ResumenFinal />
    </CajasProvider>
  )
}

export default Cajas