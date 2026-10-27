import { useState,useEffect,useContext,createContext,useCallback } from "react";
import { APICALLER } from "../../../Services/api";
import {useLang} from "../../../Contexts/LangProvider"

const Contexto = createContext()

const ImpuestoProvider = ({children})=>{

    const [cargando,setCargando] = useState(true)
    const [lista,setLista] = useState([])
    const {lang} = useLang();

    const getLista = useCallback(async()=>{

        let res = await APICALLER.get({table:"impuestos"});
        res.response ? setLista(res.results) : console.log(res) 
        setCargando(false)
    },[])

    useEffect(()=>{
        let isActive = true;
    const ca = new AbortController();
    if (isActive) { getLista();}
    return () => {
      isActive = false;
      ca.abort();
    };
    },[getLista])
    
    return (
        <Contexto.Provider
            value={{cargando,setCargando,lista,setLista,lang}}
        >
            {children}
        </Contexto.Provider>
    )
}

export const useImpuestos = ()=>{
    const {cargando,setCargando,lista,setLista,lang} = useContext(Contexto)
    return {cargando,setCargando,lista,setLista,lang}
}

export default ImpuestoProvider