import { createContext,useEffect,useState,useCallback,useContext } from "react"
import { APICALLER } from "../../../Services/api"

const Contexto = createContext()

const FormasPagoProvider = ({children}) => {

    const initialDialogs = {
      agregar:false,
      editar:false
    }
    const initialCargas = { 
      lista:true
    }
    const [formEdit,setFormEdit] = useState({})
    const [lista,setLista] = useState([])
    const [dialogs,setDialogs] = useState(initialDialogs)
    const [cargas,setCargas] = useState(initialCargas)
    const getLista = useCallback(async()=>{
        let res = await APICALLER.get({table:"facturas_formas_pagos"})
        res.response ? setLista(res.results) : console.log(res);
        setCargas({lista:false})
    },[])

    useEffect(()=>{
        const ca = new AbortController()
        let isActive = true;
        if(isActive) getLista();
        return ()=>{isActive = false; ca.abort();}
    },[getLista])

    const values = {
        lista,dialogs,setDialogs,cargas,getLista,formEdit,setFormEdit
    }

    return (
      <Contexto.Provider value={values}>
        {children}
      </Contexto.Provider>
    )
  }
  

  export function useFormasPago(){
    const {lista,dialogs,setDialogs,cargas,getLista,formEdit,setFormEdit} = useContext(Contexto)
    return {lista,dialogs,setDialogs,cargas,getLista,formEdit,setFormEdit}
  }

  export default FormasPagoProvider