import InventarioProvider from './InventarioProvider'
import InventarioForm from './InventarioForm'

const Inventario = () => {
  return (
    <InventarioProvider>
      <InventarioForm />
    </InventarioProvider>
  )
}

export default Inventario
