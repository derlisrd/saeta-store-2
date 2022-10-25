import {useEffect,useContext,createContext,useState,useCallback} from "react";
import { APICALLER } from "../../../Services/api";
import { funciones } from "../../../Functions";
import { useLang } from "../../../Contexts/LangProvider";

const Context = createContext();

const FacturasProvider = ({ children }) => {
  const {lang} = useLang()
  const [lista, setLista] = useState([]);
  const [total, setTotal] = useState({
    facturas:0,
    descuentos:0
  });
  const [dialogs,setDialogs] = useState({
    estado: false,
    imprimir:false,
    imprimirFactura:false,
    imprimirRecibo:false,
  })



  let fecha = funciones.fechaActualYMD();
  const [cargando, setCargando] = useState(true);
  const [cargandoFactura,setCargandoFactura] = useState(true);
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
    setCargandoFactura(true);
    
     if(fila.tipo_factura==="0"){
      setDialogs({...dialogs,imprimirRecibo:true})
    }
    else{
      setDialogs({...dialogs,imprimirFactura:true})
    }

    
    var resF = await APICALLER.get({table:'facturas_items',include:'productos,impuestos',
    on:'id_producto,id_producto_factura,id_impuesto,id_impuesto_factura',
    where:`id_items_factura,=,${fila.id_factura}`});
    
    resF.response ? setItemsFactura(resF.results) : console.log(resF);
    
    if(fila.tipo_factura!=="0"){ 
      let res = await APICALLER.get({table:'empresa_facturas',where:`id_caja_empresa,=,${fila.id_caja_factura}`});
      if(res.response) {
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
    setCargandoFactura(false);  
  }





  const getBuscarFactura = useCallback(async () => {
    setCargando(true);
    let res = await APICALLER.get({
      table: "facturas",include:"clientes,monedas,users",
      on: `id_cliente_factura,id_cliente,id_moneda,id_moneda_factura,id_user,id_user_factura`,
      fields: `descuento_factura,valor_moneda_factura,nro_factura,abreviatura_moneda,nombre_moneda,abreviatura_moneda,valor_moneda,estado_factura,fecha_factura,fecha_cobro_factura,ruc_cliente,nombre_cliente,direccion_cliente,monto_total_factura,tipo_factura,id_factura,nombre_user,id_caja_factura,obs_factura,descuento_factura`,
      filtersField:"nro_factura",filtersSearch:inputSearch,
      pagenumber:0,pagesize:10,
    });
    //console.log(res);
    if (res.response ) {
      
      let arrayresult = [...res.results]
      let newresult = [];
      let suma = 0;
      let totaldescuentos = 0;
      arrayresult.forEach((elem) => {
        suma += parseFloat(elem.monto_total_factura);
        totaldescuentos += parseFloat(elem.descuento_factura);
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
    setCargando(false);
  }, [inputSearch]);





  const getLista = useCallback(async () => {
    setCargando(true);
    

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
      fields: `descuento_factura,valor_moneda_factura,nro_factura,abreviatura_moneda,nombre_moneda,abreviatura_moneda,valor_moneda,estado_factura,fecha_factura,fecha_cobro_factura,ruc_cliente,nombre_cliente,direccion_cliente,monto_total_factura,tipo_factura,id_factura,nombre_user,id_caja_factura,obs_factura,descuento_factura`,
      where: `fecha_factura,between,'${desdeFecha} 00:00:00',and,'${hastaFecha} 23:59:59' ${moreFilter}`,
      sort: `fecha_factura`,
    });

    
    if (res.response ) {
      
      let arrayresult = [...res.results]
      let newresult = [];
      let suma = 0;
      let totaldescuentos = 0;
      arrayresult.forEach((elem) => {
        suma += parseFloat(elem.monto_total_factura);
        totaldescuentos += parseFloat(elem.descuento_factura);
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

    setCargando(false);
  }, [desdeFecha, hastaFecha, filtro]);




  useEffect(() => {
    const ca = new AbortController();
    let isActive = true;
    if(isActive){
      getLista();
    }

    return ()=>{
      isActive = false;
      ca.abort();
    }
  }, [getLista]);



  return (
    <Context.Provider
      value={{
        lista,
        setLista,
        desdeFecha,
        setDesdeFecha,
        hastaFecha,
        setHastaFecha,
        cargando,
        setCargando,
        cargandoFactura,
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useFacturas = () => {
  const {
    lista,
    setLista,
    desdeFecha,
    setDesdeFecha,
    hastaFecha,
    setHastaFecha,
    cargando,
    setCargando,
    cargandoFactura,
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
    lista,
    setLista,
    desdeFecha,
    setDesdeFecha,
    hastaFecha,
    setHastaFecha,
    cargando,
    setCargando,
    cargandoFactura,
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
