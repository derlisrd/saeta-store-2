
import DialogRegistraCliente from './DialogRegistraCliente'
import TurnosDialogs from './TurnosDialogs'
import TurnosDialogsEdit from './TurnosDialogsEdit'
import TurnosLista from './TurnosLista'
import TurnosProvider from './TurnosProvider'

const Turnos = () => {
  return (
    <TurnosProvider>
      <TurnosLista />
      <TurnosDialogs />
      <TurnosDialogsEdit />
      <DialogRegistraCliente />
    </TurnosProvider>
  )
}

export default Turnos
