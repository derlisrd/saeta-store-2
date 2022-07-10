import  { createContext, useContext, useState,useCallback,useEffect } from 'react';
import { useLang } from '../../../Contexts/LangProvider';
import { APICALLER } from '../../../Services/api';
import { funciones } from '../../../Functions';

const Contexto = createContext();

function InformesProductosProvider({children}) {
    
    const {lang} = useLang()
    

    const initialLoadings = {
        general:false,
        listas:true
    }

    const initialListas = {
        lista: []
    }

    const initialFechas = {
        desde: funciones.fechaActualYMD(),
        hasta:funciones.fechaActualYMD()
    }

    const [fechas,setFechas] = useState(initialFechas)

    const [loadings,setLoadings] = useState(initialLoadings)
    const [listas,setListas] = useState(initialListas)
    
    
    const getData = useCallback(async()=>{
        setLoadings({listas:true})
        let res = await APICALLER.get({table:"productos_vendidos",include:"productos",on:"id_producto,id_producto_vendido",
        fields:"id_producto_vendido,nombre_producto,fecha_vendido,precio_vendido,costo_producto_vendido,cantidad_vendido",
        where:`fecha_vendido,between,'${fechas.desde} 00:00:00',and,'${fechas.hasta} 23:59:59'`});
        res.response==="ok" ? setListas({lista:res.results}) : console.log(res);
        setLoadings({listas:false})
    },[fechas])
    
    useEffect(() => {
        const ca = new AbortController();
        let isActive = true;
        if (isActive) {
          getData();
        }
        return () => {
          isActive = false;
          ca.abort();
        };
      }, [getData]);
    
    const values = {
        loadings,lang,listas,fechas,setFechas,funciones
    }
    return (
    <Contexto.Provider value={values}>
        {children}
    </Contexto.Provider> );
}


export function useInformesProductos(){

    const {loadings,lang,listas,fechas,setFechas,funciones} = useContext(Contexto)
    return {loadings,lang,listas,fechas,setFechas,funciones}
}

export default InformesProductosProvider;