import { useParams } from "react-router-dom";
import {useState,useCallback,useEffect,createContext,useContext} from 'react'
import { APICALLER } from "../../../Services/api";

const CuentasClienteContext = createContext()


function CuentasClienteProvider({children}) {
    const {id_cliente} = useParams()
    
    const [dialogs,setDialogs] = useState({
        factura:false
    })
    const [formFactura,setFormFactura] = useState({})
    const [isLoading,setIsLoading] = useState(true)
    const [error,setError] = useState({
        active:false,message:'',code:0
    })
    const [data,setData] = useState({cuenta:[],cliente:{nombre_cliente:'',ruc_cliente:'',telefono_cliente:''}})

    const getLista = useCallback(async () => {
        setIsLoading(true)
        let [cuenta,cliente] = await Promise.all([APICALLER.get({table:'facturas',
        include:'facturas_items,productos',
        on:'id_factura,id_items_factura,id_producto,id_producto_factura',
        fields:'nombre_producto,cantidad_producto,precio_producto_factura,codigo_producto,id_factura',
        where:`id_cliente_factura,=,${id_cliente},and,estado_factura,=,2`
        }),
        APICALLER.get({table:'clientes',
        fields:'nombre_cliente,ruc_cliente,telefono_cliente',
        where:`id_cliente,=,${id_cliente}`})
        ])
        if(cliente.response){
            setData({cuenta:cuenta.results,cliente:cliente.first})
        }else{
            console.log(cliente,cliente);
            setError({active:true,code:0,message:cliente.message})
        }
        setIsLoading(false)
    },[id_cliente])

    useEffect(() => {
        let isActive = true;
        const ca = new AbortController();
        if(isActive){getLista();}
        return ()=> {isActive = false;ca.abort();}
      }, [getLista]);


      const values = {getLista,data,isLoading,error,dialogs,setDialogs,formFactura,setFormFactura}

    return <CuentasClienteContext.Provider value={values}>{children}</CuentasClienteContext.Provider>

}

export const useCuentasCliente = ()=>{
    const {getLista,data,isLoading,error,dialogs,setDialogs,formFactura,setFormFactura} = useContext(CuentasClienteContext)
    return {getLista,data,isLoading,error,dialogs,setDialogs,formFactura,setFormFactura}
}

export default CuentasClienteProvider;