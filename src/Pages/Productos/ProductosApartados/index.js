import React from 'react'
import DialogApartar from './DialogApartar'
import DialogBuscarCliente from './DialogBuscarCliente'
import DialogBuscarProducto from './DialogBuscarProducto'
import ProductosApartadosLista from './ProductosApartadosLista'
import ProductosApartadosProvider from './ProductosApartadosProvider'

const ProductosApartados = () => {
  return (
    <ProductosApartadosProvider>
      <DialogApartar />
      <DialogBuscarCliente />
      <DialogBuscarProducto />
      <ProductosApartadosLista />
    </ProductosApartadosProvider>
  )
}

export default ProductosApartados
