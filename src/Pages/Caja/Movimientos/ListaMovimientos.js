import Tablas from "../../../Componentes/Tablas";
import {
  TextField,
  Button,
  Icon,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Typography,
  Alert,
} from "@mui/material";
import { useMovimientos } from "./MovimientosProvider";
import { useState } from "react";
import { Funciones } from "../../../Funciones/Funciones";

const ListaMovimientos = () => {
  const {
    setDesdeFecha,
    setHastaFecha,
    setDialog,
    dialog,
    setForm,
    lista,
    fecha,
    setIdCaja,
    listaCajas,
    cargando,
    movimientos,setTipoRegistro
  } = useMovimientos();

  const [desde, setDesde] = useState(fecha);
  const [hasta, setHasta] = useState(fecha);
  const [idCajita, setIdCajita] = useState("");
  const [idRegistrito,setIdRegistrito] = useState("");
  const changeDatadesde = (e) => setDesde(e.target.value);
  const changeDatahasta = (e) => setHasta(e.target.value);

  const Filtrar = () => {
    setHastaFecha(hasta);
    setDesdeFecha(desde);
    setIdCaja(idCajita);
    setTipoRegistro(idRegistrito);
  };

  

  const abrir = () => setDialog({...dialog,registrar:true})
  const abrirForm = f =>{ setForm(f); setDialog({...dialog,detalles:true})}
  const itemscompare = {
    0: "Egreso",
    1: "Ingreso",
    2: "Apertura",
    3: "Cierre",
    4: "Informe",
  }
  const columnas = [
    {
      field: "id_cajas_movimiento",
      title: "#",
    },
    {
      field: "nombre_caja",
      title: "Caja",
    },
    {
      field: "nombre_user",
      title: "Responsable",
    },

    {
      field: "tipo_registro",
      title: "Tipo",
      items: itemscompare,
      comparaItem: "tipo_registro",
      styleCondicion:{
        0:{backgroundColor:"#dd4632",padding:"6px",borderRadius:"5px",color:'#fff'},
        1:{backgroundColor:"#00ce4f",padding:"6px",borderRadius:"5px",color:'#fff'},
        2:{backgroundColor:"#1976d2",padding:"6px",borderRadius:"5px",color:'#fff'},
        3:{backgroundColor:"#a2a2ce",padding:"6px",borderRadius:"5px",color:'#000'},
      },
    },
    {
      field: "fecha_movimiento",
      title: "Fecha de movimiento",
    },
    {
      field: "monto_movimiento",
      title: "Monto",
      isNumber: true,
    },
    {
      field: "monto_sin_efectivo",
      title: "Sin efectivo",
      isNumber: true,
    },
  ];

  const Acciones = ({filaProps}) => (
    <Tooltip arrow title="Presione para ver más detalles">
      <Button onClick={()=>abrirForm(filaProps)} variant="outlined"  color="primary">
        Ver más
      </Button>
    </Tooltip>
  );

  const search = (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={6} md={2}>
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
      <Grid item xs={12} sm={6} md={2}>
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
      <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth>
          <InputLabel>Seleccione caja</InputLabel>
          <Select
            name="id_caja"
            onChange={(e) => {
              setIdCajita(e.target.value);
            }}
            value={idCajita}
          >
            <MenuItem value="">Todos</MenuItem>
            {listaCajas.map((item, index) => (
              <MenuItem key={index} value={item.id_caja}>
                {item.nombre_caja}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth>
          <InputLabel>Seleccione movimiento</InputLabel>
          <Select
            name="id_tipo_registro"
            onChange={(e) => { setIdRegistrito(e.target.value)}}
            value={idRegistrito}
          >
            <MenuItem value="">Todos</MenuItem>

              <MenuItem value={"2"}>Apertura</MenuItem>
              <MenuItem value={"1"}>Ingreso</MenuItem>
              <MenuItem value={"0"}>Egreso</MenuItem>
              <MenuItem value={"3"}>Cierre</MenuItem>
              
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={5}>
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
        <Button variant="outlined" color="secondary" onClick={abrir}>
          Registrar movimiento
        </Button>
      </Grid>
      <Grid item >
      <Alert severity="success" variant="outlined" icon={false}>
        <Typography variant="h5">
          Efectivo: {Funciones.numberSeparator(movimientos.ingresoEfectivo)}{" "}
        </Typography>
        </Alert>
      </Grid>
      <Grid item >
        <Alert severity="warning" variant="outlined" icon={false}>
        <Typography variant="h5">
          Sin efectivo: {Funciones.numberSeparator(movimientos.ingresoSinEfectivo)}{" "}
        </Typography>
        </Alert>
      </Grid>
      <Grid item >
        <Alert severity="error" variant="outlined" icon={false}>
        <Typography variant="h5">
          Egresos: {Funciones.numberSeparator(movimientos.egresos)}{" "}
        </Typography>
        </Alert>
      </Grid>
      <Grid item >
        <Alert severity="info" variant="outlined" icon={false}>
        <Typography variant="h5">
          Neto: {Funciones.numberSeparator(movimientos.ingresoEfectivo - movimientos.egresos )}{" "}
        </Typography>
        </Alert>
      </Grid>
    </Grid>
  );

  return (
    <>
      <Tablas
        icono="leaderboard"
        caption={`Total de movimiento: ${Funciones.numberSeparator(movimientos.ingresoTotal)}`}
        bgicono="#303f9f"
        nombretabla="Movimientos de caja"
        subtitle="En este módulo se pueden visualizar todos los movimientos de las cajas por fecha"
        search={search}
        namecolumnID="id_cajas_movimiento"
        columnas={columnas}
        Acciones={Acciones}
        filas={lista}
        cargando={cargando}
        showOptions
      />
    </>
  );
};

export default ListaMovimientos;
