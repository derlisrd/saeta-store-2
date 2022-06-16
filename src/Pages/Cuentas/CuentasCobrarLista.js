import { Button, Icon, IconButton, InputAdornment, TextField } from "@mui/material";
import Tablas from "../../Components/UI/Tablas";
import { useCuentas } from "./CuentasProvider";
import {funciones} from '../../Functions'
import {useDatosEmpresa} from '../../Contexts/DatosEmpresaProvider'
const CuentasCobrarLista = () => {
  const {MONEDA_PRINCIPAL} = useDatosEmpresa()
  const {cargando,listaCobrar,setformCobrar,setDialogs,dialogs,listaCajas,setIdCaja,totalCobrar,lang} = useCuentas();

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
      title: lang.estado,
      compareField:"estado_factura",
      items: {
        "1": lang.pagado,
        "2": lang.pendiente+'...',
      },
      styleFieldCondition: "estado_factura",
      styleCondition: {
        "2": {
          backgroundColor: "#ff7c6b",
          padding: "6px",fontWeight:"bold",
          borderRadius: "5px",
          color: "#780c00",
        },
        "1": {
          backgroundColor: "#2dec76",
          padding: "6px", fontWeight:"bold",
          borderRadius: "5px",
          color: "#007b02",
        },
      },
    },
  ];

  const open = (form) => {
    let index = listaCajas.findIndex((e) => e.id_caja === form.id_caja_factura);
    setIdCaja(listaCajas[index].id_caja);
    setformCobrar(form);
    setDialogs({ ...dialogs, cobrar: true });
  };
  const Acciones = ({ rowProps }) => (
    <Button
      variant="outlined"
      onClick={() => open(rowProps)}
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

  const totalTxt = "Total a cobrar: "+funciones.numberSeparator(totalCobrar)+" "+ MONEDA_PRINCIPAL.abreviatura_moneda;

  return (
      <>
    <Tablas
      lang={lang}
      icon={{ name:"payments" }}
      title={lang.cuentas_a_cobrar}
      caption={totalTxt}
      subtitle={lang.listas_cuentas_cobrar}
      Accions={Acciones}
      loading={cargando}
      columns={columnas}
      datas={listaCobrar}
      inputs={search}
      showOptions
    />

    </>
  );
};

export default CuentasCobrarLista;
