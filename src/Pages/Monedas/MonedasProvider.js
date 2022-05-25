import { createContext, useCallback, useEffect,useContext, useState } from 'react'
import { APICALLER } from '../../Api/ApiCaller'

const Contexto = createContext()

const MonedasProvider = ({children}) => {

    const [lista,setLista]  = useState([])
    const [cargando,setCargando] = useState(true)
    const [dialogCotizacion,setDialogCotizacion] = useState(false)
    const [datosMonedas,setDatosMonedas] = useState({id_moneda: "1", abreviatura_moneda: "Gs.", nombre_moneda: "Guaraníes", valor_moneda: "1", activo_moneda: "1"})

    const getLista = useCallback(async()=>{
        const res = await APICALLER.get({table:`monedas`})
        res.response==="ok" ? setLista(res.results) : console.log(res)
        setCargando(false)
    },[])

    useEffect(()=>{
        let isActive = true;
    const ca = new AbortController()
    if(isActive){
      getLista();
    }

    return () => {
      isActive = false;
      ca.abort();
    };
    },[getLista])

  return (
    <Contexto.Provider value={{lista,setLista,cargando,setCargando,dialogCotizacion,setDialogCotizacion,datosMonedas,setDatosMonedas}}>
        {children}
    </Contexto.Provider>
  )
}


export const useMonedas = ()=>{
    const {lista,setLista,cargando,setCargando,dialogCotizacion,setDialogCotizacion,datosMonedas,setDatosMonedas} = useContext(Contexto)
    return {lista,setLista,cargando,setCargando,dialogCotizacion,setDialogCotizacion,datosMonedas,setDatosMonedas}
}

export default MonedasProvider
