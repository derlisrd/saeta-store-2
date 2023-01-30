import { createContext, useCallback, useContext, useEffect, useState,useRef } from 'react'
import { APICALLER } from '../../../Services/api';
import { useLang } from '../../../Contexts/LangProvider';
import { funciones } from '../../../Functions';
const NotasContext = createContext();

const NotasProvider = ({children}) => {

    const inputCodigo = useRef(null);
    const inputCantidad = useRef(null);
    const storage = JSON.parse(localStorage.getItem("notas"));
    const [indexFactura, setIndexFactura] = useState(storage ? storage.indexFactura : 0);

    const initialCargas = {
      listaPedidos:false
    }
    const [cargas,setCargas] = useState(initialCargas)

    const initialDatosNota = {
      tipoCliente: "1",
      tipoFactura: "0",
      ordenCompra: "",
      id_empleado: 1, // aca debe ir el id del usuario
      obs_pago: "",
      id_formaPago: "1",
      formasPago:[],
      totalAbonado:0,
      cantidad_recibida: "",
      entregado_items: "1",
      retencion_iva_factura: "0",
      nro_factura:"0",
      fecha_factura: funciones.getFechaActualString(),
      fecha_cobro_factura : funciones.fechaActualYMD(),
      horario_factura: funciones.getHorarioActualString(),
      valorMoneda:1, // valor de la moneda activa
    }

    const initialDatosCliente = {
      id_cliente: 1,
      nombre_cliente: "SIN NOMBRE",
      direccion_cliente:"",
      ruc_cliente: "0",
    }

    const initialNota = {
      facturas: [
        {
          itemsFactura: [],
          total: 0,
          depositoActivo:storage ? storage.facturas[indexFactura].depositoActivo : "",
          descuento:0,
          guardado: false,
          datosMoneda: {},
          datosNota: initialDatosNota,
          datosCliente: initialDatosCliente,
        },
      ],
      indexFactura: indexFactura,
      listaFormasPago: [],
      listaMonedas: [],
      monedaActiva: {},
      depositoActivo:'',
      alldepositos:true,
      listaDepositos:[],
    };

    const [datosNotas,setDatosNotas] = useState(initialNota)

    const [lista,setLista] = useState([]);
    const {lang} = useLang()

    const initialDialogs = {nuevanota:false}
    const [dialogs,setDialogs] = useState(initialDialogs)




    const insertarProductoTabla = (prod,cantidad=null) => {
    
      let fa = { ...datosNotas };
      let df = fa.facturas[indexFactura];
      let cantidadInput = cantidad || parseFloat(inputCantidad.current.value) ;
      let subtotal = parseFloat(prod.precio_producto) * cantidadInput;
      let iva_porcent = parseFloat(prod.porcentaje_impuesto);
      let porcentaje_comision = parseInt(prod.porcentaje_comision);
      let obj = {
        codigo_producto: prod.codigo_producto,
        nombre_producto: prod.nombre_producto,
        precio_producto: parseFloat(prod.precio_producto),
        precio_guardado: parseFloat(prod.precio_producto),
        cantidad_producto: cantidadInput,
        id_productos_deposito: prod.id_productos_deposito,
        iva_porcentaje: iva_porcent,
        iva_total_producto: (subtotal * iva_porcent) / (100 + iva_porcent),
        subtotal_precio: subtotal,
        stock_producto: parseFloat(prod.stock_producto_deposito),
        costo_producto: parseFloat(prod.costo_producto),
        preciom_producto: parseFloat(prod.preciom_producto),
        precio_original: parseFloat(prod.precio_producto),
        tipo_producto: parseInt(prod.tipo_producto),
        porcentaje_comision: porcentaje_comision,
        comision_producto: (subtotal * porcentaje_comision) / 100,
        id_impuesto: prod.id_impuesto,
        id_producto: prod.id_producto,
        url_imagen: prod?.url_imagen ? prod.url_imagen : ""
      };
  
      if(prod.preguntar_precio === "1"){
        openCambiarPrecio(df.itemsFactura.length)
      }
  
      let fObjInsert = { ...datosNotas };
      fObjInsert.facturas[indexFactura].itemsFactura.push(obj);
      //hacerTotal(fObjInsert);
      inputCantidad.current.value = "1";
    };


    const openCambiarPrecio = index =>{

    }



    const CancelarFacturaActual = ()=>{
    }

    const Anotar = ()=>{
    }
    const Aguardar = ()=>{

    }


    const getDatosNota = useCallback(async()=>{
      if (localStorage.getItem("notas") === null) {
        let [rDepositos] = await Promise.all([APICALLER.get({table:"depositos",where:"tipo_deposito,=,1"})])
        const initialDatosNotaLocal = {
          tipoCliente: "1",
          ordenCompra: "",
          id_empleado: 0,
        }
    
        const initialDatosClienteLocal = {
          id_cliente: 1,
          nombre_cliente: "SIN NOMBRE",
          direccion_cliente:"",
          ruc_cliente: "0",
        }
    
        let  ID_DEPOSITO_ACTIVO = 0;
        if(rDepositos.response ){ ID_DEPOSITO_ACTIVO = rDepositos.results.length>0 ? rDepositos.results[0].id_deposito : "0" }
        const initialNotaLocal = {
          facturas: [
            {
              itemsFactura: [],
              total: 0,
              depositoActivo:ID_DEPOSITO_ACTIVO,
              guardado: false,
              datosMoneda: {},
              datosNota: initialDatosNotaLocal,
              datosCliente: initialDatosClienteLocal,
            },
          ],
          indexFactura: 0,
          listaMonedas: [],
          monedaActiva: {},
          depositoActivo:'',
          alldepositos:true,
          listaDepositos:[],
        };

        setDatosNotas(initialNotaLocal);
      const val = JSON.stringify(initialNotaLocal);
      localStorage.setItem("notas", val);
      setCargas({
        general: false,
        cargandoProducto: false,
        cargandoCliente: false,
        finalizarVenta: false,
        cargandoItem: false,
      });
      }
  },[])



    const getListas = useCallback(async()=>{
        setCargas({listaPedidos:true})
        let res = await APICALLER.get({table:"notas_pedidos",include:"clientes,empleados",on:"id_cliente,id_cliente_pedido,id_empleado_pedido,id_empleado"});
        res.response ? setLista(res.results) : console.log(res);
        setCargas({listaPedidos:false})
    },[])

    useEffect(()=>{
        const ca = new AbortController()
        let isActive = true;
        if(isActive){
          getDatosNota();
        }
        return ()=>{
          isActive = false;
          ca.abort();
        }
    },[getDatosNota])

    const values = {lista,cargas,lang,dialogs,setDialogs,inputCantidad,inputCodigo,indexFactura,setIndexFactura,datosNotas,getListas,Anotar,CancelarFacturaActual,Aguardar,insertarProductoTabla,openCambiarPrecio}

  return <NotasContext.Provider value={values}>{children}</NotasContext.Provider>
  
}


export const useNotas = () =>{
    const {lista,cargas,lang,dialogs,setDialogs,inputCantidad,inputCodigo,indexFactura,setIndexFactura,datosNotas,getListas,Anotar,CancelarFacturaActual,Aguardar,insertarProductoTabla,openCambiarPrecio} = useContext(NotasContext);
    return {lista,cargas,lang,dialogs,setDialogs,inputCantidad,inputCodigo,indexFactura,setIndexFactura,datosNotas,getListas,Anotar,CancelarFacturaActual,Aguardar,insertarProductoTabla,openCambiarPrecio}
}

export default NotasProvider
