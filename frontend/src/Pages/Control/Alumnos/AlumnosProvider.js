import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { APICALLER } from '../../../Services/api';
import { Funciones } from '../../../Funciones/Funciones';
import { useLogin } from '../../../Contextos/LoginProvider';
import swal from 'sweetalert';

const AlumnosContext = createContext();

const AlumnosProvider = ({children}) => {
  const {token_user} = useLogin();
  const [cargando,setCargando] = useState(true);
  const [mensaje,setMensaje] = useState({error:false,mensaje:"",id:""})
  const [dialogs,setDialogs] = useState({form:false});
  const [lista,setLista] = useState([]);
  const today = Funciones.fechaActualYMD();
  const initialForm = {id_alumno:"",nombre_alumno:"",apellido_alumno:"",fecha_nacimiento:today,doc_alumno:""}
  const [form,setForm] = useState(initialForm)
  const getLista = useCallback(async()=>{
    setCargando(true);
    let res = await APICALLER.get({table:"alumnos"});
    res.response ? setLista(res.results) : console.log(res);
    setCargando(false)
  },[]);

  const Validar = ()=>{
    let f = {...form}
    if(f.doc_alumno===""){setMensaje({error:true,mensaje:"Complete el doc.",id:"doc"});return false;}
    if(f.nombre_alumno===""){setMensaje({error:true,mensaje:"Complete el nombre",id:"nombre"});return false;}
    if(f.apellido_alumno===""){setMensaje({error:true,mensaje:"Complete el apellido",id:"apellido"});return false;}
    setMensaje({error:false,mensaje:"",id:""});
    return true;
  }

  const Guardar = async()=>{
    let f = {...form}
    
    if(Validar){

      let get = await APICALLER.get({table:"alumnos",where:`doc_alumno,=,'${f.doc_alumno}'`})
      let res;
      let text;
      if(f.id_alumno===""){
        if(get.found>0){
          setMensaje({error:true,mensaje:"Ese documente ya existe.",id:"doc"})
          return false;
        }
        delete f.id_alumno;
        res = await APICALLER.insert({table:"alumnos",data:f,token:token_user});
        text ="Alumno ingresado correctamente";
      }
      else{
        if(get.found>1){
          setMensaje({error:true,mensaje:"Ese documente ya existe.",id:"doc"})
          return false;
        }
        res = await APICALLER.update({table:"alumnos",data:f,token:token_user,id:f.id_alumno});
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
    <AlumnosContext.Provider value={{ lista,cargando,form,setForm,dialogs,setDialogs,mensaje,setMensaje,Guardar,initialForm}}>
      {children}
    </AlumnosContext.Provider>
  )
}

export const useAlumnos = ()=>{
  const {cargando,lista,form,setForm,dialogs,setDialogs,mensaje,setMensaje,Guardar,initialForm} = useContext(AlumnosContext);
  return {cargando,lista,form,setForm,dialogs,setDialogs,mensaje,setMensaje,Guardar,initialForm}
}
export default AlumnosProvider
