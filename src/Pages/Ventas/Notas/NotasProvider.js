import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { APICALLER } from '../../../Api/ApiCaller';

const NotasContext = createContext();

const NotasProvider = ({children}) => {

    const [lista,setLista] = useState([]);
  
    const [cargas,setCargas] = useState(true);


    const getLista = useCallback(async()=>{
        setCargas(true)
        let res = await APICALLER.get({table:"notas_pedidos",include:"clientes",on:"id_cliente,id_cliente_pedido"});
        res.response==="ok" ? setLista(res.results) : console.log(res);
        setCargas(false)
    },[])

    useEffect(()=>{
        const ca = new AbortController()
        let isActive = true;
        if(isActive){
          getLista()
        }
        return ()=>{
          isActive = false;
          ca.abort();
        }
    },[getLista])

  return (
    <NotasContext.Provider
        value={{ lista,cargas }}
    >
        {children}
    </NotasContext.Provider>
  )
}


export const useNotas = () =>{
    const {lista,cargas} = useContext(NotasContext);
    return {lista,cargas}
}

export default NotasProvider
