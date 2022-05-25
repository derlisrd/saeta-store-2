import { Button, Icon, IconButton, InputAdornment, TextField } from "@mui/material";
import Tablas from "../../Componentes/Tablas";
import { useCuentas } from "./CuentasProvider";
import {Funciones} from '../../Funciones/Funciones'
import {useDatosEmpresa} from '../../Contextos/DatosEmpresaProvider'
const CuentasCobrarLista = () => {
  const {MONEDA_PRINCIPAL} = useDatosEmpresa()
  const {cargando,listaCobrar,setformCobrar,setDialogs,dialogs,listaCajas,setIdCaja,totalCobrar} = useCuentas();

  const columnas = [
    {
      field: "nro_factura",
      title: "NRO",
      isNumber: true,
      style: { fontWeight: "bold" },
    },
    {
      field: "nombre_caja",
      title: "Caja",
    },
    {
      field: "nombre_cliente",
      title: "Cliente",
    },
    {
      field: "fecha_cobro_factura",
      title: "Fecha de cobro",
      style: { fontWeight: "bold" },
    },
    {
      field: "monto_total_factura",
      title: "Total",
      isNumber: true,
      style: { fontWeight: "bold" },
    },
    {
      field: "estado_factura",
      title: "Estado",
      items: { 1: "Pagado", 2: "Pendiente de cobro" },
      comparaItem: "estado_factura",
    },
  ];

  const open = (form) => {
    let index = listaCajas.findIndex((e) => e.id_caja === form.id_caja_factura);
    setIdCaja(listaCajas[index].id_caja);
    setformCobrar(form);
    setDialogs({ ...dialogs, cobrar: true });
  };
  const Acciones = ({ filaProps }) => (
    <Button
      variant="outlined"
      onClick={() => open(filaProps)}
      startIcon={<Icon color="primary">paid</Icon>}
    >
      Cobrar
    </Button>
  );

  

  const search = (
    <>
      <TextField label="Buscar por cliente" 
        InputProps={{
            endAdornment:(
            <InputAdornment position="end" >
                <IconButton onClick={()=>{console.log("buscar")}}>
                    <Icon>search</Icon>
                </IconButton>
            </InputAdornment> )
        }}
      />

    </>
  );

  const totalTxt = "Total a cobrar: "+Funciones.numberSeparator(totalCobrar)+" "+ MONEDA_PRINCIPAL.abreviatura_moneda;

  return (
      <>
    <Tablas
      nombretabla="Cuentas a cobrar"
      caption={totalTxt}
      subtitle="Lista de ventas/facturas a cobrar"
      namecolumnID="id_factura"
      Acciones={Acciones}
      cargando={cargando}
      columnas={columnas}
      filas={listaCobrar}
      search={search}
      showOptions
    />

    </>
  );
};

export default CuentasCobrarLista;
