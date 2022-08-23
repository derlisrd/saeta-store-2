import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { APICALLER } from "../../../Services/api";
import { useLogin } from "../../../Contexts/LoginProvider";
import { useLang } from "../../../Contexts/LangProvider";

const Contexto = createContext();

const SettingsProvider = ({ children }) => {
  const storage = JSON.parse(localStorage.getItem("dataEmpresa"));
  const { userData } = useLogin();
  const {token_user} = userData
  const {lang} = useLang()
  const [cargando, setCargando] = useState(true);

  const initialState = {
    id_empresa: "",
    nombre_empresa: "",
    propietario_empresa: "",
    ruc_empresa: "",
    telefono_empresa: "",
    direccion_empresa: "",
    licencia: "",
    categoria_empresa:"",
    logo_url_empresa:""
  };

  const [datosEmpresa, setDatosEmpresa] = useState(
    storage ? storage : initialState
  );

  const [snack, setSnack] = useState(false);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setDatosEmpresa({ ...datosEmpresa, [name]: value });
  };

  const Guardar = async () => {
    setCargando(true);
    let datas = {
      table: "empresas",
      data: datosEmpresa,
      token: token_user,
      id: datosEmpresa.id_empresa,
    };
    localStorage.setItem("dataEmpresa", JSON.stringify(datosEmpresa));
    const res = await APICALLER.update(datas);
    res.response === "ok" ? setSnack(true) : console.log(res);
    setCargando(false);
  };

  const getData = useCallback(async () => {
    if (localStorage.getItem("dataEmpresa") === null) {
      let res = await APICALLER.get({ table: "empresas" });
      if(res.response === "ok") {
       if(res.found > 0){
         setDatosEmpresa(res.results[0]);
         localStorage.setItem("dataEmpresa",JSON.stringify(res.results[0]))
       }
      }  
    }
    setCargando(false);
  }, []);

  useEffect(() => {
    let isActive = true;
    const ca = new AbortController();
    if (isActive) {
      getData();
    }

    return () => {
      isActive = false;
      ca.abort();
    };
  }, [getData]);

  return (
    <Contexto.Provider
      value={{
        cargando,
        setCargando,
        datosEmpresa,
        setDatosEmpresa,
        handleOnchange,
        Guardar,
        snack,
        setSnack,lang
      }}
    >
      {children}
    </Contexto.Provider>
  );
};

export const useSettings = () => {
  const {
    cargando,
    setCargando,
    datosEmpresa,
    setDatosEmpresa,
    handleOnchange,
    Guardar,
    snack,
    setSnack,lang
  } = useContext(Contexto);
  return {
    cargando,
    setCargando,
    datosEmpresa,
    setDatosEmpresa,
    handleOnchange,
    Guardar,
    snack,
    setSnack,lang
  };
};

export default SettingsProvider;
