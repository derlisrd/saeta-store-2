import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import swal from "sweetalert";
import { APICALLER } from "../../Api/ApiCaller";
import { useLogin } from "../../Contextos/LoginProvider";

const Contexto = createContext();

const AgendaProvider = ({ children }) => {
  const [eventos, setEventos] = useState([]);
  const [lista,setLista] = useState([]);
  const {token_user} = useLogin();
  const initialForm = {
    descripcion_agenda: "",
    fecha_inicio_agenda: "",
    fecha_fin_agenda: "",
    horario_agenda: "12:00",
    color_agenda: "#0066cc",
  };

  const [form, setForm] = useState(initialForm);
  const initialCargas = {
    general: true,
  };
  const [loading, setLoading] = useState(initialCargas);

  const initialDialogs = {
    agregar: false,
    editar:false
  };

  const [dialogs, setDialogs] = useState(initialDialogs);




  const addEvent = useCallback(
    (date) => {
      setForm({descripcion_agenda: "",
      fecha_inicio_agenda: date,
      fecha_fin_agenda: date,
      horario_agenda: "12:00",
      color_agenda: "#0066cc"});
      setDialogs({ ...dialogs, agregar: true });
    },
    [dialogs]
  );


  const getEvents = useCallback(async () => {
    setLoading({ general: true });
    let res = await APICALLER.get({ table: "agendas" });
    if (res.response === "ok") {
      setLista(res.results);
      let nEvents = [];
      res.results.forEach((e) => {
        nEvents.push({
          id: e.id_agenda,
          title: e.descripcion_agenda,
          start: e.fecha_inicio_agenda + "T" + e.horario_agenda,
          end:e.fecha_fin_agenda,
          
          allDay: false,
          color: e.color_agenda,
        });
      });
      setEventos(nEvents);
    } else {
      console.log(res);
    }
    setLoading({ general: false });
  }, []);


  const updateAgenda = useCallback(async()=>{
    let res = await APICALLER.update({table:"agendas",data:form,token:token_user,id:form.id_agenda});
    if(res.response==="ok"){
      swal({text:'Reagendado correctamente', icon:'success',timer:1400});
      setDialogs({ ...dialogs, editar: false });
      setForm({descripcion_agenda: "",
      fecha_inicio_agenda: "",
      fecha_fin_agenda: "",
      horario_agenda: "12:00",
      color_agenda: "#0066cc"})
      getEvents();
    }
    else{
      console.log(res);
    }
  }, [form,token_user,getEvents,dialogs]);

  const borrarAgenda = useCallback(async ()=>{

    let res = await APICALLER.delete({table:'agendas',id:form.id_agenda,token:token_user});
    if(res.response==='ok'){
      swal({text:'Borrado correctamente', icon:'success',timer:1400});
      setDialogs({ ...dialogs, editar: false });
      setForm({descripcion_agenda: "",
      fecha_inicio_agenda: "",
      fecha_fin_agenda: "",
      horario_agenda: "12:00",
      color_agenda: "#0066cc"})
      getEvents();
    }else{
      console.log(res)
    }
  },[dialogs,form,getEvents,token_user] )


  const insertarAgendar = useCallback(async()=>{
    if(form.descripcion_agenda===""){
      return false;
    }
    let res = await APICALLER.insert({table:"agendas",data:form,token:token_user});
    if(res.response==="ok"){
      setDialogs({ ...dialogs, agregar: false });
      setForm({descripcion_agenda: "",
      fecha_inicio_agenda: "",
      fecha_fin_agenda: "",
      horario_agenda: "12:00",
      color_agenda: "#0066cc"})
      getEvents();

    }
    else{
      console.log(res)
    }
  
  },[dialogs,form,token_user,getEvents]);

  

  useEffect(() => {
    const ca = new AbortController();
    let isActive = true;
    if (isActive) {
      getEvents();
    }
    return () => {
      isActive = false;
      ca.abort();
    };
  }, [getEvents]);

  return (
    <Contexto.Provider
      value={{
        eventos,lista,
        addEvent,
        loading,
        form,
        setForm,
        initialForm,
        dialogs,
        setDialogs,
        insertarAgendar,updateAgenda,borrarAgenda
      }}
    >
      {children}
    </Contexto.Provider>
  );
};

export const useAgenda = () => {
  const {
    eventos,lista,
    addEvent,
    loading,
    form,
    setForm,
    initialForm,
    dialogs,
    setDialogs,
    insertarAgendar,updateAgenda,borrarAgenda
  } = useContext(Contexto);
  return {
    eventos,lista,
    addEvent,
    loading,
    form,
    setForm,
    initialForm,
    dialogs,
    setDialogs,
    insertarAgendar,updateAgenda,borrarAgenda
  };
};

export default AgendaProvider;
