import {createContext,useContext,useState,useEffect,useCallback,useMemo} from "react";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import { APICALLER } from "../../../Services/api";
import { useLogin } from "../../../Contexts/LoginProvider";
import { funciones  } from "../../../Functions";
import useGoto from "../../../Hooks/useGoto";
import { useLang } from "../../../Contexts/LangProvider";

const Contexto = createContext();

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const CajasProvider = ({ children }) => {
  const {lang} = useLang();
  const {userData,logOut} = useLogin()
  const {token_user,id_user} = userData;
  const navigate = useGoto();
  let query = useQuery();
  const dialogQuery = query.get("dialog") ? query.get("dialog") : "";
  const dialogID = query.get("id") ? query.get("id") : "";

  const [valoresMonedas,setValoresMonedas] = useState({})

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
    id_user_caja: "",
    nombre_caja: "",
    monto_cierre: "0",
    fecha_apertura: funciones.getFechaHorarioString(),
    fecha_creacion: funciones.getFechaHorarioString(),
    ult_mov_caja:funciones.getFechaHorarioString(),
    tipo_caja: "1",
    estado_caja: "open",
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



  const agregarCajaNueva = async (f,mon) => {

    setCargas({ ...cargas, nuevo: true });
    let tablecaja = { 
      nombre_caja:f.nombre_caja,
      fecha_apertura:f.fecha_apertura,
      fecha_creacion:f.fecha_creacion,
      ult_mov_caja: f.ult_mov_caja,
      estado_caja:f.estado_caja,
      tipo_caja:f.tipo_caja
     };

    let res = await APICALLER.insert({
      table: "cajas",
      data: tablecaja,
      token: token_user,
    });

    if (res.response === "ok") {
      let LASTIDCAJA = res.last_id;
      let IDUSER = f.id_user_caja;
      let cajaformusers = { id_user_caja: IDUSER, id_caja_caja: LASTIDCAJA };
      
      let cajamovimientosForm = {
        id_caja_movimiento: LASTIDCAJA,
        id_user_movimiento: id_user,
        id_tipo_registro: "3", // 3 ES APERTURA DE CAJA
        monto_movimiento: "0",
        monto_sin_efectivo: "0",
        detalles_movimiento: lang.creacion_apertura_caja,
        fecha_movimiento: f.fecha_apertura,
      }


      let promesas = [APICALLER.insert({
        table: "cajas_users",
        data: cajaformusers,
        token: token_user,
      }),APICALLER.insert({
        table: "cajas_movimientos",
        data: cajamovimientosForm,
        token: token_user,
      }),
      
    ]
      mon.forEach(elem => {
        let tablecajasmonedas = {
          id_moneda_caja_moneda: elem.id_moneda,
          id_caja_moneda: LASTIDCAJA,
          monto_caja_moneda:elem.monto_inicial_caja,
          monto_inicial_caja:elem.monto_inicial_caja,
          monto_cierre_caja:0,
          active_moneda_caja:elem.active_moneda_caja
        }
        promesas.push(APICALLER.insert({table:"cajas_monedas",token:token_user,data:tablecajasmonedas}))
      });
      let cajares = await Promise.all(promesas);
      
      
      if(cajares[0].response==="ok" && cajares[1].response==="ok"){
        swal({
          text: lang.agregado_habilitado_correctamente,
          timer: 1200,
          icon: "success",
        }).then(()=>{
          if(dialogQuery==="new"){
            navigate.to("ventas");
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



  const editarCaja = async (f) => {
    setCargas({ ...cargas, editar: true });

    let res = await APICALLER.update({
      table: "cajas",
      data: f,
      id: f.id_caja,
      token: token_user,
    });
    if (res.response === "ok") {
      swal({ text: lang.editado_correctamente, icon: "success", timer: 1200 });
      getLista(false);
      setDialogs({ ...dialogs, editar: false });
    }
    setCargas({ ...cargas, editar: false });
  };



  
  const transferir = async () => {
    setCargas({ ...cargas, transferencia: true });
    const found = lista.find(e => e.id_caja === formTransferencia.id_caja_transferencia);
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
        fecha_movimiento: funciones.getFechaHorarioString(),
        monto_movimiento: parseFloat(formTransferencia.monto_transferir),
        detalles_movimiento: `${lang.transferencia_de_caja} ${formTransferencia.nombre_caja} ${formTransferencia.id_caja} ${lang.a}: ${found.nombre_caja} ${found.id_caja} `,
      };
      let mov = await APICALLER.insert({
        table: "cajas_movimientos",
        data: datos,
        token: token_user,
      });
      if (tra.response === "ok" && mov.response === "ok") {
        swal({
          text: lang.transferido_correctamente,
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
     estado_caja : "open",
     fecha_apertura: funciones.getFechaHorarioString(),
     ult_mov_caja: funciones.getFechaHorarioString(), 
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
      fecha_arqueo:funciones.getFechaHorarioString()
    }
    let res = await Promise.all([
      APICALLER.update({table: "cajas",data: formCaja,id: IDCAJA,token: token_user}),
      APICALLER.insert({table: "cajas_movimientos",data: mov,token: token_user}), 
      APICALLER.insert({table:"cajas_arqueos",token:token_user,data:arqueo}) 
    ])
    
    if(res[1].response==='ok' && res[0].response==='ok'){
      swal({text: lang.caja_abierta_correctamente,icon: "success",}).then(()=>{
        if(dialogQuery==="open"){
          navigate.to("ventas");
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
          table: "cajas",include: "users,cajas_users",
          on: "id_user,id_user_caja,id_caja,id_caja_caja",
          fields:"nombre_caja,id_caja,estado_caja,nombre_user,fecha_apertura",
        }),
          APICALLER.get({table: "users",token: token_user,fields: "nombre_user,id_user"}),
          APICALLER.get({table: "monedas",fields: "nombre_moneda,id_moneda,abreviatura_moneda"}),
          APICALLER.get({table: "monedas_registros",include:"monedas",on:"id_moneda,id_moneda_registro" })  
        ]);
        let usersresponse = val[1];
        if(usersresponse.response==="ok"){
          setLista(val[0].results);
          setListaUsers(val[1].results);
          setListaMonedas(val[2].results)
          setListaRegistroMonedas(val[3].results) 
        }else{
          logOut()
        }
      setCargas({
        lista: false,
        editar: false,
        cerrar: false,
        abrir: false,
        nuevo: false,
      });
    },[token_user,logOut]);

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
        cargas,valoresMonedas,setValoresMonedas,
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
        funciones,
        agregarCajaNueva,
        editarCaja,
        aperturaCaja,
        errors,
        setErrors,
        transferir,
        totalSumaMonedasArqueo, setTotalSumaMonedasArqueo,
        datosCajaCierre,setDatosCajaCierre,arqueo,setArqueo,getLista,dialogQuery,dialogID,lang
      }}
    >
      {children}
    </Contexto.Provider>
  );
};

export const useCajas = () => {
  const {
    cargas,valoresMonedas,setValoresMonedas,
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
    funciones,
    agregarCajaNueva,
    editarCaja,
    aperturaCaja,
    errors,
    setErrors,
    transferir,
    totalSumaMonedasArqueo, setTotalSumaMonedasArqueo,
    datosCajaCierre,setDatosCajaCierre,arqueo,setArqueo,getLista,dialogQuery,dialogID,lang
  } = useContext(Contexto);
  return {
    cargas,valoresMonedas,setValoresMonedas,
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
    funciones,
    agregarCajaNueva,
    editarCaja,
    aperturaCaja,
    errors,
    setErrors,
    transferir,
    totalSumaMonedasArqueo, setTotalSumaMonedasArqueo,
    datosCajaCierre,setDatosCajaCierre,arqueo,setArqueo,getLista,dialogQuery,dialogID,lang
  };
};

export default CajasProvider;
