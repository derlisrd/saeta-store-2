import React, { createContext,useEffect,useCallback,useState, useContext } from 'react'
import { APICALLER } from '../Services/api'

const Contexto = createContext()

const ConfiguracionProvider = ({children}) => {

    const [configurado,setConfigurado] = useState(0)
    const [loadindConfiguracion,setLoadingConfiguracion] = useState(true)
    const [monedas,setMonedas] = useState([])

    const setearConfiguracion = con =>{
        setConfigurado(con)
        localStorage.setItem('Configurado',con)
    }

    const verificar = useCallback(async()=>{
        const storage = localStorage.getItem('Configurado')
        if(!storage || storage === '0'){
            let [res,mon] = await Promise.all([
                APICALLER.get({table:'empresas',fields:'configurado',where:'id_empresa,=,1'}),
                APICALLER.get({table:'monedas'})
            ])
            if(res.response){
                let con = parseInt(res.results[0].configurado)
                setearConfiguracion(con)
            }
            mon.response ? setMonedas(mon.results) : console.log(mon)
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
    
    const values = {configurado,setConfigurado,setearConfiguracion,loadindConfiguracion,monedas}

    return <Contexto.Provider value={values}>{children}</Contexto.Provider>
}

export const useConfiguracion = ()=>{

    const {configurado,setearConfiguracion,loadindConfiguracion,monedas} = useContext(Contexto)
    return {configurado,setearConfiguracion,loadindConfiguracion,monedas}

}

export default ConfiguracionProvider
