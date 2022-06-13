import {createContext,useEffect,useState,useContext,useCallback} from "react";
import { useLogin } from "../../Contexts/LoginProvider";
import { APICALLER } from "../../Services/api";
import { useLang } from "../../Contexts/LangProvider";
import swal from "sweetalert";
const UsersContext = createContext();

function UsersProvider ({children}){
    const {userData,Descifrar} = useLogin();
    const {lang} = useLang()
    const {token_user} = userData;
    const initialCargas = {lista:true,guardar:false}
    const [cargas,setCargas]=useState(initialCargas);
    const [lista,setLista] = useState([])
    const initialDialogs = { new:false,edit:false,permission:false,password:false}
    const [dialogs,setDialogs] = useState(initialDialogs);
    

    const confirmPassword = async() => {

        let clave = await swal({
            title: lang.confirmar_contra,
            icon: "info",
            dangerMode: true,
            buttons: [lang.cancelar, lang.confirmar],
            content: {
              element: "input",
              attributes: {
                placeholder: lang.long_no_farzante,
                type: "password",
              },
            },
          })

        return await APICALLER.confirmPassword({username_user: Descifrar(userData.username_user),password_user:clave});
    } 
    

    const deleteUser = async(f)=>{

        let ID = parseInt(f.id_user)

        if(ID===parseInt(userData.id_user)){
            swal({text:lang.no_puede_eliminarte,icon:"error",timer:2000});
            return false;
        } 

        let pregunta = await swal({ title:f.nombre_user, text: lang.q_borrar,icon: "warning",buttons: [lang.cancelar, lang.borrar]});

        if(pregunta){
           
            let resp = await confirmPassword()
           if(resp.response==="ok"){
            let res = await Promise.all([APICALLER.delete({table: "users",id: ID,token: token_user}),APICALLER.delete({table:'permisos_users',namecolumns:`id_user_permiso`,ids:ID,token:token_user})]);
                if(res.response==="ok"){
                    swal({timer:1300,title:lang.borrado_correctamente,icon:"success"});
                    getLista();
                }
           }
           else{
            console.log(resp);
            return false;
           }
        }

    }

    const newUser = f=>{

    }

    const editUser = f=>{

    }

    const changePass = f=>{

    }

    const setPermision = f=>{

    }



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
        dialogs,setDialogs,cargas,lista,lang,deleteUser,newUser,editUser,changePass,setPermision,confirmPassword
    }
    return(
        <UsersContext.Provider value={values}>
            {children}
        </UsersContext.Provider>
    )
}
export function useUsers (){
    const {dialogs,setDialogs,cargas,lista,lang,deleteUser,newUser,editUser,changePass,setPermision,confirmPassword} = useContext(UsersContext);
    return {dialogs,setDialogs,cargas,lista,lang,deleteUser,newUser,editUser,changePass,setPermision,confirmPassword}
}
export default UsersProvider