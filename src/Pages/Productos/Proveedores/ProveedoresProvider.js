import { createContext, useState,useContext, useEffect,useCallback } from 'react'
import swal from "sweetalert";
import { APICALLER } from "../../../Services/api";
import { useLogin } from "../../../Contexts/LoginProvider";
import {useLang} from "../../../Contexts/LangProvider"
import { useLocation } from 'react-router-dom';
const Contexto = createContext()

const ProveedoresProvider = ({children}) => {
  const storage = JSON.parse(localStorage.getItem("dataProductos"));


  const location = useLocation();
  const q = location.search ? new URLSearchParams(location.search) : 0;
  const [page, setPage] = useState(q && q.get("p") && !isNaN(q.get("p")) ? parseInt(q.get("p")) : 0);
  const [limite, setLimite] = useState(15);
  const [countTotal, setCountTotal] = useState(0);

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
    let msj = formulario.id_proveedor==="" ? lang.agregado_correctamente : lang.actualizado_correctamente ;
    const table = "proveedors";
    var res;
    if(formulario.id_proveedor===""){
      delete formulario.id_proveedor;
      res = await APICALLER.insert({table,data:formulario, token: token_user});
      if(res.response){
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

    res.response ? swal({icon:"success",text:msj}) : console.log(res)
    getLista()
    setOpenDialog(false)
    setFormulario(initial)
    setCargando(false)
    
  }

  const borrarRegistro = async(id,nombre)=>{
    swal({icon:"info", title:lang.q_borrar, text: nombre, buttons:[lang.cancelar,lang.ok]}).then(
      async(e)=>{
        if(e){
          let res = await APICALLER.get({table:`productos`,where:`id_proveedor_producto,=,${id}`})
          if(res.response){ 
            if(res.found>0) { swal({icon:`error`, text:lang.no_puede_borrar_productos}) }
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
              swal({text:lang.borrado_correctamente,timer:1200,icon:"success"});
            }
          }
          else{ console.log(res) }
          
        }
      }
    )
  }

  const getLista = useCallback( async()=>{
    let res = await APICALLER.get({table:`proveedors`,
    pagenumber: page,
    pagesize: limite,})
    
    
    if (res.response ) {
     setCountTotal(res.total);
     if (res.found > 0) {
       setLista(res.results);
     } 
   } else {
     console.log(res);
   }

   setCargando(false)
  },[page,limite]);

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
  const values = {setLimite,setPage,page,limite,countTotal,lang,lista,setLista,cargando,formulario,setFormulario,openDialog,setOpenDialog,enviarFormulario,borrarRegistro}
  return (
    <Contexto.Provider value={values}>
      {children}
    </Contexto.Provider>
  )
}

export const useProveedores = ()=>{

  const {setLimite,setPage,page,limite,countTotal,lang,lista,setLista,cargando,formulario,setFormulario,openDialog,setOpenDialog,enviarFormulario,borrarRegistro} = useContext(Contexto);
  return {setLimite,setPage,page,limite,countTotal,lang,lista,setLista,cargando,formulario,setFormulario,openDialog,setOpenDialog,enviarFormulario,borrarRegistro}
}

export default ProveedoresProvider
