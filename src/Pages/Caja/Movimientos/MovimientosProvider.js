import {useContext,createContext,useState,useEffect,useCallback} from "react";
import {useLang} from "../../../Contexts/LangProvider"
import { APICALLER } from "../../../Services/api";
import { funciones } from "../../../Functions";
import useInitialState from "./useInitialState";

const Contexto = createContext();

const MovimientosProvider = ({ children }) => {
  const {columnsTable} = useInitialState()
  const [cargando, setCargando] = useState(true);
  const {lang} = useLang();
  const initialForm = {
    nombre_caja:"",
    id_cajas_movimiento:"",
    nombre_user:"",
    tipo_registro:"",
    fecha_movimiento:"",
    monto_movimiento:"",
    monto_sin_efectivo:"",
    descripcion_registro:"",
    detalles_movimiento:"",
  };
  const [form, setForm] = useState(initialForm);
  const fecha = funciones.fechaActualYMD();
  const [desdeFecha, setDesdeFecha] = useState(fecha);
  const [hastaFecha, setHastaFecha] = useState(fecha);

  const initialDialog = {registrar:false,detalles:false}
  const [dialog, setDialog] = useState(initialDialog);
  const [lista, setLista] = useState([]);
  const [listaCajas, setListaCajas] = useState([]);
  const [idCaja, setIdCaja] = useState("");
  const [dataPrint,setDataPrint]= useState({
    headers:columnsTable,
    datas:[]
  })
  const [tipoRegistro,setTipoRegistro] = useState("");
  const [monedaFilter,setMonedaFilter] = useState("");
  const [listaMonedas,setListaMonedas] = useState([]);

  const initialIngresos = {
    ingresoEfectivo: 0,
    ingresoSinEfectivo: 0,
    ingresoTotal: 0,
    egresos: 0,
    totalCaja:0
  };
  const [movimientos,setMovimientos] = useState(initialIngresos);


  const getFilterDatas = useCallback(async(filters)=>{

  },[])

  
  const getData = useCallback(async () => {
    setCargando(true);
    const storeMonedas = localStorage.getItem("dataMonedas");
    const existIDCaja = idCaja !== "" ? `,and,id_caja,=,${idCaja}` : "";
    const filterCajaMoneda = idCaja !== "" ? `id_caja_moneda,=,${idCaja}` : "";
    const tipo_Registro = tipoRegistro !== "" ? `,and,tipo_registro,=,${tipoRegistro}` : "";
    const monedafiltrada = monedaFilter !== "" ? `,and,id_moneda_movimiento,=,${monedaFilter}` : "";

    let promises = [
      APICALLER.get({table:'cajas_monedas',where:`${filterCajaMoneda}`,fields:`SUM(	monto_caja_moneda) as monto_total`}),
      APICALLER.get({
      table: "cajas_movimientos",
      include: "cajas,cajas_registros,users",
      on: "id_caja,id_caja_movimiento,id_cajas_registro,id_tipo_registro,id_user,id_user_movimiento",
      fields: `nombre_caja,id_cajas_movimiento,nombre_user,tipo_registro,fecha_movimiento,monto_movimiento,monto_sin_efectivo,descripcion_registro,detalles_movimiento`,
      where: `fecha_movimiento,between,'${desdeFecha} 00:00:00',and,'${hastaFecha} 23:59:59'${existIDCaja} ${tipo_Registro} ${monedafiltrada}`,
      sort: "-fecha_movimiento",
    })]

    if(storeMonedas){
      setListaMonedas(JSON.parse(storeMonedas))
    }
    else{
      promises.push(APICALLER.get({table:"monedas"}));
    }

    let getpromises = await Promise.all(promises);
    const res = getpromises[1];
    const montoCaja = getpromises[0];
    if (res.response) {
      setLista(res.results);
      let efectivo = 0;
      let egresosE = 0;
      let sinEfectivo = 0;
      let total = 0;
      let dataPrinter = []
      res.results.forEach(e => {
        if (e.tipo_registro === "1") {
          sinEfectivo += parseFloat(e.monto_sin_efectivo);
          efectivo += parseFloat(e.monto_movimiento);
          total += parseFloat(e.monto_movimiento) + parseFloat(e.monto_sin_efectivo);
          dataPrinter.push({...e, tipo_registro:'Ingreso',
          monto_movimiento: funciones.numberFormat(e.monto_movimiento),monto_sin_efectivo:funciones.numberFormat(e.monto_sin_efectivo)})
        } else if (e.tipo_registro === "0") {
          egresosE += parseFloat(e.monto_movimiento);
          dataPrinter.push({...e, tipo_registro:'Egreso',monto_movimiento: funciones.numberFormat(e.monto_movimiento)})
        }
      });
      dataPrinter.push({
        fecha_movimiento:'TOTAL INGRESOS',tipo_registro:'',nombre_caja:'',detalles_movimiento:'', 
        monto_movimiento:funciones.numberFormat(efectivo),monto_sin_efectivo: funciones.numberFormat(sinEfectivo)
      },{
        fecha_movimiento:'TOTAL EGRESOS',tipo_registro:'',nombre_caja:'',detalles_movimiento:'', 
        monto_movimiento:funciones.numberFormat(egresosE),monto_sin_efectivo:0
      },
      
      )
      setDataPrint(prev=> {  return {...prev, datas:dataPrinter} })
    
      setMovimientos({
        ingresoEfectivo: efectivo,
        ingresoSinEfectivo: sinEfectivo,
        ingresoTotal: total,
        egresos: egresosE,
        totalCaja: montoCaja.first.monto_total ?? 0
      });
      promises.length>2 && setListaMonedas(promises[2].results)
    } else {
      console.log(res);
    }
    setCargando(false);
  }, [idCaja, desdeFecha, hastaFecha,tipoRegistro,monedaFilter]);



  const getCajas = useCallback(async () => {
    let cajas = await APICALLER.get({
      table: `cajas`,
      fields: `id_caja,nombre_caja`,
    });
    cajas.response ? setListaCajas(cajas.results) : console.log(cajas);
  }, []);


  useEffect(() => {
    const ca = new AbortController();
    let isActive = true;
    if (isActive) {
      getData();
      getCajas();
    }

    return () => {isActive = false; ca.abort();};
  }, [getData, getCajas]);

  const values = {lang,getFilterDatas,
    cargando,
    setCargando,
    desdeFecha,
    setDesdeFecha,
    hastaFecha,
    setHastaFecha,
    dialog,
    setDialog,
    fecha,
    setLista,
    lista,
    listaCajas,
    setListaCajas,
    idCaja,
    setIdCaja,setTipoRegistro,
    getData,
    movimientos,
    form, setForm,initialForm,listaMonedas,setMonedaFilter,dataPrint
  }

  return <Contexto.Provider value={values}>{children}</Contexto.Provider>

  
};

export const useMovimientos = () => {
  const {lang,getFilterDatas,
    cargando,
    setCargando,
    desdeFecha,
    setDesdeFecha,
    hastaFecha,
    setHastaFecha,
    dialog,
    setDialog,
    fecha,
    setLista,
    lista,
    listaCajas,
    setListaCajas,
    idCaja,
    setIdCaja,setTipoRegistro,
    getData,
    movimientos,form, setForm,initialForm,listaMonedas,setMonedaFilter,dataPrint
  } = useContext(Contexto);
  return {lang,getFilterDatas,
    cargando,
    setCargando,
    desdeFecha,
    setDesdeFecha,
    hastaFecha,
    setHastaFecha,
    dialog,
    setDialog,
    fecha,
    setLista,
    lista,
    listaCajas,
    setListaCajas,
    idCaja,setTipoRegistro,
    setIdCaja,
    getData,
    movimientos,form, setForm,initialForm,listaMonedas,setMonedaFilter,dataPrint
  };
};

export default MovimientosProvider;
