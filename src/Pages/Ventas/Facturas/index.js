import FacturasProvider from "./FacturasProvider"
import FacturasLista from "./FacturasLista"
import FacturasDialogEstado from "./FacturasDialogEstado"
import Impresion from "./Impresion" 


const Facturas = () => {
  return (
    <FacturasProvider>
      <FacturasDialogEstado />
      <Impresion /> 
      <FacturasLista />
    </FacturasProvider>
  )
}

export default Facturas