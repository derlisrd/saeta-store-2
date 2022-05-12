import { createContext, useCallback, useContext, useEffect, useState } from "react";
import swal from "sweetalert";
import { APICALLER } from "../../../Api/ApiCaller";
import { useLogin } from "../../../Contextos/LoginProvider";

const Context = createContext();

const MarcasProvider = ({ children }) => {
  const storage = JSON.parse(localStorage.getItem("dataProductos"));
  const {token_user} = useLogin();
  const [lista, setLista] = useState([]);
  const [cargando,setCargando] = useState(true)
  const initial = {id_marca:"",nombre_marca:"",}
  const [formulario,setFormulario] = useState(initial)
  const [openDialog,setOpenDialog]= useState(false)

  //setInterval(function () {console.log("hi")}, 8000);
  const enviarFormulario = async(e)=>{
    e.preventDefault()
    let msj = formulario.id_marca ? `Actualizado` : `Agregado` ;
    const table = "marcas";
    var res;
    setCargando(true)
    if(formulario.id_marca===""){
      delete formulario.id_marca;
      res = await APICALLER.insert({table,data:formulario, token: token_user});
      if(res.response==="ok"){
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
    res.response==="ok" ? swal({icon:"success",text:`${msj} correctamente`}) : console.log(res)
    getLista()
    setOpenDialog(false)
    setFormulario(initial);
    
  }

  const borrarRegistro = async(id,nombre="")=>{
    swal({icon:"info",text:`Desear borrar "${nombre}" ?`, title:`Borrar?`, buttons:['Cancelar','OK']}).then(
      async(e)=>{
        if(e){
          let res = await APICALLER.get({table:`productos`,where:`id_marca_producto,=,${id}`})
          if(res.response==="ok"){ 
            if(res.found>0) { swal({icon:`error`, text:`No se puede borrar porque hay productos que tiene esta marca`}) }
            else{
              let res = await APICALLER.delete({table:'marcas',id:id,token:token_user});
              res.response!=="ok" && console.log(res);
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
    <Context.Provider value={{ lista, setLista,cargando,setCargando,openDialog,setOpenDialog,formulario,setFormulario,enviarFormulario,borrarRegistro }}>{children}</Context.Provider>
  );
};

export const useMarcas = () => {
  const { lista, setLista,cargando,setCargando,openDialog,setOpenDialog,formulario,setFormulario,enviarFormulario,borrarRegistro } = useContext(Context);
  return { lista, setLista,cargando,setCargando,openDialog,setOpenDialog,formulario,setFormulario,enviarFormulario,borrarRegistro };
};

export default MarcasProvider;
