import { createContext, useState,useContext, useEffect,useCallback } from 'react'
import swal from "sweetalert";
import { APICALLER } from "../../../Services/api";
import { useLogin } from "../../../Contexts/LoginProvider";
import {useLang} from "../../../Contexts/LangProvider"
const Contexto = createContext()

const ProveedoresProvider = ({children}) => {
  const storage = JSON.parse(localStorage.getItem("dataProductos"));
  const {lang} = useLang()
  const {userData} = useLogin()
  const {token_user} = userData
  const [lista, setLista] = useState([]);
  const [cargando,setCargando] = useState(true)
  const initial = {id_proveedor:"",nombre_proveedor:"",telefono_proveedor:"",ruc_proveedor:""}
  const [formulario,setFormulario] = useState(initial)
  const [openDialog,setOpenDialog]= useState(false)


  const enviarFormulario = async(e)=>{
    setCargando(true)
    e.preventDefault()
    let msj = formulario.id_proveedor==="" ? `Agregado` : `Actualizado` ;
    const table = "proveedors";
    var res;
    if(formulario.id_proveedor===""){
      delete formulario.id_proveedor;
      res = await APICALLER.insert({table,data:formulario, token: token_user});
      if(res.response==="ok"){
        if(storage){
          let obj = {...storage}
          let newobj = {id_proveedor:res.last_id,nombre_proveedor:formulario.nombre_proveedor}
          obj.proveedores.push(newobj);
          localStorage.setItem("dataProductos",JSON.stringify(obj));  
        }
      }
    }
    else{
      res = await APICALLER.update({table,data:formulario,token:token_user,id:formulario.id_proveedor});
      if(storage){
        let obj = {...storage}
        let index = obj.proveedores.findIndex(e=> e.id_proveedor=== formulario.id_proveedor);
        obj.proveedores[index].nombre_proveedor = formulario.nombre_proveedor;
        localStorage.setItem("dataProductos",JSON.stringify(obj));
      }
    }

    res.response==="ok" ? swal({icon:"success",text:`${msj} correctamente`}) : console.log(res)
    getLista()
    setOpenDialog(false)
    setFormulario(initial)
    setCargando(false)
    
  }

  const borrarRegistro = async(id,nombre="")=>{
    swal({icon:"info",text:`Desear borrar "${nombre}" ?`, title:`Borrar?`, buttons:['Cancelar','OK']}).then(
      async(e)=>{
        if(e){
          let res = await APICALLER.get({table:`productos`,where:`id_proveedor_producto,=,${id}`})
          if(res.response==="ok"){ 
            if(res.found>0) { swal({icon:`error`, text:`No se puede borrar porque hay productos que tiene este proveedor`}) }
            else{
              await APICALLER.delete({table:'proveedors',id:id,token:token_user});
              let array = [...lista];
              let index = array.findIndex((e) => e.id_proveedor === id);
              array.splice(index, 1);
              setLista(array);
              if(storage){
                let obj = {...storage}
                obj.proveedores.splice(index,1);
                localStorage.setItem("dataProductos",JSON.stringify(obj));
              }
            }
          }
          else{ console.log(res) }
          
        }
      }
    )
  }

  const getLista = useCallback( async()=>{
    let res = await APICALLER.get({table:`proveedors`})
    res.response==="ok" ? setLista(res.results) : console.log(res);
    setCargando(false)
  },[]);

  useEffect(() => {
    let isActive = true;
    const ca = new AbortController()
    if(isActive){
      getLista();
    }

    return () => {
      isActive = false;
      ca.abort();
    };
  }, [getLista]);
  return (
    <Contexto.Provider value={{lang,lista,setLista,cargando,formulario,setFormulario,openDialog,setOpenDialog,enviarFormulario,borrarRegistro}}>
      {children}
    </Contexto.Provider>
  )
}

export const useProveedores = ()=>{

  const {lang,lista,setLista,cargando,formulario,setFormulario,openDialog,setOpenDialog,enviarFormulario,borrarRegistro} = useContext(Contexto);
  return {lang,lista,setLista,cargando,formulario,setFormulario,openDialog,setOpenDialog,enviarFormulario,borrarRegistro}
}

export default ProveedoresProvider
