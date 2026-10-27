

import DialogBorrar from './ProductList/DialogBorrar'
import DialogStock from './ProductList/DialogStock'
import ProductoImages from './ProductList/ProductoImages'
import ProductosLista from './ProductList/ProductosLista'
import ProductosProvider from './ProductList/ProductosProvider'



const Productos = () => {
  return (
    <ProductosProvider>
      <DialogBorrar />
      <ProductosLista />
      <ProductoImages />
      <DialogStock />
    </ProductosProvider>
  )
}

export default Productos
