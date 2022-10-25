import { useState, useContext, createContext, useEffect, useCallback } from "react";
import swal from "sweetalert";
import { APICALLER } from "../../../Services/api";
import { useLogin } from "../../../Contexts/LoginProvider";
import { useLang } from "../../../Contexts/LangProvider";
const CategoriasContext = createContext();

const CategoriasProvider = ({ children }) => {
  const {lang} = useLang()
  const storage = JSON.parse(localStorage.getItem("dataProductos"));
  const initialListas = {
    padres:[],
    categorias:[]
  }
  const [listas,setListas] = useState(initialListas)
  const [limite,setLimite] = useState(30);
  const [countTotal,setCountTotal] = useState(0); 
  const [page,setPage] = useState(0);
  const {userData} = useLogin()
  const {token_user} = userData
  const [cargando, setCargando] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  
  const borrarRegistro = async(id,nombre)=>{
    swal({title:lang.q_borrar,text:nombre,icon:"warning",buttons:[lang.cancelar,lang.ok]}).then(
      async(e)=>{
        if(e){
          setCargando(true)

          let promise = await Promise.all([APICALLER.get({table:"productos",fields:"id_producto",where:`id_categoria_producto,=,${id}`}),APICALLER.get({table:`categorias`,field:`id_categoria`,where:`id_padre_categoria,=,${id}`})])
          let cons = promise[0] ;
          let resC = promise[1] ;
          if(cons.found>0 || resC.found >0){
            cons.response ? swal({icon:"error",title:lang.error,text:"No se puede borrar porque tiene productos/categorias en ella"}) : console.log(cons);
          }
          else{
            const res = await APICALLER.delete({table:"categorias",id:id,token:token_user})
            swal({icon:"success",text:"Borrado correctamente"})
            if(res.response){
              if(storage){
                let obj = {...storage}
                let index = obj.categorias.findIndex(e=> e.id_categoria=== id);
                obj.categorias.splice(index,1);
                localStorage.setItem("dataProductos",JSON.stringify(obj));
              }
              getLista()
            } 
          }
          setCargando(false)          
        }
      }
    )
  }

  const buscarRegistro = async (txt) => {
    console.log(txt);
  };

  const getLista = useCallback(async()=>{
      setCargando(true)
      Promise.all([APICALLER.get({
        table: "categorias",
        fields: "id_categoria,nombre_categoria,id_padre_categoria,tipo_categoria",pagenumber:page,pagesize:limite,
        sort:"-nombre_categoria"
      }),await APICALLER.get({
        table: "categorias",
        fields: "id_categoria,nombre_categoria,id_padre_categoria,tipo_categoria",
      })]).then(values=>{
        setListas({padres:values[1].results,categorias:values[0].results})
        setCountTotal(values[0].total)
        setCargando(false);
      })
      
  },[limite,page])



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
    <CategoriasContext.Provider
      value={{
        listas,lang,
        cargando,
        setCargando,
        buscarRegistro,
        openDialog,
        setOpenDialog,
        openDialogEdit, setOpenDialogEdit,
        borrarRegistro,limite,setLimite,page,setPage,
        countTotal,getLista
      }}
    >
      {children}
    </CategoriasContext.Provider>
  );
};

export const useCategorias = () => {
  const {
    listas,lang,
    cargando,
    setCargando,
    buscarRegistro,
    openDialog,
    setOpenDialog,
    openDialogEdit, setOpenDialogEdit,
    borrarRegistro,limite,setLimite,page,setPage,
    countTotal,getLista
  } = useContext(CategoriasContext);
  return {
    listas,lang,
    cargando,
    setCargando,
    buscarRegistro,
    openDialog,
    setOpenDialog,
    openDialogEdit, setOpenDialogEdit,
    borrarRegistro,limite,setLimite,page,setPage,
    countTotal,getLista
  };
};

export default CategoriasProvider;
