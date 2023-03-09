import { createContext, useContext, useState,useEffect, useCallback } from "react";
import { APICALLER } from "../../../Services/api";
import { useLang } from "../../../Contexts/LangProvider";
const Contexto = createContext();

const RegistroMovimientosProvider = ({ children }) => {
  const {lang} = useLang()
  const [loading, setLoading] = useState(true);
  const [dialogs,setDialogs] = useState({agregar:false})
  const initialForm = {
    id_cajas_registro:"",
    descripcion_registro:"",
    tipo_registro:"0",
    show_registro:"1"
  }
  const [form,setForm]= useState(initialForm)
  const [lista,setLista]= useState([]);

  const getLista = useCallback( async()=>{
    let res = await APICALLER.get({table:'cajas_registros',where:`show_registro,=,1`});
    res.response ? setLista(res.results) : console.log(res);
    setLoading(false)
  },[]);

  useEffect(() => {
    const ca = new AbortController();
    let isActive = true;
    if (isActive) {
        getLista()
    }

    return () => {
      isActive = false;
      ca.abort();
    };
  }, [getLista]);

  return <Contexto.Provider value={{lang, loading,setLoading,lista,dialogs,setDialogs,form,setForm,initialForm,getLista }}>{children}</Contexto.Provider>;
};

export const useRegistroMovimientos = () => {
  const {lang,loading,setLoading,lista,dialogs,setDialogs,form,setForm,initialForm,getLista} = useContext(Contexto);
  return {lang,loading,setLoading,lista,dialogs,setDialogs,form,setForm,initialForm,getLista}
};

export default RegistroMovimientosProvider;
