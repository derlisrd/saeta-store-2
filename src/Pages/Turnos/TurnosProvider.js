import React, { createContext, useContext, useEffect, useState,useCallback } from "react";
import swal from "sweetalert";
import { APICALLER } from "../../Services/api";
import { useLogin } from "../../Contexts/LoginProvider";

const Contexto = createContext();

const TurnosProvider = ({ children }) => {
  const {userData} = useLogin();
  const {token_user} = userData
  const [lista, setLista] = useState([]);
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [listaServicios,setListaServicios] = useState([]);
  const initialCargas = {
    lista:true,
    servicios:true,
    editar:true,
    serviciosEdit:true,
  }
  const [cargando, setCargando] = useState(initialCargas);

  const initialForm = {
    id_cliente_turno: "",
    id_empleado_turno: "",
    servicios:[],
    nombre_cliente: "",
    nombre_empleado: "",
    nombre_producto: "",
    fecha_tomada: "",
    fecha_turno: "",
    horario_turno: "",
    estado_turno: "0",
  };
  const [form, setForm] = useState(initialForm);

  const initialFormEdit = {
    id_turno:"",
    id_cliente_turno: "",
    id_empleado_turno: "",
    servicios:[],
    nombre_cliente: "",
    nombre_empleado: "",
    nombre_producto: "",
    fecha_tomada: "",
    fecha_turno: "",
    horario_turno: "",
    estado_turno: "0",
  }
  const [formEdit,setFormEdit] = useState(initialFormEdit)
  const [dialogs, setDialogs] = useState({
    agregar: false,
    registrarCliente:false,
    editar:false,
  });

  const getEmpleados = useCallback(async()=>{
    let res= await APICALLER.get({table:"empleados"});
    res.response  ? setListaEmpleados(res.results) : console.log(res);
  },[])

  const getServicios = useCallback(async()=>{
    let res= await APICALLER.get({table:"productos",where:'tipo_producto,=,2',fields:"nombre_producto,id_producto"});
    res.response  ? setListaServicios(res.results) : console.log(res);
  },[]);


  const getServiciosEdit = async (f)=>{

    
    setCargando({...cargando,serviciosEdit:true});
    let fe = {...f}
  
    let res = await APICALLER.get({
      table: "turnos_servicios",
      include: "productos",
      on: "id_servicio_turno,id_producto",
      where:`id_turno_servicio,=,${f.id_turno}`
    });
    
    if(res.response){
      fe.servicios = res.results
    }else console.log(res);
    setFormEdit(fe);
    setCargando({...cargando,serviciosEdit:false});
  }

  const getLista = useCallback(async () => {
    let res = await APICALLER.get({
      table: "turnos",
      include: "clientes,empleados",
      on: "id_cliente,id_cliente_turno,id_empleado_turno,id_empleado",
      sort: "fecha_turno",
      where:"estado_turno,<>,2",
      fields:'nombre_cliente,fecha_tomada,fecha_turno,estado_turno,id_turno,id_cliente_turno,horario_turno,nombre_empleado,id_empleado_turno'
    });

    res.response  ? setLista(res.results) : console.log(res);
    setCargando({lista:false,servicios:true});
  },[])


  const AgregarTurno = async()=>{
    
    setCargando({...cargando,lista:true});
    setDialogs({ ...dialogs, agregar: false });
    let f = {...form};let fs = {...form};
    delete f.nombre_cliente;
    delete f.fecha_tomada;
    delete f.nombre_empleado;
    delete f.nombre_producto;
    delete f.servicios;
    
    let res = await APICALLER.insert({table:'turnos',data:f,token:token_user});
    if(res.response){
      fs.servicios.forEach(async(e)=>{
        await APICALLER.insert({table:"turnos_servicios",data:{id_turno_servicio:res.last_id,id_servicio_turno:e.id_producto},token:token_user });
      })
      getLista();
      swal({text:'Agregado correctamente',icon:'success',timer:1300});
    }else{
      console.log(res);
    } 
    setCargando({...cargando,lista:false}); 
  }


  const cambiarEstado = async()=>{
    setCargando({...cargando,serviciosEdit:true})
    setDialogs({ ...dialogs, editar: false });
    let f = {...formEdit}
    delete f.nombre_cliente;
    delete f.nombre_empleado;
    delete f.nombre_producto;
    delete f.servicios;
    let res = await APICALLER.update({ table:'turnos', data:f, id:f.id_turno, token:token_user})
    if(res.response){
      getLista();
      swal({text:'Actualizado',icon:'success',timer:1300});
    }else{
      console.log(res);
    }
    setCargando({...cargando,serviciosEdit:true})
  }


  useEffect(() => {
    let isActive = true;
    const ca = new AbortController();
    if (isActive) {
      getEmpleados();
      getLista();
      getServicios();
    }

    return () => {
      isActive = false;
      ca.abort();
    };
  }, [getEmpleados,getLista,getServicios]);

  return (
    <Contexto.Provider
      value={{
        lista, listaServicios,
        listaEmpleados,
        cargando,setCargando,
        getLista,
        dialogs,
        setDialogs,
        form,
        setForm,
        initialForm,formEdit,setFormEdit,initialFormEdit,
        cambiarEstado,AgregarTurno,getServiciosEdit
      }}
    >
      {children}
    </Contexto.Provider>
  );
};

export const useTurnos = () => {
  const {
    lista,
    listaEmpleados,
    listaServicios,
    cargando,setCargando,
    getLista,
    dialogs,
    setDialogs,
    form,
    setForm,
    initialForm,formEdit,setFormEdit,initialFormEdit,
    cambiarEstado,AgregarTurno,getServiciosEdit
  } = useContext(Contexto);

  return {
    lista,
    listaEmpleados,
    listaServicios,
    cargando,setCargando,
    getLista,
    dialogs,
    setDialogs,
    form,
    setForm,
    initialForm,formEdit,setFormEdit,initialFormEdit,
    cambiarEstado,AgregarTurno,getServiciosEdit
  };
};

export default TurnosProvider;
