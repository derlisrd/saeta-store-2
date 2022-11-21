import {createContext, useCallback, useContext, useEffect,useState} from 'react'
//import { APICALLER } from '../Services/api'
import { useLogin } from './LoginProvider'

const Contexto = createContext()

function NotificationProvider({children}){

    const {dataEmpresa} = useLogin()
    const [cantidad,setCantidad] = useState(0)
    const [notificaciones,setNotificaciones] = useState({
        vencimiento:false,
        productos:[]
    })

    const [isLoading,setIsLoading] = useState(true)

    
    const refreshDatas = async()=>{
        setIsLoading(false)
    }


    const getDatos = useCallback(async () => {
      let newempresa = { ...dataEmpresa };
      let licencia = newempresa.licencia;
      if (licencia) {
        let split = licencia.split("-");
        let dateLicencia = new Date(
          split[0],
          parseInt(split[1]) - 1,
          split[2].substr(0, 2)
        );
        let hoy = new Date();
        let cuatrodias = 215304206;
        let resta = dateLicencia.getTime() - hoy.getTime();
        if (resta < cuatrodias) {
          setCantidad(1);
          setNotificaciones({
            vencimiento: true,
          });
        } else {
          setCantidad(0);
        }
      }
    }, [dataEmpresa]);

    const values = {
        cantidad,setCantidad,getDatos,isLoading,notificaciones,refreshDatas
    }
    
    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getDatos()}
        return () => {isActive = false;ca.abort();};
      }, [getDatos]);

    return(
        <Contexto.Provider value={values}>
            {children}
        </Contexto.Provider>
    )
}
export default NotificationProvider

export function useNotification(){
    const {setCantidad,cantidad,getDatos,isLoading,notificaciones,refreshDatas} = useContext(Contexto)
    return {setCantidad,cantidad,getDatos,isLoading,notificaciones,refreshDatas}
}