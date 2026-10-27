import ProveedoresForm from "./ProveedoresForm"
import ProveedoresLista from "./ProveedoresLista"
import ProveedoresProvider from "./ProveedoresProvider"

const Proveedores = () => {
  return (
    <ProveedoresProvider>
        <ProveedoresLista />
        <ProveedoresForm />
    </ProveedoresProvider>
  )
}

export default Proveedores
