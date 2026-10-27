import {createContext,useState,useCallback,useEffect,useContext} from 'react';
//import { useLogin } from '../../../Contexts/LoginProvider';
import { funciones } from '../../../Functions';
import { APICALLER } from '../../../Services/api';

const Contexto = createContext();

function ComisionesProvider({children}){

    //const {userData} = useLogin()
    //const {token_user,id_user} = userData
    const initialDialogs = {pagar:false, recibo:false,pagartodo:false}
    const [dialogs,setDialogs] = useState(initialDialogs)
    const initialFormPagar = {}
    const initialFormRecibo = {}
    const initialFormCaja = {id_caja_movimiento:''}
    const [formPagar,setFormPagar] = useState(initialFormPagar)
    const [formRecibo,setFormRecibo] = useState(initialFormRecibo)
    const [formCaja,setFormCaja] = useState(initialFormCaja)
    const today = funciones.fechaActualYMD();
    const initialDatos = {
        lista: [],
        monedas:[],
        cajas:[],
        empleados:[],
        total:0,
        totalComision:0
    }
    const initialLoading = {
        lista: true,
    }
    const [datos,setDatos] = useState(initialDatos)
    const [loading,setLoading] = useState(initialLoading)
    const filtradoInitial = {
        id_empleado:"",
        pagado_comision:''
      }
    const [filtrado,setFiltrado] = useState(filtradoInitial)
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
                fields:'id_empleado,porcentaje,precio_vendido_comision,costo_producto,nombre_empleado,apellido_empleado,fecha_comision,pagado_comision,nombre_producto,id_comision,comision_valor',
                where
            })
            let comision = 0;
            let total = 0;
            if(res.response){
                let resultado = res.results;
                resultado.forEach(e => {
                    comision += parseFloat(e.porcentaje) * ( parseFloat(e.precio_vendido_comision)  )/ 100
                    total += parseFloat(e.precio_vendido_comision)
                });
                setDatos({...datos,lista:res.results,total:total,totalComision:comision})
            }
        setLoading({
            lista:false
        })
    }

    const getData = useCallback(async () => {
        let [res,emp,caja,moneda] = await Promise.all([
            APICALLER.get({
                table:'comisions',
                include:'empleados,productos',
                on:`id_empleado_comision,id_empleado,id_producto_comision,id_producto`,
                fields:'id_empleado,porcentaje,precio_vendido_comision,costo_producto,nombre_empleado,apellido_empleado,fecha_comision,pagado_comision,nombre_producto,id_comision,comision_valor',
                where: `fecha_comision,between,'${today} 00:00:00',and,'${today} 23:59:59'`,sort:'id_comision'
            }),
            APICALLER.get({table:"empleados",fields:"nombre_empleado,apellido_empleado,id_empleado"}),
            APICALLER.get({table: "cajas",where: `estado_caja,=,'open'`}),
            APICALLER.get({table:'cajas',include:'cajas_monedas,monedas',on:'id_caja,id_caja_moneda,id_moneda,id_moneda_caja_moneda',where: `estado_caja,=,'open'`})
        ]);

        //console.log(res)
         if(res.response){
            setDatos({
                lista:res.results,
                empleados: emp.results,
                total:0,
                totalComision:0,
                cajas:caja.results,
                monedas:moneda.results
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
        datos,loading,applyFilters,setDialogs,dialogs,formPagar,setFormPagar,formRecibo,setFormRecibo,formCaja,setFormCaja,getData,setFiltrado,filtrado
    }
    return(<Contexto.Provider value={values}>
        {children}
    </Contexto.Provider>)
}
export const useComisiones = ()=>{
    const {datos,loading,applyFilters,setDialogs,dialogs,formPagar,setFormPagar,formRecibo,setFormRecibo,formCaja,setFormCaja,getData,setFiltrado,filtrado} = useContext(Contexto);
    return {datos,loading,applyFilters,setDialogs,dialogs,formPagar,setFormPagar,formRecibo,setFormRecibo,formCaja,setFormCaja,getData,setFiltrado,filtrado}
}

export default ComisionesProvider;
