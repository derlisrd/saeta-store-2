import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { APICALLER } from "../../../Services/api";
import {useLang} from "../../../Contexts/LangProvider";
const Contexto = createContext();

const RegistroFacturasProvider = ({ children }) => {

  const {lang} = useLang()
  const [openModal, setOpenModal] = useState(false);
  const [listaFacturas, setListaFacturas] = useState([]);
  const [cargando,setCargando] = useState(true)
  
  let res = await APICALLER.get({
    table: "cajas",
    fields: "nombre_caja,id_caja",
  });

  if(res.response==="ok"){
    setListaCajas(res.results)
  }
  else{
    console.log(res)
  }

  const getFacturas = useCallback(async () => {

    let res = Promise.all()

    let fac = await APICALLER.get({
      table: `empresas`,include:`empresa_facturas,cajas`,
      on: `id_empresa_empresa,id_empresa,id_caja,id_caja_empresa`,
    });
    fac.response === "ok"
      ? fac.found > 0 && setListaFacturas(fac.results)
      : console.log(fac);
    setCargando(false)


  }, []);

  useEffect(() => {
    let isActive = true;
    const ca = new AbortController();
    if (isActive) {
      getFacturas();
    }

    return () => {
      isActive = false;
      ca.abort();
    };
    
  }, [getFacturas]);

  return (
    <Contexto.Provider
      value={{
        getFacturas,
        listaFacturas,
        setListaFacturas,
        openModal,
        setOpenModal,cargando,setCargando,lang
      }}
    >
      {children}
    </Contexto.Provider>
  );
};

export const useRegistroFacturas = () => {
  const { getFacturas, listaFacturas, openModal, setOpenModal,cargando,setCargando,lang } =
    useContext(Contexto);
  return { getFacturas, listaFacturas, openModal, setOpenModal,cargando,setCargando,lang};
};

export default RegistroFacturasProvider;
