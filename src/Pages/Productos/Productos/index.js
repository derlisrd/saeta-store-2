

import DialogStock from './ProductList/DialogStock'
import ProductoImages from './ProductList/ProductoImages'
import ProductosLista from './ProductList/ProductosLista'
import ProductosProvider from './ProductList/ProductosProvider'



const Productos = () => {
  return (
    <ProductosProvider>
      <ProductosLista />
      <ProductoImages />
      <DialogStock />
    </ProductosProvider>
  )
}

export default Productos
