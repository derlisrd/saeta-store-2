import { useState,useEffect,useContext,createContext,useCallback } from "react";
import { APICALLER } from "../../../Api/ApiCaller";


const Contexto = createContext()

const ImpuestoProvider = ({children})=>{

    const [cargando,setCargando] = useState(true)
    const [lista,setLista] = useState([])

    const getLista = useCallback(async()=>{

        let res = await APICALLER.get({table:"impuestos"});
        res.response==="ok" ? setLista(res.results) : console.log(res) 
        setCargando(false)
    },[])

    useEffect(()=>{
        let isActive = true;
    const ca = new AbortController();
    if (isActive) {
        
        getLista();
    }

    return () => {
      isActive = false;
      ca.abort();
    };
    },[getLista])
    return (
        <Contexto.Provider
            value={{cargando,setCargando,lista,setLista}}
        >
            {children}
        </Contexto.Provider>
    )
}

export const useImpuestos = ()=>{
    const {cargando,setCargando,lista,setLista} = useContext(Contexto)
    return {cargando,setCargando,lista,setLista}
}

export default ImpuestoProvider