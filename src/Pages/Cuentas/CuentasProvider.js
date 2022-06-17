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
  const [formasDePago, setFormasDePago] = useState([]);
  const [error,setError] = useState({
    error:false,
    errorMsj:"",
  })
  const [cargando, setCargando] = useState({lista:true,mov:false})
  const [listas,setListas] = useState({
    pagar:[],
    cobrar:[],
    cajas:[],
    formasPago:[],
    totalCobrar:0,
    totalPagar:0
  })

  const [dialogs, setDialogs] = useState({pagar: false,cobrar: false});

  const fecha_actual = funciones.getFechaHorarioString();
  
  const [formPagar, setformPagar] = useState({id_compra:"",total_factura_compra:"",nro_factura_compra:""});
  const [formCobrar, setformCobrar] = useState({tipo_factura:"",monto_total_factura:0,recibido_factura:"",id_factura:"",nro_factura:"",nombre_caja:"",id_caja_factura:"",id_factura_cliente:"",nombre_cliente:""});
  


  const cobrarCuenta = async(datos)=>{
    setCargando({lista:false,mov:true});
    
    //console.log(formCobrar,datos)
    
    let idcaja = formCobrar.id_caja_factura;
    let getcaja = await APICALLER.get({table:"cajas",where:`id_caja,=,${idcaja}`})
    if(getcaja.response==="ok" && getcaja.found>0){
     
      let datoscaja = getcaja.results[0];
      let montocobrado = parseFloat(datos.monto_cobrado);
      let montoacumulado = montocobrado + parseFloat(formCobrar.recibido_factura);
      let montonuevocaja = montocobrado + parseFloat(datoscaja.monto_caja);
      let montototalfactura = parseFloat(formCobrar.monto_total_factura);
      let estado = 2;  // 2 no pagado
      let detalles= `Cobro de ventas a crédito factura nro: ${formCobrar.nro_factura}`;
      let tipofactura = parseInt(formCobrar.tipo_factura)
      if(tipofactura===3){
        detalles = `Cobro de venta a cuota. Ref nro ${formCobrar.nro_factura}`
      }
      if(montototalfactura<=montoacumulado){estado = 1; }
      
      let datosMov = {
        id_caja_movimiento:idcaja,
        id_user_movimiento:id_user,
        id_tipo_registro:2,
        monto_movimiento: datos.id_forma_pago==="1" ? montocobrado : 0,
        monto_sin_efectivo: datos.id_forma_pago!=="1" ? montocobrado : 0,
        detalles_movimiento: detalles,
        fecha_movimiento: fecha_actual
      }
      
      Promise.all([
        await APICALLER.update({table:'facturas',data:{estado_factura:estado,recibido_factura:montoacumulado},id:formCobrar.id_factura,token:token_user}),
        await APICALLER.update({table: "cajas",data: { monto_caja: montonuevocaja, ult_mov_caja: fecha_actual },token: token_user,id:idcaja}),
        await APICALLER.insert({table:'cajas_movimientos',token:token_user,data:datosMov})
      ])
      
      setCargando({lista:false,mov:false});
      swal({text:lang.cobrado_correctamente,icon:'success',timer:1800});
      setDialogs({pagar: false,cobrar: false });
      getLista()

    }
    else{
      console.log(getcaja)
      setDialogs({pagar: false,cobrar: false });
      return false;
      
    }
    
  }





  const pagarCuenta = async (f) => {

    setCargando({lista:false,mov:true});
    let idcaja = f.id_caja;
    let getcaja = await APICALLER.get({table:"cajas",where:`id_caja,=,${idcaja},and,estado_caja,=,'open'`});

    
    if(getcaja.response==="ok" && getcaja.found>0){
      
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
        setDialogs({pagar: false,cobrar: false });
        getLista();
    }

  }





  const getLista = useCallback(async () => {

    let res = await Promise.all([
      APICALLER.get({table: "facturas",include: "clientes,cajas",on: "id_cliente,id_cliente_factura,id_caja,id_caja_factura",where: "tipo_factura,>,1,and,estado_factura,=,2"}),
      APICALLER.get({table: "compras",where: "tipo_factura_compra,=,2,and,estado_compra,=,2"}),
      APICALLER.get({table: "cajas", include:'cajas_users',on:'id_caja_caja,id_caja', where:`id_user_caja,=,${id_user},and,estado_caja,=,'open'`}),
      APICALLER.get({table: "facturas_formas_pagos"})
    ]);
    
    let resCobrar=res[0];
    let resPagar=res[1]; 
    let resCajas=res[2]; 
    let resFormas=res[3]; 

    if(resPagar.response==='ok' && resCajas.response==='ok' && resFormas.response==='ok'){
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
        lang,cargando,listas,error,
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
    lang,cargando,listas,error,
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
    lang,cargando,listas, error,
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
