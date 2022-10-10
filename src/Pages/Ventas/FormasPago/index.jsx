import DialogAgregar from "./DialogAgregar"
import DialogEditar from "./DialogEditar"
import FormasPagoProvider from "./FormasPagoProvider"
import ListaFormasPago from "./ListaFormasPago"


const FormasPago = () => {
  return (
    <FormasPagoProvider>
        <DialogEditar />
        <DialogAgregar />
        <ListaFormasPago />
    </FormasPagoProvider>
  )
}

export default FormasPago
