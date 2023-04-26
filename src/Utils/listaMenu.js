import { BASEURL } from "./config";
// el menu esta relacionado con un multidioma
export const listaMenu = [
    {
        id: 590,
        title: "inicio",
        icon: "other_houses",
        color: "#a0aec0",
        url: `${BASEURL}/dashboard`,
        private:false
      },
      {
        id: 440,
        title: "informes",
        icon: "query_stats",
        color: "#a0aec0",
        open:false,
        sub:true,
        submenu:[
          {
            id:2,
            url: `${BASEURL}/informes`,
            title:'generales',
            icon: "incomplete_circle",
            color: "#a0aec0",
          },
          {
            id:3,
            url: `${BASEURL}/informesproductos`,
            title:'productos',
            icon: "pie_chart",
            color: "#a0aec0",
          },
        ],
        
      },
      {
        id:580,
        title: "agendas",
        icon:"event",
        color: "#a0aec0",
        open:false,
        sub:true,
        submenu:[
          {
            id:5,
            title:'agenda',
            icon:'view_agenda',
            color: "#a0aec0",
            url:`${BASEURL}/agenda`,
          },
        ]
      },
      {
        id: 530,
        title: "ventas",
        icon: "sell",
        color: "#a0aec0",
        url: "url",
        open:false,
        sub:true,
        submenu: [
          {
            id: 7,
            title: "nueva_venta",
            url: `${BASEURL}/ventas`,
            icon: "point_of_sale",
            color: "#a0aec0",
          },    
          {
            id: 8,
            title: "notas_pedidos",
            url: `${BASEURL}/notas`,
            icon: "receipt_long",
            color: "#a0aec0",
          },
          {
            id: 6,
            title: "lista_facturas",
            url: `${BASEURL}/facturas`,
            icon: "receipt",
            color: "#a0aec0",
          },
          {
            id: 10,
            title: "comisiones",
            url: `${BASEURL}/comisiones`,
            icon: `paid`,
            color: "#a0aec0",
          },
          {
            id: 12,
            title: "formas_de_pago",
            url: `${BASEURL}/formaspago`,
            icon: "wallet",
            color: "#a0aec0",
          },
          {
            id: 14,
            title: "entregas",
            url: `${BASEURL}/entregas`,
            icon: "delivery_dining",
            color: "#a0aec0",
          },
          {
            id: 62,
            title: "pedidos",
            url: `${BASEURL}/pedidos`,
            icon: "storefront",
            color: "#a0aec0",
          },
          {
            id: 16,
            title: "reportes",
            url: `${BASEURL}/reportes`,
            icon: "summarize",
            color: "#a0aec0",
          },
        ],
      },
      {
        id: 540,
        title: "productos",
        icon: "inventory_2",
        color: "#a0aec0",
        open:false,
        sub:true,
        submenu: [
          {
            id: 18,
            title: "agregar",
            icon: "post_add",
            color: "#a0aec0",
            url: `${BASEURL}/productos/new`,
          },
          {
            id: 17,
            title: "listado",
            icon: "content_paste",
            color: "#a0aec0",
            url: `${BASEURL}/productos`,
          },
          {
            id: 19,
            title: "categorias",
            icon: "category",
            color: "#a0aec0",
            url: `${BASEURL}/categorias`,
          },
          {
            id: 21,
            title: "proveedores",
            url: `${BASEURL}/proveedores`,
            icon: "local_shipping",
            color: "#a0aec0",
          },
          {
            id: 23,
            title: "marcas",
            url: `${BASEURL}/marcas`,
            icon: "branding_watermark",
            color: "#a0aec0",
          },
          {
            id: 25,
            title: "apartados",
            icon: "save",
            color: "#a0aec0",
            url: `${BASEURL}/apartados`,
          },
          
          {
            id:27,
            title:"depositos",
            url:`${BASEURL}/depositos`,
            icon:"local_convenience_store",
            color:"#a0aec0",
          },
          {
            id:30,
            title:"transferencias",
            url:`${BASEURL}/transferencias`,
            icon:"sync_alt",
            color:"#a0aec0",
          },
          {
            id: 31,
            title: "inventario",
            icon: "handyman",
            color: "#a0aec0",
            url: `${BASEURL}/inventario`,
          },
        ],
      },
      

      {
        id: 55,
        title: "arqueos",
        icon: "savings",
        color: "#a0aec0",
        open:false,
        sub:true,
        submenu: [
          {
            id: 33,
            title: "cajas",
            url: `${BASEURL}/cajas`,
            icon: `point_of_sale`,
            color: "#a0aec0",
          },
          {
            id: 36,
            title: "mov__caja",
            url: `${BASEURL}/movimientos`,
            icon: `list_alt`,
            color: "#a0aec0",
          },
          {
            id: 37,
            title: "registros__mov",
            url: `${BASEURL}/registromovimientos`,
            icon: `phone_android`,
            color: "#a0aec0",
         },
        ],
      },
      {
        id: 31,
        title: "compras",
        icon: "shopping_basket",
        color: "#a0aec0",
        url: `${BASEURL}/compras`,
      },
      {
        id: 38,
        title: "cuentas",
        icon: "account_balance_wallet",
        color: "#a0aec0",
        open:false,
        sub:true,
        submenu: [
          {
            id:38,
            title:'a_cobrar',
            url: `${BASEURL}/cuentas`,
            icon: "account_balance_wallet",
            color: "#a0aec0"
          }
        ],
      },
      {
        id: 560,
        title: "mantenimiento",
        icon: "engineering",
        color: "#a0aec0",
        open:false,
        sub:true,
        submenu: [
          {
            id: 40,
            title: "clientes",
            url: `${BASEURL}/clientes`,
            icon: "people",
            color: "#a0aec0",
          },
          {
            id: 42,
            title: "empleados",
            url: `${BASEURL}/empleados`,
            icon: "badge",
            color: "#a0aec0",
          },
    
          {
            id: 44,
            title: "monedas",
            url: `${BASEURL}/monedas`,
            icon: "payments",
            color: "#a0aec0",
          },
          {
            id: 46,
            title: "unidad_medida",
            icon: "square_foot",
            color: "#a0aec0",
            url: `${BASEURL}/medidas`,
          },
          {
            id: 48,
            title: "impuestos",
            icon: "account_balance",
            color: "#a0aec0",
            url: `${BASEURL}/impuestos`,
          },
          {
            id: 49,
            title: "usuarios",
            icon: "manage_accounts",
            color: "#a0aec0",
            url: `${BASEURL}/users`,
          },
          {
            id: 51,
            title: "actividad",
            icon: "remove_red_eye",
            color: "#a0aec0",
            url: `${BASEURL}/actividad`,
          },
        ],
      },
    
      {
        id: 57,
        title: "ajustes",
        icon: "build",
        color: "#a0aec0",
        private:false,
        open: false,
        sub:true,
        submenu: [
          {
            id: 52,
            title: "datos_empresa",
            icon: "admin_panel_settings",
            color: "#a0aec0",
            url: `${BASEURL}/settings`,
          },
          {
            id: 54,
            title: "registro_facturas",
            icon: "receipt",
            color: "#a0aec0",
            url: `${BASEURL}/registrofacturas`,
          },
          {
            id: 57,
            title: "tema_y_colores",
            icon: "brush",
            color: "#a0aec0",
            url: `${BASEURL}/tema`,
          },
          {
            id: 56,
            title: "backup",
            icon: "cloud_sync",
            color: "#a0aec0",
            url: `${BASEURL}/backup`,
          },
          {
            id: 58,
            title: "info_y_ayuda",
            icon: "info",
            color: "#a0aec0",
            url: `${BASEURL}/info`,
            private:false
          },

          {
            id: 59,
            title: "sitio_web",
            icon: "public",
            color: "#a0aec0",
            url: `${BASEURL}/web`,
            private:true
          },

        ],
        
      },
        
]