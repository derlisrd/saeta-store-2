

import Apartar from './Apartar'
import ListaApartado from './ListaApartado'
import ProductosApartadosProvider from './ProductosApartadosProvider'
import RegistrarCliente from './RegistrarCliente'

const ProductosApartados = () => {
  return (
    <ProductosApartadosProvider>
      <ListaApartado />
      <Apartar />
      <RegistrarCliente />
    </ProductosApartadosProvider>
  )
}

export default ProductosApartados
