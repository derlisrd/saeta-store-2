import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import { useLogin } from '../../Contexts/LoginProvider';
import { APICALLER } from '../../Services/api';

const EmpleadosContext = createContext()

const EmpleadosProvider = ({children}) => {
  const {userData} = useLogin()
  const {token_user} = userData
  const [lista,setLista] = useState({
    empleados:[],
    rols:[],
    users:[]
  })
  const [isLoading,setIsLoading] = useState(true)
  const [dialogs,setDialogs] = useState({add:false,edit:false,delete:false})
  const [formSelect,setFormSelect] = useState({
    id_empleado:"",doc_empleado:"",telefono_empleado:"",nombre_empleado:"",salario_empleado:""
  })

  const llaveDialog = (name,bolean)=>{ setDialogs({...dialogs,[name]:bolean}) }

  const getLista = useCallback(async(searchTxt='')=>{
    setIsLoading(true)
    let [res,user,rols] = await Promise.all([APICALLER.get({
      table: "empleados",
      fields: 'id_empleado,doc_empleado,telefono_empleado,nombre_empleado,apellido_empleado,salario_empleado',
      filtersField:"nombre_empleado,doc_empleado",
      filtersSearch:`${searchTxt}`,
    }),
    APICALLER.get({table:'users',token:token_user,fields:'id_user,nombre_user'}),
    APICALLER.get({table:'empleados_rols',fields:'id_empleados_rol,descripcion_rol'})
  ])
    if(res.response){
      setLista({empleados:res.results,rols:rols.results,users:user.results})
    }else{ console.log(res);}
    setIsLoading(false)
  },[token_user])

  useEffect(() => {
    const ca = new AbortController(); let isActive = true;
    if (isActive) {getLista();}
    return () => {isActive = false; ca.abort();};
  }, [getLista]);

  const values = {lista,isLoading,llaveDialog,dialogs,getLista,formSelect,setFormSelect,token_user}
  return <EmpleadosContext.Provider value={values}>{children}</EmpleadosContext.Provider>
  
}

export function useEmpleados(){
  const {lista,isLoading,llaveDialog,dialogs,getLista,formSelect,setFormSelect,token_user} = useContext(EmpleadosContext)
  return {lista,isLoading,llaveDialog,dialogs,getLista,formSelect,setFormSelect,token_user}
}

export default EmpleadosProvider
