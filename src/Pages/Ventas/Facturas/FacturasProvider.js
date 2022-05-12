import {
  useEffect,
  useContext,
  createContext,
  useState,
  useCallback,
} from "react";
import { APICALLER } from "../../../Api/ApiCaller";
import { Funciones } from "../../../Funciones/Funciones";

const Context = createContext();

const FacturasProvider = ({ children }) => {
  const [lista, setLista] = useState([]);

  const [total, setTotal] = useState(0);
  

  

  const [dialogs,setDialogs] = useState({
    estado: false,
    imprimir:false,
    imprimirFactura:false,
    imprimirRecibo:false,
  })



  let fecha = Funciones.fechaActualYMD();
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
    
    resF.response==="ok" ? setItemsFactura(resF.results) : console.log(resF);
    
    if(fila.tipo_factura!=="0"){ 
      let res = await APICALLER.get({table:'empresa_facturas',where:`id_caja_empresa,=,${fila.id_caja_factura}`});
      if(res.response==="ok") {
        let ef = res.results[0];
        let form = {...fila}
        form.timbrado_factura = ef.timbrado_factura;
        form.fin_timbrado= ef.fin_timbrado;
        form.inicio_timbrado= ef.inicio_timbrado;
        form.nro_datos_factura = ef.nro_datos_factura;
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
      fields: `nro_factura,abreviatura_moneda,nombre_moneda,abreviatura_moneda,valor_moneda,estado_factura,fecha_factura,fecha_cobro_factura,ruc_cliente,nombre_cliente,direccion_cliente,monto_total_factura,tipo_factura,id_factura,nombre_user,obs_factura,descuento_factura`,
      filtersField:"nro_factura",filtersSearch:inputSearch,
      pagenumber:0,pagesize:10,
    });
    //console.log(res);
    if (res.response === "ok") {
      setLista(res.results);
      let suma = 0;
      res.results.forEach((element) => {
        suma += parseFloat(element.monto_total_factura);
      });
      setTotal(suma);
    } else {
      console.log(res);
    }
    setCargando(false);
  }, [inputSearch]);





  const getLista = useCallback(async () => {
    setCargando(true);
    var moreFilter="";
    if(filtro==="0"){
      moreFilter = ",and,tipo_factura,=,0";
    }else if (filtro === "1") {
      moreFilter = ",and,tipo_factura,=,1";
    } else if (filtro === "2") {
      moreFilter = ",and,tipo_factura,=,2";
    } else if (filtro === "3") {
      moreFilter =",and,estado_factura,=,1";
    } else if (filtro === "4") {
      moreFilter =",and,estado_factura,=,2";
    }
    

    const res = await APICALLER.get({
      table: "facturas",include:"clientes,monedas,users",
      on: `id_cliente_factura,id_cliente,id_moneda,id_moneda_factura,id_user,id_user_factura`,
      fields: `nro_factura,abreviatura_moneda,nombre_moneda,abreviatura_moneda,valor_moneda,estado_factura,fecha_factura,fecha_cobro_factura,ruc_cliente,nombre_cliente,direccion_cliente,monto_total_factura,tipo_factura,id_factura,nombre_user,id_caja_factura,obs_factura,descuento_factura`,
      where: `fecha_factura,between,'${desdeFecha} 00:00:00',and,'${hastaFecha} 23:59:59' ${moreFilter}`,
      sort: `fecha_factura`,
    });

    
    if (res.response === "ok") {
      setLista(res.results);
      let suma = 0;
      res.results.forEach((element) => {
        suma += parseFloat(element.monto_total_factura);
      });
      setTotal(suma);
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
        total,
        setTotal,
        dialogs,setDialogs,
        formulario,
        setFormulario,
        fecha,
        filtro,
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
    total,
    setTotal,
    dialogs,setDialogs,
    formulario,
    setFormulario,
    fecha,
    filtro,
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
    total,
    setTotal,
    dialogs,setDialogs,
    formulario,
    setFormulario,
    fecha,
    filtro,
    setFiltro,
    inputSearch,
    setInputSearch,
    getBuscarFactura,
    consultarParaImprimir,
    itemsFactura,setItemsFactura
  };
};

export default FacturasProvider;
