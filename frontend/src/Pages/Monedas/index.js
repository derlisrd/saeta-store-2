import MonedasProvider from "./MonedasProvider"
import MonedasLista from "./MonedasLista"
import DialogCotizacion from "./DialogCotizacion"

const Monedas = () => {
  return (
    <MonedasProvider>
        <MonedasLista />
        <DialogCotizacion />
    </MonedasProvider>
  )
}

export default Monedas
