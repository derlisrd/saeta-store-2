import {createContext,useEffect,useState,useContext,useCallback} from "react";
import { useLogin } from "../../Contexts/LoginProvider";
import { APICALLER } from "../../Services/api";
import { useLang } from "../../Contexts/LangProvider";
const UsersContext = createContext();

function UsersProvider ({children}){
    const {userData} = useLogin();
    const {lang} = useLang()
    const {token_user} = userData;
    const initialCargas = {lista:true,guardar:false}
    const [cargas,setCargas]=useState(initialCargas);
    const [lista,setLista] = useState([])
    const initialDialogs = { new:false}
    const [dialogs,setDialogs] = useState(initialDialogs);
    

    const getLista = useCallback(async()=>{
        setCargas({lista:true,guardar:false})
        let res = await APICALLER.get({table:"users",token:token_user});
        res.response==='ok' ? setLista(res.results) : console.log(res);
        setCargas({lista:false,guardar:false})
    },[token_user])


    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if(isActive){getLista();}
        return ()=>{isActive = false; ca.abort();}
    }, [getLista]);

    const values = {
        dialogs,setDialogs,cargas,lista,lang
    }
    return(
        <UsersContext.Provider value={values}>
            {children}
        </UsersContext.Provider>
    )
}
export function useUsers (){
    const {dialogs,setDialogs,cargas,lista,lang} = useContext(UsersContext);
    return {dialogs,setDialogs,cargas,lista,lang}
}
export default UsersProvider