import { createContext,useState,useEffect,useCallback, useContext } from "react";
import { APICALLER } from "../../../Services/api";
import { useLogin } from "../../../Contexts/LoginProvider";
import { useQuery } from "../../../Hooks/useQuery";


const CobrarContexto = createContext()

function CobrarProvider({children}) {

  let query = useQuery();
  const [dialogs,setDialogs] = useState({
    detalles:false,
    cobrar:false
  })
  const [formSelect,setFormSelect] = useState({})
  let pageInitial = query.get('p') 
  const [currentPage,setCurrentPage] = useState( pageInitial ? parseInt(pageInitial) : 0 )
  const [pagination,setPagination] = useState({
    size: 60,
    total:0,
    found:0
  })
    const {userData} = useLogin()
    const {id_user} = userData
    const [listas,setListas] = useState({
        cobrar:[],
        cajas:[],
        formasPago:[],
        totalCobrar:0,
        monedas:[]
    })
    const [loading,setLoading] = useState(true)




    const getLista = useCallback(async (txt='') => {
        setLoading(true)
        let actual_pagina = 0
        if(txt===''){
          actual_pagina = currentPage;
        }
        let resCobrar,resCajas,resFormas,resMonedas;
        if(actual_pagina===0){
          [resCobrar,resCajas,resFormas,resMonedas] = await Promise.all([
            APICALLER.get({table: "facturas",include: "clientes,cajas,monedas,cajas_users",
            on: "id_caja,id_caja_caja,id_cliente,id_cliente_factura,id_caja,id_caja_factura,id_moneda,id_moneda_factura",
            where: `estado_factura,=,2`,
            fields:"descuento_factura,id_factura,id_cliente,nombre_cliente,nro_factura,ruc_cliente,monto_total_factura,recibido_factura,nombre_caja,abreviatura_moneda,id_user_caja,id_moneda,id_caja,tipo_factura,estado_factura",
            filtersField:"nombre_cliente,ruc_cliente",
            filtersSearch:`${txt}`,
            sort:'-nombre_cliente',
            pagenumber: actual_pagina,pagesize:60
          }),
            APICALLER.get({table: "cajas", include:'cajas_users',on:'id_caja_caja,id_caja', where:`id_user_caja,=,${id_user},and,estado_caja,=,'open'`}),
            APICALLER.get({table: "facturas_formas_pagos"}),
            APICALLER.get({table:"cajas_monedas",include:"monedas",on:"id_moneda_caja_moneda,id_moneda",
            fields:"id_moneda,nombre_moneda,id_cajas_moneda,id_caja_moneda,abreviatura_moneda,monto_caja_moneda,monto_no_efectivo,valor_moneda"}) 
          ]);
        }
        else{
          resCobrar = await APICALLER.get({table: "facturas",include: "clientes,cajas,monedas,cajas_users",
          on: "id_caja,id_caja_caja,id_cliente,id_cliente_factura,id_caja,id_caja_factura,id_moneda,id_moneda_factura",
          where: `estado_factura,=,2`,
          fields:"descuento_factura,id_factura,id_cliente,nombre_cliente,nro_factura,ruc_cliente,monto_total_factura,recibido_factura,nombre_caja,abreviatura_moneda,id_user_caja,id_moneda,id_caja,tipo_factura,estado_factura",
          filtersField:"nombre_cliente,ruc_cliente",
          filtersSearch:`${txt}`,
          sort:'-nombre_cliente',
          pagenumber: actual_pagina,pagesize:60
          })
        }
    
        if( resCobrar){
          let totalaCobrar=0, totalrecibido = 0, montototal = 0;
          resCobrar.results.forEach(e => {
            totalrecibido += parseFloat(e.recibido_factura)
            montototal += parseFloat(e.monto_total_factura)
          });
          totalaCobrar = montototal - totalrecibido;
          setPagination(pre=>{ return {...pre,total:resCobrar.total,found:resCobrar.found} })
          if(actual_pagina===0){
            setListas({
              cobrar:resCobrar.results,
              cajas:resCajas.results,
              formasPago:resFormas.results,
              totalCobrar:totalaCobrar,
              monedas:resMonedas.results,
              totalPagar:0
            })
          }else{
            setListas(pre=>{return {...pre,cobrar:resCobrar.results}})
          }
          
        }
        setLoading(false)
      }, [id_user,currentPage]);

      useEffect(() => {
        let isActive = true;
        const ca = new AbortController();
        if(isActive){getLista();}
        return ()=> {isActive = false;ca.abort();}
      }, [getLista]);

      const values = {listas,loading,getLista,currentPage,setCurrentPage,pagination,dialogs,setDialogs,formSelect,setFormSelect}


    return <CobrarContexto.Provider value={values}>{children}</CobrarContexto.Provider>
}


export function useCobrar (){
    const {listas,loading,getLista,currentPage,setCurrentPage,pagination,dialogs,setDialogs,formSelect,setFormSelect} = useContext(CobrarContexto);
    return {listas,loading,getLista,currentPage,setCurrentPage,pagination,dialogs,setDialogs,formSelect,setFormSelect}
  };
  


export default CobrarProvider;