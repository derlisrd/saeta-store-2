import React from 'react'
import DialogCategorias from './DialogCategorias'
import DialogColors from './DialogColors'
import DialogDepositos from './DialogDepositos'
import DialogMarcas from './DialogMarcas'
import DialogProveedores from './DialogProveedores'
import ProductFormProvider from './ProductFormProvider'
import ProductFormTabs from './ProductFormTabs'

const ProductNew = () => {
  return (
    <ProductFormProvider>
      <DialogColors />
      <DialogMarcas />
      <DialogDepositos />
      <DialogProveedores />
      <DialogCategorias />
      <ProductFormTabs />
    </ProductFormProvider>
  )
}

export default ProductNew