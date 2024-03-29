import  { createContext, useContext, useState,useCallback,useEffect } from 'react';
import { useLang } from '../../../Contexts/LangProvider';
import { APICALLER } from '../../../Services/api';
import { funciones } from '../../../Functions';

const Contexto = createContext();

function InformesProductosProvider({children}) {
    
    const {lang} = useLang()
    
    const initialDatos = {
        lucro: 0, vendido:0,cantidad:0
    }
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
    const [tipo,setTipo] = useState("");
    const [loadings,setLoadings] = useState(initialLoadings)
    const [listas,setListas] = useState(initialListas)
    const [datos,setDatos] = useState(initialDatos) 
    
    const getData = useCallback(async(id=null)=>{
        setLoadings({listas:true})
        let where_tipo_producto = "", where_id='';
        if(tipo!==""){
            where_tipo_producto = ",and,tipo_producto,=,"+tipo
        }
        if(id){
            where_id = `,and,id_producto,=,${id}`
        }

        let res = await APICALLER.get({table:"productos_vendidos",include:"productos",on:"id_producto,id_producto_vendido",
        fields:"id_productos_vendido,nombre_producto,fecha_vendido,precio_vendido,costo_producto_vendido,cantidad_vendido",
        where:`fecha_vendido,between,'${fechas.desde} 00:00:00',and,'${fechas.hasta} 23:59:59'${where_tipo_producto} ${where_id}`,sort:'id_productos_vendido'
        });
        if(res.response){
            let result = [...res.results],newresult = [], lucro = 0, costo = 0, vendido = 0,lucro_vendido=0,total_vendido,cantidad=0;
            
            result.forEach(elem => {
                cantidad += parseFloat(elem.cantidad_vendido);
                vendido += (parseFloat(elem.precio_vendido) * parseFloat(elem.cantidad_vendido) );
                costo += parseFloat(elem.costo_producto_vendido)  * parseFloat(elem.cantidad_vendido) ;
                lucro_vendido = (parseFloat(elem.precio_vendido) - parseFloat(elem.costo_producto_vendido) ) * parseFloat(elem.cantidad_vendido)   ;
                total_vendido = parseFloat(elem.cantidad_vendido) *   parseFloat(elem.precio_vendido);
                newresult.push({
                    ...elem,lucro_vendido, total_vendido
                })
            });
            lucro = vendido - costo;

            setDatos({lucro,vendido,cantidad})
            setListas({lista:newresult})

        }else {console.log(res);}
        setLoadings({listas:false})
    },[fechas,tipo])
    
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
        loadings,lang,listas,fechas,setFechas,funciones,datos,tipo,setTipo,getData
    }
    return <Contexto.Provider value={values}>{children}</Contexto.Provider>
}


export function useInformesProductos(){

    const {loadings,lang,listas,fechas,setFechas,funciones,datos,tipo,setTipo,getData} = useContext(Contexto)
    return {loadings,lang,listas,fechas,setFechas,funciones,datos,tipo,setTipo,getData}
}

export default InformesProductosProvider;