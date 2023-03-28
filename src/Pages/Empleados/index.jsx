
import Add from './Add' /*

import Delete from './Delete'
import Edit from './Edit' */
import EmpleadosProvider from './EmpleadosProvider'
import Lista from './Lista'


const Empleados = () => {

  return <EmpleadosProvider>
    <Add />
    <Lista />
  </EmpleadosProvider>
}

export default Empleados
