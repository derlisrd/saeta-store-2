import {createContext,useContext,useEffect,useState,useRef,useCallback} from "react";
import swal from "sweetalert";
import { APICALLER } from "../../../Services/api";
import { useLogin } from "../../../Contexts/LoginProvider";
import {funciones as Funciones} from "../../../Functions";
import {useLang} from '../../../Contexts/LangProvider'
import { useNavigate } from "react-router-dom";
import { env } from "../../../App/Config/config";

const Contexto = createContext();


const VentasProvider = ({ children }) => {
  const navigate = useNavigate();
  /* VARIABLES CONSTANTES, ESTADOS E INPUT*************************/
  const inputCodigo = useRef(null);
  const inputCantidad = useRef(null);
  const cantidadRecibidaRef = useRef(null)
  const { userData } = useLogin();
  const {token_user, id_user,permisos} = userData;
  const {lang} = useLang();
  const storage = JSON.parse(localStorage.getItem("facturasStorage"));
  
  const initialErrors = {
    id_error:null,
    error:false,
    notFound: false,
    notFoundMensaje: "",
    cambioPrecio: false,
    cambioPrecioMensaje: "",
    cliente: false,
    clienteMensaje: "",
    color:"error",
    mensaje:"",
    factura: {
      error: false,
      errorMensaje: ""
    },
  };
  const [errors, setErrors] = useState(initialErrors);

  const initialCargas = {
    general: storage===null ? true : false,
    cargandoProducto: false,
    items:false,
    cargandoCliente: false,
    finalizarVenta: storage===null ? true : false,
  };
  const [cargas, setCargas] = useState(initialCargas);
  
  const initialDialogs={main:!0,nota:!1,buscarProducto:!1,cambiarPrecio:!1,buscarCliente:!1,registrarCliente:!1,finalizarVenta:!1,imprimirNotaPedido:!1,imprimirTicket:!1,imprimirFactura:!1,imprimirPresupuesto:!1,ayuda:!1,cambioCliente:!1,abrirCaja:!1,imagen:!1};
  const [dialogs, setDialogs] = useState(initialDialogs);
  const [IDNotaPedido,setIDNotaPedido] = useState("");
  const [indexFactura, setIndexFactura] = useState(storage ? storage.indexFactura : 0);
  const initialDatosFactura = {
    tipoCliente: "1",
    tipoFactura: "0",
    ordenCompra: "",
    id_caja: storage && storage.listaCajas.length===1 ? storage.listaCajas[0].id_caja : "",
    id_empleado: storage && storage.listaVendedores.length===1 ? storage.listaVendedores[0].id_empleado : "",
    obs_pago: "",
    id_formaPago: "1",
    formasPago:[],
    totalAbonado:0,
    cantidad_recibida: "",
    entregado_items: "1",
    retencion_iva_factura: "0",
    nro_factura:"0",
    fecha_factura: Funciones.getFechaActualString(),
    fecha_cobro_factura : Funciones.fechaActualYMD(),
    horario_factura: Funciones.getHorarioActualString(),
    valorMoneda:1, // valor de la moneda activa
  }
  const initialDatosCliente = {
    id_cliente: 1,
    nombre_cliente: "SIN NOMBRE",
    direccion_cliente:"",
    ruc_cliente: "0",
  }
  
  const initialFacturas = {
    facturas: [
      {
        itemsFactura: [],
        total: 0,
        depositoActivo:storage ? storage.facturas[indexFactura].depositoActivo : "",
        total_iva: 0,
        descuento:0,
        guardado: false,
        datosMoneda: {},
        datosFactura: initialDatosFactura,
        datosCliente: initialDatosCliente,
      },
    ],
    facturaActiva: false,
    listaFacturas: [],
    indexFactura: indexFactura,
    listaFormasPago: [],
    listaMonedas: [],
    monedasdecajas:[], 
    monedaActiva: {},
    depositoActivo:'',
    alldepositos:true,
    listaCajas: [],
    listaVendedores: [],
    listaDepositos:[],
  };


  const [datosFacturas, setDatosFacturas] = useState(storage ? storage : initialFacturas);
  const [indexPrecioCambiar, setIndexPrecioCambiar] = useState(-1);

  /*  FIN VARIABLES CONSTANTES Y ESTADOS*************************/



  /* FUNCIONES ***********************************************/
  //const cargarFactura = ()=>{}

  



  const verificarYEnviarFactura = async () => {
    let fa = { ...datosFacturas };
    let df = fa.facturas[indexFactura];
    
    setCargas({ ...cargas, finalizarVenta: true});
    setDialogs({...dialogs,finalizarVenta:false});
    var LASTNROFACTURA;
    var VALOR_MONEDA = parseFloat(df.datosMoneda.valor_moneda)
    var NOMBRE_MONEDA = df.datosMoneda.nombre_moneda;
    var DESCUENTO = df.descuento / VALOR_MONEDA;
    var IDCAJAFACTURACION = df.datosFactura.id_caja;
    var TOTAL_A_PAGAR = (df.total / VALOR_MONEDA) - (DESCUENTO);
    var FECHA_ACTUAL = Funciones.fechaActualYMD() +" "+ Funciones.getHorarioActualString();

    var getComprobantes =  await Promise.all([
      APICALLER.get({ table: "empresa_recibos" }),
      APICALLER.get({ table: "empresa_facturas",where: `id_caja_empresa,=,${IDCAJAFACTURACION}`})
    ])
    let nrorec = getComprobantes[0];
    let nrofac = getComprobantes[1];
    var tipoFactura = parseInt(df.datosFactura.tipoFactura)

    if (tipoFactura === 0 || tipoFactura===3) {
      
      if (nrorec.response  && nrorec.found>0) {
        LASTNROFACTURA = nrorec.results[0].last_nro_recibo;
        let idr = nrorec.results[0].id_empresa_recibo;
        APICALLER.update({table: "empresa_recibos",token: token_user,id:idr, data: {last_nro_recibo: parseInt(LASTNROFACTURA) + 1} });
      }
    } else {
      
      if (nrofac.response  && nrofac.found>0) {
        LASTNROFACTURA = parseInt(nrofac.results[0].last_nro_factura);
        let LASTNROFACTURADECAJA = parseInt(nrofac.results[0].nro_fin_factura);
        if(LASTNROFACTURA>LASTNROFACTURADECAJA){ 
          swal({text:'Talonario de facturas agotado'}); 
          setCargas({ ...cargas, finalizarVenta:false});
          setDialogs({...dialogs,finalizarVenta:true}); 
          return false;
        }

        let idf = nrofac.results[0].id_empresa_factura;
        APICALLER.update({table: "empresa_facturas",token: token_user, id:idf, 
        data: {last_nro_factura: parseInt(LASTNROFACTURA) + 1}});
      }else{
        swal({text:"Esta caja no esta relacionada con ninguna factura. Sera facturada como recibo",timer:10000});
        LASTNROFACTURA = nrorec.results[0].last_nro_recibo;
        let idr = nrorec.results[0].id_empresa_recibo;
        tipoFactura = 0;
        APICALLER.update({table: "empresa_recibos",token: token_user,id:idr, data: {last_nro_recibo: parseInt(LASTNROFACTURA) + 1} });
      }
    } 
  

    
    let efectivo=0,sinEfectivo=0,cambio = 0, porcentaje_descuento_pago = 0,  observaciones = "";

    let objDetalles = {
      0: `Venta recibo: ${LASTNROFACTURA}. `,
      1: `Venta contado factura: ${LASTNROFACTURA}. `,
      2: `Venta credito factura: ${LASTNROFACTURA}. `,
      3: `Venta cuota recibo: ${LASTNROFACTURA}. `
    }
    let detallesMov = objDetalles[tipoFactura];
    
    df.datosFactura.formasPago.forEach(e=>{
      if(e.id_forma_pago==="1") {
        efectivo += (e.cantidad) / VALOR_MONEDA
        detallesMov += `Pago con efectivo ${(e.cantidad) / VALOR_MONEDA} ${NOMBRE_MONEDA}. `
      }  else{
        porcentaje_descuento_pago = parseFloat(e.descuento)>0 ?  ((e.cantidad/VALOR_MONEDA) * parseFloat(e.descuento) / 100) : 0
        sinEfectivo += (e.cantidad/VALOR_MONEDA) - porcentaje_descuento_pago;
        detallesMov += `Pago con ${e.descripcion} ${e.cantidad} ${NOMBRE_MONEDA}. `
        detallesMov += parseFloat(e.descuento)>0 ? ` Descuento de interes ${e.descuento}. ` : ''
      }
      observaciones += e.obs 
    })
    observaciones += DESCUENTO>0 ? ` Descuento: ${DESCUENTO} ` : "";
    
    /* if(efectivo>df.total){ */
    if(efectivo> TOTAL_A_PAGAR){
      cambio = efectivo - TOTAL_A_PAGAR;
      /* cambio = efectivo - df.total; */
    }
   
    efectivo = efectivo - cambio;
    
    //console.log(efectivo,sinEfectivo,observaciones,detallesMov,cambio)
    // INGRESAMOS AL REGISTRO DE CAJA SI ES CONTADO, SI ES CREDITO IGNORAMOS PQ NO HAY MOVIMIENTO EN CAJA
    var promesas = [];
    
    if (tipoFactura!==2 ) {
      //let cajasMov = 
      let totalPagado = parseFloat(df.datosFactura.totalAbonado);
      if(totalPagado>0){
        promesas.push(APICALLER.insert({
          table: "cajas_movimientos",
          token: token_user,
          data: {
            id_user_movimiento: id_user,
            id_moneda_movimiento:df.datosMoneda.id_moneda,
            id_caja_movimiento: df.datosFactura.id_caja,
            id_tipo_registro: 1, // 1 VENTA CONTADO REVISAR TABLA
            monto_movimiento: efectivo, // forma de pago efectivo  es 1
            monto_sin_efectivo: sinEfectivo,
            detalles_movimiento:detallesMov + observaciones,
            fecha_movimiento: Funciones.getFechaHorarioString(),
          },
        }))

        /* if(DESCUENTO>0){
          promesas.push(APICALLER.insert({table: "cajas_movimientos",
          token: token_user,
          data: {
            id_user_movimiento: id_user,
            id_moneda_movimiento:df.datosMoneda.id_moneda,
            id_caja_movimiento: df.datosFactura.id_caja,
            id_tipo_registro: 17, // 17 DESCUENTO
            monto_movimiento: DESCUENTO, // forma de pago efectivo  es 1
            monto_sin_efectivo: 0,
            detalles_movimiento:`Descuento de venta de ${DESCUENTO} NRO: ${LASTNROFACTURA}.`,
            fecha_movimiento: Funciones.getFechaHorarioString(),
          }}))
        } */
        
        //if(!cajasMov.response) {console.log(cajasMov)}
        // SI ES EN EFECTIVO
       /*  if (df.datosFactura.id_formaPago === "1") {
          let call_monto = await APICALLER.get({
            table: `cajas_monedas`,
            fields: `monto_caja_moneda,id_cajas_moneda`,
            where: `id_caja_moneda,=,${df.datosFactura.id_caja},and,id_moneda_caja_moneda,=,${df.datosMoneda.id_moneda}`,
          });
          let nuevo_monto = (efectivo + parseFloat(call_monto.results[0].monto_caja_moneda)) - DESCUENTO;
          let id_de_caja_moneda = call_monto.results[0].id_cajas_moneda;
          promesas.push(APICALLER.update({
            table: `cajas_monedas`,
            token: token_user,
            data: { monto_caja_moneda: nuevo_monto },
            id: id_de_caja_moneda,
          }));
        } */

        let call_monto = await APICALLER.get({
          table: `cajas_monedas`,
          fields: `monto_caja_moneda,id_cajas_moneda,monto_no_efectivo`,
          where: `id_caja_moneda,=,${df.datosFactura.id_caja},and,id_moneda_caja_moneda,=,${df.datosMoneda.id_moneda}`,
        });
        

         let nuevo_monto_efectivo = (efectivo + parseFloat(call_monto.results[0].monto_caja_moneda)) //- DESCUENTO;
        let nuevo_monto_no_efectivo = ( sinEfectivo  + parseFloat(call_monto.results[0].monto_no_efectivo));
       
        let id_de_caja_moneda = call_monto.results[0].id_cajas_moneda;
        promesas.push(APICALLER.update({
          table: `cajas_monedas`,
          token: token_user,
          data: { monto_caja_moneda: nuevo_monto_efectivo,monto_no_efectivo: nuevo_monto_no_efectivo },
          id: id_de_caja_moneda,
        })); 
      }
    }
    Promise.all(promesas)
    //ingresamos a la factura
    let objFactura = {
      id_cliente_factura: df.datosCliente.id_cliente,
      id_user_factura: id_user,
      id_caja_factura: df.datosFactura.id_caja,
      id_empleado_factura: df.datosFactura.id_empleado,
      id_forma_pago_factura: df.datosFactura.id_formaPago,
      id_moneda_factura: df.datosMoneda.id_moneda,
      valor_moneda_factura: df.datosMoneda.valor_moneda,
      nro_factura: parseInt(LASTNROFACTURA),
      fecha_factura: FECHA_ACTUAL,
      fecha_cobro_factura: df.datosFactura.fecha_cobro_factura +" "+ Funciones.getHorarioActualString(),
      estado_factura: parseInt(df.datosFactura.tipoFactura) < 2 ? 1 : 2,
      tipo_factura: tipoFactura,
      recibido_factura:  df.datosFactura.tipoFactura === "2" ? 0 : df.datosFactura.totalAbonado,
      monto_total_factura: df.total,
      iva_factura: df.total_iva,
      obs_factura: observaciones, /// ##############,
      retencion_iva_factura: df.datosFactura.retencion_iva_factura,
      orden_compra: df.datosFactura.ordenCompra,
      descuento_factura: DESCUENTO
    };

    let resInsert = await APICALLER.insert({table:"facturas",data: objFactura,token:token_user});

    if (resInsert.response ) {
      let ID_FACTURA = resInsert.last_id;
      let insertsPromises = [];

      df.itemsFactura.forEach(async (e) => {
        
        insertsPromises.push(APICALLER.insert({
          table: "facturas_items",token: token_user,
          data: {
            id_items_factura: ID_FACTURA,
            id_impuesto_factura: e.id_impuesto,
            id_producto_factura: e.id_producto,
            cantidad_producto: e.cantidad_producto,
            precio_producto_factura: e.precio_guardado,
            porcentaje_comision_factura: e.porcentaje_comision,
            entregado_item: e.tipo_producto === "2" ? "2" : df.datosFactura.entregado_items,
          },
        }));

        insertsPromises.push(APICALLER.insert({
          table: "comisions",token: token_user,
          data: {
            id_factura_comision: ID_FACTURA,
            id_empleado_comision: df.datosFactura.id_empleado,
            id_producto_comision: e.id_producto,
            porcentaje: e.porcentaje_comision,
            cantidad_vendido_comision: e.cantidad_producto,
            precio_vendido_comision: e.precio_guardado,
            comision_valor:  ( e.precio_guardado * e.cantidad_producto * e.porcentaje_comision) / 100 ,
            fecha_comision: Funciones.getFechaHorarioString(),
          },
        }));
       

        if(df.datosFactura.entregado_items==='1'){
          insertsPromises.push(APICALLER.insert({table:'productos_vendidos',token:token_user,
            data:{
              id_producto_vendido:e.id_producto,
              tipo_producto_vendido:e.tipo_producto,
              id_factura_vendido: ID_FACTURA,
              id_cliente_vendido: df.datosCliente.id_cliente,
              costo_producto_vendido:e.costo_producto,
              precio_vendido: e.precio_guardado,
              cantidad_vendido: e.cantidad_producto,
              fecha_vendido:FECHA_ACTUAL
            }
          }))
          if(e.tipo_producto === 1){
            let ncantidad = parseFloat(e.stock_producto) - parseFloat(e.cantidad_producto);
            insertsPromises.push(APICALLER.update(
              {
                table:'productos_depositos',data:{stock_producto_deposito:ncantidad},
                id:e.id_productos_deposito,token:token_user
              }
            ));
          }
        }
        // !item.response  && console.log(item);
      });
      // insertando con promisses
      
      Promise.all(insertsPromises)
    } else {
      console.log(resInsert);
    }

    fa.facturas[indexFactura].datosFactura.nro_factura =  parseInt(LASTNROFACTURA);
    setearFactura(fa);
    setCargas({ ...cargas, finalizarVenta: false});
   
    if ( tipoFactura === 0 || tipoFactura===3) {
      setDialogs({ ...dialogs, imprimirTicket: true, finalizarVenta:false });
    } else {
      setDialogs({ ...dialogs,imprimirFactura: true, finalizarVenta:false});
    }  
  }



  const valorConvertido = (val,letter=false) =>{
    if (isNaN(val)) {
      return '0';
    }
    let fa = { ...datosFacturas };
    let df = fa.facturas[indexFactura];
    if(letter){
      return  Funciones.redondeo2decimales(val / df.datosMoneda.valor_moneda)
    }
    return Funciones.numberSeparator( Funciones.redondeo2decimales(val / df.datosMoneda.valor_moneda));
  } 


  const cerrarDialogFactura = () => {
    let fa = { ...datosFacturas };
    if (indexFactura > 0) {
      fa.facturas.splice(indexFactura, 1);
      setIndexFactura(indexFactura - 1);
    } else {
      setIndexFactura(0);
      setIndexPrecioCambiar(-1);
      fa.facturas[0] = {
        itemsFactura: [],
        total: 0,
        descuento:0,
        total_iva: 0,
        fecha_factura: Funciones.getFechaActualString(),
        horario_factura: Funciones.getHorarioActualString(),
        guardado: false,
        datosMoneda: fa.monedaActiva,
        depositoActivo: fa.facturas[0].depositoActivo,
        datosFactura: initialDatosFactura,
        datosCliente: initialDatosCliente,
      };
    }
    setearFactura(fa);
    inputCodigo.current.focus();
  };



  const consultarCliente = async (doc) => {
    setCargas({ ...cargas, cargandoCliente: true });
    let Cliente = {id_cliente: "1",nombre_cliente: "SIN NOMBRE",direccion_cliente:"",ruc_cliente: "0"};
    if (doc === "") {
      setearCliente(Cliente);
    } else {
      let res = await APICALLER.get({table:"clientes",where:`ruc_cliente,=,'${doc}'`,fields: "id_cliente,nombre_cliente,ruc_cliente,direccion_cliente"});
      if (res.response ) {
        if (res.found > 0) {
          setearCliente(res.results[0]);
        } else {
          setearCliente(Cliente);
          setErrors({...errors,error:true,mensaje:"Cliente no registrado",cliente: true,clienteMensaje: "Cliente no registrado"});
        }
      }
    }
    setCargas({ ...cargas, cargandoCliente: false });
  };



  const setearCliente = (datos) => {
    let obj = { ...datosFacturas };
    obj.facturas[indexFactura].datosCliente = datos;
    setearFactura(obj);
    setErrors({ ...errors, error:false,mensaje:"", cliente: false, clienteMensaje: "" });
  };

  const changeMonedas = e =>{
    let fo = { ...datosFacturas };
    fo.facturas[indexFactura].datosMoneda = e;
    fo.facturas[indexFactura].descuento = 0;
    setearFactura(fo);
  }

  const changeInputsDatosFactura = (e) => {
    const { name, value } = e.target;
    let fo = { ...datosFacturas };
    fo.facturas[indexFactura].datosFactura[name] = value;
    setearFactura(fo);
  };

  const CancelarFacturaActual = () => {
    let fact = { ...datosFacturas};
    setIndexPrecioCambiar(-1);
    setErrors(initialErrors);
    setIDNotaPedido("");
    inputCantidad.current.value = 1;
    fact.facturas[indexFactura].itemsFactura = [];
    fact.facturas[indexFactura].datosFactura = initialDatosFactura;
    fact.facturas[indexFactura].datosCliente = initialDatosCliente;
    hacerTotal(fact);
    inputCodigo.current.focus();
  };

  const verificarExisteEnTabla = (codigo) => {
    if (codigo !== "") {
      let faArray = [...datosFacturas.facturas[indexFactura].itemsFactura];
      let index = faArray.findIndex(e => e.codigo_producto.toLowerCase() === codigo.toLowerCase());
      let found = faArray.filter(i => i.codigo_producto.toLowerCase() === codigo.toLowerCase());
      // si ya hay un producto tons aumenta la cantidad
      if (found.length > 0) {
        let cantidadInput = parseFloat(inputCantidad.current.value) +faArray[index].cantidad_producto;
        let stock = faArray[index].stock_producto;
        if(stock>=cantidadInput || stock===null || isNaN(stock)){
          AgregarCantidad(cantidadInput, index);
        }
        else{
            setErrors({...errors,error:true,mensaje:`Cantidad limitada de stock en ${stock}`,color:"error"});
        }
        inputCantidad.current.value=1;
      } else {
        consultarPorCodigo(codigo);
      }
    } else {
      setErrors({...errors,error:true,mensaje:"Ingrese el código del producto",color:"error"});
      inputCodigo.current.focus();
    }
    inputCodigo.current.value = "";
    inputCodigo.current.focus();
  };

  const CargarNota = async (codigo)=>{
    let fa = {...datosFacturas};
    
    setCargas({...cargas,items:true})
    setDialogs({...dialogs,nota:false});
    let res = await Promise.all([
      APICALLER.get({table:"notas_pedidos",include:"clientes",on:"id_cliente,id_cliente_pedido",
      where:`id_notas_pedido,=,${codigo}`}),
      APICALLER.get({table:"notas_items",include:"productos,impuestos",on:"id_producto,id_producto_item,id_impuesto_producto,id_impuesto",
      where:`id_notas_pedido_item,=,${codigo}`})
    ]);
    let nota = res[0]; let items = res[1];
    if(nota.found>0 && nota.response && items.found>0 && items.response){
      fa.facturas[indexFactura].depositoActivo = nota.results[0].id_deposito_pedido;
      items.results.forEach(e=>{
        insertarProductoTabla(e,parseFloat(e.cantidad_item))
      });
      let cl = nota.results[0];
      fa.facturas[indexFactura].datosCliente = {
          id_cliente:cl.id_cliente,
          nombre_cliente: cl.nombre_cliente,
          ruc_cliente: cl.ruc_cliente,
          direccion_cliente: cl.direccion_cliente
      }
      fa.facturas[indexFactura].datosFactura.id_empleado = cl.id_empleado_pedido
      setearFactura(fa);
    }
    else{
      setErrors({...errors,color:"error",mensaje:"No hay nota con ese número.",error:true})
    } 
    setCargas({...cargas,items:false});
    inputCodigo.current?.focus()
  }




  const Anotar = async()=>{
    let fa = {...datosFacturas.facturas[indexFactura]}
    if(fa.itemsFactura.length>0){
      let data = {
        id_deposito_pedido:fa.depositoActivo,
        id_cliente_pedido:fa.datosCliente.id_cliente,
        id_empleado_pedido:fa.datosFactura.id_empleado, 
        fecha_pedido: Funciones.getFechaHorarioString(),
      }
      //console.log(fa);
      let ins = await APICALLER.insert({token:token_user,table:"notas_pedidos",data}) 
      if(ins.response){
        let lastid= ins.last_id;
        setIDNotaPedido(ins.last_id);
        let promesas = [];
        fa.itemsFactura.forEach(async(e) => {
          let datos = { id_notas_pedido_item: lastid,id_producto_item: e.id_producto,precio_guardado:e.precio_guardado,cantidad_item:e.cantidad_producto }
          promesas.push(APICALLER.insert({table:"notas_items",token:token_user,data:datos}));
        });
        Promise.all(promesas);
        //setErrors({...errors,color:"success",mensaje:"Nota nro: "+ins.last_id+" generada existosamente",error:true})
        setDialogs({...dialogs,imprimirNotaPedido:true});
      } else{ console.log(ins)}
    }
  }

  const consultarPorCodigo = async (codigo) => {
    let fa = {...datosFacturas.facturas[indexFactura]}; 
    setCargas({ ...cargas, cargandoProducto: true });
    let alldepositos = datosFacturas.alldepositos;
    var where = "";
    if(alldepositos){
      where = `codigo_producto,=,'${codigo}',and,stock_producto_deposito,>,0`;
    }
    else{
      where = `codigo_producto,=,'${codigo}',and,id_deposito_deposito,=,${fa.depositoActivo}`
    }

    let [res,ima,serv] = await Promise.all([APICALLER.get({
      table: "productos",
      include: "impuestos,productos_depositos",
      on: "id_impuesto_producto,id_impuesto,id_producto,id_producto_deposito",
      where: where,
    }),APICALLER.get({
      table: "productos",
      include: "impuestos,productos_images,productos_depositos",
      on: "id_impuesto_producto,id_impuesto,id_producto,id_image_producto,id_producto,id_producto_deposito",
      where: where,
    }),
    APICALLER.get({ table: "productos",
    include: "impuestos",
    on: "id_impuesto_producto,id_impuesto",
    where: `codigo_producto,=,'${codigo}',and,tipo_producto,=,2`})])
    
    
    if (res.response ) {
      if (res.found > 0 || serv.found>0) {
        if(res.results[0]?.tipo_producto==="1" && res.results[0]?.stock_producto_deposito<=0 ){
          setErrors({...errors,error: true, mensaje: `No hay stock de ${res.results[0].nombre_producto} en el deposito`,
          });
        }
        else{
          let insertarEsto = ima.found > 0 ? ima.results[0] : res.found>0 ? res.results[0] : serv.results[0]
          insertarProductoTabla(insertarEsto);
        }

      } else {
        // ACA SE PUEDE PONER PARA BALANZA
        setErrors({...errors,error: true,mensaje: "Producto no registrado con ese código o sin stock"});
      }
    } else {
      console.log(res);
    } 
    setCargas({ ...cargas, cargandoProducto: false });
  };



  const insertarProductoTabla = (prod,cantidad=null) => {
    
    let fa = { ...datosFacturas };
    let df = fa.facturas[indexFactura];
    let cantidadInput = cantidad || parseFloat(inputCantidad.current.value) ;
    let subtotal = parseFloat(prod.precio_producto) * cantidadInput;
    let iva_porcent = parseFloat(prod.porcentaje_impuesto);
    let porcentaje_comision = parseInt(prod.porcentaje_comision);
    let obj = {
      codigo_producto: prod.codigo_producto,
      nombre_producto: prod.nombre_producto,
      precio_producto: parseFloat(prod.precio_producto),
      precio_guardado: parseFloat(prod.precio_producto),
      cantidad_producto: cantidadInput,
      id_productos_deposito: prod.id_productos_deposito,
      iva_porcentaje: iva_porcent,
      iva_total_producto: (subtotal * iva_porcent) / (100 + iva_porcent),
      subtotal_precio: subtotal,
      stock_producto: parseFloat(prod.stock_producto_deposito),
      costo_producto: parseFloat(prod.costo_producto),
      preciom_producto: parseFloat(prod.preciom_producto),
      precio_original: parseFloat(prod.precio_producto),
      tipo_producto: parseInt(prod.tipo_producto),
      porcentaje_comision: porcentaje_comision,
      comision_producto: (subtotal * porcentaje_comision) / 100,
      id_impuesto: prod.id_impuesto,
      id_producto: prod.id_producto,
      url_imagen: prod?.url_imagen ? prod.url_imagen : ""
    };

    if(prod.preguntar_precio === "1"){
      openCambiarPrecio(df.itemsFactura.length)
    }

    let fObjInsert = { ...datosFacturas };
    fObjInsert.facturas[indexFactura].itemsFactura.push(obj);
    hacerTotal(fObjInsert);
    inputCantidad.current.value = "1";
  };

  const hacerTotal = (fObj) => {
    let suma = 0; let iva = 0;
    fObj.facturas[indexFactura].itemsFactura.forEach(e => {
      suma += e.subtotal_precio;
      iva += e.iva_total_producto;
    });
    fObj.facturas[indexFactura].total = suma;
    fObj.facturas[indexFactura].total_iva = iva;
    setearFactura(fObj);
  };

  


  const restarCantidad = (cant,index)=>{
    let f = {...datosFacturas};
    let nc = cant - 1;
    if(nc>0){
      let fd = f.facturas[indexFactura].itemsFactura[index];
      let iva_porcent = fd.iva_porcentaje;
      let subtotal = fd.precio_guardado * parseFloat(nc);
      fd.cantidad_producto = parseFloat(nc);
      fd.subtotal_precio = subtotal;
      fd.iva_total_producto = (subtotal * iva_porcent) / (100 + iva_porcent);
      hacerTotal(f);
    }
  }

  const sumarCantidad = (cant,index)=>{
    let f = {...datosFacturas};
    let nc = cant + 1;
    let fd = f.facturas[indexFactura].itemsFactura[index];
    if(fd.stock_producto>cant || fd.tipo_producto===2){
      let iva_porcent = fd.iva_porcentaje;
      let subtotal = fd.precio_guardado * parseFloat(nc);
      fd.cantidad_producto = parseFloat(nc);
      fd.subtotal_precio = subtotal;
      fd.iva_total_producto = (subtotal * iva_porcent) / (100 + iva_porcent);
      hacerTotal(f)
    }
    else{
      setErrors({...errors,error:true,color:"error", mensaje:"Cantidad máxima en stock",notFound: true,notFoundMensaje: "Cantidad máxima en stock."})
    }
  }



  const AgregarCantidad = (cant, index) => {
    let fObj = { ...datosFacturas };
    let iva_porcent = fObj.facturas[indexFactura].itemsFactura[index].iva_porcentaje;
    let subtotal = fObj.facturas[indexFactura].itemsFactura[index].precio_guardado * parseFloat(cant);
    fObj.facturas[indexFactura].itemsFactura[index].cantidad_producto = parseFloat(cant);
    fObj.facturas[indexFactura].itemsFactura[index].subtotal_precio = subtotal;
    fObj.facturas[indexFactura].itemsFactura[index].iva_total_producto = (subtotal * iva_porcent) / (100 + iva_porcent);
    hacerTotal(fObj);
  };

  const cambiarDeposito = deposito =>{
    let fa = {...datosFacturas};

    if(fa.facturas[indexFactura].itemsFactura.length>0){
      Aguardar({deposito:deposito});
    }else{
      fa.facturas[indexFactura].depositoActivo = deposito;
      setearFactura(fa);
    }
  }

  const openImagen = index =>{setIndexPrecioCambiar(index); setDialogs({ ...dialogs, imagen: true });}

  const openCambiarPrecio = index => {
    setIndexPrecioCambiar(index);
    setDialogs({ ...dialogs, cambiarPrecio: true });
  };

  const cambiarPrecio = (index, precio) => {
    let fObj = { ...datosFacturas };
    let fpn = fObj.facturas[indexFactura].itemsFactura[index];
    let sub = precio * fpn.cantidad_producto;
    let iva = fpn.iva_porcentaje;
    fpn.precio_guardado = precio;
    fpn.subtotal_precio = sub;
    fpn.iva_total_producto = (sub * iva) / (100 + iva);
    hacerTotal(fObj);
    inputCodigo.current.focus();
  };



  const borrarItem = (index) => {
    let facturaObj = { ...datosFacturas };
    facturaObj.facturas[indexFactura].itemsFactura.splice(index, 1);
    hacerTotal(facturaObj);
  };
  
  const AgregarCantidadMetodoPago = ()=>{
    let valorInicial = parseFloat(Funciones.ComaPorPunto(Funciones.SacarPunto(cantidadRecibidaRef.current.value)));
    let fa = {...datosFacturas}
    let da = fa.facturas[indexFactura].datosFactura;
    let list = fa.listaFormasPago;
    let e = {...errors};
    if(!isNaN(valorInicial) || valorInicial>0){
      let valor = valorInicial * parseFloat(fa.facturas[indexFactura].datosMoneda.valor_moneda);
      let foundIndex = da.formasPago.findIndex(e => e.id_forma_pago === da.id_formaPago);

      if (foundIndex<0) {
        let des = list.filter(e=> e.id_facturas_formas_pago === da.id_formaPago); 
        da.formasPago.push({
          id_forma_pago: da.id_formaPago,
          obs:da.obs_pago,
          descuento: des[0].porcentaje_descuento_pago,
          cantidad: isNaN(valor) ? 0 : parseFloat(valor) ,
          descripcion: des[0].descripcion_forma_pago || ""
        });
        e.factura.error = false;
        e.factura.errorMensaje="";
      }else{
          let cantidadMas = da.formasPago[foundIndex].cantidad + parseFloat(valor)
          da.formasPago[foundIndex].cantidad = cantidadMas;
        //e.factura.error = true;
       // e.factura.errorMensaje="Ese método de pago ya esta en la lista. Elija otro o mofique el método.";
      }
      da.totalAbonado +=  isNaN(valor) ? 0 : parseFloat(valor);    
    }
    else{
      e.factura.error = true;
      e.factura.errorMensaje="Ingrese la cantidad";
    }
    setErrors(e);
    da.obs_pago=""
    da.cantidad_recibida = "";
    setearFactura(fa);
    cantidadRecibidaRef.current.focus();
  }
  const borrarMetodoPago = (index,cant)=>{
    let fa = {...datosFacturas}
    let da = fa.facturas[indexFactura].datosFactura;
    da.totalAbonado -=  cant;
    da.formasPago.splice(index,1);
    setErrors(initialErrors)
    setearFactura(fa);
  }

  const MetodoDescuento = (valor,porcentaje=false)=>{
    
    let val = parseFloat(valor);
    let descuento = 0;
    let f = {...datosFacturas}
    let valorMoneda = parseFloat(f.facturas[indexFactura].datosMoneda.valor_moneda);
    let total = f.facturas[indexFactura].total;
    if(!isNaN(val)){
      if(porcentaje){
        descuento = (total*val)/100;
      }else{
        descuento = valor/valorMoneda;
      }
    }
    f.facturas[indexFactura].descuento = descuento
    setearFactura(f);
  }



  const setearFactura = (factura) => {
    setDatosFacturas(factura);
    const values = JSON.stringify(factura);
    localStorage.setItem("facturasStorage", values);
  };



  const Aguardar = ({deposito=""}) => {
    let fact = { ...datosFacturas };
    fact.facturas[indexFactura].guardado = true;
    fact.indexFactura = indexFactura + 1;
    let dep = deposito || fact.facturas[indexFactura].depositoActivo ;
    
     fact.facturas.push({
      itemsFactura: [],
      depositoActivo: dep ,
      total: 0,
      descuento:0,
      total_iva: 0,
      fecha_factura: Funciones.getFechaActualString(),
      horario_factura: Funciones.getHorarioActualString(),
      guardado: false,
      datosMoneda: fact.monedaActiva,
      datosFactura: initialDatosFactura,
      datosCliente: initialDatosCliente,
    });
    
    setIndexFactura(indexFactura + 1);
    setIndexPrecioCambiar(-1);
    setearFactura(fact); 
    inputCodigo.current.focus(); 
  };

  const setearIndexFactura = (i) => {
    let facturaObj = { ...datosFacturas };
    //borra si no tiene nada
    if (facturaObj.facturas[indexFactura].itemsFactura.length === 0) {
      facturaObj.facturas.splice(indexFactura, 1);
      if (facturaObj.facturas.length === 1) {
        i = 0;
      }
    } else {
      facturaObj.facturas[indexFactura].guardado = true;
    }
    facturaObj.indexFactura = i;
    setIndexFactura(i);
    setearFactura(facturaObj);
    inputCodigo?.current?.focus();
  };



  const getDatosFactura = useCallback(async () => {
    //consultar si hay factura en localstore
    if (localStorage.getItem("facturasStorage") === null) {
      let res = await Promise.all([
        APICALLER.get({table: "cajas",include:"cajas_users", on:"id_caja,id_caja_caja",where: `id_user_caja,=,${id_user}`}),
        APICALLER.get({ table: "monedas" }),
        APICALLER.get({ table: "facturas_formas_pagos" }),
        APICALLER.get({ table: "empleados",fields:"id_empleado,nombre_empleado,apellido_empleado" }),
        APICALLER.get({table:"depositos",where:"tipo_deposito,=,1"}),
        APICALLER.get({table:"cajas_monedas",include:"cajas,monedas,cajas_users",on:"id_caja_moneda,id_caja,id_moneda,id_moneda_caja_moneda,id_caja,id_caja_caja",where: `id_user_caja,=,${id_user}`}),
        APICALLER.get({table: "cajas",include:"cajas_users", on:"id_caja,id_caja_caja",where: `id_user_caja,=,${id_user},and,estado_caja,=,'open'`}),
      ])
      let cajaMonedas = res[5];
      let rDepositos = res[4];  
      let rVendedores = res[3];
      let rFormasPago = res[2];
      let rMoneda = res[1];
      let rCajas = res[0];
      var ACTIVEFACTURA = false;
      var FACTURALISTA = [];
      var rc = res[0];
      var cajasOpened = res[6]
      if (rc.response ) {
        if (rc.found < 1) {
          swal({text:"Debe habilitar una caja.",icon:"warning"})
          .then(()=>{
            navigate(env.BASEURL+"/cajas?dialog=new");
          })
          return false;
        } else {
          if( (rc.results.some(e => e.estado_caja==="open"))){
            let IDCAJAFACTURA = rCajas.results[0].id_caja;
            let fac = await APICALLER.get({table: "empresa_facturas",where: `id_caja_empresa,=,${IDCAJAFACTURA}`});
            if (fac.found > 0) {
              ACTIVEFACTURA = true;
              FACTURALISTA = fac.results
            }
          }
          else{
            swal({text:"Debe abrir caja.",icon:"warning"})
            .then(()=>{
              navigate(env.BASEURL+`/cajas?dialog=open&id=${res[0].results[0].id_caja}`);
            })
            return false;
          }
        }
      }
      
          if (rMoneda.response ) {
            var activeMoneda = rMoneda.results.filter(e => e.activo_moneda === "1");
            var monedas = rMoneda.results
            var monedasdecajas = cajaMonedas.results;
          }
      if(rDepositos.response ){ var ID_DEPOSITO_ACTIVO = rDepositos.results.length>0 ? rDepositos.results[0].id_deposito : "0" } 
      const initialFacturasLocal = {
        facturas: [
          {
            itemsFactura: [],
            total: 0,
            total_iva: 0,
            descuento:0,
            guardado: false,
            datosMoneda: activeMoneda.length > 0 ? activeMoneda[0] : {},
            depositoActivo: ID_DEPOSITO_ACTIVO,
            datosFactura: {
              tipoCliente: "1",
              tipoFactura: "0",
              ordenCompra: "",
              id_caja: cajasOpened.response  && cajasOpened.found===1 ? cajasOpened.results[0].id_caja : "",
              id_empleado: rVendedores.response  && rVendedores.found===1 ? rVendedores.results[0].id_empleado : "",
              obs_pago: "",
              id_formaPago: "1",
              cantidad_recibida: "",
              totalAbonado:0,
              formasPago:[],
              entregado_items: "1",
              retencion_iva_factura: "0",
              nro_factura:"0",
              fecha_factura: Funciones.getFechaActualString(),
              fecha_cobro_factura:Funciones.fechaActualYMD(),
              horario_factura: Funciones.getHorarioActualString(),
              valorMoneda:1, // este es el valor de la moneda activa
            },
            datosCliente: {
              id_cliente: 1,
              nombre_cliente: "SIN NOMBRE",
              direccion_cliente:"",
              ruc_cliente: "0",
            },
          },
        ],
        facturaActiva: ACTIVEFACTURA,
        indexFactura: 0,
        listaFormasPago: rFormasPago.response  ? rFormasPago.results : [],
        listaMonedas: monedas,//rMoneda.response  ? rMoneda.results : [],
        monedasdecajas: monedasdecajas,
        monedaActiva: activeMoneda.length > 0 ? activeMoneda[0] : {},
        listaCajas: cajasOpened.response  ? cajasOpened.results : [],
        listaFacturas: FACTURALISTA,
        listaVendedores: rVendedores.response  ? (rVendedores.results) : [],
        listaDepositos: rDepositos.response ? rDepositos.results : [],
        alldepositos:true
      };
      setDatosFacturas(initialFacturasLocal);
      const val = JSON.stringify(initialFacturasLocal);
      localStorage.setItem("facturasStorage", val);
      setCargas({
        general: false,
        cargandoProducto: false,
        cargandoCliente: false,
        finalizarVenta: false,
        cargandoItem: false,
      });
      
    }
       
  }, [id_user,navigate]);
  /* FIN FUNCIONES ***********************************************/

  useEffect(() => {
    let isActive = true;
    const ca = new AbortController();
    if (isActive) {getDatosFactura();}
    const focusInput = () => {
      if (datosFacturas.facturas[indexFactura].itemsFactura.length === 0) {
        inputCodigo.current?.focus();
      }
    };
    focusInput();
    return () => {isActive = false;ca.abort();};
  }, [getDatosFactura, datosFacturas, indexFactura]);


  const values = {
    id_user,token_user,
    cargas,
    setCargas,
    dialogs,
    setDialogs,
    datosFacturas,
    indexFactura,
    inputCodigo,
    inputCantidad,
    cantidadRecibidaRef,
    verificarExisteEnTabla,
    errors,
    setErrors,
    initialErrors,
    Aguardar,
    Funciones,
    setearIndexFactura,
    setearFactura,
    CancelarFacturaActual,
    borrarItem,
    cambiarPrecio,
    openCambiarPrecio,openImagen,
    indexPrecioCambiar, setIndexPrecioCambiar,
    AgregarCantidad,
    consultarCliente,
    changeInputsDatosFactura,
    verificarYEnviarFactura,
    cerrarDialogFactura,
    insertarProductoTabla,restarCantidad,sumarCantidad,
    AgregarCantidadMetodoPago,borrarMetodoPago,changeMonedas,Anotar,CargarNota,permisos,cambiarDeposito,
    MetodoDescuento,lang,IDNotaPedido,valorConvertido
  }


  return (
    <Contexto.Provider
      value={values}
    >
      {children}
    </Contexto.Provider>
  );
};

export const useVentas = () => {
  const {id_user,token_user,
    cargas,setCargas,
    dialogs,setDialogs,
    datosFacturas,indexFactura,
    inputCodigo,inputCantidad,
    cantidadRecibidaRef,
    verificarExisteEnTabla,
    errors,
    setErrors,
    initialErrors,
    Aguardar,
    Funciones,
    setearIndexFactura,
    setearFactura,
    CancelarFacturaActual,
    borrarItem,
    cambiarPrecio,
    openCambiarPrecio,openImagen,
    indexPrecioCambiar,setIndexPrecioCambiar,
    AgregarCantidad,
    consultarCliente,
    changeInputsDatosFactura,
    verificarYEnviarFactura,
    cerrarDialogFactura,
    insertarProductoTabla,restarCantidad,sumarCantidad,
    AgregarCantidadMetodoPago,borrarMetodoPago,changeMonedas,Anotar,CargarNota,permisos,cambiarDeposito,
    MetodoDescuento,lang,IDNotaPedido,valorConvertido

  } = useContext(Contexto);
  return {id_user,token_user,
    cargas,
    setCargas,
    dialogs,
    setDialogs,
    datosFacturas,
    indexFactura,
    inputCodigo,
    inputCantidad,
    cantidadRecibidaRef,
    verificarExisteEnTabla,
    errors,
    setErrors,
    initialErrors,
    Aguardar,
    Funciones,
    setearIndexFactura,
    setearFactura,
    CancelarFacturaActual,
    borrarItem,
    cambiarPrecio,
    openCambiarPrecio,openImagen,
    indexPrecioCambiar,setIndexPrecioCambiar,
    AgregarCantidad,
    consultarCliente,
    changeInputsDatosFactura,
    verificarYEnviarFactura,
    cerrarDialogFactura,
    insertarProductoTabla,restarCantidad,sumarCantidad,
    AgregarCantidadMetodoPago,borrarMetodoPago,changeMonedas,Anotar,CargarNota,permisos,cambiarDeposito,
    MetodoDescuento,lang,IDNotaPedido,valorConvertido
  };
};

export default VentasProvider;
