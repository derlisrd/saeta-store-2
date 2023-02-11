import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Base from './Base'
import Catalogo from './Catalogo'
import Home from './Home'
import Producto from './Producto'

const Pages = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Base><Home/></Base>} />
        <Route path='/catalogo' element={<Base><Catalogo/></Base>} />
        <Route path='/producto/:idproducto' element={<Base><Producto /></Base>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Pages
