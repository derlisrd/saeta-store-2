import {useState,useEffect,useContext,createContext,useCallback} from "react";
import swal from "sweetalert";
import { APICALLER } from "../../Services/api";
import { useLogin } from "../../Contexts/LoginProvider";
import { useLang } from "../../Contexts/LangProvider";

const Contexto = createContext();

const MedidasProvider = ({ children }) => {
  const { userData } = useLogin();
  const {lang} = useLang()
  const {token_user} = userData
  const [cargando, setCargando] = useState(true);
  const [lista, setLista] = useState([]);
  const [dialog, setDialog] = useState(false);
  const initialForm = {
    id_unidad_medida: "",
    descripcion_medida: "",
    simbolo_medida: "",
  };
  const [form, setForm] = useState(initialForm);

  const Clear = () => {
    setForm(initialForm);
  };

  const Guardar = async () => {
    const table = "unidad_medidas";
    const data = form;
    const token = token_user;
    if (form.id_unidad_medida === "") {
      delete form.id_unidad_medida;
      let res = await APICALLER.insert({ table, data, token });
      res.response 
        ? swal({ text: lang.agregado_correctamente, icon: "success", timer: 1800 })
        : console.log(res);
    } else {
      let res = await APICALLER.update({
        table,
        data,
        token,
        id: form.id_unidad_medida,
      });
      res.response 
        ? swal({
            text: lang.editado_correctamente,
            icon: "success",
            timer: 1800,
          })
        : console.log(res);
    }
    setForm(initialForm);
  };

  const getLista = useCallback(async () => {
    //setCargando(true)
    var res = await APICALLER.get({ table: "unidad_medidas" });
    res.response  ? setLista(res.results) : console.log(res);
    setCargando(false);
  }, []);

  useEffect(() => {
    let isActive = true;
    const ca = new AbortController();
    if (isActive) {
      getLista();
    }

    return () => {
      isActive = false;
      ca.abort();
    };
  }, [getLista]);
  return (
    <Contexto.Provider
      value={{
        cargando,
        setCargando,
        lista,
        setLista,
        form,
        setForm,
        Guardar,
        dialog,
        setDialog,
        Clear,lang
      }}
    >
      {children}
    </Contexto.Provider>
  );
};

export const useMedidas = () => {
  const {
    cargando,
    setCargando,
    lista,
    setLista,
    form,
    setForm,
    Guardar,
    dialog,
    setDialog,
    Clear,lang
  } = useContext(Contexto);
  return {
    cargando,
    setCargando,
    lista,
    setLista,
    form,
    setForm,
    Guardar,
    dialog,
    setDialog,
    Clear,lang
  };
};

export default MedidasProvider;
