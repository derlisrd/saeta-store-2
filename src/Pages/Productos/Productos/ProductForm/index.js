import React from 'react'
import DialogCategorias from './DialogCategorias'
import DialogDepositos from './DialogDepositos'
import DialogMarcas from './DialogMarcas'
import DialogProveedores from './DialogProveedores'
import ProductFormProvider from './ProductFormProvider'
import ProductFormTabs from './ProductFormTabs'

const ProductForm = () => {
  return (
    <ProductFormProvider>
      <DialogMarcas />
      <DialogDepositos />
      <DialogProveedores />
      <DialogCategorias />
      <ProductFormTabs />
    </ProductFormProvider>
  )
}

export default ProductForm