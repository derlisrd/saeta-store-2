import {useCallback,useEffect,useState,useContext,createContext} from 'react'
import { APICALLER } from '../../../Services/api'


const Contexto = createContext()

const RecetasProvider = ({children}) => {

    const initialDialogs = {
        add:false,
        registrarCliente:false,
        detalles:false
    }

    const initialDetalles = {
      nombre_cliente:"",
      ruc_cliente:"",
      lejos_esfe_od:"0",
      lejos_esfe_oi:"0",
      lejos_cili_od:"0",
      lejos_cili_oi:"0",
      lejos_eje_od:"0",
      lejos_eje_oi:"0",
  
      cerca_esfe_od:"0",
      cerca_esfe_oi:"0",
      cerca_cili_od:"0",
      cerca_cili_oi:"0",
      cerca_eje_od:"0",
      cerca_eje_oi:"0",
      
      adicion_od:"",
      adicion_oi:"",
      obs_receta:""
    }

    const initialFormCliente = {
      cliente_id_receta:"",
      nombre:"",
      doc:"",
      tel:"",
      active:false
    }
    const [detalles,setDetalles] = useState(initialDetalles)
    const [formCliente,setFormCliente] = useState(initialFormCliente)
    const [dialogs,setDialogs] = useState(initialDialogs)
    const [loadings,setLoadings] = useState({lista:true})
    const [listas,setListas] = useState({
      recetas:[]
    })


    const getData = useCallback(async () => {
        //setLoadings(prev=>{return {...prev, lista:false}})
        setLoadings({lista:true})
        let res = await APICALLER.get({table:'recetas',on:'cliente_id_receta,id_cliente',include:'clientes',
        fields:`ruc_cliente,nombre_cliente,id_receta,telefono_cliente,recetas.updated_at,lejos_esfe_od,lejos_esfe_oi,lejos_cili_od,lejos_cili_oi,lejos_eje_od,lejos_eje_oi,cerca_esfe_od,cerca_esfe_oi,cerca_cili_od,cerca_cili_oi,cerca_eje_od,cerca_eje_oi,adicion_od,adicion_oi,obs_receta`})
        res.response ? setListas({recetas:res.results}) : console.log(res)
        setLoadings({lista:false})
      }, []);
    

      

    useEffect(() => {
    let isActive = true; const ca = new AbortController();
    if (isActive) {getData();}
    return () => { isActive = false; ca.abort(); };
    }, [getData]);

    const values = {
      loadings,dialogs,setDialogs,listas,formCliente,setFormCliente,getData,detalles,setDetalles
    }

  return <Contexto.Provider value={values}>{children}</Contexto.Provider>
}

export const useRecetas = ()=>{
    const {loadings,dialogs,setDialogs,listas,formCliente,setFormCliente,getData,detalles,setDetalles} = useContext(Contexto)
    return {loadings,dialogs,setDialogs,listas,formCliente,setFormCliente,getData,detalles,setDetalles}
}

export default RecetasProvider
