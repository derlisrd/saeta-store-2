
import { useState } from "react";
import Tablas from "../../../Components/UI/Tablas";
import { useFacturas } from "./FacturasProvider";
import {Button,Icon,TextField,Select,FormControl,InputLabel,MenuItem,Grid,IconButton,InputAdornment, Tooltip, Stack} from "@mui/material";

import { useDatosEmpresa } from "../../../Contexts/DatosEmpresaProvider";
import useGoto from "../../../Hooks/useGoto";



const FacturasLista = () => {
  const {
    lista,setDesdeFecha,setHastaFecha,cargando,total,setDialogs,dialogs,
    setFormulario,fecha,funciones,setFiltro,inputSearch,setInputSearch,
    getBuscarFactura, consultarParaImprimir,lang
  } = useFacturas();
  const { MONEDA_PRINCIPAL } = useDatosEmpresa();

  

  const [desde, setDesde] = useState(fecha);
  const [hasta, setHasta] = useState(fecha);
  const [tipoFiltro, setTipoFiltro] = useState("");

  const go = useGoto();


  const changeDatadesde = (e) => setDesde(e.target.value);
  const changeDatahasta = (e) => setHasta(e.target.value);

  const Filtrar = () => {
    setHastaFecha(hasta);
    setDesdeFecha(desde);
    setFiltro(tipoFiltro);
  };

  const FilterData = lista.filter(
    (item) =>
      item.nro_factura.toLowerCase().includes(inputSearch.toLowerCase()) ||
      item.nombre_cliente.toLowerCase().includes(inputSearch.toLowerCase())
  );

  const columnas = [
    {
      field: "nro_factura",
      title: lang.nro,
    },
    {
      field: "fecha_factura",
      title: lang.fecha,
    },
    {
      field: "nombre_cliente",
      title: lang.cliente,
    },

    {
      field: "estado_factura",
      title: lang.estado,
      items: { 0: "Anulado", 1: "Cobrado", 2: "Cobranza pendiente" },
      compareField: "estado_factura",
      styleFieldCondition: "estado_factura",
      styleCondition: {
        "2": {
          backgroundColor: "#ff7c6b",
          padding: "2px",fontWeight:"bold",
          borderRadius: "5px",
          color: "#780c00",
        },
        "1": {
          backgroundColor: "#2dec76",
          padding: "2px", fontWeight:"bold",
          borderRadius: "5px",
          color: "#007b02",
        },
      },
    },
    {
      field: "tipo_factura",
      title: lang.tipo,
      items: { 1: "Contado", 2: "Crédito", 0: "Recibo","3":"Cuotas" },
      compareField: "tipo_factura",
    },
    
    {
      field: "monto_total_factura",
      title: lang.monto,
      isNumber: true,
      before: MONEDA_PRINCIPAL.abreviatura_moneda,
    },
  ];

  const abrirDetallesFactura = (datos) => {
    setDialogs({...dialogs,estado:true})
    setFormulario(datos);
  };

  const Acciones = ({ rowProps }) => (
    <Stack direction="row" spacing={2}>
      <Tooltip
        title="Ver estado" arrow>
      <IconButton
      onClick={() => {
        abrirDetallesFactura(rowProps);
      }}
      >
        <Icon>credit_score</Icon>
      </IconButton>
      </Tooltip>
      <Tooltip
        title="Imprimir" arrow
      >
      <IconButton
        onClick={() => consultarParaImprimir(rowProps)}
        >
          <Icon>print</Icon>
      </IconButton>
      </Tooltip>
    </Stack>
  );

  

  

  const search = (
    <Grid container spacing={3}>
      <Grid item xs={12}  >
        <TextField
          fullWidth
          label={lang.desde}
          type="date"
          defaultValue={desde}
          onChange={changeDatadesde}
          name="desdeFecha"
        />
      </Grid>
      <Grid item xs={12}  >
        <TextField
          fullWidth
          label={lang.hasta}
          type="date"
          defaultValue={hasta}
          onChange={changeDatahasta}
          name="hastaFecha"
        />
      </Grid>
      <Grid item xs={12}  >
        <FormControl fullWidth>
          <InputLabel variant="outlined">{lang.opciones_filtro}</InputLabel>
          <Select
            name="tipo_filtro"
            value={tipoFiltro}
            onChange={(e) => {
              setTipoFiltro(e.target.value);
            }}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="0">Tipo recibo</MenuItem>
            <MenuItem value="no_recibo">Solo facturas</MenuItem>
            <MenuItem value="1">Tipo contado</MenuItem>
            <MenuItem value="2">Tipo crédito</MenuItem>
            <MenuItem value="5">Tipo cuotas</MenuItem>
            <MenuItem value="3">Cobrados</MenuItem>
            <MenuItem value="4">No cobrados</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} >
        <Button
          onClick={Filtrar}
          variant="contained"
          size="large"
          startIcon={<Icon>filter_list</Icon>}
        >
          {lang.filtrar}
        </Button>
      </Grid>
      
      <Grid item xs={12}>
        <h3>{lang.total}: {funciones.numberSeparator(total)}{" "}
        {MONEDA_PRINCIPAL.abreviatura_moneda}{" "}</h3>
      </Grid>
    </Grid>
  );

  const search2 = (<Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
  <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    getBuscarFactura();
                  }}
                >
                  <Icon>search</Icon>
                </IconButton>
              </InputAdornment>
            ),
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              getBuscarFactura();
            }
          }}
          onChange={(e) => setInputSearch(e.target.value)}
          label={lang.buscar_por_nro}
        />
<Button variant="contained" size="large"onClick={()=>go.to('ventas')}>{lang.nueva_venta}</Button>
</Stack>)

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={3}>
          {search}
      </Grid>
      <Grid item xs={12} sm={12} md={9}>
        
          <Tablas
            title={lang.facturas}
            icon={{ name:"assignment", }}
            loading={cargando}
            inputs={search2}
            subtitle={lang.lista_facturas}
            datas={FilterData}
            columns={columnas}
            Accions={Acciones}
            showOptions
          />
      
      </Grid>
     
    </Grid>
  );
};

export default FacturasLista;


