import React, { createContext, useContext, useState } from 'react'
import toast  from 'react-hot-toast';
const Context = createContext()

const CartProvider = ({children}) => {

    const store = JSON.parse( localStorage.getItem('cart') )

    const initialCart = {
        items: store ? store?.items : [],
        total: store ? store?.total : 0
    }
    const [cart,setCart] = useState(initialCart)


    const setearCart = obj =>{
        setCart(obj)
        localStorage.setItem("cart",JSON.stringify(obj))
    }

    const hacerTotal = (obj)=>{
        let total = 0;
        obj.items.forEach(e=>{
            total += (e.precio_producto*e.cantidad)
        })
        return total;
    }

    const addItem = (new_item,cantidad)=>{
        toast.success('Agregado al carrito')
        let old = {...cart}
        let id_producto = new_item.id_producto;
        let nombre_producto = new_item.nombre_producto;
        let precio_producto = parseFloat(new_item.precio_producto);

        let index = old.items.findIndex(e=> e.id_producto === id_producto)
        let new_cantidad = cantidad
        if(index>=0){
            old.items[index].cantidad += new_cantidad;
        }else{
            old.items.push({id_producto,cantidad,nombre_producto,precio_producto})
        }
        
        old.total = hacerTotal(old);
        setearCart(old)
    }

    const restarItem = (item)=>{
        let old = {...cart}
        let index = old.items.findIndex(e=> e.id_producto === item.id_producto)
        let new_cantidad;
        if(index>=0){
            new_cantidad = old.items[index].cantidad - 1;
            if(new_cantidad>0){
                old.items[index].cantidad = new_cantidad;
            }else{
                old.items.splice(index, 1);
            }
        }
        old.total = hacerTotal(old);
        setearCart(old)
    }



    const values = {
        cart,addItem,restarItem,setearCart
    }
  return <Context.Provider value={values}>{children}</Context.Provider>
  
}


export const useCart = ()=>{
    const {cart,addItem,restarItem,setearCart} = useContext(Context)
    return {cart,addItem,restarItem,setearCart}
}

export default CartProvider
