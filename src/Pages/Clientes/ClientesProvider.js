import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useLocation } from "react-router";
import swal from "sweetalert";
import { APICALLER } from "../../Api/ApiCaller";
import { useLogin } from "../../Contextos/LoginProvider";
import { Funciones } from "../../Funciones/Funciones";

const ClientesContext = createContext();

const ClientesProvider = ({ children }) => {
  const { token_user } = useLogin();
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
  const [cargando, setCargando] = useState(true);
  const initialFormulario = {
    nombre_cliente: "",
    nro_cliente: "",
    ruc_cliente: "",
    email_cliente: "",
    direccion_cliente: "",
    tipo_cliente: 3,
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
      Funciones.goto(`/clientes`);
    }
    setCargando(false);
  };

  const BorrarCliente = async (id, nombre) => {
    swal({
      buttons: {
        cancel: "Cancelar",
        confirm: "Confirmar",
      },
      icon: "warning",
      text: `Cliente: ${nombre}`,
      title: `Eliminar este registro?`,
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
            text: "Eliminado correctamente",
          });
        }
      }
    });
  };



  const getLista = useCallback(async () => {
    setCargando(true);
    let data = {
      table: "clientes",
      fields: "id_cliente,nombre_cliente,ruc_cliente,telefono_cliente",
      orderBy: "-id_cliente",
    };
    let res = await APICALLER.get(data);
    if (res.response === "ok") {
      setLista(res.results);
      setCountTotal(res.total)
      
    } else {
      console.log(res);
    }
    setCargando(false);
  }, []);

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
        lista,
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
        BorrarCliente,countTotal
      }}
    >
      {children}
    </ClientesContext.Provider>
  );
};

export const useClientes = () => {
  const {
    lista,
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
    BorrarCliente,countTotal
  } = useContext(ClientesContext);
  return {
    lista,
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
    BorrarCliente,countTotal
  };
};

export default ClientesProvider;
