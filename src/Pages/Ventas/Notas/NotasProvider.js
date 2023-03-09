import { createContext, useCallback, useContext, useEffect, useState,useRef } from 'react'
import { APICALLER } from '../../../Services/api';
import { useLang } from '../../../Contexts/LangProvider';
import { funciones } from '../../../Functions';
import { useLogin } from '../../../Contexts/LoginProvider';
import swal from 'sweetalert';
const NotasContext = createContext();

const NotasProvider = ({children}) => {

    const {userData} = useLogin()
    const {token_user,id_user} = userData
    const inputCodigo = useRef(null);
    const inputCantidad = useRef(null);
    const fecha = new Date()
    const [desdeFecha, setDesdeFecha] = useState(funciones.getDateYMD( fecha));
    const [hastaFecha, setHastaFecha] = useState(funciones.getDateYMD( fecha));
    const initialDialogs = {nuevanota:!1,buscarCliente:!1,cambioCliente:!1,buscarProducto:!1,registrarCliente:!1}
    const [dialogs,setDialogs] = useState(initialDialogs)
    const storage = JSON.parse(localStorage.getItem("notas"));
    const [indexFactura, setIndexFactura] = useState(storage ? storage.indexFactura : 0);
    const initialCargas = {
      listaPedidos:false,
      items:false
    }
    const [cargas,setCargas] = useState(initialCargas)
    const initialErrors = {
      id_error:null,
      error:false,
      notFound: false,
      notFoundMensaje: "",
      cambioPrecio: false,
      cambioPrecioMensaje: "",
      cliente: false,
      clienteMensaje: "",
      color:"error",
      mensaje:"",
      factura: {
        error: false,
        errorMensaje: ""
      },
    };
    const [errors, setErrors] = useState(initialErrors);
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
      id_empleado: storage ? storage.id_empleado : 0,
      indexFactura: indexFactura,
      listaFormasPago: [],
      listaMonedas: [],
      monedaActiva: {},
      depositoActivo:'',
      alldepositos:true,
      listaDepositos:[],
    };

    const [datosNotas,setDatosNotas] = useState(storage ?? initialNota)
    const [indexPrecioCambiar, setIndexPrecioCambiar] = useState(-1);

    const [lista,setLista] = useState([]);
    const {lang} = useLang()

    


    const setearCliente = (datos) => {
      let obj = { ...datosNotas };
      obj.facturas[indexFactura].datosCliente = datos;
      setearNota(obj);
      setErrors({ ...errors, error:false,mensaje:"", cliente: false, clienteMensaje: "" });
    };

    const consultarCliente = async (doc) => {
      setCargas({ ...cargas, cargandoCliente: true });
      let Cliente = {id_cliente: "1",nombre_cliente: "SIN NOMBRE",direccion_cliente:"",ruc_cliente: "X"};
      if (doc === "") {
        setearCliente(Cliente);
      } else {
        let res = await APICALLER.get({table:"clientes",where:`ruc_cliente,=,'${doc}'`,fields: "id_cliente,nombre_cliente,ruc_cliente,direccion_cliente"});
        if (res.response ) {
          if (res.found > 0) {
            setearCliente(res.results[0]);
          } else {
            setearCliente(Cliente);
            setErrors({...errors,error:true,mensaje:"Cliente no registrado",cliente: true,clienteMensaje: "Cliente no registrado"});
          }
        }
      }
      setCargas({ ...cargas, cargandoCliente: false });
    };

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
      hacerTotal(fObjInsert);
      inputCantidad.current.value = "1";
    };


    const AgregarCantidad = (cant, index) => {
      let fObj = { ...datosNotas };
      let iva_porcent = fObj.facturas[indexFactura].itemsFactura[index].iva_porcentaje;
      let subtotal = fObj.facturas[indexFactura].itemsFactura[index].precio_guardado * parseFloat(cant);
      fObj.facturas[indexFactura].itemsFactura[index].cantidad_producto = parseFloat(cant);
      fObj.facturas[indexFactura].itemsFactura[index].subtotal_precio = subtotal;
      fObj.facturas[indexFactura].itemsFactura[index].iva_total_producto = (subtotal * iva_porcent) / (100 + iva_porcent);
      hacerTotal(fObj);
    };


    const verificarExisteEnTabla = (codigo) => {
      if (codigo !== "") {
        let faArray = [...datosNotas.facturas[indexFactura].itemsFactura];
        let index = faArray.findIndex(e => e.codigo_producto.toLowerCase() === codigo.toLowerCase());
        let found = faArray.filter(i => i.codigo_producto.toLowerCase() === codigo.toLowerCase());
        // si ya hay un producto tons aumenta la cantidad
        if (found.length > 0) {
          let cantidadInput = parseFloat(inputCantidad.current.value) +faArray[index].cantidad_producto;
          let stock = faArray[index].stock_producto;
          if(stock>=cantidadInput || stock===null || isNaN(stock)){
            AgregarCantidad(cantidadInput, index);
          }
          else{
              setErrors({...errors,error:true,mensaje:`Cantidad limitada de stock en ${stock}`,color:"error"});
          }
          inputCantidad.current.value=1;
        } else {
          consultarPorCodigo(codigo);
        }
      } else {
        setErrors({...errors,error:true,mensaje:"Ingrese el código del producto",color:"error"});
        inputCodigo.current.focus();
      }
      inputCodigo.current.value = "";
      inputCodigo.current.focus();
    };


    
    const valorConvertido = (val,letter=false) =>{
      if (isNaN(val)) {
        return '0';
      }
      let fa = { ...datosNotas };
      let df = fa.facturas[indexFactura];
      if(letter){
        return  funciones.redondeo2decimales(val / df.datosMoneda.valor_moneda)
      }
      return funciones.numberSeparator( funciones.redondeo2decimales(val / df.datosMoneda.valor_moneda));
    }



    const hacerTotal = (fObj) => {
      let suma = 0;
      
      fObj.facturas[indexFactura].itemsFactura.forEach(e => {
        suma += e.subtotal_precio;
      });
  
      fObj.facturas[indexFactura].total = suma;
      setearNota(fObj);
    };


    const consultarPorCodigo = async (codigo) => {
      let fa = {...datosNotas.facturas[indexFactura]}; 
      setCargas({ ...cargas, cargandoProducto: true });
      let alldepositos = datosNotas.alldepositos;
      var where = "";
      if(alldepositos){
        where = `codigo_producto,=,'${codigo}',and,stock_producto_deposito,>,0`;
      }
      else{
        where = `codigo_producto,=,'${codigo}',and,id_deposito_deposito,=,${fa.depositoActivo}`
      }
  
      let [res,ima,serv] = await Promise.all([APICALLER.get({
        table: "productos",
        include: "impuestos,productos_depositos",
        on: "id_impuesto_producto,id_impuesto,id_producto,id_producto_deposito",
        where: where,
      }),APICALLER.get({
        table: "productos",
        include: "impuestos,productos_images,productos_depositos",
        on: "id_impuesto_producto,id_impuesto,id_producto,id_image_producto,id_producto,id_producto_deposito",
        where: where,
      }),
      APICALLER.get({ table: "productos",
      include: "impuestos",
      on: "id_impuesto_producto,id_impuesto",
      where: `codigo_producto,=,'${codigo}',and,tipo_producto,=,2`})])
      
      
      if (res.response ) {
        if (res.found > 0 || serv.found>0) {
          if(res.results[0]?.tipo_producto==="1" && res.results[0]?.stock_producto_deposito<=0 ){
            setErrors({...errors,error: true, mensaje: `No hay stock de ${res.results[0].nombre_producto} en el deposito`,
            });
          }
          else{
            let insertarEsto = ima.found > 0 ? ima.results[0] : res.found>0 ? res.results[0] : serv.results[0]
            insertarProductoTabla(insertarEsto);
          }
  
        } else {
          // ACA SE PUEDE PONER PARA BALANZA
          setErrors({...errors,error: true,mensaje: "Producto no registrado con ese código o sin stock"});
        }
      } else {
        console.log(res);
      } 
      setCargas({ ...cargas, cargandoProducto: false });
    };



    const setearNota = (factura) => {
      setDatosNotas(factura);
      const values = JSON.stringify(factura);
      localStorage.setItem("notas", values);
    };

    const openCambiarPrecio = index =>{

    }

    const borrarItem = (index) => {
      let facturaObj = { ...datosNotas };
      facturaObj.facturas[indexFactura].itemsFactura.splice(index, 1);
      setIndexPrecioCambiar(index - 1);
      hacerTotal(facturaObj);
    };

    const CancelarFacturaActual = () => {
      let fact = { ...datosNotas};
      setIndexPrecioCambiar(-1);
      setErrors(initialErrors);
      inputCantidad.current.value = 1;
      fact.facturas[indexFactura].itemsFactura = [];
      fact.facturas[indexFactura].datosNota = initialDatosNota;
      fact.facturas[indexFactura].datosCliente = initialDatosCliente;
      hacerTotal(fact);
      inputCodigo.current.focus();
    };

    const Anotar = async()=>{
      let fa = {...datosNotas.facturas[indexFactura]}

      let idCliente = parseInt(fa.datosCliente.id_cliente)
      let q = false;

      if(idCliente === 1){
        q = await swal({text: lang.q_desea_finalizar_venta_sin_cliente, title:lang.cerrar, icon: "info",buttons: [lang.cancelar, lang.ok]})
      }else{
        q = await swal({text: lang.q_desea_finalizar_nota, title:lang.cerrar, icon: "info",buttons: [lang.cancelar, lang.ok]})
      }
        if(fa.itemsFactura.length>0 && q){

          let data = {
            id_deposito_pedido:fa.depositoActivo,
            id_cliente_pedido:fa.datosCliente.id_cliente,
            id_user_pedido: id_user,
            id_empleado_pedido:datosNotas.id_empleado, 
            fecha_pedido: funciones.getFechaHorarioString(),
          }


          let ins = await APICALLER.insert({token:token_user,table:"notas_pedidos",data}) 
          if(ins.response){
            let lastid= ins.last_id;
            //setIDNotaPedido(ins.last_id);
            let promesas = [];
            fa.itemsFactura.forEach(async(e) => {
              let datos = { id_deposito_item: fa.depositoActivo, id_notas_pedido_item: lastid,id_producto_item: e.id_producto,precio_guardado:e.precio_guardado,cantidad_item:e.cantidad_producto }
              promesas.push(APICALLER.insert({table:"notas_items",token:token_user,data:datos}));
            });
            Promise.all(promesas);
            //setErrors({...errors,color:"success",mensaje:"Nota nro: "+ins.last_id+" generada existosamente",error:true})
            //setDialogs({...dialogs,imprimirNotaPedido:true});
            CancelarFacturaActual()
          } else{ console.log(ins)}
        }
      


    }

    const Aguardar = ()=>{

    }







  const sumarCantidad = (cant,index)=>{
    let f = {...datosNotas};
    let nc = cant + 1;
    let fd = f.facturas[indexFactura].itemsFactura[index];
    if(fd.stock_producto>cant || fd.tipo_producto===2){
      let iva_porcent = fd.iva_porcentaje;
      let subtotal = fd.precio_guardado * parseFloat(nc);
      fd.cantidad_producto = parseFloat(nc);
      fd.subtotal_precio = subtotal;
      fd.iva_total_producto = (subtotal * iva_porcent) / (100 + iva_porcent);
      hacerTotal(f)
    }
    else{
      setErrors({...errors,error:true,color:"error", mensaje:"Cantidad máxima en stock",notFound: true,notFoundMensaje: "Cantidad máxima en stock."})
    }
  }

  const restarCantidad = (cant,index)=>{
    let f = {...datosNotas};
    let nc = cant - 1;
    if(nc>0){
      let fd = f.facturas[indexFactura].itemsFactura[index];
      let iva_porcent = fd.iva_porcentaje;
      let subtotal = fd.precio_guardado * parseFloat(nc);
      fd.cantidad_producto = parseFloat(nc);
      fd.subtotal_precio = subtotal;
      fd.iva_total_producto = (subtotal * iva_porcent) / (100 + iva_porcent);
      hacerTotal(f);
    }
  }


  


    const getListas = useCallback(async()=>{
        setCargas({listaPedidos:true})
        let res = await APICALLER.get({table:"notas_pedidos",include:"clientes,empleados",
        on:"id_cliente,id_cliente_pedido,id_empleado_pedido,id_empleado",sort:'id_notas_pedido',
        fields:'id_notas_pedido,ruc_cliente,nombre_cliente,nombre_empleado,apellido_empleado,fecha_pedido',
        where:`fecha_pedido,between,'${desdeFecha} 00:00:00',and,'${hastaFecha} 23:59:59'`
        });

        res.response ? setLista(res.results) : console.log(res);

        setCargas({listaPedidos:false})
    },[desdeFecha,hastaFecha])



    const getDatosNota = useCallback(async()=>{
      if (localStorage.getItem("notas") === null) {
        let [rDepositos,rMoneda,empleado] = await Promise.all([
          APICALLER.get({table:"depositos",where:"tipo_deposito,=,1"}),
          APICALLER.get({ table: "monedas" }),
          APICALLER.get({table:'empleados',where:`user_id,=,${id_user}`})
        ])

        if (rMoneda.response ) {
          var activeMoneda = rMoneda.results.filter(e => e.activo_moneda === "1");
          var monedas = rMoneda.results
        }

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
        if(rDepositos.response ){ ID_DEPOSITO_ACTIVO = rDepositos.found>0 ? rDepositos.results[0].id_deposito : "0" }
        const initialNotaLocal = {
          facturas: [
            {
              itemsFactura: [],
              total: 0,
              depositoActivo:ID_DEPOSITO_ACTIVO,
              guardado: false,
              datosMoneda: activeMoneda.length > 0 ? activeMoneda[0] : {},
              datosNota: initialDatosNotaLocal,
              datosCliente: initialDatosClienteLocal,
            },
          ],
          id_empleado: empleado.found>0 ? empleado.first.id_empleado : 0, 
          indexFactura: 0,
          listaMonedas: monedas,
          monedaActiva: activeMoneda.length > 0 ? activeMoneda[0] : {},
          depositoActivo:'',
          alldepositos:true,
          listaDepositos: rDepositos.results,
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
  },[id_user])



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

    const values = {setDesdeFecha,setHastaFecha, consultarCliente,errors, setErrors,valorConvertido,borrarItem,sumarCantidad,restarCantidad, indexPrecioCambiar, verificarExisteEnTabla,consultarPorCodigo,setearNota, lista,cargas,lang,dialogs,setDialogs,inputCantidad,inputCodigo,indexFactura,setIndexFactura,datosNotas,getListas,Anotar,CancelarFacturaActual,Aguardar,insertarProductoTabla,openCambiarPrecio}

  return <NotasContext.Provider value={values}>{children}</NotasContext.Provider>
  
}


export const useNotas = () =>{
    const {setDesdeFecha,setHastaFecha, consultarCliente,errors, setErrors,valorConvertido,borrarItem,sumarCantidad,restarCantidad, indexPrecioCambiar, verificarExisteEnTabla,consultarPorCodigo,setearNota, lista,cargas,lang,dialogs,setDialogs,inputCantidad,inputCodigo,indexFactura,setIndexFactura,datosNotas,getListas,Anotar,CancelarFacturaActual,Aguardar,insertarProductoTabla,openCambiarPrecio} = useContext(NotasContext);
    return {setDesdeFecha,setHastaFecha, consultarCliente,errors, setErrors,valorConvertido,borrarItem,sumarCantidad,restarCantidad, indexPrecioCambiar, verificarExisteEnTabla,consultarPorCodigo,setearNota, lista,cargas,lang,dialogs,setDialogs,inputCantidad,inputCodigo,indexFactura,setIndexFactura,datosNotas,getListas,Anotar,CancelarFacturaActual,Aguardar,insertarProductoTabla,openCambiarPrecio}
}

export default NotasProvider
