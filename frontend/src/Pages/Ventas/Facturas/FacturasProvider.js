import {useEffect,useContext,createContext,useState,useCallback} from "react";
import { APICALLER } from "../../../Services/api";
import { funciones } from "../../../Functions";
import { useLang } from "../../../Contexts/LangProvider";
import { useDatosEmpresa } from "../../../Contexts/DatosEmpresaProvider";
import swal from "sweetalert";
import { useLogin } from "../../../Contexts/LoginProvider";

const Context = createContext();

const FacturasProvider = ({ children }) => {
  const {lang} = useLang()
  const {userData} = useLogin()
  const {token_user,id_user} = userData
  

  const {EMPRESA} = useDatosEmpresa();
  
  const [statusDevolucion,setStatusDevolucion] = useState({
    active:false,
    productos:[],
    cajas:{},
    pagos:{},
    id:'',
    id_caja:'',
    id_moneda:'',
    nro:'',
    tipo:'',
    monto:'',
    deposito:[]
  })
  const [lista, setLista] = useState([]);
  const [total, setTotal] = useState({
    facturas:0,
    descuentos:0
  });
  const [dialogs,setDialogs] = useState({
    estado: false,
    imprimirTicketRecibo:false,
    imprimirTicketFactura:false,
    imprimirReciboA4:false,
    imprimirFacturaA4:false,
    mail:false,
    devolucion:false
  })


  const [loadings,setLoadings] = useState({
    lista:true,
    factura:true,
    devolucion:true
  })

  const fecha = funciones.fechaActualYMD();
  const [desdeFecha, setDesdeFecha] = useState(fecha);
  const [hastaFecha, setHastaFecha] = useState(fecha);
  
  const [filtro, setFiltro] = useState("");
  const initialFormulario = {
    abreviatura_moneda: "",
    direccion_cliente: "",
    estado_factura: "",
    fecha_cobro_factura: "",
    fecha_factura: "",
    id_caja_factura: "",
    id_factura: "",
    monto_total_factura: "",
    nombre_cliente: "",
    nombre_moneda: "",
    nombre_user: "",
    nro_factura: "",
    obs_factura: "",
    ruc_cliente: "",
    tipo_factura: "",
    valor_moneda: "",
    descuento_factura:"",
    fecha_empresa_factura:"",
    obs_empresa_factura:""
  };
  const [formulario, setFormulario] = useState(initialFormulario);

  const [itemsFactura,setItemsFactura] = useState([])

  const [inputSearch, setInputSearch] = useState("");


  const consultarParaImprimir = async(fila)=>{
    setLoadings({lista:false,factura:true,devolucion:true});
    if(fila.tipo_factura==="0"){
          /* if(EMPRESA.tipo_papel==='0'){
            setDialogs({...dialogs,imprimirTicketRecibo:true})
          }else{
            setDialogs({...dialogs,imprimirReciboA4:true})
          } */
          setDialogs({...dialogs,imprimirTicketRecibo:true})
    }
    else{
      if(EMPRESA.tipo_papel==='0'){
        setDialogs({...dialogs,imprimirTicketFactura:true})
      }else{
        setDialogs({...dialogs,imprimirFacturaA4:true})
      }
    }

    
    var resF = await APICALLER.get({table:'facturas_items',include:'productos,impuestos',
    on:'id_producto,id_producto_factura,id_impuesto,id_impuesto_factura',
    where:`id_items_factura,=,${fila.id_factura}`,
    fields:'codigo_producto,cantidad_producto,precio_producto_factura,porcentaje_impuesto,nombre_producto'
    });
    
    resF.response ? setItemsFactura(resF.results) : console.log(resF);
    
    if(fila.tipo_factura==="1" || fila.tipo_factura==="2"){ 
      let res = await APICALLER.get({table:'empresa_facturas',include:'facturas_cajas,facturas',
      on:'factura_empresa_id,id_empresa_factura,empresa_factura_id,id_empresa_factura',
      where:`caja_id_factura,=,${fila.id_caja_factura},and,id_factura,=,${fila.id_factura}`});
      if(res.response) {
        //console.log(res.results);
        let ef = res.results[0];
        let form = {...fila}
        form.timbrado_factura = ef.timbrado_factura;
        form.fin_timbrado= ef.fin_timbrado;
        form.inicio_timbrado= ef.inicio_timbrado;
        form.nro_datos_factura = ef.nro_datos_factura;
        form.obs_empresa_factura = ef.obs_empresa_factura;
        form.fecha_empresa_factura = ef.fecha_empresa_factura;
        setFormulario(form);
      }
      else{
        console.log(res)
      }
    }else{
      setFormulario(fila)
    }
    setLoadings({lista:false,factura:false,devolucion:true});
  }




  const getBuscarFactura = useCallback(async () => {
    setLoadings({lista:true,factura:true,devolucion:true});
    let res = await APICALLER.get({
      table: "facturas",include:"clientes,monedas,users",
      on: `id_cliente_factura,id_cliente,id_moneda,id_moneda_factura,id_user,id_user_factura`,
      fields: `recibido_factura,id_moneda_factura,descuento_factura,valor_moneda_factura,nro_factura,abreviatura_moneda,nombre_moneda,abreviatura_moneda,valor_moneda,estado_factura,fecha_factura,fecha_cobro_factura,ruc_cliente,nombre_cliente,direccion_cliente,monto_total_factura,tipo_factura,id_factura,nombre_user,id_caja_factura,obs_factura,descuento_factura`,
      filtersField:"nro_factura,nombre_cliente",filtersSearch:inputSearch,
      pagenumber:0,pagesize:10,
    });
    //console.log(res);
    if (res.response ) {
      
      let arrayresult = [...res.results]
      let newresult = [];
      let suma = 0;
      let totaldescuentos = 0;
      arrayresult.forEach((elem) => {
        if(parseInt(elem.estado_factura)>0){
          suma += parseFloat(elem.monto_total_factura);
          totaldescuentos += parseFloat(elem.descuento_factura);
        }
        newresult.push({
          ...elem, monto: parseFloat(elem.monto_total_factura) / parseFloat(elem.valor_moneda_factura)
      })
      });
      setLista(newresult);
      setTotal({
        facturas:suma,
        descuentos:totaldescuentos
      });
    } else {
      console.log(res);
    }
    setLoadings({lista:false,factura:true,devolucion:true});
  }, [inputSearch]);


  



  const devolucion = async (factura)=>{
    if(factura.estado_factura==='0'){
      return false;
    }
    let ask = await swal({title:'Devolución',text:'Desea hacer devolución esta factura?', icon:'warning', buttons:['No','Si']})

    if(ask){
      setDialogs({...dialogs,devolucion:true})
      setLoadings({lista:false,factura:true,devolucion:true});
      let id = factura.id_factura;
      let id_caja = factura.id_caja_factura;
      let id_moneda = factura.id_moneda_factura;    

      let [products,caja,pag,dep] = await Promise.all([
        APICALLER.get({table:'facturas_items',
        include:'productos,depositos',on:'id_producto,id_producto_factura,id_deposito,id_deposito_item',
        where:`id_items_factura,=,${id}`,
        fields:'id_producto_factura,cantidad_producto,nombre_producto,id_deposito_item,nombre_deposito,codigo_producto,precio_producto_factura,tipo_producto,entregado_item'}),

        APICALLER.get({table:'cajas_monedas',include:'cajas',on:'id_caja,id_caja_moneda',
        where:`id_caja_moneda,=,${id_caja},and,id_moneda_caja_moneda,=,${id_moneda}`,fields:'monto_caja_moneda,monto_no_efectivo,nombre_caja,id_cajas_moneda'}),
        
        APICALLER.get({table:'facturas_pagos',include:'monedas,facturas',on:'moneda_id,id_moneda,factura_id,id_factura',
        where:`factura_id,=,${id}`,fields:'efectivo_factura,no_efectivo_factura,nombre_moneda,abreviatura_moneda,monto_total_factura,recibido_factura,factura_vuelto'}),
        
        APICALLER.get({table:'facturas_items',include:'productos_depositos',on:'id_producto_factura,id_producto_deposito',
        where:`id_items_factura,=,${id},and,id_deposito_deposito,=,id_deposito_item`,
        fields:'stock_producto_deposito,id_productos_deposito,cantidad_producto,entregado_item'})
      ])
 
      if(products.response){
        let prod = [];
        products.results.forEach(e=>{
          prod.push({...e,check:true})
        })
        let tipo_factura = { "0": 'Recibo', "1":"Factura Contado", "2": "Factura Crédito", "3":"Cuota" }
        setStatusDevolucion({
          active:true,
          productos:prod,
          deposito: dep.results,
          cajas: caja.results[0],
          pagos: pag.results[0],
          monto:factura.monto,
          id:factura.id_factura,
          id_caja:factura.id_caja_factura,
          id_moneda:factura.id_moneda_factura,
          tipo: tipo_factura[factura.tipo_factura],
          nro: factura.nro_factura
        })
      }
      setLoadings({lista:false,factura:true,devolucion:false});

    }

  }

  const finalizarDevolucion = async()=>{
    
    setLoadings({lista:true,factura:true,devolucion:true});
    let dev = {...statusDevolucion}
    let promises = [];
    
    let cajas_monedas = {
      monto_caja_moneda: parseFloat(dev.cajas.monto_caja_moneda) - parseFloat(dev.pagos.efectivo_factura) - parseFloat(dev.pagos.factura_vuelto),
      monto_no_efectivo: parseFloat(dev.cajas.monto_no_efectivo) - parseFloat(dev.pagos.no_efectivo_factura)
    }
    
    let cajas_mov = {
      id_caja_movimiento: dev.id_caja,
      id_moneda_movimiento:dev.id_moneda,
      id_user_movimiento:id_user,
      id_tipo_registro: 8,
      monto_movimiento: dev.pagos.efectivo_factura - parseFloat(dev.pagos.factura_vuelto) ,
      monto_sin_efectivo: dev.pagos.no_efectivo_factura,
      fecha_movimiento: funciones.getFechaHorarioString(),
      detalles_movimiento:'Devolución de productos, venta doc nro: '+dev.nro
    }

    promises.push([
      APICALLER.update({table:'facturas',data:{estado_factura:0},id:dev.id,token:token_user}),
      APICALLER.insert({table:'cajas_movimientos',data:cajas_mov,token:token_user}),
      APICALLER.update({table:'cajas_monedas',data:cajas_monedas,id:dev.cajas.id_cajas_moneda,token:token_user})
    ])
    dev.deposito.forEach(e=>{
      if(e.entregado_item === '1'){
        promises.push(APICALLER.update({table:'productos_depositos',token:token_user,id:e.id_productos_deposito,
        data:{
          stock_producto_deposito : parseFloat(e.stock_producto_deposito)+ parseFloat(e.cantidad_producto)
        }
        }))
        promises.push(APICALLER.delete({table:'comisions',token:token_user,namecolumns:'id_factura_comision',ids:`${dev.id}`}),
        APICALLER.delete({table:'productos_vendidos',token:token_user,namecolumns:'id_factura_vendido',ids:`${dev.id}`}))
      }
    })
    await Promise.all(promises)
    setDialogs({...dialogs,devolucion:false})
    getLista()
    
  }






  const getLista = useCallback(async () => {
    setLoadings({lista:true,factura:true,devolucion:false});
    var filtrosOBJ = {
      "":"",
      "0":",and,tipo_factura,=,0",
      "no_recibo":",and,tipo_factura,<>,0",
      "1":",and,tipo_factura,=,1",
      "2":",and,tipo_factura,=,2",
      "3":",and,estado_factura,=,1",
      "4":",and,estado_factura,=,2",
      "5":",and,tipo_factura,=,3",
    }

    let moreFilter=filtrosOBJ[filtro];

    const res = await APICALLER.get({
      table: "facturas",include:"clientes,monedas,users",
      on: `id_cliente_factura,id_cliente,id_moneda,id_moneda_factura,id_user,id_user_factura`,
      fields: `recibido_factura,id_moneda_factura,descuento_factura,valor_moneda_factura,nro_factura,abreviatura_moneda,nombre_moneda,abreviatura_moneda,valor_moneda,estado_factura,fecha_factura,fecha_cobro_factura,ruc_cliente,nombre_cliente,direccion_cliente,monto_total_factura,tipo_factura,id_factura,nombre_user,id_caja_factura,obs_factura,descuento_factura`,
      where: `fecha_factura,between,'${desdeFecha} 00:00:00',and,'${hastaFecha} 23:59:59' ${moreFilter}`,
      sort: `fecha_factura`,
    });

    
    if (res.response ) {
      
      let arrayresult = [...res.results]
      let newresult = [];
      let suma = 0;
      let totaldescuentos = 0;
      arrayresult.forEach((elem) => {
        if(parseInt(elem.estado_factura)>0){
          suma += parseFloat(elem.monto_total_factura);
          totaldescuentos += parseFloat(elem.descuento_factura);
        }
        newresult.push({
          ...elem, monto: parseFloat(elem.monto_total_factura) / parseFloat(elem.valor_moneda_factura)
      })
      });
      setLista(newresult);
      setTotal({
        facturas:suma,
        descuentos:totaldescuentos
      });
    } else {
      console.log(res);
    }

    setLoadings({lista:false,factura:true,devolucion:true});
  }, [desdeFecha, hastaFecha, filtro]);




  useEffect(() => {
    const ca = new AbortController();
    let isActive = true;
    if(isActive){
      getLista();}
    return ()=>{isActive = false;ca.abort();}}, [getLista]);


const values = {
  lista,devolucion,statusDevolucion,setStatusDevolucion,finalizarDevolucion,
  setLista,
  desdeFecha,
  setDesdeFecha,
  hastaFecha,
  setHastaFecha,
  loadings,setLoadings,
  lang,
  total,
  setTotal,
  dialogs,setDialogs,
  formulario,
  setFormulario,
  fecha,
  filtro,
  funciones,
  setFiltro,
  inputSearch,
  setInputSearch,
  getBuscarFactura,
  consultarParaImprimir,
  itemsFactura,setItemsFactura
}
  return <Context.Provider value={values}>{children}</Context.Provider>
};

export const useFacturas = () => {
  const {
    lista,devolucion,statusDevolucion,setStatusDevolucion,finalizarDevolucion,
    setLista,
    desdeFecha,
    setDesdeFecha,
    hastaFecha,
    setHastaFecha,
    loadings,setLoadings,
    lang,
    total,
    setTotal,
    dialogs,setDialogs,
    formulario,
    setFormulario,
    fecha,
    filtro,
    funciones,
    setFiltro,
    inputSearch,
    setInputSearch,
    getBuscarFactura,
    consultarParaImprimir,
    itemsFactura,setItemsFactura
  } = useContext(Context);

  return {
    lista,devolucion,statusDevolucion,setStatusDevolucion,finalizarDevolucion,
    setLista,
    desdeFecha,
    setDesdeFecha,
    hastaFecha,
    setHastaFecha,
    loadings,setLoadings,
    lang,
    total,
    setTotal,
    dialogs,setDialogs,
    formulario,
    setFormulario,
    fecha,
    filtro,
    funciones,
    setFiltro,
    inputSearch,
    setInputSearch,
    getBuscarFactura,
    consultarParaImprimir,
    itemsFactura,setItemsFactura
  };
};

export default FacturasProvider;
