import {createContext,useState,useCallback,useEffect,useContext} from 'react';
import { funciones } from '../../../Functions';
import { APICALLER } from '../../../Services/api';

const Contexto = createContext();

function ComisionesProvider({children}){


    const initialDialogs = {
        pagar:false, recibo:false
    }
    const [dialogs,setDialogs] = useState(initialDialogs)
    const initialFormPagar = {

    }
    const initialFormRecibo = {}
    const [formPagar,setFormPagar] = useState(initialFormPagar)
    const [formRecibo,setFormRecibo] = useState(initialFormRecibo)

    const today = funciones.fechaActualYMD();
    const initialDatos = {
        lista: [],
        empleados:[],
        total:0,
        totalComision:0
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
            where = `fecha_comision,between,'${obj.desde} 00:00:00',and,'${obj.hasta} 23:59:59'`
        }else{
            where = `fecha_comision,between,'${obj.desde} 00:00:00',and,'${obj.hasta} 23:59:59',and,id_empleado_comision,=,${obj.id_empleado}`
        }
            let res = await APICALLER.get({
                table:'comisions',
                include:'empleados,productos',
                on:`id_empleado_comision,id_empleado,id_producto_comision,id_producto`,
                fields:'porcentaje,precio_vendido_comision,costo_producto,nombre_empleado,apellido_empleado,fecha_comision,pagado_comision,nombre_producto,id_comision,comision_valor',
                where
            })
            let comision = 0;
            let total = 0;
            if(res.response){
                let resultado = res.results;
                resultado.forEach(e => {
                    comision += parseFloat(e.porcentaje) * ( parseFloat(e.precio_vendido_comision) - parseFloat(e.costo_producto) )/ 100
                    total += parseFloat(e.precio_vendido_comision)
                });
                setDatos({...datos,lista:res.results,total:total,totalComision:comision})

            }
        
        setLoading({
            lista:false
        })
    }

    const getData = useCallback(async () => {
        let [res,emp] = await Promise.all([
            APICALLER.get({
                table:'comisions',
                include:'empleados,productos',
                on:`id_empleado_comision,id_empleado,id_producto_comision,id_producto`,
                fields:'porcentaje,precio_vendido_comision,costo_producto,nombre_empleado,apellido_empleado,fecha_comision,pagado_comision,nombre_producto,id_comision,comision_valor',
                where: `fecha_comision,between,'${today} 00:00:00',and,'${today} 23:59:59'`
            }),
            APICALLER.get({table:"empleados",fields:"nombre_empleado,apellido_empleado,id_empleado"})
        ]);

        //console.log(res)
         if(res.response){
            setDatos({
                lista:res.results,
                empleados: emp.results,
                total:0,
                totalComision:0
            })
        }else{ console.log(res)} 
        setLoading({
            lista:false
        })
    },[today]);


    useEffect(() => {
        const ca = new AbortController();
        let isActive = true;
        if (isActive) getData();
        
        return () => {isActive = false;ca.abort();}
      }, [getData]);

    const values = {
        datos,loading,applyFilters,setDialogs,dialogs,formPagar,setFormPagar,formRecibo,setFormRecibo
    }
    return(<Contexto.Provider value={values}>
        {children}
    </Contexto.Provider>)
}
export const useComisiones = ()=>{
    const {datos,loading,applyFilters,setDialogs,dialogs,formPagar,setFormPagar,formRecibo,setFormRecibo} = useContext(Contexto);
    return {datos,loading,applyFilters,setDialogs,dialogs,formPagar,setFormPagar,formRecibo,setFormRecibo}
}

export default ComisionesProvider;
