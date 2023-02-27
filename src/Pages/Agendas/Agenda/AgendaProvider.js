import {createContext,useState,useEffect,useContext,useCallback} from "react";
import swal from "sweetalert";
import { APICALLER } from "../../../Services/api";
import { useLogin } from "../../../Contexts/LoginProvider";
import { funciones } from "../../../Functions";
  
const Contexto = createContext();
  
const AgendaProvider = ({ children }) => {
    const [eventos, setEventos] = useState([]);
    const [lista,setLista] = useState([]);
    const [listaAgenda,setListaAgenda] = useState([]);
    const {userData} = useLogin();
    const {token_user,id_user} = userData;
    const initialCliente = {
      active:false,
      nombre:null,
      doc:null,
      id_cliente_agenda:null,
      telefono_cliente:""
    }
    const [cliente,setCliente] = useState(initialCliente);
    const initialForm = {
      id_user_agenda:id_user,
      id_cliente_agenda:"",
      descripcion_agenda: "",
      fecha_inicio_agenda: "",
      fecha_fin_agenda: "",
      horario_agenda: "12:00",
      color_agenda: "#0066cc",
      nombre_cliente:"",
      telefono_cliente:""
    };
    const [dates,setDates] = useState({
      fecha_inicio_agenda: "",
      fecha_fin_agenda: "",
    })
    const [form, setForm] = useState(initialForm);
    const initialCargas = {
      general: true,
      listado: true
    };
    const [loading, setLoading] = useState(initialCargas);
  
    const initialDialogs = {
      agregar: false,
      editar:false,
      buscarCliente:false,
      registrarCliente:false
    };
  
    const [dialogs, setDialogs] = useState(initialDialogs);
  


    const buscarRegistro = async(term)=>{
      setLoading({ general: true ,listado:true});
      let res = await APICALLER.get({ table: "agendas",include:'clientes',on:'id_cliente,id_cliente_agenda',
      fields:'nombre_cliente,id_agenda,descripcion_agenda,fecha_inicio_agenda,horario_agenda,fecha_fin_agenda,color_agenda,telefono_cliente',
      filtersField:"nombre_cliente,ruc_cliente",
      filtersSearch:`${term}`
    });
      if (res.response) {
        setListaAgenda(res.results)
      }
      else{
        console.log(res)
      }
      setLoading({ general:false,listado:false});
    }
  

    const getLista = useCallback( async(desde,hasta)=>{
      setLoading({ general: true ,listado:true});
      let res = await APICALLER.get({ table: "agendas",include:'clientes',on:'id_cliente,id_cliente_agenda',
      fields:'nombre_cliente,id_agenda,descripcion_agenda,fecha_inicio_agenda,horario_agenda,fecha_fin_agenda,color_agenda,telefono_cliente',
      where: `fecha_inicio_agenda,between,'${desde}',and,'${hasta}'`,
    });
      if (res.response) {
        setListaAgenda(res.results)
      }
      else{
        console.log(res)
      }
      setLoading({ general:false,listado:false});
    },[])
  
  
    const addEvent = useCallback(
      (f) => {
        let today = new Date();
        //let agenda = new Date(f);
        let spl= funciones.splitFecha(f)
        
        if(spl<today){
          swal({icon:"error",text:"No se puede agendar en el pasado"});
          return false;
        }
        setDates({
          fecha_inicio_agenda: f,
          fecha_fin_agenda: f,
        })
        setDialogs({ ...dialogs, agregar: true });
      },
      [dialogs]
    );
  
  
    const getEvents = useCallback(async () => {
      setLoading({ general: true ,listado:true});
      let res = await APICALLER.get({ table: "agendas",include:'clientes',on:'id_cliente,id_cliente_agenda',
      fields:'nombre_cliente,id_agenda,descripcion_agenda,fecha_inicio_agenda,horario_agenda,fecha_fin_agenda,color_agenda,telefono_cliente' });
      if (res.response) {
        setLista(res.results);
        setListaAgenda(res.results)
        let nEvents = [];
        res.results.forEach((e) => {
          nEvents.push({
            id: e.id_agenda,
            title: `${e.descripcion_agenda} ${e.nombre_cliente}`,
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
      setLoading({ general: false,listado:false });
    }, []);
  
  
    const updateAgenda = useCallback(async(form)=>{
      let res = await APICALLER.update({table:"agendas",data:form,token:token_user,id:form.id_agenda});
      if(res.response){
        swal({text:'Reagendado correctamente', icon:'success',timer:1400});
        setDialogs({ ...dialogs, editar: false });
        getEvents();
      }
      else{
        console.log(res);
      }
    }, [token_user,getEvents,dialogs]);



  
    const borrarAgenda = useCallback(async (form)=>{
     let res = await APICALLER.delete({table:'agendas',id:form.id_agenda,token:token_user});
      if(res.response){
        swal({text:'Borrado correctamente', icon:'success',timer:1400});
        setDialogs({ ...dialogs, editar: false });
        getEvents();
      }else{
        console.log(res)
      } 
    },[dialogs,getEvents,token_user] )
  


  
    const insertarAgendar = useCallback(async(form)=>{
      let f = { ...form}
      delete f.nombre_cliente
      delete f.telefono_cliente
      let res = await APICALLER.insert({table:"agendas",data:f,token:token_user});
      if(res.response){
        swal({text:"Agendado correctamente", icon:"success", timer:2000});
        setDialogs({ ...dialogs, agregar: false });
        getEvents();
      }
      else{
        console.log(res)
      }
    
    },[dialogs,token_user,getEvents]);
  
    
  
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
  
    const values = {
      eventos,lista,listaAgenda,
      addEvent,
      loading,
      form,setForm,
      cliente,setCliente,initialCliente,
      initialForm,
      dialogs,
      setDialogs,
      insertarAgendar,updateAgenda,borrarAgenda,
      dates,setDates,getLista,buscarRegistro
    }
    return <Contexto.Provider value={values}>{children}</Contexto.Provider>
  };
  
  export const useAgenda = () => {
    const {
      eventos,lista,listaAgenda,
      addEvent,
      loading,
      form,setForm,
      cliente,setCliente,initialCliente,
      initialForm,
      dialogs,
      setDialogs,
      insertarAgendar,updateAgenda,borrarAgenda,
      dates,setDates,getLista,buscarRegistro
    } = useContext(Contexto);
    return {
      eventos,lista,listaAgenda,
      addEvent,
      loading,
      form,setForm,
      cliente,setCliente,initialCliente,
      initialForm,
      dialogs,
      setDialogs,
      insertarAgendar,updateAgenda,borrarAgenda,
      dates,setDates,getLista,buscarRegistro
    };
  };
  
  export default AgendaProvider;