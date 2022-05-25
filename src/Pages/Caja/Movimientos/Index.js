import DialogDetallesMovimientos from './DialogDetallesMovimientos'
import ListaMovimientos from './ListaMovimientos'
import MovimientosProvider from './MovimientosProvider'
import RegistrarMovimiento from './RegistrarMovimiento'

const Movimientos = () => {
  return (
    <MovimientosProvider>
      <ListaMovimientos />
      <RegistrarMovimiento />
      <DialogDetallesMovimientos />
    </MovimientosProvider>
  )
}

export default Movimientos
