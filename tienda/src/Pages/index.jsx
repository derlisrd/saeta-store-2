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
import CartProvider from '../Providers/CartProvider'
import CheckOut from './Checkout'

const Pages = () => {
  return (
    <DatosProvider>
      <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Base />}>
            <Route path='/' element={<Home />} />
            <Route path='/catalogo' element={<Catalogo/>} />
            <Route path='/producto/:id' element={<Producto />} />
            <Route path='/category' element={<Categories />} />
            <Route path='/category/:id' element={<Category />} />
            <Route path='/contacto' element={<Contacto />} />
            <Route path='/checkout' element={<CheckOut />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </DatosProvider>
  )
}

export default Pages
