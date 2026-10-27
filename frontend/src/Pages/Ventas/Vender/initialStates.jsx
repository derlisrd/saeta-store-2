function initialStates() {
    

    const initialDatosCliente = {
        id_cliente: 1,
        nombre_cliente: "SIN NOMBRE",
        direccion_cliente:"",
        ruc_cliente: "0",
      }


    const initialDialogs={main:!0,nota:!1,buscarProducto:!1,cambiarPrecio:!1,buscarCliente:!1,registrarCliente:!1,finalizarVenta:!1,imprimirNotaPedido:!1,
        imprimirTicketRecibo:!1,imprimirTicketFactura:!1,imprimirFacturaA4:!1,imprimirReciboA4:!1,
        imprimirPresupuesto:!1,ayuda:!1,cambioCliente:!1,abrirCaja:!1,imagen:!1,registrarProducto:!1};

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


      return {
        initialErrors,initialDialogs,initialDatosCliente
      }
}

export default initialStates;