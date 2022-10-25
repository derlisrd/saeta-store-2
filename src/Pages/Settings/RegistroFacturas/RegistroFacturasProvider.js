import {createContext,useState,useCallback,useEffect,useContext} from "react";
import { APICALLER } from "../../../Services/api";
import {useLang} from "../../../Contexts/LangProvider";
import {useLogin} from "../../../Contexts/LoginProvider";
import swal from "sweetalert";

const RegistroContexto = createContext();

const RegistroFacturasProvider = ({ children }) => {
  const { userData } = useLogin();
  const {token_user} = userData
  const {lang} = useLang()
  const [openModal, setOpenModal] = useState(false);
  const [listaFacturas, setListaFacturas] = useState([]);
  const [listaCajas,setListaCajas]=useState([])
  const [cargando,setCargando] = useState({lista:true,save:false})

  const registrar = async(formulario)=>{
    setCargando({lista:true,save:true})
    let form = { ...formulario };
    form.last_nro_factura = formulario.nro_inicio_factura;
    localStorage.removeItem("facturasStorage");
    let res = await APICALLER.insert({
      table: "empresa_facturas",
      data: form,
      token: token_user,
    });
    if (res.response ) {
      getDatas();
      swal({icon:"success", text:lang.registrado_correctamente, timer:1200})
      localStorage.removeItem("facturasStorage");
      setOpenModal(false)
    } else {
      console.log(res);
    }
 
  }

  const getDatas = useCallback(async () => {
    let res = await Promise.all([APICALLER.get({table: "cajas",fields: "nombre_caja,id_caja"}),
    APICALLER.get({table: `empresas`,include:`empresa_facturas,cajas`,on: `id_empresa_empresa,id_empresa,id_caja,id_caja_empresa`})])
    
    let fac = res[1],
    caj = res[0];
    fac.response ? setListaFacturas(fac.results) : console.log(fac);
    caj.response ? setListaCajas(caj.results) : console.log(caj);
    setCargando({lista:false,save:false})
  }, []);

  useEffect(() => {
    let isActive = true;
    const ca = new AbortController();
    if (isActive) {
      getDatas();
    }

    return () => {
      isActive = false;
      ca.abort();
    };
    
  }, [getDatas]);

  return (
    <RegistroContexto.Provider
      value={{
        getDatas,listaCajas,registrar,
        listaFacturas,
        setListaFacturas,
        openModal,
        setOpenModal,cargando,setCargando,lang
      }}
    >
      {children}
    </RegistroContexto.Provider>
  );
};

export const useRegistroFacturas = () => {
  const { getDatas, listaFacturas,listaCajas,registrar, openModal, setOpenModal,cargando,setCargando,lang } =useContext(RegistroContexto);
  return { getDatas, listaFacturas,listaCajas,registrar, openModal, setOpenModal,cargando,setCargando,lang};
};

export default RegistroFacturasProvider;
