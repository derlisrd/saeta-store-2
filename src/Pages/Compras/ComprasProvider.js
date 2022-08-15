import React, { createContext,useCallback,useContext,useEffect, useRef, useState } from 'react';
import { useLang } from '../../Contexts/LangProvider';
import { APICALLER } from '../../Services/api';
import {funciones} from '../../Functions'
import { useLogin } from '../../Contexts/LoginProvider';

const ComprasContext = createContext();
export default function ComprasProvider({children}) {

  const {lang} = useLang()
  const {userData} = useLogin()
  const {id_user} = userData
  
  const initialDialogs = { main:true,insert:false,finalizar:false }
  const storage = JSON.parse(localStorage.getItem("compras"));
  const inputCodigo = useRef(null);
  const initialErrores = {
    id_error: null,
    msj: "",
    color:"error",
    active:false
  }
  const initialCompras = {
    items: storage ? storage.items : [],
    sumatotal:storage ? storage.sumatotal : 0,
    insertProducto: {}
  }
  const initialCargas = {
    main:true,
    items:false,
    insert:false,
    codigo:false
  }
  const initialDatosCompra = {
    cajas: []
  }
  const [datosCompra,setDatosCompra] = useState(initialDatosCompra)
  const [errores,setErrores] = useState(initialErrores);
  const [cargas,setCargas] = useState(initialCargas);
  const [dialogs,setDialogs] = useState(initialDialogs)
  const [compras,setCompras] = useState(initialCompras)

  const setearCompras = elem=>{
    let e = {...elem}
    let suma = 0;
    e.items.forEach(d => {
      suma += parseFloat(d.costo_producto)*parseFloat(d.stock);
    });
    e.sumatotal = suma;
    setCompras(e)
    localStorage.setItem("compras", JSON.stringify(e))
  }

  const insertarProductoDialog = (pro) => {
    let datas = {...compras}
    //let cant = parseFloat(inputCantidad.current.value);
    let data = {
      id_producto:pro.id_producto,
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
    let compra = {...compras}

    
    let index = compra.items.findIndex(e => e.codigo_producto.toLowerCase() === codigo.toLowerCase());
    //let found = compra.items.filter(i => i.codigo_producto.toLowerCase() === codigo.toLowerCase());
    // si ya hay un producto tons aumenta la cantidad
    if (index >= 0) {
      compra.items[index].stock =  parseFloat(compra.items[index].stock) + 1;
      setearCompras(compra);
      inputCodigo.current.value=""
    }
    else{
      consultarCodigoProducto(codigo)
    }

  }

  
  const consultarCodigoProducto = async(codigo)=>{
    setCargas({...cargas,codigo:true})
    let promises = await Promise.all([
      APICALLER.get({table:"productos",
      fields:"id_producto,codigo_producto,precio_producto,preciom_producto,nombre_producto,costo_producto",
      where:`codigo_producto,=,'${codigo}',and,tipo_producto,=,1`})
    ])
    setCargas({...cargas,codigo:false})
    let res = promises[0];

    if(res.response==="ok"){
      if(res.found > 0){
        insertarProductoDialog(res.results[0])
      }else{
        setErrores({active:true,id_error:1,msj:lang.no_existe_producto,color:"error"})
      }
    }
  }
  
 



  const getDatas = useCallback(async()=>{
    let res = await APICALLER.get({table:"cajas",include:"cajas_monedas,monedas,cajas_users",on:"id_caja,id_caja_moneda,id_moneda,id_moneda_caja_moneda,id_caja,id_caja_caja",where:`id_user_caja,=,${id_user},and,estado_caja,=,'open'`,
    fields:"id_moneda,nombre_moneda,id_cajas_moneda,id_caja_moneda,abreviatura_moneda,monto_caja_moneda,monto_no_efectivo,nombre_caja"})
    if (!localStorage.getItem("compras")) {
      const values = JSON.stringify({
        items: [],
        insertProducto:{},
        sumatotal:0
      });
      localStorage.setItem("compras", values);
    }
    
    res.response==="ok" ? setDatosCompra({cajas:res.results}) : console.log(res);
    setCargas({main:false,items:false,insert:false,codigo:false});
  },[id_user])

useEffect(() => {
    let isActive = true;
    const ca = new AbortController();
    if(isActive){ getDatas()}
    return ()=> {isActive = false;ca.abort();}
}, [getDatas]);    

const value = {datosCompra,funciones,lang,setDialogs,dialogs,compras,setCompras,cargas,setCargas,errores,setErrores,inputCodigo,consultarCodigoProducto,consultarSiExiste,setearCompras}

  return (
    <ComprasContext.Provider value={value} >
        {children}
    </ComprasContext.Provider>
  );
}
export const useCompras =()=>{
  const {datosCompra,funciones,lang,setDialogs,dialogs,compras,setCompras,cargas,setCargas,errores,setErrores,inputCodigo,consultarCodigoProducto,consultarSiExiste,setearCompras} = useContext(ComprasContext);
  return {datosCompra,funciones,lang,setDialogs,dialogs,compras,setCompras,cargas,setCargas,errores,setErrores,inputCodigo,consultarCodigoProducto,consultarSiExiste,setearCompras}
}