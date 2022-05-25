import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { APICALLER } from "../../../Api/ApiCaller";
import { useLogin } from "../../../Contextos/LoginProvider";

const Contexto = createContext();

const SettingsProvider = ({ children }) => {
  const storage = JSON.parse(localStorage.getItem("dataEmpresa"));
  const { token_user } = useLogin();
  const [cargando, setCargando] = useState(true);

  const initialState = {
    id_empresa: "",
    nombre_empresa: "",
    propietario_empresa: "",
    ruc_empresa: "",
    telefono_empresa: "",
    direccion_empresa: "",
    licencia: "",
    categoria_empresa:""
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
        setSnack,
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
    setSnack,
  } = useContext(Contexto);
  return {
    cargando,
    setCargando,
    datosEmpresa,
    setDatosEmpresa,
    handleOnchange,
    Guardar,
    snack,
    setSnack,
  };
};

export default SettingsProvider;
