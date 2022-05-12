
import MarcasProvider from './MarcasProvider'
import MarcasLista from './MarcasLista'
import MarcasForm from './MarcasForm'

const Marcas = () => {
  return (
    <MarcasProvider>
        <MarcasForm />
        <MarcasLista />
    </MarcasProvider>
  )
}

export default Marcas
