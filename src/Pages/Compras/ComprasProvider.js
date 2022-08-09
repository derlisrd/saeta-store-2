import React, { createContext,useCallback,useContext,useEffect, useRef, useState } from 'react';
import { useLang } from '../../Contexts/LangProvider';
import { APICALLER } from '../../Services/api';
const ComprasContext = createContext();



export default function ComprasProvider({children}) {

  const {lang} = useLang()
  const initialDialogs = { main:true,insert:false,finalizar:false }
  const storage = JSON.parse(localStorage.getItem("compras"));
  const inputCodigo = useRef(null);
  const inputCantidad = useRef(null);
  const initialErrores = {
    id_error: null,
    msj: "",
    active:false
  }
  const initialCompras = {
    items: storage ? storage.items : []
  }
  const initialCargas = {
    main:true,
    items:false,
    insert:false
  }
  
  const consultarCodigoProducto = async(codigo)=>{
    let res = await APICALLER.get({table:"productos",where:`codigo_producto,=,'${codigo}',and,tipo_producto,=,1`})
    if(res.response==="ok"){
      if(res.found > 0){
        
      }
    }
  }
  
  const [errores,setErrores] = useState(initialErrores);
  const [cargas,setCargas] = useState(initialCargas);
  const [dialogs,setDialogs] = useState(initialDialogs)
  const [compras,setCompras] = useState(initialCompras)



  const getDatas = useCallback(async()=>{
    if (!localStorage.getItem("compras")) {
      const values = JSON.stringify({
        items: []
      });
      localStorage.setItem("compras", values);
    }
    setCargas({main:false,items:false,insert:false});
  },[])

useEffect(() => {
    let isActive = true;
    const ca = new AbortController();
    if(isActive){ getDatas()}
    return ()=> {isActive = false;ca.abort();}
}, [getDatas]);    

const value = {lang,setDialogs,dialogs,compras,setCompras,cargas,setCargas,errores,setErrores,inputCantidad,inputCodigo,consultarCodigoProducto}

  return (
    <ComprasContext.Provider value={value} >
        {children}
    </ComprasContext.Provider>
  );
}
export const useCompras =()=>{
  const {lang,setDialogs,dialogs,compras,setCompras,cargas,setCargas,errores,setErrores,inputCantidad,inputCodigo,consultarCodigoProducto} = useContext(ComprasContext);
  return {lang,setDialogs,dialogs,compras,setCompras,cargas,setCargas,errores,setErrores,inputCantidad,inputCodigo,consultarCodigoProducto}
}