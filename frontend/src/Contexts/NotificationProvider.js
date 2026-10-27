import {createContext, useCallback, useContext, useEffect,useState} from 'react'
//import { APICALLER } from '../Services/api'
import { useLogin } from './LoginProvider'
//import man from '../App/Assets/man.svg'
const Contexto = createContext()

function NotificationProvider({children}){
    

  
    
    const {dataEmpresa,userData} = useLogin()
    const [cantidad,setCantidad] = useState(0)
    const [notificaciones,setNotificaciones] = useState({
        vencimiento:false,
        productos:[]
    })

    const [isLoading,setIsLoading] = useState(true)

    
    const refreshDatas = async()=>{
        setIsLoading(false)
        //console.log('notificaion');
    }

    const getIntervalNotification = useCallback(async()=>{
      setInterval(async() => {
        let local = localStorage.getItem('userData') || sessionStorage.getItem('userData')
        if(userData.login && local){
          Notification.requestPermission().then(perm=>{
            if(perm==='granted'){
              new Notification('Saeta Sistema',{
                body:"Sistema online",
                icon: 'logo192.png',
                vibrate:true
              })
            }
          }) 
        }
      }, 120000); 
    },[userData])


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
        if (isActive) {
          getDatos()
          getIntervalNotification()
        }
        return () => {isActive = false;ca.abort();};
      }, [getDatos,getIntervalNotification]);

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