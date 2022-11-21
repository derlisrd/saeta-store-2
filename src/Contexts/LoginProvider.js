import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import { APICALLER } from '../Services/api';
import {  env } from "../Utils/config";
import CryptoJS from "crypto-js";
import { funciones } from '../Functions';

const LoginContext = createContext()

const LoginProvider = ({children}) => {
   // const navigate = useNavigate()
    const CifrarTexto = t => CryptoJS.AES.encrypt(t, env.SECRETO).toString();
    const Descifrar = t => CryptoJS.AES.decrypt(t, env.SECRETO).toString(CryptoJS.enc.Utf8);
    const storage = JSON.parse(sessionStorage.getItem("userData")) || JSON.parse(localStorage.getItem("userData"));
    const [loading,setLoading] = useState(true);
    const storageEmpresa = JSON.parse(localStorage.getItem("dataEmpresa")) || {}
    const [dataEmpresa,setDataEmpresa] = useState(storageEmpresa)
    const [load,setLoad] = useState({
        login:false,
        msj:null,
        active:false
    })
    const initialUserData = { 
        login:false,
        remember:false,
        token_user:null,
        id_user:null,
        nombre_user:null,
        rol_user:null,
        username_user:null,
        permisos:[],
    }
    const [userData,setUserData] = useState( storage ? storage : initialUserData);    
    
    /* setInterval(async()=>{
        const store = JSON.parse(sessionStorage.getItem("userData")) || JSON.parse(localStorage.getItem("userData"));
        if(userData.login && store){
            let res = await APICALLER.ReValidateToken(userData.token_user);
            if(res.response){
                let f = {...userData}
                f.token_user = CifrarTexto(res.results);
                setUserData(f);
                sessionStorage.setItem("userData", JSON.stringify(f))
            }
        };
    }, 900000) */

    
    const setearLogin = (f,remember)=>{
        setUserData(f);
        localStorage.removeItem("facturasStorage");  
        localStorage.removeItem("dataProductos");
        localStorage.removeItem("compras");
        sessionStorage.setItem("userData", JSON.stringify(f))
        if(remember){
            localStorage.setItem("userData", JSON.stringify(f))
        } 
    }

    const setearEmpresa = ({empresa=null,monedas=null,mode})=>
    {
        if(mode){
            localStorage.setItem("dataEmpresa", JSON.stringify(empresa))
            localStorage.setItem("dataMonedas", JSON.stringify(monedas))
            setDataEmpresa(empresa)
        }else{
            localStorage.removeItem("dataEmpresa");
            localStorage.removeItem("dataMonedas");    
            setDataEmpresa({})
        }
    }
    const logOut = useCallback(()=>{
        
        setUserData({login:false,
            token_user:null,
            id_user:null,
            nombre_user:null,
            rol_user:null,
            username_user:null,
            remember:false,
            permisos:[]});
        setearEmpresa({mode:false })
        localStorage.removeItem("userData");
        sessionStorage.removeItem("userData");

    },[])

    const logIn = async(f,remember)=>{
        setLoad({login:true,active:false,msj:null});
        let [res,emp,mon] = await Promise.all([APICALLER.login(f),APICALLER.get({table:"empresas"}),APICALLER.get({table:"monedas"})]);
        
        if(res.response && res.found>0){
            let dataMonedas = mon.results;
            
            let dataEmpresa = emp.results[0];
            let today = new Date();
            let fechaLicencia = funciones.splitFecha(dataEmpresa.licencia)

            if(today >= fechaLicencia){
                setLoad({login:false,active:true,msj:"Su licencia ha vencido. Por favor contacte con el proveedor."});
                return false;
            }
            setearEmpresa({mode:true,empresa:dataEmpresa,monedas:dataMonedas})
            let d = res.results[0];
            let permisosData = await APICALLER.get({table:"permisos_users",where:`id_user_permiso,=,${d.id_user}`,fields:"id_permiso_permiso"});
            let datas = {...d,
                login:true,
                token_user:CifrarTexto(d.token_user),
                username_user:(d.username_user),
                permisos: permisosData.response ? permisosData.results : []
            }
            setearLogin(datas,remember);
            setLoad({login:false,active:false,msj:null});
        }
        else{
            console.log(res);
            setLoad({login:false,active:true,msj:res.message});
        }
    }


    const verificar = useCallback(async()=>{
        setLoading(true);
        if (userData.login) {
            let res = await APICALLER.validateToken(userData.token_user);
            if (res.found > 0 && res.response ) {
                
            }else{
                logOut()
            }
        }
        setLoading(false)
    },[userData,logOut])



    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {verificar();}
        return () => {isActive = false;ca.abort();};
      }, [verificar]);

      const values = {userData,logIn,logOut,load,loading,Descifrar,dataEmpresa,setDataEmpresa}

      
  return (
    <LoginContext.Provider value={values}>
      {children}
    </LoginContext.Provider>
  )
}


export const useLogin = ()=>{
    const {userData,logIn,logOut,load,loading,Descifrar,dataEmpresa,setDataEmpresa} = useContext(LoginContext);
    return {userData,logIn,logOut,load,loading,Descifrar,dataEmpresa,setDataEmpresa}
}

export default LoginProvider
