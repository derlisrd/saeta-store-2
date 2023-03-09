import FacturasProvider from "./FacturasProvider"
import FacturasLista from "./FacturasLista"
import FacturasDialogEstado from "./FacturasDialogEstado"
import Impresion from "./Impresion" 
import EnviarMail from "./EnviarMail"
import DialogDevolucion from "./DialogDevolucion"


const Facturas = () => {
  return (
    <FacturasProvider>
      <FacturasDialogEstado />
      <EnviarMail />
      <Impresion /> 
      <DialogDevolucion />
      <FacturasLista />
    </FacturasProvider>
  )
}

export default Facturas