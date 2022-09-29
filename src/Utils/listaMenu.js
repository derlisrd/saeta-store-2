import { BASEURL } from "./config";
// el menu esta relacionado con un multidioma
export const listaMenu = [
    {
        id: 59,
        title: "inicio",
        icon: "apps",
        color: "#a0aec0",
        url: `${BASEURL}/dashboard`,
        private:false
      },
      {
        id: 44,
        title: "informes",
        icon: "trending_up",
        color: "#a0aec0",
        submenu:[
          {
            id:63,
            url: `${BASEURL}/informes`,
            title:'Informes_Generales',
            icon: "trending_up",
            color: "#a0aec0",
          },
          {
            id:64,
            url: `${BASEURL}/informesproductos`,
            title:'Informes_Productos',
            icon: "summarize",
            color: "#a0aec0",
          },
        ],
        
      },
      {
        id:58,
        title: "agendas",
        open:false,
        icon:"calendar_month",
        submenu:[
          {
            id:49,
            title:'turnos',
            icon:'login',
            color: "#a0aec0",
            url:`${BASEURL}/turnos`,
          },
          {
            id:51,
            title:'agenda',
            icon:'date_range',
            color: "#a0aec0",
            url:`${BASEURL}/agenda`,
          },
        ]
      },
      {
        id: 53,
        title: "ventas",
        icon: "sell",
        color: "#a0aec0",
        url: "url",
        open: false,
        submenu: [
          {
            id: 1,
            title: "nueva_venta",
            url: `${BASEURL}/ventas`,
            icon: "point_of_sale",
            color: "#a0aec0",
          },    
          {
            id: 6,
            title: "notas_pedidos",
            url: `${BASEURL}/notaspedidos`,
            icon: "receipt",
            color: "#a0aec0",
          },
          {
            id: 4,
            title: "lista_facturas",
            url: `${BASEURL}/facturas`,
            icon: "assignment",
            color: "#a0aec0",
          },
          {
            id: 66,
            title: "comisiones",
            url: `${BASEURL}/comisiones`,
            icon: `paid`,
            color: "#a0aec0",
          },
          {
            id: 67,
            title: "formas_de_pago",
            url: `${BASEURL}/formaspago`,
            icon: "account_balance_wallet",
            color: "#a0aec0",
          },
          {
            id: 16,
            title: "entregas",
            url: `${BASEURL}/entregas`,
            icon: "delivery_dining",
            color: "#a0aec0",
          },
        ],
      },
      {
        id: 54,
        title: "productos",
        icon: "inventory_2",
        color: "#a0aec0",
        open: false,
        submenu: [
          {
            id: 9,
            title: "agregar",
            icon: "diamond",
            color: "#a0aec0",
            url: `${BASEURL}/productos/new`,
          },
          {
            id: 8,
            title: "lista_productos",
            icon: "content_paste",
            color: "#a0aec0",
            url: `${BASEURL}/productos`,
          },
  
          {
            id: 10,
            title: "categorias",
            icon: "category",
            color: "#a0aec0",
            url: `${BASEURL}/categorias`,
          },
          {
            id: 14,
            title: "proveedores",
            url: `${BASEURL}/proveedores`,
            icon: "local_shipping",
            color: "#a0aec0",
          },
          {
            id: 12,
            title: "marcas",
            url: `${BASEURL}/marcas`,
            icon: "branding_watermark",
            color: "#a0aec0",
          },
          {
            id: 18,
            title: "apartados",
            icon: "save",
            color: "#a0aec0",
            url: `${BASEURL}/apartados`,
          },
          
          {
            id:39,
            title:"depositos",
            url:`${BASEURL}/depositos`,
            icon:"local_convenience_store",
            color:"#a0aec0",
          },
          {
            id:60,
            title:"transferencias",
            url:`${BASEURL}/transferencias`,
            icon:"sync_alt",
            color:"#a0aec0",
          },
          {
            id: 43,
            title: "inventario",
            icon: "handyman",
            color: "#a0aec0",
            url: `${BASEURL}/inventario`,
          },
        ],
      },
      
      {
        id: 20,
        title: "compras",
        icon: "shopping_basket",
        color: "#a0aec0",
        url: `${BASEURL}/compras`,
      },
      {
        id: 55,
        title: "arqueos",
        icon: "savings",
        color: "#a0aec0",
        open: false,
        submenu: [
          {
            id: 22,
            title: "cajas",
            url: `${BASEURL}/cajas`,
            icon: `point_of_sale`,
            color: "#a0aec0",
          },
          {
            id: 24,
            title: "mov__caja",
            url: `${BASEURL}/movimientos`,
            icon: `leaderboard`,
            color: "#a0aec0",
          },
          {
            id: 26,
            title: "registros__mov",
            url: `${BASEURL}/registromovimientos`,
            icon: `app_registration`,
            color: "#a0aec0",
         },
        ],
      },{
        id: 47,
        title: "cuentas",
        icon: "payments",
        color: "#a0aec0",
        url: `${BASEURL}/cuentas`,
      },
      {
        id: 56,
        title: "mantenimiento",
        icon: "engineering",
        color: "#a0aec0",
        open: false,

        submenu: [
          {
            id: 28,
            title: "clientes",
            url: `${BASEURL}/clientes`,
            icon: "people",
            color: "#a0aec0",
          },
          {
            id: 41,
            title: "empleados",
            url: `${BASEURL}/empleados`,
            icon: "badge",
            color: "#a0aec0",
          },
    
          {
            id: 30,
            title: "monedas",
            url: `${BASEURL}/monedas`,
            icon: "monetization_on",
            color: "#a0aec0",
          },
          {
            id: 32,
            title: "unidad_medida",
            icon: "square_foot",
            color: "#a0aec0",
            url: `${BASEURL}/medidas`,
          },
          {
            id: 45,
            title: "impuestos",
            icon: "account_balance",
            color: "#a0aec0",
            url: `${BASEURL}/impuestos`,
          },
          {
            id: 34,
            title: "usuarios",
            icon: "manage_accounts",
            color: "#a0aec0",
            url: `${BASEURL}/users`,
          },
        ],
      },
    
      {
        id: 57,
        title: "ajustes",
        icon: "settings",
        color: "#a0aec0",
        open: false,
        private:false,
        submenu: [
          {
            id: 36,
            title: "datos_empresa",
            icon: "admin_panel_settings",
            color: "#a0aec0",
            url: `${BASEURL}/settings`,
          },
          {
            id: 38,
            title: "registro_facturas",
            icon: "app_registration",
            color: "#a0aec0",
            url: `${BASEURL}/registrofacturas`,
          },
          {
            id: 72,
            title: "tema_y_colores",
            icon: "palette",
            color: "#a0aec0",
            url: `${BASEURL}/tema`,
          },
          {
            id: 65,
            title: "backup",
            icon: "backup",
            color: "#a0aec0",
            url: `${BASEURL}/backup`,
          },
          {
            id: 59,
            title: "info_y_ayuda",
            icon: "help",
            color: "#a0aec0",
            url: `${BASEURL}/info`,
            private:false
          },

        ],
      },  
]