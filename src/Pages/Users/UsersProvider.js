import {createContext,useEffect,useState,useContext,useCallback} from "react";
import { useLogin } from "../../Contexts/LoginProvider";
import { APICALLER } from "../../Services/api";
import { useLang } from "../../Contexts/LangProvider";
import swal from "sweetalert";
const UsersContext = createContext();

function UsersProvider ({children}){
    const {userData/*, Descifrar */} = useLogin();
    const {lang} = useLang()
    const {token_user} = userData;
    const initialCargas = {lista:true,guardar:false,all:false}
    const initialForm = {id_user:"",nombre_user:"",username_user:"",email_user:"",rol_user:""}
    const [formulario,setFormulario] = useState(initialForm);
    const [cargas,setCargas]=useState(initialCargas);
    const [lista,setLista] = useState({
        users:[],
        rols:[],
        permisos:[]
    })
    const initialDialogs = { new:false,edit:false,permissions:false,pass:false}
    const [dialogs,setDialogs] = useState(initialDialogs);
    
    const existUser = async(f)=>{
        setCargas({lista:false,guardar:true})
        let res = await APICALLER.get({table:'users',token:token_user,where:`username_user,=,'${f.username_user}',or,email_user,=,'${f.email_user}'`});

        
         if(res.response){
            setCargas({lista:false,guardar:false})
            return res.found;
        } 

        // si existe returna mayor a cero
       
    }


    const confirmPassword = async({user="",pass=""}) => {

        let clave, users;
        if(user==="" && pass === ""){
            //users = Descifrar(userData.username_user);
            users = (userData.username_user);
            clave = await swal({
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
        }else{
            users = user;
            clave = pass;
        }

        return await APICALLER.confirmPassword({username_user: users,password_user:clave});
    } 
    

    const deleteUser = async(f)=>{
        
        let ID = parseInt(f.id_user)

        if(ID===parseInt(userData.id_user)){
            swal({text:lang.no_puede_eliminarte,icon:"error",timer:2000});
            return false;
        } 

        let pregunta = await swal({ title:f.nombre_user, text: lang.q_borrar,icon: "warning",buttons: [lang.cancelar, lang.borrar]});

        if(pregunta){
            let resp = await confirmPassword({})
            
           if(resp.response){
            setCargas({...cargas,all:true})
            let res = await Promise.all([APICALLER.delete({table: "users",id: ID,token: token_user}),APICALLER.delete({table:'permisos_users',namecolumns:`id_user_permiso`,ids:ID,token:token_user})]);
                if(res[0].response){
                    setCargas({...cargas,all:false})
                    swal({icon:'success',timer:2000,text:lang.borrado_correctamente});
                    getLista()
                }
           }
           else{
            setCargas({...cargas,all:false})
            swal({timer:1600,title:lang.error_pass,icon:"error"});
            console.log(resp);
            return false;
           }
        }

    }

    const newUser = async(f)=>{
        let resp = await confirmPassword({})
        
        
        setCargas({...cargas,all:true})

        if(resp.response){
            
            let res = await APICALLER.register({ datos:f });
            if(res.response){
                setCargas({...cargas,all:false})
                swal({icon:'success',timer:2000,text:lang.agregado_correctamente});
                getLista()
            }else { 
                console.log(res)
                setCargas({...cargas,all:false})
            }
        }
        else{
            console.log(resp)
            setCargas({...cargas,all:false})
            swal({text:lang.error_pass})
        }
    }



    const editUser = async(f)=>{
        setCargas({...cargas,all:true})
        
        
        let resp = await confirmPassword({})

        if(resp.response){
            
            let res = await APICALLER.update({ table:'users',token: token_user,data: f,id:f.id_user});
            if(res.response){
                setCargas({...cargas,all:false})
                swal({icon:'success',timer:2000,text:lang.actualizado_correctamente});
                setCargas({...cargas,all:false})
                getLista()
            }else { 
                console.log(res)
                setCargas({...cargas,all:false})
            }
        }
        else{
            setCargas({...cargas,all:false})
            swal({text:lang.error_pass})
        }
        
    }

    const changePass = async(f)=>{
        setCargas({...cargas,all:true})
        let user = formulario.username_user;
        let pass = f.password_old;
        let passnew = f.password_user;
        //console.log(f,formulario);
        let resp = await confirmPassword({user,pass})

        if(resp.response){
            let data = {password_user: passnew,id_user: formulario.id_user}
            let res = await APICALLER.updatePassword(data);
            if(res.response){
              swal({icon:"success",text:lang.long_contrasena_cambiado,timer:6000});
              setCargas({...cargas,all:false})
            }
        }
        else{
            setCargas({...cargas,all:false})
            swal({timer:1600,title:lang.error_pass,icon:"error"});
            console.log(resp);
            return false;
        }
        
    }



    const setearForm = (f,dial) =>{
        setFormulario({id_user:f.id_user,nombre_user:f.nombre_user,
        username_user:f.username_user,
        email_user:f.email_user,
        rol_user:f.rol_user})    
        setDialogs({...dialogs,[dial]:true});
    }


    const getLista = useCallback(async()=>{
        setCargas({lista:true,guardar:false,all:false})
        let promises = await Promise.all([
            APICALLER.get({table:"users",token:token_user}),
            APICALLER.get({table:'users_rols'}),
            APICALLER.get({table:`permisos`,sort:'-descripcion_permiso'})]);
        let user = promises[0];
        let rol = promises[1];
        let per = promises[2];
        if(user.response && rol.response){
            setLista({
                users:user.results,
                rols:rol.results,
                permisos:per.results
            })
        }
        setCargas({lista:false,guardar:false,all:false})
    },[token_user])


    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if(isActive){getLista();}
        return ()=>{isActive = false; ca.abort();}
    }, [getLista]);

    const values = {token_user,
        setearForm,formulario,dialogs,setDialogs,cargas,lista,lang,deleteUser,newUser,editUser,changePass,confirmPassword,existUser
    }
    return(
        <UsersContext.Provider value={values}>
            {children}
        </UsersContext.Provider>
    )
}
export function useUsers (){
    const {token_user,setearForm,formulario,dialogs,setDialogs,cargas,lista,lang,deleteUser,newUser,editUser,changePass,confirmPassword,existUser} = useContext(UsersContext);
    return {token_user,setearForm,formulario,dialogs,setDialogs,cargas,lista,lang,deleteUser,newUser,editUser,changePass,confirmPassword,existUser}
}
export default UsersProvider