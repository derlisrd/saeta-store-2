import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Base from './Base'
import Catalogo from './Catalogo'
import Home from './Home'
import Category from './Category'
import Producto from './Producto'
import DatosProvider from '../Providers/DatosProvider'
import NotFound from '../Components/html/NotFound'
import Categories from './Category/Categories'
import Contacto from './Contacto'

const Pages = () => {
  return (
    <DatosProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Base><Home/></Base>} />
          <Route path='/catalogo' element={<Base><Catalogo/></Base>} />
          <Route path='/producto/:id' element={<Base><Producto /></Base>} />
          <Route path='/category' element={<Base><Categories /></Base>} />
          <Route path='/category/:id' element={<Base><Category /></Base>} />
          <Route path='/contacto' element={<Base><Contacto /></Base>} />
          <Route path='*' element={<Base><NotFound /></Base>} />
        </Routes>
      </BrowserRouter>
    </DatosProvider>
  )
}

export default Pages
