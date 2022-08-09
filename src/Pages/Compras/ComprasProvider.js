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

  const [errores,setErrores] = useState(initialErrores);
  const [cargas,setCargas] = useState(initialCargas);
  const [dialogs,setDialogs] = useState(initialDialogs)
  const [compras,setCompras] = useState(initialCompras)

  const setearCompras = elem=>{
    setCompras(elem)
    localStorage.setItem("compras", JSON.stringify(elem))
  }

  const insertarProductoTabla = (pro,cant) => {
    let datas = {...compras}
    let array = [];
    let data = {
      cantidad: cant,
      codigo_producto: pro.codigo_producto,
      nombre_producto: pro.nombre_producto,
      costo_producto: 0,
      subtotal: 0
    }
    array.push(data);
    datas.items = array;

    setearCompras(datas);

  }

  
  const consultarCodigoProducto = async(codigo)=>{
    let promises = await Promise.all([
      APICALLER.get({table:"productos",
      fields:"id_producto,codigo_producto,precio_producto,preciom_producto,nombre_producto",
      where:`codigo_producto,=,'${codigo}',and,tipo_producto,=,1`})
    ])

    let res = promises[0];

    if(res.response==="ok"){
      if(res.found > 0){
          insertarProductoTabla(res.results[0],1);
      }
    }
  }
  
 



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