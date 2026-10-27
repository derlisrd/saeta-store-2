import {useState,useEffect,useContext,createContext,useRef,useCallback} from "react";
import swal from "sweetalert";
import { APICALLER } from "../../../Services/api";
import { useLogin } from "../../../Contexts/LoginProvider";
import { useLang } from "../../../Contexts/LangProvider";
import { funciones } from "../../../Functions";
import useGoto from "../../../Hooks/useGoto";


const Contexto = createContext();

const ComprasProvider = ({ children }) => {
  const go = useGoto()
  const {lang} = useLang()
  const {userData} = useLogin();
  const { token_user, id_user } = userData;
  const [cargando, setCargando] = useState(true);
  const [cargandoItem, setCargandoItem] = useState(false);
  
  const initialDialogs = {
    compra:false,
    buscar:false,
    imprimir:false
  }
  const [dialogs,setDialogs] = useState(initialDialogs);


  const fechaActual = funciones.fechaActualYMD();
  const hora_actual = funciones.HoraActualHMS();
  const fecha_actual_horas = funciones.getFechaHorarioString;

  

  const inputCodigo = useRef(null);

  const storage = JSON.parse(localStorage.getItem("compras"));


  const [listaCajas, setListaCajas] = useState([]);
  const [idDeposito,setIdDeposito]=useState(storage ? storage.idDeposito : "");
  const [listaDepositos,setListaDepositos] = useState(storage ? storage.listaDepositos : []);
  const [formulario, setFormulario] = useState({
    id_producto:"",
    id_deposito_deposito:"",
    codigo_producto: "",
    nombre_producto: "",
    preciom_producto: "",
    precio_producto: "",
    costo_producto: "",
    proveedor: "",
    iva_producto: "",
    stock_producto_deposito: "",
    stock_nuevo: "",
  });

  const [datosCompra, setDatosCompra] = useState({
    fecha_compra: fechaActual,
    nro_factura: "",
    tipo_factura: "1",
    fecha_pago: fechaActual,
    total_factura: storage ? storage.total_factura : 0,
    idCaja: "",
    idProveedor: "1",
    itemsFactura:storage ? storage.itemsFactura : []
  });

  const [error, setError] = useState({error: false,msj: ""});

  

  const Borrar = (codigo) => {
    let fa = {...datosCompra};
    let index = fa.itemsFactura.findIndex((i) => i.codigo_producto === codigo);
    fa.itemsFactura.splice(index, 1);
    Hacer_total(fa);
    
  };

  const InsertarProductoTabla = (item) => {
    insertaProducto(item);
    setDialogs({...dialogs,compra:true})
  };
  const insertaProducto = e => {
    
    var datos = {
      ...formulario,
      id_producto: e.id_producto,
      id_productos_deposito:e.id_productos_deposito,
      codigo_producto: e.codigo_producto,
      stock_producto_deposito: e.stock_producto_deposito,
      proveedor: e.nombre_proveedor,
      iva_producto: e.porcentaje_impuesto,
      nombre_producto: e.nombre_producto,
      costo_producto:e.costo_producto,
      precio_producto:e.precio_producto,
      preciom_producto:e.preciom_producto,
      descripcion_medida: e.descripcion_medida,
      stock_nuevo:"",
    };
    setFormulario(datos);
  };

  const cambiarDeposito = (deposito)=>{setIdDeposito(deposito);}

  const EfectuarCompra = async () => {
    var index = listaCajas.findIndex((i) => i.id_caja === datosCompra.idCaja);
    var nuevo_monto = parseFloat(listaCajas[index]?.monto_caja) - parseFloat(datosCompra.total_factura);
    // PREGUNTA SI HAY SUFICIENTE
    if (nuevo_monto < 0 && datosCompra.tipo_factura === "1") {
      swal({ icon: "error", text: "En la caja elegida no hay suficiente dinero" });
      return false;
    } else {
      let arr = [...datosCompra.itemsFactura];
      if (arr.length > 0) {
        
        var data = {};
        var data2 ={};
        setCargando(true);

        // SI FORMA DE PAGO ES 1 ES CONTADO 2 CREDITO
        if (datosCompra.tipo_factura === "1") {
          let datos = {
            id_caja_movimiento: datosCompra.idCaja,
            id_user_movimiento: id_user,
            id_tipo_registro: "6", // 6 es en el tabla compras al contado
            monto_movimiento: datosCompra.total_factura,
            detalles_movimiento: `Compra de productos factura contado nro ${datosCompra.nro_factura}`,
            fecha_movimiento: fecha_actual_horas,
          };
        
          let pro = await Promise.all([
            APICALLER.update({table:`cajas`,token:token_user,data:{ monto_caja: nuevo_monto },id: datosCompra.idCaja,}),
            APICALLER.insert({table:"cajas_movimientos",data:datos,token:token_user})
        ])
          if(!pro[0].response || !pro[1].response) {console.log(pro[0],pro[1])}
        }
      
        let call = [];
        //console.log(arr);
        arr.forEach(e => {
          data = {
            costo_producto:e.costo_producto,
            precio_producto: e.precio_producto,
            preciom_producto: e.preciom_producto,
          };
          data2={
            stock_producto_deposito: parseFloat(e.stock_producto_deposito) + parseFloat(e.stock_nuevo)
          }
          
          call.push(APICALLER.update({table: "productos",data,token: token_user,id: e.id_producto}))
          call.push(APICALLER.update({table:"productos_depositos",data:data2,token:token_user,id: e.id_productos_deposito}))
        });

       // await Promise.all(call);
        
        let datosC = {
          id_proveedor_compra: 1,
          tipo_factura_compra: datosCompra.tipo_factura,
          fecha_pago_compra: `${datosCompra.fecha_pago} ${hora_actual}`,
          fecha_compra: fecha_actual_horas,
          nro_factura_compra: datosCompra.nro_factura,
          total_factura_compra: datosCompra.total_factura,
          estado_compra: datosCompra.tipo_factura,
        };
        let compra = await APICALLER.insert({table:"compras",data:datosC,token:token_user});
        !compra.response  && console.log(compra);

        const ID_COMPRA = await compra.last_id;
        let callap = [];
        arr.forEach(async (e) => {
          let dataitem = {
            id_item_compra: ID_COMPRA,
            id_producto_compra: e.id_producto,
            precio_compra: e.costo_producto,
            precio_venta: e.precio_producto,
            preciom_venta: e.preciom_producto,
            cantidad_compra: e.stock_nuevo,
          };
         callap.push( APICALLER.insert({table:"compras_items",data:dataitem,token:token_user}))
        });
      
        await Promise.allSettled(callap);
        //console.log(com);
        setDialogs({...dialogs,imprimir:true})
        setCargando(false);
      } else {
        swal({ icon: "error", text: "No hay items en la factura" }).then(() => {
          inputCodigo.current.focus();
        });
      }
    }
  };

  const LimpiarTodo = () => {
    let datos_clear = {
      fecha_compra: fechaActual,
      nro_factura: "",
      tipo_factura: "1",
      fecha_pago: fechaActual,
      total_factura: 0,
      idCaja: "",
      itemsFactura: [],
      listaDepositos: listaDepositos
    };

    setearFactura(datos_clear)
    enfocarEnInputCodigo();
  };

  const sumarItem = index=>{
    let fa = {...datosCompra};
    let cantidadNueva = parseFloat(fa.itemsFactura[index].stock_nuevo) + 1;
    fa.itemsFactura[index].stock_nuevo = cantidadNueva;
    Hacer_total(fa);
  }

  const restarItem = index=>{
    let fa = {...datosCompra};
    let cantidadNueva = parseFloat(fa.itemsFactura[index].stock_nuevo) - 1;
    if(cantidadNueva>0){
    fa.itemsFactura[index].stock_nuevo = cantidadNueva;
    Hacer_total(fa);
    }
  }

  const Hacer_total = fa => {
    let suma = 0;
    fa.itemsFactura.forEach(e => {
      suma += parseFloat(e.costo_producto) * parseFloat(e.stock_nuevo);
    });
    fa.total_factura = suma;
    setearFactura(fa)
  };

  const setearFactura = datos=>{
    setDatosCompra(datos);
    localStorage.setItem("compras", JSON.stringify(datos));
  } 

  const ConsultarProducto = async () => {
    
    if(idDeposito==="" || !idDeposito){
      setError({error: true,msj: "Elija el depósito"})
      return false;
    }
    var codigo = inputCodigo.current.value;
    // busca si ya hay en el item
    let it = {...datosCompra};
    let found = it.itemsFactura.filter( i=> i.codigo_producto === codigo);
    
    // si ya hay un producto tons aumenta la cantidad
    if (found.length > 0) {
      inputCodigo.current.value = "";
      swal({text: "Ese producto ya está en la lista",icon: "info",timer: 1200}).then(() => {
        enfocarEnInputCodigo();
      });
    } else {
      setCargandoItem(true);
      // tipo de producto fisico es 1 y 2 es servicio
      let res = await APICALLER.get({
        table: "productos",include:"proveedors,impuestos,unidad_medidas,productos_depositos",
        on: "id_impuesto_producto,id_impuesto,id_proveedor_producto,id_proveedor,id_unidad_medida_producto,id_unidad_medida,id_producto,id_producto_deposito",
        fields:"id_producto,id_productos_deposito,codigo_producto,nombre_producto,tipo_producto,stock_producto_deposito,nombre_proveedor,ruc_proveedor,porcentaje_impuesto,id_producto,costo_producto,preciom_producto,precio_producto, descripcion_medida",
        where: `codigo_producto,=,'${codigo}',and,id_deposito_deposito,=,${idDeposito}`,
      });
      if (res.response) {
        if (res.found > 0) {
          
          if (res.results[0].tipo_producto === "2") {
            swal("Ese código pertenece a un servicio").then(() => {
              enfocarEnInputCodigo();
            });
          } else {
            insertaProducto(res.results[0]);
            setDialogs({...dialogs,compra:true})
          }
        } else {
          swal({text: "Desea registrar ese producto?",icon: "info",buttons: ["No", "Si"],
          }).then(si => {
            if (si) { go.to(`productos/new/?codigo=${codigo}`);}
          });
        }
      } else {
        console.log(res);
      }
    }

    setCargandoItem(false);
  };

  const enfocarEnInputCodigo = () => {
    inputCodigo.current.focus();
  };

  /** SI EXISTE EN EL LOCALSTORAGE UNA FACTURA */
  const getFactura = useCallback(async () => {
    if (!localStorage.getItem("compras")) {
      let dep = await APICALLER.get({table:'depositos',where:'tipo_deposito,=,1'});
      let id = '';
      if(dep.response){
        id = dep.found>0? dep.results[0].id_deposito : "";
        setListaDepositos(dep.results);
      } 
      const values = JSON.stringify({
        fecha_compra: fechaActual,
        nro_factura: "",
        tipo_factura: "1",
        fecha_pago: fechaActual,
        total_factura: 0,
        idCaja: "",
        itemsFactura: [],
        listaDepositos:dep.response ? dep.results : [],
        idDeposito: id
      });
      localStorage.setItem("compras", values);
    }
  }, [fechaActual]);


  const getCajas = useCallback(async () => {
    let res = await APICALLER.get({
      table: "cajas",include:"cajas_users",
      on: "id_caja,id_caja_caja",
      where: `id_user_caja,=,${id_user},and,estado_caja,=,1`,
      fields: "id_caja,nombre_caja,monto_caja",
    });

    res.response  ? setListaCajas(res.results) : console.log(res);
    setCargando(false)
  }, [id_user]);

  useEffect(() => {
    let isActive = true;
    const ca = new AbortController()
    enfocarEnInputCodigo();
    if(isActive){
    getCajas();
    getFactura();
    }

    return () => {
      isActive = false;
      ca.abort();
    };
    
  }, [getCajas, getFactura]);

  return (
    <Contexto.Provider
      value={{lang,
        cargando,
        setCargando,
        dialogs,setDialogs,
        datosCompra,
        setDatosCompra,
        inputCodigo,
        ConsultarProducto,
        formulario,
        setFormulario,
        InsertarProductoTabla,
        Borrar,
        cargandoItem,
        setCargandoItem,
        EfectuarCompra,
        Hacer_total,
        listaCajas,
        setListaCajas,
        error,
        setError,
        LimpiarTodo,sumarItem,restarItem,listaDepositos,idDeposito,setIdDeposito,cambiarDeposito
      }}
    >
      {children}
    </Contexto.Provider>
  );
};

export const useCompras = () => {
  const {
    lang,
    cargando,
    setCargando,
    datosCompra,
    dialogs,setDialogs,
    setDatosCompra,
    inputCodigo,
    ConsultarProducto,
    formulario,
    setFormulario,
    InsertarProductoTabla,
    Borrar,
    cargandoItem,
    setCargandoItem,
    EfectuarCompra,
    Hacer_total,
    listaCajas,
    setListaCajas,
    error,
    setError,
    LimpiarTodo,sumarItem,restarItem,listaDepositos,idDeposito,setIdDeposito,cambiarDeposito
  } = useContext(Contexto);
  return {
    lang,
    cargando,
    setCargando,
    datosCompra,
    dialogs,setDialogs,
    setDatosCompra,
    inputCodigo,
    ConsultarProducto,
    formulario,
    setFormulario,
    InsertarProductoTabla,
    Borrar,
    cargandoItem,
    setCargandoItem,
    EfectuarCompra,
    Hacer_total,
    listaCajas,
    setListaCajas,
    error,
    setError,
    LimpiarTodo,sumarItem,restarItem,listaDepositos,idDeposito,setIdDeposito,cambiarDeposito
  };
};

export default ComprasProvider;
