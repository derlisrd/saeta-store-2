import React, { createContext, useContext, useState } from 'react'

const Context = createContext()

const CartProvider = ({children}) => {

    const store = JSON.parse( localStorage.getItem('cart') )

    const initialCart = {
        items: store ? store?.items : [],
        total: store ? store?.total : 0
    }
    const [cart,setCart] = useState(initialCart)

    const addItem = (new_item,cantidad)=>{
        let old = {...cart}
        let id_producto = new_item.id_producto;
        let nombre_producto = new_item.nombre_producto;
        let precio_producto = parseFloat(new_item.precio_producto);
        let index = old.items.findIndex(e=> e.id_producto === id_producto)
        if(index>=0){
            old.items[index].cantidad += cantidad
        }else{
            old.items.push({id_producto,cantidad,nombre_producto,precio_producto})
        }
        let total = old.total;
        old.items.forEach(e=>{
            total += e.cantidad * e.precio_producto;
        })
        old.total = total;
        setCart(old)
        localStorage.setItem("cart",JSON.stringify(old))
    }

    const restarItem = (id)=>{
        
    }



    const values = {
        cart,addItem,restarItem
    }
  return <Context.Provider value={values}>{children}</Context.Provider>
  
}


export const useCart = ()=>{
    const {cart,addItem,restarItem} = useContext(Context)
    return {cart,addItem,restarItem}
}

export default CartProvider
