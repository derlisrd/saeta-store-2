import {useState,useEffect,useContext,createContext,useCallback,useRef} from "react";
import { useLang } from "../../../Contexts/LangProvider";
import { APICALLER } from "../../../Services/api";

const Contexto = createContext();

const EntregasProvider = ({ children }) => {
  const {lang} = useLang()
  const [cargando, setCargando] = useState(false);
  const [lista, setLista] = useState([]);
  const [listaPendientes,setListaPendientes] = useState([]);
  const nroFactura = useRef(null)
  const [error,setError] = useState({
    error:false,
    msj: "",
  })
  const [tipoFactura,setTipoFactura] = useState("1")

  const getFactura = useCallback(async () => {
    setCargando(true)
    let nro = parseInt(nroFactura.current.value);
    if(!isNaN(nro)){
      // TIPO FACTURA O RECIBO
       
        let res = await APICALLER.get({
            table: "facturas_items",include:"facturas,clientes,productos",
            on: "id_factura,id_items_factura,id_cliente,id_cliente_factura,id_producto,id_producto_factura",
            where:`nro_factura,=,${nro},and,tipo_producto,=,1,and,tipo_factura,=,${tipoFactura},and,entregado_item,=,0`
          }); 
          if(res.response) {
             setLista(res.results) 
          }
          else{
            console.log(res)
          }

    } 
    setCargando(false)
  }, [tipoFactura]);

  const getPendientes = useCallback(async()=>{
    let res = await APICALLER.get({table:'facturas_items',include:'productos,facturas',on:'id_producto,id_producto_factura,id_factura,id_items_factura',
    where:'entregado_item,=,0',fields:'codigo_producto,cantidad_producto,nombre_producto,entregado_item,nro_factura'})
    if(res.response) {
      setListaPendientes(res.results) 
   }
   else{
     console.log(res)
   }
  },[])


  useEffect(() => {
    const ca = new AbortController()
    let isActive = true;
    if(isActive){
      getPendientes()
    }
    return ()=>{
      isActive = false;
      ca.abort();
    }
  }, [getPendientes]);

  return (
    <Contexto.Provider value={{lang, cargando, setCargando, lista, setLista,getFactura,nroFactura,error,setError,tipoFactura,setTipoFactura,listaPendientes,setListaPendientes}}>
      {children}
    </Contexto.Provider>
  );
};

export const useEntregas = () => {
  const {lang, cargando, setCargando, lista, setLista, getFactura,nroFactura,error,setError,tipoFactura,setTipoFactura,listaPendientes,setListaPendientes } = useContext(Contexto);
  return {lang, cargando, setCargando, lista, setLista, getFactura,nroFactura,error,setError,tipoFactura,setTipoFactura,listaPendientes,setListaPendientes };
};

export default EntregasProvider;
