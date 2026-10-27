import { Icon, IconButton, InputAdornment,  Stack,  TextField } from "@mui/material";
import Tablas from "../../Components/UI/Tablas";
import { useCuentas } from "./CuentasProvider";
import {funciones} from '../../Functions'
import {useDatosEmpresa} from '../../Contexts/DatosEmpresaProvider'
import { useState } from "react";
import AccionesCobro from "./Components/AccionesCobro";
const CuentasCobrarLista = () => {
  const {MONEDA_PRINCIPAL} = useDatosEmpresa()
  const {cargando,lang,listas,getbuscarCobrar} = useCuentas();
  const [inputbuscar,setInputBuscar] = useState("")
  const columnas = [
    {
      field: "nro_factura",
      title: "NRO",
      isNumber: true,
      style: { fontWeight: "bold" },
    },
    {
      field: "nombre_cliente",
      title: "Cliente",
    },
    {
      field: "tipo_factura",
      title: lang.tipo,
      items: {"2":"Crédito","3":"Cuotas" },
      compareField: "tipo_factura",
    },
    {
      field: "recibido_factura",
      title: "Recibido",
      isNumber: true,
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
          padding: "3px",fontWeight:"bold",
          borderRadius: "5px",
          color: "#780c00",
        },
        "1": {
          backgroundColor: "#2dec76",
          padding: "3px", fontWeight:"bold",
          borderRadius: "5px",
          color: "#007b02",
        },
      },
    },
  ];





  

  const search = (
    <Stack direction='row'>
      <TextField label={lang.buscar} value={inputbuscar} onChange={e=>setInputBuscar(e.target.value)}  
        InputProps={{
            endAdornment:(
            <InputAdornment position="end" >
                <IconButton onClick={()=>{ getbuscarCobrar(inputbuscar) }}>
                    <Icon>search</Icon>
                </IconButton>
            </InputAdornment> )
        }}
      />

    </Stack>
  );

  const totalTxt = "Total a cobrar: "+funciones.numberSeparator(listas.totalCobrar)+" "+ MONEDA_PRINCIPAL.abreviatura_moneda;
  const listaFiltrada = listas.cobrar.filter(item => item.nombre_cliente.toLowerCase().includes(inputbuscar.toLowerCase()));
  return (
      <>
    <Tablas
      lang={lang}
      icon={{ name:"payments" }}
      title={lang.cuentas_a_cobrar}
      caption={totalTxt}
      subtitle={lang.listas_cuentas_cobrar}
      Accions={AccionesCobro}
      loading={cargando.lista}
      columns={columnas}
      datas={listaFiltrada}
      inputs={search}
      showOptions
    />

    </>
  );
};

export default CuentasCobrarLista;
