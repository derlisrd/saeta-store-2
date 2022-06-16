import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
import swal from "sweetalert";
import { APICALLER } from "../../Services/api";
import { useLogin } from "../../Contexts/LoginProvider";
import { funciones } from "../../Functions";
import { useLang } from "../../Contexts/LangProvider";
const Contexto = createContext();

const CuentasProvider = ({ children }) => {
  const {lang} = useLang()
  const {userData} = useLogin();
  const { id_user, token_user } = userData
  const [cargando, setCargando] = useState(true);
  const [cargandoMov,setCargandoMov] = useState(false)
  const [listaPagar, setListaPagar] = useState([]);
  const [listaCobrar, setListaCobrar] = useState([]);
  const [totalCobrar,setTotalCobrar] = useState(0);
  const [listaCajas, setListaCajas] = useState([]);
  const [formasDePago, setFormasDePago] = useState([]);
  
  const [loadings,setLoadings] = useState({
    lista:false,
    mov:false
  })
  const [listas,setListas] = useState({
    pagar:[],
    cobrar:[],
    cajas:[],
    formasPago:[],
    totalCobrar:0,
    totalPagar:0
  })

  const [dialogs, setDialogs] = useState({
    pagar: false,
    cobrar: false,
  });

  const [idCaja, setIdCaja] = useState("");
  const [idFormasPago, setIdFormasPago] = useState("");
  const [obs, setObs] = useState("");
  const fecha_actual = funciones.getFechaHorarioString();
  
  const [formPagar, setformPagar] = useState({id_compra:"",total_factura_compra:"",nro_factura_compra:""});
  const [formCobrar, setformCobrar] = useState({monto_total_factura:"",id_factura:"",nro_factura:"",nombre_caja:""});
  
  const cobrarCuenta = async(monto)=>{
    setCargandoMov(true)
    let indexCaja = listaCajas.findIndex(e => e.id_caja === idCaja);

    let montoNuevo = parseFloat(listaCajas[indexCaja].monto_caja) + parseFloat(formCobrar.monto_total_factura);
      let rescaja = await APICALLER.update({
        data: { monto_caja: montoNuevo, ult_mov_caja: fecha_actual },
        token: token_user,
        id: idCaja,
        table: "cajas",
      });
      rescaja.response !== "ok" ?? console.log(rescaja);
    
      let fact = await APICALLER.update({table:'facturas',data:{estado_factura:1},id:formCobrar.id_factura,token:token_user})
      fact.response!=="ok" ?? console.log(fact);

      let datosMov = {
        id_caja_movimiento:idCaja,
        id_user_movimiento:id_user,
        id_tipo_registro:2,
        monto_movimiento: idFormasPago==="1" ? formCobrar.monto_total_factura : 0,
        monto_sin_efectivo: idFormasPago!=="1" ? formCobrar.monto_total_factura : 0,
        detalles_movimiento: `Cobro de ventas a crédito factura nro: ${formCobrar.nro_factura}`,
        fecha_movimiento: fecha_actual
      }
  
      let mov = await APICALLER.insert({
        table:'cajas_movimientos',token:token_user,data:datosMov,
      })
      console.log(mov);
      mov.response!=="ok" ?? console.log(mov);
      setCargandoMov(false)
      swal({text:lang.borrado_correctamente,icon:'success',timer:1800});
      setDialogs({pagar: false,cobrar: false });
      getLista();
  }





  const pagarCuenta = async () => {
    setCargandoMov(true)

    let res = await APICALLER.update({
      table: "compras",
      token: token_user,
      data: { estado_compra: 1 },
      id: formPagar.id_compra,
    });
    res.response !== "ok" ?? console.log(res);

    let indexCaja = listaCajas.findIndex((e) => e.id_caja === idCaja);

    let montoNuevo =
      parseFloat(listaCajas[indexCaja].monto_caja) -
      parseFloat(formPagar.total_factura_compra);

    let rescaja = await APICALLER.update({
      data: { monto_caja: montoNuevo },
      token: token_user,
      id: idCaja,
      table: "cajas",
    });
    rescaja.response !== "ok" ?? console.log(rescaja);

    
    let datosMov = {
      id_caja_movimiento:idCaja,
      id_user_movimiento:id_user,
      id_tipo_registro:7,
      monto_movimiento: idFormasPago==="1" ? formPagar.total_factura_compra : 0,
      monto_sin_efectivo: idFormasPago!=="1" ? formPagar.total_factura_compra : 0,
      detalles_movimiento: `Pago de compras a crédito factura nro: ${formPagar.nro_factura_compra}`,
      fecha_movimiento: fecha_actual
    }

    let mov = await APICALLER.insert({
      table:'cajas_movimientos',token:token_user,data:datosMov,
    })
    mov.response!=="ok" ?? console.log(mov);
    setCargandoMov(false)
    swal({title:'Se ha pagado correctamente',icon:'success',timer:1800});
    setDialogs({pagar: false,cobrar: false });
    getLista();
  }





  const getLista = useCallback(async () => {

    let res = await Promise.all([APICALLER.get({
      table: "facturas",
      include: "clientes,cajas",
      on: "id_cliente,id_cliente_factura,id_caja,id_caja_factura",
      where: "tipo_factura,>,1,and,estado_factura,=,2",
    }),APICALLER.get({
      table: "compras",
      where: "tipo_factura_compra,=,2,and,estado_compra,=,2",
    }),APICALLER.get({
      table: "cajas", include:'cajas_users',on:'id_caja_caja,id_caja', where:`id_user_caja,=,${id_user},and,estado_caja,=,1`
    }),APICALLER.get({
      table: "facturas_formas_pagos",
    })]);
    let resCobrar = res[0];
    if(resCobrar.response === "ok"){
      setListaCobrar(res[0].results); let total=0;
      resCobrar.results.forEach(e => {
        total += parseFloat(e.monto_total_factura);
      });
      setTotalCobrar(total);
    }

    let resPagar=res[1];"ok"===resPagar.response?setListaPagar(resPagar.results):console.log(resPagar);
    let resCajas=res[2];"ok"===resCajas.response?setListaCajas(resCajas.results):console.log(resCajas);
    let resFormas=res[3];"ok"===resFormas.response?setFormasDePago(resFormas.results):console.log(resFormas);

    setCargando(false);
  }, [id_user]);



  useEffect(() => {
    let isActive = true;
    const ca = new AbortController();
    if(isActive){
      getLista();
    }
    return ()=> {
      isActive = false;
      ca.abort();
    }
  }, [getLista]);
  return (
    <Contexto.Provider
      value={{
        cargando,lang,
        setCargando,
        listaPagar,
        setListaPagar,
        listaCobrar,
        listaCajas,
        setListaCajas,
        setListaCobrar,
        dialogs,
        setDialogs,
        formPagar,
        setformPagar,
        formasDePago,
        setFormasDePago,
        idCaja,
        setIdCaja,
        idFormasPago,
        setIdFormasPago,
        obs,
        setObs,
        pagarCuenta,
        cargandoMov,setCargandoMov,
        formCobrar, setformCobrar,cobrarCuenta,
        totalCobrar,setTotalCobrar
      }}
    >
      {children}
    </Contexto.Provider>
  );
};

export const useCuentas = () => {
  const {
    cargando,lang,
    setCargando,
    listaPagar,
    setListaPagar,
    listaCobrar,
    listaCajas,
    setListaCajas,
    setListaCobrar,
    dialogs,
    setDialogs,
    formPagar,
    setformPagar,
    formasDePago,
    setFormasDePago,
    idCaja,
    setIdCaja,
    idFormasPago,
    setIdFormasPago,
    obs,
    setObs,
    pagarCuenta,
    cargandoMov,setCargandoMov,
    formCobrar, setformCobrar,cobrarCuenta,
    totalCobrar,setTotalCobrar
  } = useContext(Contexto);
  return {
    cargando,lang,
    setCargando,
    listaPagar,
    setListaPagar,
    listaCobrar,
    listaCajas,
    setListaCajas,
    setListaCobrar,
    dialogs,
    setDialogs,
    formPagar,
    setformPagar,
    formasDePago,
    setFormasDePago,
    idCaja,
    setIdCaja,
    idFormasPago,
    setIdFormasPago,
    obs,
    setObs,
    pagarCuenta,
    cargandoMov,setCargandoMov,
    formCobrar, setformCobrar,cobrarCuenta,
    totalCobrar,setTotalCobrar
  };
};

export default CuentasProvider;
