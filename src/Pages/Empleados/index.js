import EmpleadosDialog from './EmpleadosDialog'
import EmpleadosLista from './EmpleadosLista'
import EmpleadosProvider from './EmpleadosProvider'

const Empleados = () => {
  return (
    <EmpleadosProvider>
      <EmpleadosLista />
      <EmpleadosDialog />
    </EmpleadosProvider>
  )
}

export default Empleados