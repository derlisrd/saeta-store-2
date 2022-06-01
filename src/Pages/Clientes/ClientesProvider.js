import {createContext,useContext,useEffect,useState,useCallback,} from "react";
import { useLocation } from "react-router";
import swal from "sweetalert";
import { APICALLER } from "../../Services/api";
import { useLogin } from "../../Contexts/LoginProvider";
import { useLang } from "../../Contexts/LangProvider";

const ClientesContext = createContext();

const ClientesProvider = ({ children }) => {
  const { userData } = useLogin();

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
    if (res.results.length > 0 && res.response === "ok") {
      setLista(res.results);
    }
    setCargando(false);
  };

  const openEdit = f=>{
    setFormulario(f);
    setDialogs({...formulario,form:true})
  }

  const agregar = async()=>{
    setCargando({guardar:true})
    let f = {...formulario}
    delete f.id_cliente
    let res = await APICALLER.insert({
      table: "clientes",
      data: f,
      token: token_user,
    });
    res.response==='ok' ? swal({text:lang.agregado_correctamente,timer:1300,icon:"success"}) : console.log(res);
    setDialogs({form:false})
    getLista();
  }
  
  const editar = async()=>{
    setCargando({guardar:true})
    let res = await APICALLER.update({
      table: `clientes`,
      data: formulario,
      token: token_user,
      id: formulario.id_cliente,
    });
    res.response==='ok' ? swal({text:lang.actualizado_correctamente,timer:1300,icon:"success"}) : console.log(res);
    setDialogs({form:false})
    getLista();
  }

  const BorrarCliente = async (data) => {
    const {id, nombre} = data;
    swal({
      buttons: {
        cancel: lang.cancelar,
        confirm: lang.ok,
      },
      icon: "warning",
      text: `${lang.cliente}: ${nombre}. ${lang.warn_no_podra_recuperar}`,
      title: lang.q_desea_eliminar,
    }).then(async (e) => {
      if (e) {
        let res = await APICALLER.delete({
          table: `clientes`,
          id: id,
          token: token_user,
        });

        if (res.response === "ok") {
          //ListarDeNuevo();
          let array = [...lista];
          let index = lista.findIndex((e) => e.id_cliente === id);
          array.splice(index, 1);
          setLista(array);
          swal({
            icon: "success",
            text: lang.borrado_correctamente,
          });
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
    if (res.response === "ok") {
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
   
    if (isActive) {
      getLista();
    }
    return () => {
      isActive = false;
      ca.abort();
    };
  }, [getLista]);


  return (
    <ClientesContext.Provider
      value={{
        lista, dialogs,setDialogs,openEdit,
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
        BorrarCliente,countTotal,lang,editar,agregar
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};

export const useClientes = () => {
  const {
    lista, dialogs,setDialogs,openEdit,
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
    BorrarCliente,countTotal,lang,editar,agregar
  } = useContext(ClientesContext);
  return {
    lista, dialogs,setDialogs,openEdit,
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
    BorrarCliente,countTotal,lang,editar,agregar
  };
};

export default ClientesProvider;
