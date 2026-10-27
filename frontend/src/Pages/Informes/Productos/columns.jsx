export const columns = [
    {
        field: "id_productos_vendido",
        title: "#",
        noPrint:true
      },
      {
        field: "cantidad_vendido",
        title: "Cantidad",
        isNumber:true,
        style:{fontWeight:"bold"}
      },
      {
        field: "nombre_producto",
        title: "Producto",
        style:{fontWeight:"bold"}
      },
      {
        field: "costo_producto_vendido",
        title: "Costo",
        isNumber:true
      },
      {
        field: "precio_vendido",
        title: "Precio",
        isNumber:true
      },
      {
        field: "lucro_vendido",
        title: "Lucro",
        isNumber:true,
        style:{backgroundColor:"#00ce4f",padding:"6px",borderRadius:"5px",color:'#006226',fontWeight:"bold"}
      },
      {
        field: "total_vendido",
        title: "Total",
        isNumber:true,
        style:{fontWeight:"bold"}
      },
      {
        field: "fecha_vendido",
        title: "Fecha",
      },
];