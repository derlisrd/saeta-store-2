import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { APICALLER } from '../../../Services/api';
//import { Funciones } from '../../../Funciones/Funciones';
import { useLogin } from '../../../Contextos/LoginProvider';
import swal from 'sweetalert';

const CuotasContext = createContext();

const CuotasProvider = ({children}) => {
  const {token_user} = useLogin();
  const [cargando,setCargando] = useState(true);
  const [mensaje,setMensaje] = useState({error:false,mensaje:"",id:""})
  const [dialogs,setDialogs] = useState({form:false});
  const [lista,setLista] = useState([]);
  const initialForm = {id_cuota:"",nombre_cuota:"",valor_cuota:""}
  const [form,setForm] = useState(initialForm)
  const getLista = useCallback(async()=>{
    setCargando(true);
    let res = await APICALLER.get({table:"cuotas"});
    res.response ? setLista(res.results) : console.log(res);
    setCargando(false)
  },[]);

  const Validar = ()=>{
    let f = {...form}
    if(f.nombre_cuota===""){setMensaje({error:true,mensaje:"Complete el nombre",id:"nombre"});return false;}
    if(f.valor_cuota===""){setMensaje({error:true,mensaje:"Complete el valor",id:"valor"});return false;}
    setMensaje({error:false,mensaje:"",id:""});
    return true;
  }

  const Guardar = async()=>{
    let f = {...form}
    if(Validar){
  let res;
      let text;
      if(f.id_cuota===""){
        delete f.id_cuota;
        res = await APICALLER.insert({table:"cuotas",data:f,token:token_user});
        text ="Cuota ingresada correctamente";
      }
      else{
        res = await APICALLER.update({table:"cuotas",data:f,token:token_user,id:f.id_cuota});
        text="Datos actualizados."
      }
      setDialogs({form:false});
      setForm(initialForm)
      if(res.response){
        swal({text,timer:1400,icon:"success"});
        getLista();
      }
    }
  }
  useEffect(() => {
    let isActive = true; const ca = new AbortController();
    if(isActive){
      getLista();
    }
    return ()=> {isActive = false;ca.abort();}
  }, [getLista]);
  return (
    <CuotasContext.Provider value={{ lista,cargando,form,setForm,dialogs,setDialogs,mensaje,setMensaje,Guardar,initialForm}}>
      {children}
    </CuotasContext.Provider>
  )
}

export const useCuotas = ()=>{
  const {cargando,lista,form,setForm,dialogs,setDialogs,mensaje,setMensaje,Guardar,initialForm} = useContext(CuotasContext);
  return {cargando,lista,form,setForm,dialogs,setDialogs,mensaje,setMensaje,Guardar,initialForm}
}
export default CuotasProvider
