import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
import { APICALLER } from "../../../Services/api";
import { funciones } from "../../../Functions";

const Contexto = createContext();

const InformesProvider = ({ children }) => {
  
  const date = new Date();
  
  const [cargando, setCargando] = useState(true);
  const [lista, setLista] = useState([]);
  const [listaMensual, setListaMensual] = useState([]);
  const [mesState,setMesState] = useState(date.getFullYear().toString() +"-" +(date.getMonth() + 1).toString().padStart(2, 0));

  //const [listaCajas,setListaCajas] = useState([]);

  const fechaHoy = funciones.fechaEs();
  const [fechaMostrar, setFechaMostrar] = useState(fechaHoy);
  

  const fecha = date.getFullYear().toString() +"-" +(date.getMonth() + 1).toString().padStart(2, 0) +"-" +date.getDate().toString().padStart(2, 0);

  const mesActual = mesState +"-" +"01".toString();
  
  const [tipoIngreso,setTipoIngreso] = useState(""); // efectivo, no efectivo, sin filtro
  const [ingresosDia, setIngresosDia] = useState(0);
  const [ingresosMes, setIngresosMes] = useState(0);
  const [egresosDia, setEgresosDia] = useState(0);
  const [egresosMes, setEgresosMes] = useState(0);

  const [datosIngresosDiariosMes, setDatosIngresosDiariosMes] = useState([]);
  const [datosEgresosDiariosMes, setDatosEgresosDiariosMes] = useState([]);
  const [labelDiarioMes, setLabelDiarioMes] = useState([]);




  const getDatas = useCallback(async () => {
    setCargando(true)
    // RESULTADO DIARIO
    /************
      PARA LABEL 
      *****************/
      const fechaparalabel = new Date(mesState);
      let meslabel = fechaparalabel.getMonth() + 2;
      let anolabel = fechaparalabel.getFullYear();
      let diaslabel = funciones.getDaysInMonth(anolabel,meslabel);
      var now = new Date(anolabel, fechaparalabel.getMonth() + 1, diaslabel); // ejemplo: hasta 31 de octubre
      let fd = new Date(now)
      let fecha_hasta = fd.getFullYear().toString() +"-" +(fd.getMonth() + 1).toString().padStart(2, 0) +"-" +fd.getDate().toString().padStart(2, 0);

    let promesa = await Promise.all([APICALLER.get({
      table: "cajas_movimientos",include:"cajas_registros",
      on: "id_tipo_registro,id_cajas_registro",
      fields: `*`,
      where: `fecha_movimiento,between,'${fecha} 00:00:00',and,'${fecha} 23:59:59'`,
    }),APICALLER.get({
      table: "cajas_movimientos",include:"cajas_registros",
      on: "id_tipo_registro,id_cajas_registro",
      where: `fecha_movimiento,between,'${mesActual} 00:00:00',and,'${fecha_hasta} 23:59:59'`,
    })])
    //console.log(promesa);
    let res = promesa[0];
    if (res.response ) {
      let sumaIngresoDia = 0;
      let sumaEgresoDia = 0;
      setLista(res.results);  
      //console.log(res.results);  
      res.results.forEach((item) => {
        if (item.tipo_registro === "1") {
          if(tipoIngreso === ""){
            sumaIngresoDia += parseFloat(item.monto_movimiento) + parseFloat(item.monto_sin_efectivo);
          }
          else if(tipoIngreso === "1"){
            sumaIngresoDia += parseFloat(item.monto_movimiento)
          }
          else{
            sumaIngresoDia += parseFloat(item.monto_sin_efectivo);
          }

        } else if (item.tipo_registro === "0") {
          sumaEgresoDia += parseFloat(item.monto_movimiento);
        }
      });
      setIngresosDia(sumaIngresoDia);
      setEgresosDia(sumaEgresoDia);
    } else {
      console.log(res);
    }

    
    
    
      // RESULTADO DE MES
    const resm = promesa[1];

    if (resm.response ) {
      setListaMensual(resm.results);
      let datosIngresos = [];
      let datosEgresos = [];
      let result = resm.results;
      let countResult = result.length;
      let indice = 0;

      
      
      let fecha_mostrar = "";
      let sw = true;
      let label_array = [];
      let indice_label = 0;
      let sumaEgresosTotalMes = 0;
      let sumaIngresosTotalMes = 0;
      let indiceparalabel = 1;
      for (let d = new Date(mesActual);d <= new Date(fecha_hasta) ;d.setDate(d.getDate() + 1)) {
        fecha_mostrar =
          d.getFullYear().toString() +"-" +(d.getMonth() + 1).toString().padStart(2, 0) +"-" +d.getDate().toString().padStart(2, 0);
        label_array.push(indiceparalabel.toString().padStart(2, 0));
        indiceparalabel++;
        
        let suma_diariosEgresos = 0;
        let suma_diariosIngresos = 0;

        while (sw && countResult > 0 && indice < countResult) {
          let fecha_comparar = result[indice].fecha_movimiento.substr(0, 10);
          let tipo_registro = parseInt(result[indice].tipo_registro);
          if (fecha_comparar === fecha_mostrar) {
            if (tipo_registro === 1) {
              if(tipoIngreso === ""){
                suma_diariosIngresos += parseFloat(result[indice].monto_movimiento) + parseFloat(result[indice].monto_sin_efectivo);
                sumaIngresosTotalMes += parseFloat(result[indice].monto_movimiento) + parseFloat(result[indice].monto_sin_efectivo);
              }
              else if(tipoIngreso === "1"){
                suma_diariosIngresos += parseFloat(result[indice].monto_movimiento) 
                sumaIngresosTotalMes += parseFloat(result[indice].monto_movimiento)
              }
              else{
                suma_diariosIngresos +=  parseFloat(result[indice].monto_sin_efectivo);
                sumaIngresosTotalMes +=  parseFloat(result[indice].monto_sin_efectivo);
              }
              
            } else if (tipo_registro === 0) {
              suma_diariosEgresos += parseFloat(result[indice].monto_movimiento);
              sumaEgresosTotalMes += parseFloat(result[indice].monto_movimiento);
            }
            indice++;
          } else {
            sw = false;
          }
        }

        datosIngresos[indice_label] = suma_diariosIngresos;
        datosEgresos[indice_label] = suma_diariosEgresos*(-1);

        sw = true;
        indice_label++;
      }
      
      setLabelDiarioMes(label_array);
      setIngresosMes(sumaIngresosTotalMes);
      setDatosIngresosDiariosMes(datosIngresos);
      setDatosEgresosDiariosMes(datosEgresos);

      setEgresosMes(sumaEgresosTotalMes);
    } else {
      console.log(res);
    }
    setCargando(false)
  }, [mesActual, fecha,mesState,tipoIngreso]);

  
  useEffect(() => {
    let isActive = true;
    const ca = new AbortController()
    if(isActive){
      getDatas();
    }
    return () => {isActive = false;ca.abort();};
  }, [getDatas]);

  return (
    <Contexto.Provider
      value={{
        cargando,
        setCargando,
        lista,
        setLista,listaMensual, setListaMensual,
        ingresosDia,
        ingresosMes,
        egresosDia,
        egresosMes,
        datosEgresosDiariosMes,
        datosIngresosDiariosMes,
        labelDiarioMes,
        fechaMostrar,setFechaMostrar,mesState,setMesState,tipoIngreso,setTipoIngreso
      }}
    >
      {children}
    </Contexto.Provider>
  );
};

export const useInformes = () => {
  const {
    cargando,
    setCargando,
    lista,listaMensual, setListaMensual,
    setLista,
    ingresosDia,
    ingresosMes,
    egresosDia,
    egresosMes,
    datosEgresosDiariosMes,
    datosIngresosDiariosMes,
    labelDiarioMes,fechaMostrar,setFechaMostrar,mesState,setMesState,tipoIngreso,setTipoIngreso
  } = useContext(Contexto);
  return {
    cargando,
    setCargando,
    lista,listaMensual, setListaMensual,
    setLista,
    ingresosDia,
    ingresosMes,
    egresosDia,
    egresosMes,
    datosEgresosDiariosMes,
    datosIngresosDiariosMes,
    labelDiarioMes,fechaMostrar,setFechaMostrar,mesState,setMesState,tipoIngreso,setTipoIngreso
  };
};

export default InformesProvider;
