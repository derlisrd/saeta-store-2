import { useState,useEffect,useContext,createContext,useCallback } from "react";

import { APICALLER } from "../../../Services/api";
import { useLogin } from "../../../Contexts/LoginProvider";
import { useLang } from "../../../Contexts/LangProvider";

const Contexto = createContext()

const ProductosApartadosProvider = ({children})=>{
    
    const {lang} = useLang()
    const {userData} = useLogin();
    const {token_user,id_user} = userData;
    const initialDialogs = {apartar: false,buscarProducto:false,buscarCliente:false,registrarCliente:false}
    const [dialogs,setDialogs] = useState(initialDialogs);
    const [listas,setListas] = useState({productos:[],depositos:[]})
    const [loading,setLoading] = useState({lista:true})
    const llaveDialog = (d,boleano)=>{setDialogs({...dialogs,[d]:boleano})}

    const initialForm = {
        id_producto_apartado:'',
        nombre_producto:'',
        codigo_producto:'',
        id_deposito_apartado:'',
        id_cliente_apartado:'',
        nombre_cliente:'',
        ruc_cliente:'',
        id_user_apartado:'',
        cantidad_apartado:''
    }
    const [formSelect,setFormSelect] = useState(initialForm)


    const getLista = useCallback(async(searchTxt='')=>{
        setLoading({lista:true})
        let [res,dep] = await Promise.all([
            APICALLER.get({table:'productos_apartados',include:'clientes,users,depositos,productos',
            on:'id_producto,id_producto_apartado,id_cliente,id_cliente_apartado,id_user,id_user_apartado,id_deposito,id_deposito_apartado',
        fields:'nombre_deposito,nombre_cliente,nombre_user,nombre_producto,codigo_producto,cantidad_apartado,id_productos_apartado,id_deposito_producto_apartado,cantidad_apartado',
        filtersField:"nombre_producto,codigo_producto",
        filtersSearch:`${searchTxt}`,
    }),
        APICALLER.get({table:'depositos',fields:'id_deposito,nombre_deposito',where:'tipo_deposito,=,1'})
        ])
        if(res.response){
            setListas({productos:res.results,depositos:dep.results})
        }else{console.log(res)}
        setLoading({lista:false})
    },[])

    useEffect(() => {
        let isActive = true;
        const ca = new AbortController()
        if(isActive){getLista();}
    
        return () => {isActive = false;ca.abort();};
      }, [getLista]);


      const values = {dialogs,setDialogs,loading,listas,lang,getLista,llaveDialog,token_user,id_user,formSelect,setFormSelect}

    return <Contexto.Provider value={values}>{children}</Contexto.Provider>
    
}

export const useProductosApartados = ()=>{
    const {dialogs,setDialogs,llaveDialog,loading,listas,lang,getLista,token_user,id_user,formSelect,setFormSelect} = useContext(Contexto)
    return {dialogs,setDialogs,llaveDialog,loading,listas,lang,getLista,token_user,id_user,formSelect,setFormSelect}
}

export default ProductosApartadosProvider
