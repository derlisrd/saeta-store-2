import FacturasProvider from "./FacturasProvider"
import FacturasLista from "./FacturasLista"
import FacturasDialogEstado from "./FacturasDialogEstado"
import Impresion from "./Impresion" 
import EnviarMail from "./EnviarMail"


const Facturas = () => {
  return (
    <FacturasProvider>
      <FacturasDialogEstado />
      <EnviarMail />
      <Impresion /> 
      <FacturasLista />
    </FacturasProvider>
  )
}

export default Facturas