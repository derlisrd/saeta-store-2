import {createContext,useContext,useEffect,useState,useCallback,} from "react";
import { useLocation } from "react-router";
import swal from "sweetalert";
import { APICALLER } from "../../Services/api";
import { useLogin } from "../../Contexts/LoginProvider";
import { useLang } from "../../Contexts/LangProvider";

const ClientesContext = createContext();

const ClientesProvider = ({ children }) => {
  const { userData } = useLogin();
  const [errors,setErrors] = useState({
    error:false,message:null,id:null
  })
  const [dialogs,setDialogs] = useState({form:false})

  const {lang} = useLang()
  const {token_user} = userData
  const location = useLocation();
  const query = location.search ? new URLSearchParams(location.search) : 0;
  const [page, setPage] = useState(
    query && query.get("p") && !isNaN(query.get("p"))
      ? parseInt(query.get("p"))
      : 0
  );
  
  const [limite, setLimite] = useState(30);
  const [countTotal, setCountTotal] = useState("0");
  const [lista, setLista] = useState([]);
  const [cargando, setCargando] = useState({guardar:false,lista:true});
  const initialFormulario = {
    id_cliente:null,
    nombre_cliente:"",
        ruc_cliente:"",
        tipo_cliente:"3",
        telefono_cliente:"",
        direccion_cliente:"",
        email_cliente:"",
  };
  const [formulario, setFormulario] = useState(initialFormulario);

  const buscarRegistro = async (txt) => {
    setCargando(true);
    let config = {
      tables: "clientes",
      where:`nombre_cliente,like,'%${txt}%'`,
      fields: "id_cliente,nombre_cliente,ruc_cliente,telefono_cliente",
    };
    let res = await APICALLER.get(config);
    setPage(0);
    if (res.results.length > 0 && res.response ) {
      setLista(res.results);
    }
    setCargando(false);
  };

  const openEdit = f=>{
    setErrors({error:false,message:null,id:null})
    setFormulario(f);
    setDialogs({form:true})
  }

  const openAgregar = ()=>{
    setErrors({error:false,message:null,id:null})
    setFormulario(initialFormulario);
    setDialogs({form:true})
  }
  
  const agregar = async(f)=>{
    setCargando({guardar:true})
    
    let resp = await APICALLER.get({table:"clientes",where:`ruc_cliente,=,'${f.ruc_cliente}'`});
    if(resp.found>0){
      setErrors({error:true,message:lang.cliente_existente_doc,id:"ruc"})
      setCargando({guardar:false})
      return false;
    }
    delete f.id_cliente
    if(f.nacimiento_cliente ===null) {
      delete f.nacimiento_cliente
    }
    let res = await APICALLER.insert({
      table: "clientes",
      data: f,
      token: token_user,
    });
    res.response ? swal({text:lang.agregado_correctamente,timer:1300,icon:"success"}) : console.log(res);
    setFormulario(initialFormulario)
    setDialogs({form:false})
    getLista();
  }
  
  const editar = async(f)=>{
    setCargando({guardar:true})
    let resp = await APICALLER.get({table:"clientes",where:`ruc_cliente,=,'${f.ruc_cliente}'`});
    if(resp.found>1){
      setErrors({error:true,message:lang.cliente_existente_doc,id:"ruc"})
      setCargando({guardar:false})
      return false;
    }
    let res = await APICALLER.update({
      table: `clientes`,
      data: f,
      token: token_user,
      id: f.id_cliente,
    });
    res.response ? swal({text:lang.actualizado_correctamente,timer:1300,icon:"success"}) : console.log(res);
    setDialogs({form:false})
    setFormulario(initialFormulario)
    getLista();
  }

  const BorrarCliente = async (data) => {
    const {id_cliente, nombre_cliente} = data;
    
    swal({
      buttons: {
        cancel: lang.cancelar,
        confirm: lang.ok,
      },
      icon: "warning",
      text: `${lang.cliente}: ${nombre_cliente}. ${lang.warn_no_podra_recuperar}`,
      title: lang.q_desea_eliminar,
    }).then(async (e) => {
      if (e) {
        let res = await APICALLER.delete({
          table: `clientes`,
          id: id_cliente,
          token: token_user,
        });

        if (res.response) {
          //ListarDeNuevo();
          let array = [...lista];
          let index = lista.findIndex((e) => e.id_cliente === id_cliente);
          array.splice(index, 1);
          setLista(array);
          swal({
            icon: "success",
            text: lang.borrado_correctamente,
          });
        }else{
          console.log(res);
        }
      }
    });
  };



  const getLista = useCallback(async () => {
    setCargando({guardar:false,lista:true});
    let data = {
      table: "clientes",
      fields: "*",
      orderBy: "-id_cliente",
      pagenumber: page,
      pagesize: limite,
    };
    let res = await APICALLER.get(data);
    if (res.response) {
      setLista(res.results);
      setCountTotal(res.total)
      
    } else {
      console.log(res);
    }
    setCargando({guardar:false,lista:false});
  }, [page,limite]);

  useEffect(() => {
    const ca = new AbortController();
    let isActive = true; 
    if (isActive) {getLista(); }
    return () => { isActive = false; ca.abort();};
  }, [getLista]);


  return (
    <ClientesContext.Provider
      value={{
        lista, dialogs,setDialogs,openEdit,openAgregar,
        setLista,
        cargando,
        setCargando,
        formulario,
        setFormulario,
        page,
        setPage,
        limite,
        setLimite,
        buscarRegistro,
        BorrarCliente,countTotal,lang,editar,agregar,errors
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};

export const useClientes = () => {
  const {
    lista, dialogs,setDialogs,openEdit,openAgregar,
    setLista,
    cargando,
    setCargando,
    formulario,
    setFormulario,
    page,
    setPage,
    limite,
    setLimite,
    buscarRegistro,
    BorrarCliente,countTotal,lang,editar,agregar,errors
  } = useContext(ClientesContext);
  return {
    lista, dialogs,setDialogs,openEdit,openAgregar,
    setLista,
    cargando,
    setCargando,
    formulario,
    setFormulario,
    page,
    setPage,
    limite,
    setLimite,
    buscarRegistro,
    BorrarCliente,countTotal,lang,editar,agregar,errors
  };
};

export default ClientesProvider;
