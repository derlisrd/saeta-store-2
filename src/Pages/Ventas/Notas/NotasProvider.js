import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { APICALLER } from '../../../Services/api';
import { useLang } from '../../../Contexts/LangProvider';
const NotasContext = createContext();

const NotasProvider = ({children}) => {

    const [lista,setLista] = useState([]);
  
    const [cargas,setCargas] = useState(true);
    const {lang} = useLang()

    const getLista = useCallback(async()=>{
        setCargas(true)
        let res = await APICALLER.get({table:"notas_pedidos",include:"clientes",on:"id_cliente,id_cliente_pedido"});
        res.response ? setLista(res.results) : console.log(res);
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
        value={{ lista,cargas,lang }}
    >
        {children}
    </NotasContext.Provider>
  )
}


export const useNotas = () =>{
    const {lista,cargas,lang} = useContext(NotasContext);
    return {lista,cargas,lang}
}

export default NotasProvider
