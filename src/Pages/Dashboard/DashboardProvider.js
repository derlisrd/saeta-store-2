import { useEffect, useState,  useCallback,createContext,useContext } from "react";

import { funciones } from "../../Functions";
import { APICALLER } from "../../Services/api";

const Context = createContext()

function DashboardProvider({children}) {
    const [isLoading, setIsLoading] = useState(true);
    const [datas, setDatas] = useState({
      ventasHoy: 0,
      ventasMes: 0,
      movimientos:[],
      productos:[],
      masvendidos:[],
      falta:[],
      cotizacion:{
        venta:0,
        compra:0
      }
    });

    const getLista = useCallback(async () => {
        setIsLoading(true);
        //setCotizacion([])
        /* setLoading({general:true});
        
        setCotizacion(data?.dolarpy);
        setLoading({general:false}); */

        const cotizacion = async()=>{
            let res = await fetch ('https://dolar.melizeche.com/api/1.0/');
            return await res.json();
        }

        let today = funciones.fechaActualYMD();
        let first = funciones.firstDayYMD();
        let [ventashoy,ventasmes,mov,pro,masv,faltante,coti] = await Promise.all([
        APICALLER.get({
            table: "facturas",
            fields: "SUM(monto_total_factura) as total",
            where: `fecha_factura,between,'${today} 00:00:00',and,'${today} 23:59:59'`,
        }),
        APICALLER.get({
            table: "facturas",
            fields: "SUM(monto_total_factura) as total",
            where: `fecha_factura,between,'${first} 00:00:00',and,'${today} 23:59:59'`,
        }),
        APICALLER.get({
            table: "cajas_movimientos", include:'cajas_registros',on:'id_cajas_registro,id_tipo_registro',
            fields: "monto_movimiento,monto_sin_efectivo,detalles_movimiento,descripcion_registro,fecha_movimiento",
            where: `id_tipo_registro,=,1`, pagesize:5,sort:'id_cajas_movimiento'
        }),
        APICALLER.get({
            table: "productos_vendidos", include:'productos',on:'id_producto,id_producto_vendido',
            fields: "precio_vendido,nombre_producto", sort:'id_productos_vendido',
            pagesize:5
        }),
        APICALLER.get({
            table: "productos_vendidos", include:'productos',on:'id_producto,id_producto_vendido',
            fields: "nombre_producto,cantidad_vendido", sort:'cantidad_vendido',
            pagesize:5
        }),
        APICALLER.get({
            table: "productos", include:'productos_depositos',on:'id_producto,id_producto_deposito',
            fields: "nombre_producto,stock_producto_deposito", sort:'-stock_producto_deposito',
            pagesize:5
        }),
        cotizacion(),
        ]);
        
        
        if (ventashoy.response && ventasmes.response) {
        setDatas({
            ventasHoy: ventashoy.first.total ? parseFloat(ventashoy.first.total): 0,
            ventasMes: ventasmes.first.total? parseFloat(ventasmes.first.total): 0,
            movimientos:mov.results,
            productos: pro.results,
            masvendidos: masv.results,
            falta: faltante.results,
            cotizacion: {
                compra: coti.dolarpy.cambioschaco.compra,
                venta: coti.dolarpy.cambioschaco.venta
            }

        });
        }

        setIsLoading(false);

    }, []);

    

    const values = {datas,isLoading}

    useEffect(() => {
        const ca = new AbortController();
        let isActive = true; 
        if (isActive) {getLista(); }
        return () => { isActive = false; ca.abort();};
      }, [getLista]);

    return (
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    );
}

export function useDashboard (){
    const {datas,isLoading} = useContext(Context)
    return {datas,isLoading}
}

export default DashboardProvider;