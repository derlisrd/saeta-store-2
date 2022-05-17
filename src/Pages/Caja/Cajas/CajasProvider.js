import {createContext,useContext,useState,useEffect,useCallback} from "react";
import { useLocation } from "react-router-dom";
import React from 'react';
import swal from "sweetalert";
import { APICALLER } from "../../../Services/api";
import { useLogin } from "../../../Contexts/LoginProvider";
import { funciones as Funciones } from "../../../Functions";

const Contexto = createContext();

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const CajasProvider = ({ children }) => {
  const {userData} = useLogin()
  const {token_user,id_user} = userData;
  let query = useQuery();
  const dialogQuery = query.get("dialog") ? query.get("dialog") : "";
  const dialogID = query.get("id") ? query.get("id") : "";

  

  const initialDialogs = {
    editar: false,
    abrir: dialogQuery==="open"? true: false,
    cerrar: false,
    nuevo: dialogQuery==="new"? true: false,
    transferencia: false,
    arqueo: false,
    arqueoFinal: false,
  };
  const [dialogs, setDialogs] = useState(initialDialogs);
  const initialErrors = {
    nuevo: false,
    nuevoMensaje: "",
    editar: false,
    editarMensaje: "",
    abrir: false,
    abrirMensaje: "",
    transferencia: false,
    transferenciaMensaje: "",
  };

  const [errors, setErrors] = useState(initialErrors);


  const initialCargas = {
    lista: true,
    editar: false,
    cerrar: false,
    abrir: false,
    nuevo: false,
    transferencia: false,
    arqueo: false,
    arqueoFinal: false,
  };
  const [cargas, setCargas] = useState(initialCargas);

  
  const [totalSumaMonedasArqueo, setTotalSumaMonedasArqueo] = useState(0);
  const [arqueo,setArqueo] = useState([]);

  const [lista, setLista] = useState([]);
  const [listaUsers, setListaUsers] = useState([]);
  const [listaMonedas, setListaMonedas] = useState([]);
  const [listaRegistrosMonedas, setListaRegistroMonedas] = useState([]);

  const [datosCajaCierre,setDatosCajaCierre] = useState({});

  const initialAbrir = {};
  const [formAbrir, setFormAbrir] = useState(initialAbrir);

  const initialFormNew = {
    id_moneda_caja: "",
    id_user_caja: "",
    nombre_caja: "",
    monto_inicial: "0",
    monto_cierre: "0",
    monto_caja: "0",
    fecha_apertura: Funciones.getFechaHorarioString(),
    fecha_creacion: Funciones.getFechaHorarioString(),
    ult_mov_caja:Funciones.getFechaHorarioString(),
    tipo_caja: "1",
    estado_caja: "1",
  };
  const [formNew, setFormNew] = useState(initialFormNew);

  const initialFormEdit = { id_caja: "", nombre_caja: "" };
  const [formEdit, setFormEdit] = useState(initialFormEdit);

  const initialTransferencia = {
    id_caja: "",
    id_caja_transferencia: "",
    nombre_caja: "",
    monto_transferir: "0",
    monto_caja: "",
    fecha_movimiento:"",
  };
  const [formTransferencia, setFormTransferencia] = useState(initialTransferencia);

  const agregarCajaNueva = async () => {
    setCargas({ ...cargas, nuevo: true });
    let formulario = { ...formNew };
    delete formulario.id_user_caja;
    formulario.monto_caja = formNew.monto_inicial;
    let res = await APICALLER.insert({
      table: "cajas",
      data: formulario,
      token: token_user,
    });

    if (res.response === "ok") {
      let LASTIDCAJA = res.last_id;
      let IDUSER = formNew.id_user_caja;
      let cajaformusers = { id_user_caja: IDUSER, id_caja_caja: LASTIDCAJA };

      let cajamovimientosForm = {
        id_caja_movimiento: LASTIDCAJA,
        id_user_movimiento: id_user,
        id_tipo_registro: "3", // 3 ES APERTURA DE CAJA
        monto_movimiento: formNew.monto_inicial,
        monto_sin_efectivo: "0",
        detalles_movimiento: "Creación, habilitación y apertura de caja",
        fecha_movimiento: formNew.fecha_apertura,
      }

      let arqueo = {
        id_caja_arqueo: LASTIDCAJA,
        id_user_arqueo:id_user,
        monto_arqueo: formNew.monto_inicial,
        tipo_arqueo:"1",
        fecha_arqueo:Funciones.getFechaHorarioString()
      }

      let cajares = await Promise.all([APICALLER.insert({
        table: "cajas_users",
        data: cajaformusers,
        token: token_user,
      }),APICALLER.insert({
        table: "cajas_movimientos",
        data: cajamovimientosForm,
        token: token_user,
      }),
      APICALLER.insert({table:"cajas_arqueos",token:token_user,data:arqueo}) 
    ]);
      
      
      if(cajares[0].response==="ok" && cajares[1].response==="ok"){
        swal({
          text: "Agregado y habilitado correctamente",
          timer: 1200,
          icon: "success",
        }).then(()=>{
          if(dialogQuery==="new"){
            Funciones.goto("ventas");
          }
          else{
            setDialogs({ ...dialogs, nuevo: false });
            getLista(false);
          }
        });
      }
      
    } else {
      console.log(res);
    }
    
    setCargas({ ...cargas, nuevo: false });
  };



  const editarCaja = async () => {
    setCargas({ ...cargas, editar: true });

    let res = await APICALLER.update({
      table: "cajas",
      data: formEdit,
      id: formEdit.id_caja,
      token: token_user,
    });
    if (res.response === "ok") {
      swal({ text: "Editado correctamente", icon: "success", timer: 1200 });
      getLista(false);
      setDialogs({ ...dialogs, editar: false });
    }
    setCargas({ ...cargas, editar: false });
  };



  
  const transferir = async () => {
    setCargas({ ...cargas, transferencia: true });
    const found = lista.find(
      (e) => e.id_caja === formTransferencia.id_caja_transferencia
    );
    let cajaPrincipal = {
      id_caja: formTransferencia.id_caja,
      monto_caja:
        parseFloat(formTransferencia.monto_caja) -
        parseFloat(formTransferencia.monto_transferir),
    };
    let cajaTransferir = {
      id_caja: formTransferencia.id_caja_transferencia,
      monto_caja:
        parseFloat(found.monto_caja) +
        parseFloat(formTransferencia.monto_transferir),
    };

    let res = await APICALLER.update({
      table: "cajas",
      data: cajaPrincipal,
      id: formTransferencia.id_caja,
      token: token_user,
    });
    if (res.response === "ok") {
      let tra = await APICALLER.update({
        table: "cajas",
        data: cajaTransferir,
        id: formTransferencia.id_caja_transferencia,
        token: token_user,
      });
      let datos = {
        id_caja_movimiento: formTransferencia.id_caja,
        id_user_movimiento: id_user,
        id_tipo_registro: "16",
        fecha_movimiento: Funciones.getFechaHorarioString(),
        monto_movimiento: parseFloat(formTransferencia.monto_transferir),
        detalles_movimiento: `Transferencia de caja ${formTransferencia.nombre_caja} ${formTransferencia.id_caja} a: ${found.nombre_caja} ${found.id_caja} `,
      };
      let mov = await APICALLER.insert({
        table: "cajas_movimientos",
        data: datos,
        token: token_user,
      });
      if (tra.response === "ok" && mov.response === "ok") {
        swal({
          text: "Transferido correctamente",
          icon: "success",
          timer: 1200,
        });
        getLista(false);
        setDialogs({ ...dialogs, transferencia: false });
      } else {
        console.log(tra, mov);
      }
    } else {
      console.log(res);
    }
    setCargas({ ...cargas, transferencia: false });
  };





  const aperturaCaja = async (f) => {
    setCargas({ ...cargas, abrir: true });
    const IDCAJA = dialogID==="" ? f.id_caja : dialogID;
    /*const listaCajas = [...lista];
     let filter = listaCajas.filter(e=> e.id_caja=== IDCAJA)
    let dataCaja = filter[0]; */
    let formCaja = {
     estado_caja : "1",
     fecha_apertura: Funciones.getFechaHorarioString(),
     ult_mov_caja: Funciones.getFechaHorarioString(), 
     monto_inicial: f.monto_inicial,
     monto_caja: f.monto_inicial
    }
    let mov = {
      id_caja_movimiento: IDCAJA,
      id_user_movimiento: id_user,
      id_tipo_registro: "3", // 3 ES APERTURA DE CAJA
      monto_movimiento: '0',
      monto_sin_efectivo: "0",
      detalles_movimiento: "Apertura de caja",
      fecha_movimiento: f.fecha_apertura,
    }
    let arqueo = {
      id_caja_arqueo: IDCAJA,
      monto_arqueo: f.monto_inicial,
      tipo_arqueo:"1",
      id_user_arqueo:id_user,
      fecha_arqueo:Funciones.getFechaHorarioString()
    }
    let res = await Promise.all([
      APICALLER.update({table: "cajas",data: formCaja,id: IDCAJA,token: token_user}),
      APICALLER.insert({table: "cajas_movimientos",data: mov,token: token_user}), 
      APICALLER.insert({table:"cajas_arqueos",token:token_user,data:arqueo}) 
    ])
    
    if(res[1].response==='ok' && res[0].response==='ok'){
      swal({text: "Caja abierta correctamente",icon: "success",timer: 1200,}).then(()=>{
        if(dialogQuery==="open"){
          Funciones.goto("ventas");
        }
        else{
          getLista(false); setDialogs({ ...dialogs, abrir: false });
        }
      })
    } else { console.log(res);}
    setCargas({ ...cargas, abrir: false });
  };




  const getLista = useCallback(async()=>{
    
      setCargas({ lista: true });
      
        let val = await Promise.all([APICALLER.get({
          table: "cajas",include: "users,monedas,cajas_users",
          on: "id_user,id_user_caja,id_moneda,id_moneda_caja,id_caja,id_caja_caja",
          fields:"nombre_caja,id_caja,estado_caja,nombre_user,monto_caja,monto_inicial,monto_cierre,nombre_moneda,abreviatura_moneda,fecha_apertura",
        }),
          APICALLER.get({table: "users",token: token_user,fields: "nombre_user,id_user"}),
          APICALLER.get({  table: "monedas",fields: "nombre_moneda,id_moneda,abreviatura_moneda"}),
          APICALLER.get({ table: "monedas_registros" })  
        ]);
        setLista(val[0].results);
        setListaUsers(val[1].results);
        setListaMonedas(val[2].results)
        setListaRegistroMonedas(val[3].results)
      
      setCargas({
        lista: false,
        editar: false,
        cerrar: false,
        abrir: false,
        nuevo: false,
      });
    },[token_user]);

  useEffect(() => {
    const ca = new AbortController(); let isActive = true;
    if (isActive) {
      getLista();
    }
    return () => {
      isActive = false; ca.abort();
    };
  }, [getLista]);

  return (
    <Contexto.Provider
      value={{
        cargas,
        lista,
        listaMonedas,
        listaUsers,
        listaRegistrosMonedas,
        formEdit,
        setFormEdit,
        dialogs,
        setDialogs,
        formNew,
        formAbrir,
        setFormAbrir,
        setFormNew,
        formTransferencia,
        setFormTransferencia,
        initialTransferencia,
        initialFormNew,
        Funciones,
        agregarCajaNueva,
        editarCaja,
        aperturaCaja,
        errors,
        setErrors,
        transferir,
        totalSumaMonedasArqueo, setTotalSumaMonedasArqueo,
        datosCajaCierre,setDatosCajaCierre,arqueo,setArqueo,getLista,dialogQuery,dialogID
      }}
    >
      {children}
    </Contexto.Provider>
  );
};

export const useCajas = () => {
  const {
    cargas,
    lista,
    listaMonedas,
    listaUsers,
    listaRegistrosMonedas,
    formEdit,
    setFormEdit,
    dialogs,
    setDialogs,
    formNew,
    formAbrir,
    setFormAbrir,
    setFormNew,
    formTransferencia,
    setFormTransferencia,
    initialTransferencia,
    initialFormNew,
    Funciones,
    agregarCajaNueva,
    editarCaja,
    aperturaCaja,
    errors,
    setErrors,
    transferir,
    totalSumaMonedasArqueo, setTotalSumaMonedasArqueo,
    datosCajaCierre,setDatosCajaCierre,arqueo,setArqueo,getLista,dialogQuery,dialogID
  } = useContext(Contexto);
  return {
    cargas,
    lista,
    listaMonedas,
    listaUsers,
    listaRegistrosMonedas,
    formEdit,
    setFormEdit,
    dialogs,
    setDialogs,
    formNew,
    formAbrir,
    setFormAbrir,
    setFormNew,
    formTransferencia,
    setFormTransferencia,
    initialTransferencia,
    initialFormNew,
    Funciones,
    agregarCajaNueva,
    editarCaja,
    aperturaCaja,
    errors,
    setErrors,
    transferir,
    totalSumaMonedasArqueo, setTotalSumaMonedasArqueo,
    datosCajaCierre,setDatosCajaCierre,arqueo,setArqueo,getLista,dialogQuery,dialogID
  };
};

export default CajasProvider;
