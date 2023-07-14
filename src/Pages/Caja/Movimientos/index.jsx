import DialogDetallesMovimientos from './DialogDetallesMovimientos'
import ListaMovimientos from './ListaMovimientos'
import MovimientosProvider from './MovimientosProvider'
import RegistrarMovimiento from './RegistrarMovimiento'
import Reportes from './Reportes'

const Movimientos = () => {
  return (
    <MovimientosProvider>
      <ListaMovimientos />
      <Reportes />
      <RegistrarMovimiento />
      <DialogDetallesMovimientos />
    </MovimientosProvider>
  )
}

export default Movimientos
