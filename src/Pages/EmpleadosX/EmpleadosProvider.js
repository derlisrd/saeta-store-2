import React,{createContext,useContext,useState,useEffect,useCallback} from 'react'
import { APICALLER } from '../../Services/api'
import {useLang} from '../../Contexts/LangProvider'
import { useLogin } from '../../Contexts/LoginProvider'

const Contexto = createContext()

const EmpleadosProvider = ({children}) => {

    const {lang} = useLang()
    const {userData} = useLogin()
    const {token_user} = userData
    const [loading,setLoading]= useState(true)
    const initialListas = {
      users:[],
      empleados:[],
      rols:[]
    }
    const [listas,setListas] = useState(initialListas)
    const [dialogs,setDialogs] = useState({
      agregar:false
    })

    const initialForm = {
      id_empleado:"",
      nombre_empleado:"",
      apellido_empleado:"",
      telefono_empleado:"",
      doc_empleado:"",
      id_rol:"0",
      salario_empleado:"",
      tipo_salario:"1",
      user_id:'0'
    }

    const [form,setForm] = useState(initialForm)

    const getLista = useCallback(async()=>{
        setLoading(true);
        const storage = JSON.parse(localStorage.getItem("facturasStorage"));
        let [emp,rol,user] = await Promise.all([
          APICALLER.get({table:"empleados",
          fields:'nombre_empleado,apellido_empleado,doc_empleado,id_empleado'}),
          APICALLER.get({table:'empleados_rols'}),
          APICALLER.get({table:'users',token:token_user,fields:'nombre_user,id_user'})
      ])
        //console.log(emp.results);
        if(emp.response && user.response){
          setListas({
            rols:rol.results,
            empleados:emp.results,
            users:user.results
          })
        }else{
          console.log(emp,rol,user)
        }
        
        if(storage){
          let arr = {...storage}
          arr.listaVendedores = emp.results;
          localStorage.setItem("facturasStorage",JSON.stringify(arr));
        }
        setLoading(false)
    },[token_user])

    useEffect(() => {
        const ca = new AbortController();
        let isActive = true;
        if (isActive) {getLista()}
        return () => {isActive = false; ca.abort();};
      }, [getLista]);
      
  const values = {lang,listas,getLista,loading,dialogs,setDialogs,form,setForm,initialForm  }

  return <Contexto.Provider value={values}>{children}</Contexto.Provider>
}

export const useEmpleados = ()=>{
    const {lang,listas,getLista,loading,dialogs,setDialogs,form,setForm,initialForm} = useContext(Contexto);
    return {lang,listas,getLista,loading,dialogs,setDialogs,form,setForm,initialForm};
}


export default EmpleadosProvider


