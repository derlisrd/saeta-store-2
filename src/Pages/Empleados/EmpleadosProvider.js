import React,{createContext,useContext,useState,useEffect,useCallback} from 'react'
import { APICALLER } from '../../Services/api'
import {useLang} from '../../Contexts/LangProvider'

const Contexto = createContext()

const EmpleadosProvider = ({children}) => {

    const {lang} = useLang()
    const [loading,setLoading]= useState(true)
    const [lista,setLista] = useState([]);
    const [listaRols,setListaRols] = useState([]);
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
    }

    const [form,setForm] = useState(initialForm)

    const getLista = useCallback(async()=>{
        setLoading(true);
        const storage = JSON.parse(localStorage.getItem("facturasStorage"));
        let res = await Promise.all([APICALLER.get({table:"empleados"}),APICALLER.get({table:'empleados_rols'})])
        
        res[0].response  ? setLista(res[0].results) : console.log(res);
        res[1].response  ? setListaRols(res[1].results) : console.log(res);
        if(storage){
          let arr = {...storage}
          arr.listaVendedores = res[0].results;
          localStorage.setItem("facturasStorage",JSON.stringify(arr));
        }
        setLoading(false)
    },[])

    useEffect(() => {
        const ca = new AbortController();
        let isActive = true;
        if (isActive) {getLista()}
        return () => {isActive = false; ca.abort();};
      }, [getLista]);
  return (
    <Contexto.Provider value={{lang,lista,getLista,loading,dialogs,setDialogs,form,setForm,initialForm,listaRols  }}>
        {children}
    </Contexto.Provider>
  )
}

export const useEmpleados = ()=>{
    const {lang,lista,getLista,loading,dialogs,setDialogs,form,setForm,initialForm,listaRols} = useContext(Contexto);
    return {lang,lista,getLista,loading,dialogs,setDialogs,form,setForm,initialForm,listaRols};
}


export default EmpleadosProvider


