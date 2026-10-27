import React from 'react'
import CategoriasLista from './CategoriasLista'
import CategoriasProvider from './CategoriasProvider'

const Categorias = () => {
  return (
    <CategoriasProvider>
      <CategoriasLista />
    </CategoriasProvider>
  )
}

export default Categorias
