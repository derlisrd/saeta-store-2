import DialogAddReceta from './DialogAddReceta'
import DialogDetalles from './DialogDetalles'
import DialogRegistrarCliente from './DialogRegistrarCliente'
import RecetasLista from './RecetasLista'
import RecetasProvider from './RecetasProvider'

const Recetas = () => {
  return (
    <RecetasProvider>
      <DialogDetalles />
      <DialogRegistrarCliente />
      <DialogAddReceta />
      <RecetasLista />
    </RecetasProvider>
  )
}

export default Recetas
