import Tablas from "../../../Components/UI/Tablas";
import {Button,Icon,Grid,FormControl,InputLabel,Select, MenuItem,Tooltip,Typography,Alert} from "@mui/material";
import { useMovimientos } from "./MovimientosProvider";
import { useState } from "react";
import { funciones } from "../../../Functions";
import { DatePickerCustom } from "../../../Components/MuiCustom/DatePickerCustom";

const ListaMovimientos = () => {
  const { lang,setDesdeFecha,setHastaFecha,setDialog,dialog,setForm,lista,setIdCaja,listaCajas,cargando,movimientos,setTipoRegistro, listaMonedas,setMonedaFilter
  } = useMovimientos();


  const today = new Date()

  const [desde, setDesde] = useState(today);
  const [hasta, setHasta] = useState(today);



  const [idCajita, setIdCajita] = useState("");
  const [idRegistrito,setIdRegistrito] = useState("");
  const [idMoneda,setIdMoneda] = useState("")

  const changeDatadesde = (e) => setDesde(e)
  const changeDatahasta = (e) => setHasta(e);

  const Filtrar = () => {
    setHastaFecha(funciones.getDateYMD( hasta ));
    setDesdeFecha(funciones.getDateYMD( desde ));
    setIdCaja(idCajita);
    setTipoRegistro(idRegistrito);
    setMonedaFilter(idMoneda);
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
      title: lang.caja,
    },
    {
      field: "nombre_user",
      title: lang.responsable,
    },
    {
      field: "tipo_registro",
      title: lang.tipo,
      compareField:"tipo_registro",
      items: itemscompare,
      styleFieldCondition: "tipo_registro",
      styleCondition:{
        0:{backgroundColor:"#dd4632",padding:"6px",borderRadius:"5px",color:'#fff',fontWeight:"bold"},
        1:{backgroundColor:"#00ce4f",padding:"6px",borderRadius:"5px",color:'#006226',fontWeight:"bold"},
        2:{backgroundColor:"#1976d2",padding:"6px",borderRadius:"5px",color:'#fff',fontWeight:"bold"},
        3:{backgroundColor:"#a2a2ce",padding:"6px",borderRadius:"5px",color:'#515168',fontWeight:"bold"},
      },
    },
    
    {
      field: "fecha_movimiento",
      title: lang.fecha,
    },
    {
      field: "monto_movimiento",
      title: lang.monto,
      isNumber: true,
    },
    {
      field: "monto_sin_efectivo",
      title: lang.sin_efectivo,
      isNumber: true,
    },
  ];

  const Acciones = ({rowProps}) => (
    <Tooltip arrow title={lang.presione_mas_detalles}>
      <Button onClick={()=>abrirForm(rowProps)} variant="outlined"  color="primary">
        {lang.ver_mas}
      </Button>
    </Tooltip>
  );

  const search = (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={6} md={2}>
        
        <DatePickerCustom 
        fullWidth
        label={lang.desde}
        value={ (desde)}
        defaultValue={desde}
        onChange={changeDatadesde}
        name="desdeFecha"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2}>


      <DatePickerCustom 
        fullWidth
        label={lang.hasta}
        value={hasta}
        defaultValue={hasta}
        onChange={changeDatahasta}
        name="hastaFecha"
        />

      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <FormControl fullWidth>
          <InputLabel>{lang.seleccione_caja}</InputLabel>
          <Select
            name="id_caja"
            onChange={(e) => {
              setIdCajita(e.target.value);
            }}
            value={idCajita}
          >
            <MenuItem value="">{lang.todos}</MenuItem>
            {listaCajas.map((item, index) => (
              <MenuItem key={index} value={item.id_caja}>
                {item.nombre_caja}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <FormControl fullWidth>
          <InputLabel>{lang.seleccione_movimiento}</InputLabel>
          <Select
            name="id_tipo_registro"
            onChange={(e) => { setIdRegistrito(e.target.value)}}
            value={idRegistrito}
          >
            <MenuItem value="">Todos</MenuItem>

              <MenuItem value={"2"}>{lang.apertura}</MenuItem>
              <MenuItem value={"1"}>{lang.ingreso}</MenuItem>
              <MenuItem value={"0"}>{lang.egreso}</MenuItem>
              <MenuItem value={"3"}>{lang.cierre}</MenuItem>
              
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4} md={2}>
        <FormControl fullWidth>
          <InputLabel>{lang.moneda}</InputLabel>
          <Select
            name="id_moneda_movimiento"
            onChange={(e) => { setIdMoneda(e.target.value)}}
            value={idMoneda}
          >
            <MenuItem value="">Todos</MenuItem>

            {listaMonedas.map((item, index) => (
              <MenuItem key={index} value={item.id_moneda}>
                {item.nombre_moneda}
              </MenuItem>
            ))}
              
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={5}>
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
        <Button variant="contained" onClick={abrir}>
          {lang.registrar_movimiento}
        </Button>
      </Grid>
      <Grid item >
      <Alert severity="success" variant="outlined" icon={false}>
        <Typography variant="h5">
          Efectivo: {funciones.numberSeparator(movimientos.ingresoEfectivo)}{" "}
        </Typography>
        </Alert>
      </Grid>
      <Grid item >
        <Alert severity="warning" variant="outlined" icon={false}>
        <Typography variant="h5">
         {lang.sin_efectivo}: {funciones.numberSeparator(movimientos.ingresoSinEfectivo)}{" "}
        </Typography>
        </Alert>
      </Grid>
      <Grid item >
        <Alert severity="error" variant="outlined" icon={false}>
        <Typography variant="h5">
          {lang.egresos}: {funciones.numberSeparator(movimientos.egresos)}{" "}
        </Typography>
        </Alert>
      </Grid>
      <Grid item >
        <Alert severity="info" variant="outlined" icon={false}>
        <Typography variant="h5">
          {lang.neto}: {funciones.numberSeparator(movimientos.ingresoEfectivo - movimientos.egresos )}{" "}
        </Typography>
        </Alert>
      </Grid>
    </Grid>
  );

  return (
    <>
      <Tablas
        icon={{ name:"leaderboard" }}
        caption={`${lang.total_movimiento}: ${funciones.numberSeparator(movimientos.ingresoTotal)}`}
        title={lang.movimientos_caja}
        subtitle={lang.long_movimiento_caja}
        inputs={search}
        columns={columnas}
        Accions={Acciones}
        datas={lista}
        loading={cargando}
        showOptions
      />
    </>
  );
};

export default ListaMovimientos;
