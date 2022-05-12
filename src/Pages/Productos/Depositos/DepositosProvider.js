import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
import swal from "sweetalert";
import { APICALLER } from "../../../Api/ApiCaller";
import { useLogin } from "../../../Contextos/LoginProvider";

const Contexto = createContext();

const DepositosProvider = ({ children }) => {

  const storage = JSON.parse(localStorage.getItem("dataProductos"));
  const table= 'depositos';
  const {token_user} = useLogin()
  const [cargando, setCargando] = useState(true);
  const [lista, setLista] = useState([]);

  const [dialogs, setDialogs] = useState({
    editar: false,
  });

  const initialForm = {
    id_deposito: "",
    nombre_deposito: "",
  };

  const [form, setForm] = useState(initialForm);
  

  const guardar =  async() => {
    delete form.id_deposito;
    setCargando(true);
    let res = await APICALLER.insert({table,data:form,token:token_user});
    if(res.response==="ok"){
      if(storage){
        let obj = {...storage}
        let newobj = {id_deposito:res.last_id,nombre_deposito:form.nombre_deposito}
        obj.depositos.push(newobj);
        localStorage.setItem("dataProductos",JSON.stringify(obj));  
      }
      getLista();
      swal({ text: "Agregado correctamente", icon: "success", timer: 1200 });    
    }
    else{
      console.log(res);
    }
  };

  const borrar = async (fila) => {
    
    swal({
      text: "Desea borrar este registro?",
      icon: "warning",
      buttons: ["Cancelar", "Borrar"],
    }).then( async(e) => {
      if (e) {
        let res = await APICALLER.delete({table,id:fila.id_deposito,token:token_user})
        if(res.response==="ok"){
            swal({ text: "Borrado correctamente", timer: 1800, icon: "success" });
            let array = [...lista];
            let index = array.findIndex((e) => e.id_deposito === fila.id_deposito);
            array.splice(index, 1);
            setLista(array);
            if(storage){
              let obj = {...storage}
              obj.depositos.splice(index,1);
              localStorage.setItem("dataProductos",JSON.stringify(obj));
            }
        }
      }
    });
  };

  const editar = async () => {
    setCargando(true);
    let res = await APICALLER.update({table,data:form,id:form.id_deposito,token:token_user});
    if(res.response==="ok"){
        swal({icon:'success',text:'Actualizado correctamente',timer:1200});
        getLista();
        if(storage){
          let obj = {...storage}
          let index = obj.depositos.findIndex(e=> e.id_deposito=== form.id_deposito);
          obj.depositos[index].nombre_deposito = form.nombre_deposito;
          localStorage.setItem("dataProductos",JSON.stringify(obj));
        }
    }
    else{
        console.log(res)
    }

  };

  const getLista = useCallback(async () => {
    let res = await APICALLER.get({ table,where:"tipo_deposito,=,1" });
    res.response === "ok" ? setLista(res.results) : console.log(res);
    setCargando(false);
  }, []);

  useEffect(() => {
    const nA = new AbortController()
    let isActive = true;

    if(isActive){
      getLista();
    }
    return ()=>{
      isActive = false;
      nA.abort();
    }
  }, [getLista]);

  return (
    <Contexto.Provider
      value={{
        cargando,
        setCargando,
        lista,
        setLista,
        editar,
        borrar,
        form,
        setForm,
        dialogs,
        setDialogs,
        guardar,
      }}
    >
      {children}
    </Contexto.Provider>
  );
};

export const useDepositos = () => {
  const {
    cargando,
    setCargando,
    lista,
    setLista,
    editar,
    borrar,
    form,
    setForm,
    dialogs,
    setDialogs,
    guardar,
  } = useContext(Contexto);
  return {
    cargando,
    setCargando,
    lista,
    setLista,
    editar,
    borrar,
    form,
    setForm,
    dialogs,
    setDialogs,
    guardar,
  };
};

export default DepositosProvider;
