import {createContext, useCallback, useContext, useEffect,useState} from 'react'
import { APICALLER } from '../Services/api'
import { useLogin } from './LoginProvider'
const Contexto = createContext()

const DatosEmpresaProvider = ({children}) => {

    const storageEmpresa = JSON.parse(localStorage.getItem("dataEmpresa"));
    const storageMoneda = JSON.parse(localStorage.getItem("dataMonedas"));
    const mon = storageMoneda ? storageMoneda.filter(e=> e.activo_moneda==="1") : {} 
    const [MONEDA_PRINCIPAL,SET_MONEDA_PRINCIPAL] = useState(mon[0]);
    const [EMPRESA,SET_EMPRESA] = useState(storageEmpresa ? storageEmpresa : {})
    
    const {logueado} = useLogin()
    const getDatos = useCallback(async()=>{
      
        if(logueado){
        if(storageEmpresa===null || storageMoneda===null){
          let res = await APICALLER.get({table:'monedas',where:`activo_moneda,=,1`})
          res.response==="ok" ? SET_MONEDA_PRINCIPAL(res.results[0]) : console.log(res)
          let emp = await APICALLER.get({table:'empresas'});
          emp.response==="ok" ? SET_EMPRESA(emp.results[0]) : console.log(emp);
        }
        }
    },[logueado,storageEmpresa,storageMoneda])

    useEffect(() => {
        const ca = new AbortController();
        let isActive = true;
        if (isActive) {
          getDatos();
        }
        return () => {
          isActive = false;
          ca.abort();
        };
      }, [getDatos]);

  return (
    <Contexto.Provider
        value={{MONEDA_PRINCIPAL,SET_MONEDA_PRINCIPAL,EMPRESA}}
    >
        {children}
    </Contexto.Provider>
  )
}

export const useDatosEmpresa = ()=>{
    const {MONEDA_PRINCIPAL,SET_MONEDA_PRINCIPAL,EMPRESA} = useContext(Contexto)
    return {MONEDA_PRINCIPAL,SET_MONEDA_PRINCIPAL,EMPRESA}
}

export default DatosEmpresaProvider