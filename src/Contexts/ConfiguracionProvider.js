import React, { createContext,useEffect,useCallback,useState, useContext } from 'react'
import { APICALLER } from '../Services/api'

const Contexto = createContext()

const ConfiguracionProvider = ({children}) => {

    const [configurado,setConfigurado] = useState(0)
    const [loadindConfiguracion,setLoadingConfiguracion] = useState(true)
    



    const setearConfiguracion = con =>{
        setConfigurado(con)
        localStorage.setItem('Configurado',con)
    }

    const verificar = useCallback(async()=>{
        const storage = localStorage.getItem('Configurado')
        if(!storage || storage === '0'){
            let res = await APICALLER.get({table:'empresas',fields:'configurado',where:'id_empresa,=,1'})
            if(res.response){
                let con = parseInt(res.results[0].configurado)
                setearConfiguracion(con)
            }
        }else{
            setearConfiguracion(1)
        }
        setLoadingConfiguracion(false)
    },[])
    
    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {verificar();}
        return () => {isActive = false;ca.abort();};
    }, [verificar]);
    
    const values = {configurado,setConfigurado,setearConfiguracion,loadindConfiguracion}

    return <Contexto.Provider value={values}>{children}</Contexto.Provider>
}

export const useConfiguracion = ()=>{

    const {configurado,setearConfiguracion,loadindConfiguracion} = useContext(Contexto)
    return {configurado,setearConfiguracion,loadindConfiguracion}

}

export default ConfiguracionProvider
