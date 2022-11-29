export const columns = [
    {
      field: "id_comision",
      title: "ID",
    },
    {
      field: "apellido_empleado",
      title: "Apellido",
    },
    {
      field: "nombre_empleado",
      title: "Nombre",
    },
    {
      field: "nombre_producto",
      title: "Producto",
    },
    {
      field: "precio_vendido_comision",
      title: "Precio",
      isNumber:true
    },
    {
      field: "comision_valor",
      title: "Comisión",
      isNumber:true
    },
    {
      field: "porcentaje",
      title: "Porc.",
      after: ' %'
    },
    {
      field: "fecha_comision",
      title: "Fecha",
    },
  ];
