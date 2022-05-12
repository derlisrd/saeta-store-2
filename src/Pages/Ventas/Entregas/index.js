
import EntregasMain from "./EntregasMain"
import EntregasProvider from "./EntregasProvider"

const Entregas = () => {
  return (
    <EntregasProvider>
      <EntregasMain />
    </EntregasProvider>
  )
}

export default Entregas
