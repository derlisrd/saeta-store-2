import MedidasForm from "./MedidasForm"
import MedidasLista from "./MedidasLista"
import MedidasProvider from "./MedidasProvider"

const Medidas = () => {
  return (
    <MedidasProvider>
      <MedidasLista />
      <MedidasForm />
    </MedidasProvider>    
  )
}

export default Medidas
