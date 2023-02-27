import React, { createContext, useContext, useState } from 'react'

const Context = createContext()

const CartProvider = ({children}) => {

    const initialCart = {
        items: []
    }
    const [cart,setCart] = useState(initialCart)

    const values = {
        cart,setCart
    }
  return <Context.Provider value={values}>{children}</Context.Provider>
  
}


export const useCart = ()=>{
    const {cart,setCart} = useContext(Context)
    return {cart,setCart}
}

export default CartProvider
