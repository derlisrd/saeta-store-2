import {useState,useEffect,useContext,createContext,useCallback} from "react";
import swal from "sweetalert";
//import { useLocation } from "react-router-dom";
import { APICALLER } from "../../Services/api";
import { useLogin } from "../../Contexts/LoginProvider";
import { funciones } from "../../Functions";
import { useLang } from "../../Contexts/LangProvider";
const Contexto = createContext();

const CuentasProvider = ({ children }) => {
  const {lang} = useLang()
  const {userData} = useLogin();
  const { id_user, token_user } = userData
  const [formasDePago, setFormasDePago] = useState([]);
  const [error,setError] = useState({error:false,errorMsj:""})
  const [cargando, setCargando] = useState({lista:true,mov:false})
  const [listas,setListas] = useState({
    pagar:[],
    cobrar:[],
    cajas:[],
    monedas:[],
    formasPago:[],
    totalCobrar:0,
    totalPagar:0
  })

  const [dialogs, setDialogs] = useState({pagar: false,cobrar: false,detalles:false});
  const fecha_actual = funciones.getFechaHorarioString();
  const [formPagar, setformPagar] = useState({id_compra:"",total_factura_compra:"",nro_factura_compra:""});
  const [formCobrar, setformCobrar] = useState({id_moneda:"",tipo_factura:"",monto_total_factura:0,recibido_factura:"",id_moneda_caja:"",id_factura:"",nro_factura:"",nombre_caja:"",id_caja_factura:"",id_factura_cliente:"",nombre_cliente:""});
  /* const location = useLocation();
  const q = location.search ? new URLSearchParams(location.search) : 0;
  const [pageC, setPageC] = useState(q && q.get("pc") && !isNaN(q.get("pc")) ? parseInt(q.get("pc")) : 0);
  const [limite, setLimite] = useState(30); */

  const cobrarCuenta = async(datos)=>{
    

    let monto_cobrado = parseFloat(datos.monto_cobrado),
     id_forma_pago = parseInt(datos.id_forma_pago),
     obs = datos.obs,
     id_cajas_moneda = datos.id_cajas_moneda,
     cajas_monedas = [...listas.monedas],
     idcaja = formCobrar.id_caja,
     monto_total_factura = parseFloat(formCobrar.monto_total_factura)
     ;
     
     // efectivo
     
      let newrecibido_factura = parseFloat(formCobrar.recibido_factura) + monto_cobrado;
      let foundMonedaIndex = listas.monedas.findIndex(e=> e.id_cajas_moneda === id_cajas_moneda);
      let id_moneda_caja = cajas_monedas[foundMonedaIndex].id_moneda;
      let montoActual = parseFloat(cajas_monedas[foundMonedaIndex].monto_caja_moneda),
      montoActualNoEfectivo = parseFloat(cajas_monedas[foundMonedaIndex].monto_no_efectivo);
      
      let montoNuevo = id_forma_pago===1 ?  (monto_cobrado + montoActual) : montoActual,
       monto_no_efectivo = id_forma_pago!==1 ? (monto_cobrado + montoActualNoEfectivo) : montoActualNoEfectivo;

      let dataCajaMoneda = {monto_caja_moneda: montoNuevo,monto_no_efectivo}
      let dataCajaMovimiento = {
        id_caja_movimiento:idcaja,
        id_user_movimiento:id_user,
        id_moneda_movimiento: id_moneda_caja,
        id_tipo_registro:2, 
        monto_movimiento: id_forma_pago===1 ? monto_cobrado : 0,
        monto_sin_efectivo: id_forma_pago!==1 ? monto_cobrado : 0,
        detalles_movimiento: obs,
        fecha_movimiento: fecha_actual
      }
      let dataFactura = {
        recibido_factura: newrecibido_factura,
        estado_factura: newrecibido_factura >= monto_total_factura   ? 1 :  2 
      }

      
      setCargando({lista:false,mov:true}); 
      
       await Promise.all([
        APICALLER.update({table:'facturas',data:dataFactura,id:formCobrar.id_factura,token:token_user}),
        APICALLER.update({table:'cajas_monedas',data:dataCajaMoneda ,token: token_user,id:id_cajas_moneda}),
        APICALLER.insert({table:'cajas_movimientos',token:token_user,data:dataCajaMovimiento})
      ]) 
      setCargando({lista:false,mov:false});
      swal({text:lang.cobrado_correctamente,icon:'success',timer:1800});
      setDialogs({pagar: false,cobrar: false,detalles:false });
      getLista() 


  }





  const pagarCuenta = async (f) => {
    setCargando({lista:false,mov:true});
    let idcaja = f.id_caja;
    let getcaja = await APICALLER.get({table:"cajas",where:`id_caja,=,${idcaja},and,estado_caja,=,'open'`});
    if(getcaja.response && getcaja.found>0){
      let montopagado = parseFloat(formPagar.total_factura_compra);
      let montoactualencaja = parseFloat(getcaja.results[0].monto_caja);
      let montodescontado = montoactualencaja - montoactualencaja;
      if(montodescontado<0)
      {
        setCargando({lista:false,mov:false});
        setError({error:true,errorMsj:"No hay suficiente fondos"})
        return false;
      }
      setError({error:false,errorMsj:null})

      let datosMov = {
        id_caja_movimiento:idcaja,
        id_user_movimiento:id_user,
        id_tipo_registro:7,
        monto_movimiento: montopagado,
        monto_sin_efectivo: 0,
        detalles_movimiento: `Pago de compras a crédito factura nro: ${formPagar.nro_factura_compra}`,
        fecha_movimiento: fecha_actual
      }
      let datosCaja = {
        ult_mov_caja: fecha_actual,
        monto_caja:montodescontado,
      }
      
        Promise.all([
          APICALLER.update({table: "cajas",data: datosCaja,token: token_user,id: idcaja}),
          APICALLER.update({table: "compras",data: { estado_compra: 1 },token: token_user,id: formPagar.id_compra}),
          APICALLER.insert({table:'cajas_movimientos',token:token_user,data:datosMov})
        ])
        setCargando({lista:false,mov:false});
        swal({title:lang.pagado_correctamente,icon:'success',timer:1800});
        setDialogs({pagar: false,cobrar: false,detalles:false });
        getLista();
    }

  }



  const getbuscarCobrar = async(f)=>{
    setCargando({lista:true,mov:false});
    let res = await APICALLER.get({
      table: "facturas",include:"clientes,cajas",on: "id_cliente,id_cliente_factura,id_caja,id_caja_factura",where: "tipo_factura,>,1,and,estado_factura,=,2",
      filtersField:"nombre_cliente,ruc_cliente",
      filtersSearch:`${f}`,
      })
    if(res.response){
      let totalaCobrar=0, totalrecibido = 0, montototal = 0;
      res.results.forEach(e => {
        totalrecibido += parseFloat(e.recibido_factura)
        montototal +=parseFloat(e.monto_total_factura)
      });
      totalaCobrar = montototal - totalrecibido;
      setListas({...listas,cobrar:res.results,totalCobrar:totalaCobrar})
    }
    setCargando({lista:false,mov:false});
  }



  const getLista = useCallback(async () => {

    let [resCobrar,resPagar,resCajas,resFormas,resMonedas] = await Promise.all([
      APICALLER.get({table: "facturas",include: "clientes,cajas,monedas,cajas_users",
      on: "id_caja,id_caja_caja,id_cliente,id_cliente_factura,id_caja,id_caja_factura,id_moneda,id_moneda_factura",
      where: `estado_factura,=,2`,
      fields:"id_factura,id_cliente,nombre_cliente,nro_factura,ruc_cliente,monto_total_factura,recibido_factura,nombre_caja,abreviatura_moneda,id_user_caja,id_moneda,id_caja,tipo_factura,estado_factura"}),
      APICALLER.get({table: "compras",where: "tipo_factura_compra,=,2,and,estado_compra,=,2"}),
      APICALLER.get({table: "cajas", include:'cajas_users',on:'id_caja_caja,id_caja', where:`id_user_caja,=,${id_user},and,estado_caja,=,'open'`}),
      APICALLER.get({table: "facturas_formas_pagos"}),
      APICALLER.get({table:"cajas_monedas",include:"monedas",
      on:"id_moneda_caja_moneda,id_moneda",
      fields:"id_moneda,nombre_moneda,id_cajas_moneda,id_caja_moneda,abreviatura_moneda,monto_caja_moneda,monto_no_efectivo,valor_moneda"}) 
    ]);
    /* APICALLER.get({table:"cajas",include:"cajas_monedas,monedas,cajas_users",
      on:"id_caja,id_caja_moneda,id_moneda,id_moneda_caja_moneda,id_caja,id_caja_caja",where:`id_user_caja,=,${id_user},and,estado_caja,=,'open'`,
      fields:"id_moneda,nombre_moneda,id_cajas_moneda,id_caja_moneda,abreviatura_moneda,monto_caja_moneda,monto_no_efectivo"}) */

    if(resPagar.response && resCajas.response && resFormas.response){
      let totalaCobrar=0, totalrecibido = 0, montototal = 0;
      resCobrar.results.forEach(e => {
        totalrecibido += parseFloat(e.recibido_factura)
        montototal +=parseFloat(e.monto_total_factura)
      });
      totalaCobrar = montototal - totalrecibido;
      
      setListas({
      pagar:resPagar.results,
      cobrar:resCobrar.results,
      cajas:resCajas.results,
      formasPago:resFormas.results,
      totalCobrar:totalaCobrar,
      monedas:resMonedas.results,
      totalPagar:0
      })
    }
    setCargando({lista:false,mov:false});
  }, [id_user]);


  useEffect(() => {
    let isActive = true;
    const ca = new AbortController();
    if(isActive){getLista();}
    return ()=> {isActive = false;ca.abort();}
  }, [getLista]);

  return (
    <Contexto.Provider
      value={{
        lang,cargando,listas,error,getbuscarCobrar,
        dialogs,
        setDialogs,
        formPagar,
        setformPagar,
        formasDePago,
        setFormasDePago,
        pagarCuenta,
        formCobrar, setformCobrar,cobrarCuenta,funciones
      }}
    >
      {children}
    </Contexto.Provider>
  );
};

export const useCuentas = () => {
  const {
    lang,cargando,listas,error,getbuscarCobrar,
    dialogs,
    setDialogs,
    formPagar,
    setformPagar,
    formasDePago,
    setFormasDePago,
    pagarCuenta,
    formCobrar, setformCobrar,cobrarCuenta,funciones
  } = useContext(Contexto);
  return {
    lang,cargando,listas, error,getbuscarCobrar,
        dialogs,
        setDialogs,
        formPagar,
        setformPagar,
        formasDePago,
        setFormasDePago,
        pagarCuenta,
        formCobrar, setformCobrar,cobrarCuenta,funciones
  };
};

export default CuentasProvider;
