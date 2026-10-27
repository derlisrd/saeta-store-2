import {createContext, useCallback, useContext, useEffect,useState} from 'react'
import { APICALLER } from '../Services/api'
import { useLogin } from './LoginProvider'
const Contexto = createContext()

const DatosEmpresaProvider = ({children}) => {

    const {dataEmpresa } = useLogin()
    const storageEmpresa = dataEmpresa || JSON.parse(localStorage.getItem("dataEmpresa"));
    const storageMoneda = JSON.parse(localStorage.getItem("dataMonedas"));


    const mon = storageMoneda ? storageMoneda.filter(e=> e.activo_moneda==="1" ||e.activo_moneda===1) : {} 

  
    const [MONEDA_PRINCIPAL,SET_MONEDA_PRINCIPAL] = useState(mon[0]);
    const [MONEDAS,SETMONEDAS] = useState(storageMoneda ? storageMoneda : [])
    const [EMPRESA,SET_EMPRESA] = useState(storageEmpresa ? storageEmpresa : {})
    
  
    //console.log("STATE MONEDA", MONEDAS)
    const {userData} = useLogin()
    const {login} = userData

    
    const getDatos = useCallback(async()=>{
        let storeMoneda = localStorage.getItem("dataMonedas"), storeEmpresa = localStorage.getItem("dataEmpresa");
      if(storeEmpresa===null || storeMoneda===null){
          if(login){
          let promise = await Promise.all([
            APICALLER.get({table:'monedas'}),
            APICALLER.get({table:'empresas'})
        ])
          let res = promise[0],emp = promise[1];
          if(res.response && emp.response){
            SET_EMPRESA(emp.results[0])
            localStorage.setItem("dataEmpresa",JSON.stringify(emp.results[0]))
            let monedafiltrada = res.results.filter(e=> e.activo_moneda==="1" ||e.activo_moneda===1)
            SET_MONEDA_PRINCIPAL(monedafiltrada[0])
            SETMONEDAS(res.results)
            localStorage.setItem("dataMonedas",JSON.stringify(res.results))
          }
        }
      }else{ 
        let moneda = JSON.parse(storeMoneda).filter(e=> e.activo_moneda==="1" ||e.activo_moneda===1)
        SETMONEDAS(JSON.parse(storeMoneda))
        SET_MONEDA_PRINCIPAL(moneda[0])
        SET_EMPRESA(JSON.parse(storeEmpresa))
      }
    },[login])

    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {
          getDatos();
        }
        return () => {isActive = false;ca.abort();};
      }, [getDatos]);

  return (
    <Contexto.Provider
        value={{MONEDA_PRINCIPAL,SET_MONEDA_PRINCIPAL,EMPRESA,MONEDAS,SET_EMPRESA}}
    >
        {children}
    </Contexto.Provider>
  )
}

export const useDatosEmpresa = ()=>{
    const {MONEDA_PRINCIPAL,SET_MONEDA_PRINCIPAL,EMPRESA,MONEDAS,SET_EMPRESA} = useContext(Contexto)
    return {MONEDA_PRINCIPAL,SET_MONEDA_PRINCIPAL,EMPRESA,MONEDAS,SET_EMPRESA}
}

export default DatosEmpresaProvider