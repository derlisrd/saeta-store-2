import { createContext, useCallback, useContext, useEffect, useState } from "react";
import swal from "sweetalert";
import { APICALLER } from "../../../Services/api";
import { useLogin } from "../../../Contexts/LoginProvider";
import {useLang} from "../../../Contexts/LangProvider"
const Context = createContext();

const MarcasProvider = ({ children }) => {
  const storage = JSON.parse(localStorage.getItem("dataProductos"));
  const {userData} = useLogin()
  const {token_user} = userData
  const {lang} = useLang()
  const [lista, setLista] = useState([]);
  const [cargando,setCargando] = useState(true)
  const initial = {id_marca:"",nombre_marca:"",}
  const [formulario,setFormulario] = useState(initial)
  const [openDialog,setOpenDialog]= useState(false)

  const enviarFormulario = async(e)=>{
    e.preventDefault()
    let msj = formulario.id_marca ? lang.agregado_correctamente : lang.actualizado_correctamente ;
    const table = "marcas";
    var res;
    setCargando(true)
    if(formulario.id_marca===""){
      delete formulario.id_marca;
      res = await APICALLER.insert({table,data:formulario, token: token_user});
      if(res.response){
        if(storage){
          let obj = {...storage}
          let newobj = {id_marca:res.last_id,nombre_marca:formulario.nombre_marca}
          obj.marcas.push(newobj);
          localStorage.setItem("dataProductos",JSON.stringify(obj));  
        }
      }
    }
    else{
      res = await APICALLER.update({table,data:formulario,token:token_user,id:formulario.id_marca});
      if(storage){
        let obj = {...storage}
        let index = obj.marcas.findIndex(e=> e.id_marca=== formulario.id_marca);
        obj.marcas[index].nombre_marca = formulario.nombre_marca;
        localStorage.setItem("dataProductos",JSON.stringify(obj));
      }
    }
    res.response ? swal({icon:"success",text:`${msj}`,timer:1300}) : console.log(res)
    getLista()
    setOpenDialog(false)
    setFormulario(initial);
    
  }

  const borrarRegistro = async(id,nombre="")=>{
    swal({icon:"info",text:`Desear borrar "${nombre}" ?`, title:`Borrar?`, buttons:['Cancelar','OK']}).then(
      async(e)=>{
        if(e){
          let res = await APICALLER.get({table:`productos`,where:`id_marca_producto,=,${id}`})
          if(res.response){ 
            if(res.found>0) { swal({icon:`error`, text:lang.no_se_puede_borrar}) }
            else{
              let res = await APICALLER.delete({table:'marcas',id:id,token:token_user});
              !res.response && console.log(res);
              let array = [...lista];
              let index = array.findIndex((e) => e.id_marca === id);
              array.splice(index, 1);
              if(storage){
                let obj = {...storage}
                obj.marcas.splice(index,1);
                localStorage.setItem("dataProductos",JSON.stringify(obj));
              }
              setLista(array);
              
            }
          }
          else{ console.log(res) }
          
        }
      }
    )
  }

  const getLista = useCallback( async()=>{
    let res = await APICALLER.get({table:`marcas`})
    res.response ? setLista(res.results) : console.log(res);
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
    <Context.Provider value={{lang, lista, setLista,cargando,setCargando,openDialog,setOpenDialog,formulario,setFormulario,enviarFormulario,borrarRegistro }}>{children}</Context.Provider>
  );
};

export const useMarcas = () => {
  const {lang, lista, setLista,cargando,setCargando,openDialog,setOpenDialog,formulario,setFormulario,enviarFormulario,borrarRegistro } = useContext(Context);
  return { lang,lista, setLista,cargando,setCargando,openDialog,setOpenDialog,formulario,setFormulario,enviarFormulario,borrarRegistro };
};

export default MarcasProvider;
