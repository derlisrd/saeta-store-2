import React,{createContext,useContext,useEffect,useCallback,useState} from 'react'
import swal from 'sweetalert';
import { useLogin } from '../../../Contextos/LoginProvider';
import { Funciones } from '../../../Funciones/Funciones';
import { APICALLER } from '../../../Services/api';


const AsistenciaContext = createContext();

const AsistenciasProvider = ({children}) => {
    const {token_user} = useLogin();
    const [lista,setLista] = useState([]);
    const [listaAsistencia,setListaAsistencia]= useState([]);
    const [asistencia,setAsistencia] = useState([]);
    const [cargando,setCargando]= useState(true);
    const today = Funciones.fechaActualYMD();
    const [fechaActual,setFechaActual]= useState(today);
    const [tabValue,setTabValue] = useState(0);
    const [tomado,setTomado] = useState(false);
    
    const getLista = useCallback(async()=>{
      let res = await Promise.all([
        APICALLER.get({table:"alumnos"}),
        APICALLER.get({table:"asistencias",include:"alumnos",on:"id_alumno,id_alumno_asistencia",where:`fecha_asistencia,=,'${fechaActual}'`})
      ])
      res[0].response ? setLista(res[0].results) : console.log(res);
      res[1].response ? setListaAsistencia(res[1].results) : console.log(res);
      if(res[1].found>0){
        setTomado(true);
      }else{
        setTomado(false)
      }
      setCargando(false)
    },[fechaActual])

    const GuardarAsistencia = async()=>{
      let e = await swal({
        icon: "warning",
        title: "Confirmar?",
        text: `Desea confirmar la asistencia?`,
        buttons: [`Cancelar`, `Ok`]
      });
      
      if(e){
         let inserts = [];
         asistencia.forEach(e=> inserts.push(APICALLER.insert({table:"asistencias",token:token_user,data:e})));
         Promise.all(inserts);
         setTomado(true);
      }
      
    }

    useEffect(() => {
        let isActive = true; const ca = new AbortController();
        if(isActive){
          getLista();
        }
        return ()=> {isActive = false;ca.abort();}
      }, [getLista]);


  return (
    <AsistenciaContext.Provider value={{ lista,listaAsistencia,getLista,cargando,asistencia,setAsistencia,GuardarAsistencia,fechaActual,setFechaActual,tomado,tabValue,setTabValue}}>
      {children}
    </AsistenciaContext.Provider>
  )
}


export const useAsistencia = ()=>{
    const {lista,listaAsistencia,getLista,cargando,asistencia,setAsistencia,GuardarAsistencia,fechaActual,setFechaActual,tomado,tabValue,setTabValue} = useContext(AsistenciaContext);
    return {lista,listaAsistencia,getLista,cargando,asistencia,setAsistencia,GuardarAsistencia,fechaActual,setFechaActual,tomado,tabValue,setTabValue}
}


export default AsistenciasProvider
