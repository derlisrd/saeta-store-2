import {createContext,useState,useCallback,useEffect,useContext} from 'react';
import { APICALLER } from '../../../Services/api';

const Contexto = createContext();

function ComisionesProvider({children}){

    const initialDatos = {
        lista: []
    }
    const initialLoading = {
        lista: true,
    }
    const [datos,setDatos] = useState(initialDatos)
    const [loading,setLoading] = useState(initialLoading)

    const getData = useCallback(async () => {
        let res = await APICALLER.get({
            table:'facturas',
            include:'facturas_items,empleados',
            on:`id_empleado_factura,id_empleado,id_factura,id_items_factura`,
            fields:'nombre_empleado,apellido_empleado,porcentaje_comision_factura,id_facturas_item'
        });

        if(res==='ok'){
            setDatos({
                lista:res.results
            })
        }else{ console.log(res)}

        setLoading({
            lista:false
        })
    },[]);


    useEffect(() => {
        const ca = new AbortController();
        let isActive = true;
        if (isActive) getData();
        
        return () => {isActive = false;ca.abort();}
      }, [getData]);

    const values = {
        datos,loading
    }
    return(<Contexto.Provider value={values}>
        {
            children
        }
    </Contexto.Provider>)
}
export const useComisiones = ()=>{
    const {datos,loading} = useContext(Contexto);
    return {datos,loading}
}

export default ComisionesProvider;
