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
    items: storage ? storage.items : [],
    insertProducto: {}
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

  const insertarProductoDialog = (pro) => {
    let datas = {...compras}
    let cant = parseFloat(inputCantidad.current.value);
    let data = {
      codigo_producto: pro.codigo_producto,
      nombre_producto: pro.nombre_producto,
      costo_producto: pro.costo_producto,
      preciom_producto:pro.preciom_producto,
      precio_producto:pro.precio_producto
    }
    //array.push(data);
    datas.insertProducto = data;
    setCompras(datas)
    setDialogs({...dialogs,insert:true})
    //setearCompras(datas);

  }

  const consultarSiExiste = (codigo)=>{
    let fact_compra = {...compras}
    let items = fact_compra.items;
    
    let index = items.findIndex(e => e.codigo_producto.toLowerCase() === codigo.toLowerCase());
    let found = items.filter(i => i.codigo_producto.toLowerCase() === codigo.toLowerCase());
    // si ya hay un producto tons aumenta la cantidad
    if (index >= 0) {
      console.log(found)
    }
    else{
      consultarCodigoProducto(codigo)
    }

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
        insertarProductoDialog(res.results[0])
      }else{
        setErrores({active:true,id_error:1,msj:lang.no_existe_producto})
      }
    }
  }
  
 



  const getDatas = useCallback(async()=>{
    if (!localStorage.getItem("compras")) {
      const values = JSON.stringify({
        items: [],
        insertProducto:{}
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

const value = {lang,setDialogs,dialogs,compras,setCompras,cargas,setCargas,errores,setErrores,inputCantidad,inputCodigo,consultarCodigoProducto,consultarSiExiste}

  return (
    <ComprasContext.Provider value={value} >
        {children}
    </ComprasContext.Provider>
  );
}
export const useCompras =()=>{
  const {lang,setDialogs,dialogs,compras,setCompras,cargas,setCargas,errores,setErrores,inputCantidad,inputCodigo,consultarCodigoProducto,consultarSiExiste} = useContext(ComprasContext);
  return {lang,setDialogs,dialogs,compras,setCompras,cargas,setCargas,errores,setErrores,inputCantidad,inputCodigo,consultarCodigoProducto,consultarSiExiste}
}