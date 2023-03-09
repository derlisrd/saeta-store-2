import { createContext, useCallback, useEffect,useContext, useState } from 'react'
import { APICALLER } from '../../Services/api'
import { useLang } from '../../Contexts/LangProvider'
const Contexto = createContext()

const MonedasProvider = ({children}) => {

    const [lista,setLista]  = useState([])
    const {lang} = useLang()
    const [cargando,setCargando] = useState(true)
    const [dialogCotizacion,setDialogCotizacion] = useState(false)

    const [datosMonedas,setDatosMonedas] = useState({id_moneda: "1", abreviatura_moneda: "Gs.", nombre_moneda: "Guaraníes", valor_moneda: "1", activo_moneda: "1"})

    const getLista = useCallback(async()=>{
        const local = localStorage.getItem("dataMonedas");
        if(local===null){
          const res = await APICALLER.get({table:`monedas`})
          if(res.response ){
            let result = res.results;
            let moneda= result.filter(e=> parseInt(e.activo_moneda)===1)
            setLista(result)
            setDatosMonedas(moneda[0]);
          } else {console.log(res)}
          
        }else{
          let json = JSON.parse(local);
          setLista(json)
          let moneda= json.filter(e=> parseInt(e.activo_moneda)===1)
          setDatosMonedas(moneda[0]);
        }
        
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
    <Contexto.Provider value={{lang,lista,setLista,cargando,setCargando,dialogCotizacion,setDialogCotizacion,datosMonedas,setDatosMonedas}}>
        {children}
    </Contexto.Provider>
  )
}


export const useMonedas = ()=>{
    const {lang,lista,setLista,cargando,setCargando,dialogCotizacion,setDialogCotizacion,datosMonedas,setDatosMonedas} = useContext(Contexto)
    return {lang,lista,setLista,cargando,setCargando,dialogCotizacion,setDialogCotizacion,datosMonedas,setDatosMonedas}
}

export default MonedasProvider
