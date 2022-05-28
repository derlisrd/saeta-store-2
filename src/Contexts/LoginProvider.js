import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import { APICALLER } from '../Services/api';
import {  env } from "../Utils/config";
import CryptoJS from "crypto-js";
import { funciones } from '../Functions';
const LoginContext = createContext()

const LoginProvider = ({children}) => {
   // const navigate = useNavigate()
    const CifrarTexto = (text) => CryptoJS.AES.encrypt(text, env.SECRETO).toString();
    const storage = JSON.parse(sessionStorage.getItem("userData")) || JSON.parse(localStorage.getItem("userData"));
    const [loading,setLoading] = useState(true);
    const [load,setLoad] = useState({
        login:false,
        msj:null,
        active:false
    })
    const initialUserData = { 
        login:false,
        token_user:null,
        id_user:null,
        nombre_user:null,
        rol_user:null,
        username_user:null,
        permisos:[],
    }
    const [userData,setUserData] = useState( storage ? storage : initialUserData);    
    
    
    
    const setearLogin = (f,remember)=>{
        setUserData(f);
        sessionStorage.setItem("userData", JSON.stringify(f))
        if(remember) localStorage.setItem("userData", JSON.stringify(f))
    }
    const setearEmpresa = ({empresa=null,monedas=null,mode})=>
    {
        if(mode){
            localStorage.setItem("dataEmpresa", JSON.stringify(empresa))
            localStorage.setItem("dataMonedas", JSON.stringify(monedas))
        }else{
            localStorage.removeItem("dataEmpresa");
            localStorage.removeItem("dataMonedas");    
        }
    }
    const logOut = useCallback(()=>{
        
        setUserData({login:false,
            token_user:null,
            id_user:null,
            nombre_user:null,
            rol_user:null,
            username_user:null,
            permisos:[],});
        setearEmpresa({mode:false })
        localStorage.removeItem("userData");
        sessionStorage.removeItem("userData");

    },[])

    const logIn = async(f,remember)=>{
        setLoad({login:true,active:false,msj:null});
        let promise = await Promise.all([APICALLER.login(f),APICALLER.get({table:"empresas"}),APICALLER.get({table:"monedas"})]);
        let res = promise[0];
        let emp = promise[1];
        let mon = promise[2];
        let dataMonedas = mon.results;
        let dataEmpresa = emp.results[0];
        let today = new Date();
        let fechaLicencia = funciones.splitFecha(dataEmpresa.licencia)

        if(today >= fechaLicencia){
            setLoad({login:false,active:true,msj:"Su licencia ha vencido. Por favor contacte con el proveedor."});
            return false;
        }
        setearEmpresa({mode:true,empresa:dataEmpresa,monedas:dataMonedas})

        if(res.response==="ok" && res.found>0){
            let d = res.results[0];
            let permisosData = await APICALLER.get({table:"permisos_users",where:`id_user_permiso,=,${d.id_user}`,fields:"id_permiso_permiso"});
            let datas = {...d,
                login:true,
                token_user:CifrarTexto(d.token_user),
                username_user:CifrarTexto(d.username_user),
                permisos: permisosData.response==="ok" ? permisosData.results : []
            }
            
        
            
            setearLogin(datas,remember);
            setLoad({login:false,active:false,msj:null});
        }
        else{
            setLoad({login:false,active:true,msj:res.message});
        }
    }


    const verificar = useCallback(async()=>{
        setLoading(true);
        if (userData.login) {
            let res = await APICALLER.validateToken(userData.token_user);
            if (res.found > 0 && res.response === "ok") {
                
            }else{
                logOut()
            }
        }
        setLoading(false)
    },[userData,logOut])
    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {
          verificar();
        }
        return () => {
          isActive = false;
          ca.abort();
        };
      }, [verificar]);
      const values = {userData,logIn,logOut,load,loading}
  return (
    <LoginContext.Provider value={values}>
      {children}
    </LoginContext.Provider>
  )
}


export const useLogin = ()=>{
    const {userData,logIn,logOut,load,loading} = useContext(LoginContext);
    return {userData,logIn,logOut,load,loading}
}

export default LoginProvider
