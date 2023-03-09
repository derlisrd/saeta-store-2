import { useState,useEffect,useContext,createContext,useCallback } from "react";
import swal from "sweetalert";
import { APICALLER } from "../../../Services/api";
import { useLogin } from "../../../Contexts/LoginProvider";
import { useLang } from "../../../Contexts/LangProvider";

const Contexto = createContext()

const ProductosApartadosProvider = ({children})=>{
    
    const {lang} = useLang()
    const {userData} = useLogin();
    const {token_user,id_user} = userData;
    const initialDialogs = {apartar: false,buscarProducto:false,buscarCliente:false}
    const [dialogs,setDialogs] = useState(initialDialogs);

    const initialErrores = { error:false,color:"error", mensaje:"",id:""}
    const [errores,setErrores] = useState(initialErrores);
    const [cargando,setCargando] = useState({lista:true,apartar:false,cliente:false})
    const [lista,setLista] = useState([]);
    const [listaDepositos,setListaDepositos] = useState([]);

    const [datosCliente,setDatosCliente]= useState({id_cliente:"",nombre_cliente:""});



    const apartar = async(codigo,cantidad,id_deposito)=>{
        let id_cliente = datosCliente.id_cliente;
        if(id_cliente===""){
            setErrores({...errores,error:true,color:"error",mensaje:"Cliente no registrado",id:"cliente"});
            return false;
        }
        setCargando({...cargando,apartar:true});
        let res = await APICALLER.get({table:"productos",where:`codigo_producto,=,'${codigo}'`,fields:'id_producto,codigo_producto'});
        if(res.response && res.found>0){
            let productoForm = res.results[0];
            let stc = await APICALLER.get({table:"productos_depositos",where:`id_producto_deposito,=,${productoForm.id_producto},and,id_deposito_deposito,=${id_deposito}`})

            if(stc.found>0){
                let dep = stc.results[0];
                let cant = parseFloat(dep.stock_producto_deposito);
                let id_producto = productoForm.id_producto;
                let id_productos_deposito = dep.id_productos_deposito;
                let sobrante = cant - parseFloat(cantidad) ;
                
                if(sobrante<0){
                    setErrores({...errores,error:true,color:"error",mensaje:"No hay sufiente stock para apartar",id:"cantidad"});
                }
                else{
                    let apartado = {id_producto_apartado:id_producto, id_deposito_apartado: id_deposito, id_deposito_producto_apartado:id_productos_deposito, id_cliente_apartado:id_cliente,id_user_apartado:id_user,cantidad_apartado:cantidad}
                    
                    let re = await Promise.all([
                        APICALLER.update({table:"productos_depositos",token:token_user,data:{stock_producto_deposito:sobrante},id:id_productos_deposito}),
                        APICALLER.insert({table:"productos_apartados",token:token_user,data:apartado})
                    ])
                    if(re[0].response && re[1].response){
                        setErrores({...errores,error:true,color:"success",mensaje:"Apartado correctamente",id:""});
                        setDialogs(initialDialogs)
                        getLista();
                    }
                    else{
                        console.log(re);
                    }
                }
            }
            else{
                setErrores({...errores,error:true,color:"error",mensaje:"No existe productos en ese deposito",id:"notfound"});
            }
        }else{ console.log(res)}
        setCargando({...cargando,apartar:true});
    }

    const devolver = async(fila)=>{
        
        let answer = await swal({text:`Desea devolver ${fila.nombre_producto} ?`, icon:"warning", buttons:["NO","SI DEVOLVER"]});
        if(answer){
            
            
            let id_deposito_producto_apartado = fila.id_deposito_producto_apartado;
            let id_apartado = fila.id_productos_apartado;
            let cantidad = parseFloat(fila.cantidad_apartado);
            let resstock = await APICALLER.get({table:'productos_depositos',where:`id_productos_deposito,=,${id_deposito_producto_apartado}`})
            let stock;
            if(resstock.response && resstock.found>0){ stock = parseFloat(resstock.results[0].stock_producto_deposito)} else{
                console.log(resstock);return false;
            }
            
            let nuevo = cantidad + stock;
            
            let res = await Promise.all([
                APICALLER.update({table:"productos_depositos",
                id:id_deposito_producto_apartado,token:token_user,data:{stock_producto_deposito:nuevo}}),
                APICALLER.delete({table:"productos_apartados",id:id_apartado,token:token_user}),
            ])
            if(res[0].response){
                //console.log(res);
                getLista();
            }  
        }
    }

    const getLista = useCallback(async()=>{
        setCargando({lista:true,apartar:false,cliente:false})
        let res = await Promise.all([APICALLER.get({table:'productos',include:"productos_apartados,clientes,users,depositos",on:'id_producto_apartado,id_producto,id_cliente,id_cliente_apartado,id_user,id_user_apartado,id_deposito_apartado,id_deposito',
        fields:`id_producto,id_producto_apartado,nombre_cliente,cantidad_apartado,codigo_producto,nombre_producto,nombre_user,id_productos_apartado,nombre_deposito,id_deposito,id_productos_apartado,id_deposito_producto_apartado`}),
        APICALLER.get({table:"depositos",where:'tipo_deposito,=,1',fields:"id_deposito,nombre_deposito"})
    ])
        if(res[0].response && res[1].response){
            setLista(res[0].results)
            setListaDepositos(res[1].results);
        }
        else{
            console.log(res)
        }
        setCargando({lista:false,apartar:false})
    },[])

    useEffect(() => {
        let isActive = true;
        const ca = new AbortController()
        if(isActive){getLista();}
    
        return () => {isActive = false;ca.abort();};
      }, [getLista]);

    return (
        <Contexto.Provider
            value={{lang,listaDepositos,cargando,setCargando,lista,setLista,setDialogs,dialogs,apartar,devolver,datosCliente,setDatosCliente,errores,setErrores}}
        >
            {children}
        </Contexto.Provider>
    )
}

export const useProductosApartados = ()=>{
    const {lang,listaDepositos,cargando,setCargando,lista,setLista,setDialogs,dialogs,apartar,devolver,datosCliente,setDatosCliente,errores,setErrores} = useContext(Contexto)
    return {lang,listaDepositos,cargando,setCargando,lista,setLista,setDialogs,dialogs,apartar,devolver,datosCliente,setDatosCliente,errores,setErrores}
}

export default ProductosApartadosProvider
