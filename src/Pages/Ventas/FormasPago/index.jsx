import DialogAgregar from "./DialogAgregar"
import FormasPagoProvider from "./FormasPagoProvider"
import ListaFormasPago from "./ListaFormasPago"


const FormasPago = () => {
  return (
    <FormasPagoProvider>
        <DialogAgregar />
        <ListaFormasPago />
    </FormasPagoProvider>
  )
}

export default FormasPago
