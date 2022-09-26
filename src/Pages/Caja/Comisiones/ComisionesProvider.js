import {createContext,useState,useCallback,useEffect,useContext} from 'react';
import { APICALLER } from '../../../Services/api';

const Contexto = createContext();

function ComisionesProvider({children}){

    const initialDatos = {
        lista: [],
        empleados:[]
    }
    const initialLoading = {
        lista: true,
    }
    const [datos,setDatos] = useState(initialDatos)
    const [loading,setLoading] = useState(initialLoading)

    const applyFilters = async(obj)=>{
        setLoading({lista:true})
        let where;
        if(obj.id_empleado===""){
            where = `fecha_factura,between,'${obj.desde} 00:00:00',and,'${obj.hasta} 23:59:59'`
        }else{
            where = `fecha_factura,between,'${obj.desde} 00:00:00',and,'${obj.hasta} 23:59:59',and,id_empleado_factura,=,${obj.id_empleado}`
        }
            let res = await APICALLER.get({
                table:'facturas',
                include:'facturas_items,empleados,productos',
                on:`id_empleado_factura,id_empleado,id_factura,id_items_factura,id_producto,id_producto_factura`,
                fields:'nombre_empleado,apellido_empleado,porcentaje_comision_factura,id_facturas_item,nombre_producto,porcentaje_comision,fecha_factura',
                where
            })
            if(res.response==="ok"){
                setDatos({...datos,lista:res.results})
            }
        
        setLoading({
            lista:false
        })
    }

    const getData = useCallback(async () => {
        let promises = await Promise.all([
            APICALLER.get({
                table:'facturas',
                include:'facturas_items,empleados,productos',
                on:`id_empleado_factura,id_empleado,id_factura,id_items_factura,id_producto,id_producto_factura`,
                fields:'nombre_empleado,apellido_empleado,porcentaje_comision_factura,id_facturas_item,nombre_producto,porcentaje_comision,fecha_factura'
            }),
            APICALLER.get({table:"empleados",fields:"nombre_empleado,apellido_empleado,id_empleado"})
        ]);
        let res = promises[0];
        let emp = promises[1]
        if(res.response==='ok'){
            setDatos({
                lista:res.results,
                empleados: emp.results
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
        datos,loading,applyFilters
    }
    return(<Contexto.Provider value={values}>
        {
            children
        }
    </Contexto.Provider>)
}
export const useComisiones = ()=>{
    const {datos,loading,applyFilters} = useContext(Contexto);
    return {datos,loading,applyFilters}
}

export default ComisionesProvider;
