import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { APICALLER } from "../../../Api/ApiCaller";
import { Funciones } from "../../../Funciones/Funciones";

const Contexto = createContext();

const MovimientosProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);

  const fecha = Funciones.fechaActualYMD();
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
  const [desdeFecha, setDesdeFecha] = useState(fecha);
  const [hastaFecha, setHastaFecha] = useState(fecha);
  const initialDialog = {registrar:false,detalles:false}
  const [dialog, setDialog] = useState(initialDialog);
  const [lista, setLista] = useState([]);
  const [listaCajas, setListaCajas] = useState([]);
  const [idCaja, setIdCaja] = useState("");
  const [tipoRegistro,setTipoRegistro] = useState("");

  const initialIngresos = {
    ingresoEfectivo: 0,
    ingresoSinEfectivo: 0,
    ingresoTotal: 0,
    egresos: 0,
  };
  const [movimientos,setMovimientos] = useState(initialIngresos);

  const getData = useCallback(async () => {
    setCargando(true);
    const existIDCaja = idCaja !== "" ? `,and,id_caja,=,${idCaja}` : "";
    const tipo_Registro = tipoRegistro !== "" ? `,and,tipo_registro,=,${tipoRegistro}` : "";
    const res = await APICALLER.get({
      table: "cajas_movimientos",
      include: "cajas,cajas_registros,users",
      on: "id_caja,id_caja_movimiento,id_cajas_registro,id_tipo_registro,id_user,id_user_movimiento",
      fields: `nombre_caja,id_cajas_movimiento,nombre_user,tipo_registro,fecha_movimiento,monto_movimiento,monto_sin_efectivo,descripcion_registro,detalles_movimiento`,
      where: `fecha_movimiento,between,'${desdeFecha} 00:00:00',and,'${hastaFecha} 23:59:59'${existIDCaja} ${tipo_Registro}`,
      sort: "-fecha_movimiento",
    });

    if (res.response === "ok") {
      setLista(res.results);
      let efectivo = 0;
      let egresosE = 0;
      let sinEfectivo = 0;
      let total = 0;
      res.results.forEach(e => {
        if (e.tipo_registro === "1") {
          sinEfectivo += parseFloat(e.monto_sin_efectivo);
          efectivo += parseFloat(e.monto_movimiento);
          total += parseFloat(e.monto_movimiento) + parseFloat(e.monto_sin_efectivo);
        } else if (e.tipo_registro === "0") {
          egresosE += parseFloat(e.monto_movimiento);
        }
      });
      setMovimientos({
        ingresoEfectivo: efectivo,
        ingresoSinEfectivo: sinEfectivo,
        ingresoTotal: total,
        egresos: egresosE,
      });
      
    } else {
      console.log(res);
    }
    setCargando(false);
  }, [idCaja, desdeFecha, hastaFecha,tipoRegistro]);

  const getCajas = useCallback(async () => {
    let cajas = await APICALLER.get({
      table: `cajas`,
      fields: `id_caja,nombre_caja`,
    });
    cajas.response === "ok" ? setListaCajas(cajas.results) : console.log(cajas);
  }, []);

  useEffect(() => {
    const ca = new AbortController();
    let isActive = true;
    if (isActive) {
      getData();
      getCajas();
    }

    return () => {
      isActive = false;
      ca.abort();
    };
  }, [getData, getCajas]);

  return (
    <Contexto.Provider
      value={{
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
        form, setForm,initialForm
      }}
    >
      {children}
    </Contexto.Provider>
  );
};

export const useMovimientos = () => {
  const {
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
    movimientos,form, setForm,initialForm
  } = useContext(Contexto);
  return {
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
    movimientos,form, setForm,initialForm
  };
};

export default MovimientosProvider;
