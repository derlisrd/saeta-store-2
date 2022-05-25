
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
      title: "NRO",
    },
    {
      field: "fecha_factura",
      title: "FECHA",
    },
    {
      field: "nombre_cliente",
      title: "CLIENTE",
    },

    {
      field: "estado_factura",
      title: "ESTADO",
      items: { 0: "Anulado", 1: "Cobrado", 2: "Cobranza pendiente" },
      compareField: "estado_factura",
    },
    {
      field: "tipo_factura",
      title: "TIPO",
      items: { 1: "Contado", 2: "Crédito", 0: "Recibo" },
      compareField: "tipo_factura",
    },
    {
      field: "monto_total_factura",
      title: "MONTO",
      isNumber: true,
      before: MONEDA_PRINCIPAL.abreviatura_moneda,
    },
  ];

  const abrirDetallesFactura = (datos) => {
    setDialogs({...dialogs,estado:true})
    setFormulario(datos);
  };

  const Acciones = ({ filaProps }) => (
    <Stack direction="row" spacing={2}>
      <Tooltip
        title="Ver estado" arrow>
      <IconButton
      onClick={() => {
        abrirDetallesFactura(filaProps);
      }}
      >
        <Icon>credit_score</Icon>
      </IconButton>
      </Tooltip>
      <Tooltip
        title="Imprimir" arrow
      >
      <IconButton
        onClick={() => consultarParaImprimir(filaProps)}
        >
          <Icon>print</Icon>
      </IconButton>
      </Tooltip>
    </Stack>
  );

  

  

  const search = (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}  >
        <Button variant="contained"
        fullWidth
        color="primary"
        size="large"
        onClick={()=>go.to('ventas')}
        >
          Nueva venta
        </Button>
      </Grid>
      <Grid item xs={12}  >
        <TextField
          fullWidth
          label="Desde"
          variant="outlined"
          type="date"
          defaultValue={desde}
          onChange={changeDatadesde}
          name="desdeFecha"
        />
      </Grid>
      <Grid item xs={12}  >
        <TextField
          fullWidth
          label="Hasta"
          variant="outlined"
          type="date"
          defaultValue={hasta}
          onChange={changeDatahasta}
          name="hastaFecha"
        />
      </Grid>
      <Grid item xs={12}  >
        <FormControl fullWidth>
          <InputLabel variant="outlined">Seleccione opciones</InputLabel>
          <Select
            name="tipo_filtro"
            value={tipoFiltro}
            onChange={(e) => {
              setTipoFiltro(e.target.value);
            }}
            variant="outlined"
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="0">Tipo recibo</MenuItem>
            <MenuItem value="no_recibo">Solo facturas</MenuItem>
            <MenuItem value="1">Tipo contado</MenuItem>
            <MenuItem value="2">Tipo crédito</MenuItem>
            <MenuItem value="3">Cobrados</MenuItem>
            <MenuItem value="4">No cobrados</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} >
        <Button
          onClick={Filtrar}
          variant="outlined"
          color="primary"
          size="large"
          startIcon={<Icon>filter_list</Icon>}
        >
          Filtrar
        </Button>
      </Grid>
      
      <Grid item xs={12}>
        <h3>Total: {funciones.numberSeparator(total)}{" "}
        {MONEDA_PRINCIPAL.abreviatura_moneda}{" "}</h3>
      </Grid>
    </Grid>
  );

  const search2 = (<Grid container spacing={1}>
    <Grid item xs={12} sm={4}>
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
          variant="outlined"
          label="Buscar por número"
          fullWidth
        />
      </Grid>
      
  </Grid>)

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
          {search}
      </Grid>
      <Grid item xs={12} md={9}>
        
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
            /* print
            nombretabla="Facturas"
            caption={`Total: ${funciones.numberSeparator(total)}`}
            subtitle="Todos los movimientos de facturas filtradas por fecha y tipo"
            columnas={columnas}
            Acciones={Acciones}
            bgicono="#3f51b5"
            icono="assignment"
            filas={FilterData}
            namecolumnID="id_factura"
            cargando={cargando}
            search={search2}
            exportCSV
            exportExcel
            showOptions */
          />
      
      </Grid>
     
    </Grid>
  );
};

export default FacturasLista;
