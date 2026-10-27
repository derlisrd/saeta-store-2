import Tablas from "../../../Components/UI/Tablas";
import {Button,Icon,Grid,FormControl,InputLabel,Select, MenuItem,Typography,Alert, TextField, InputAdornment, IconButton,Stack} from "@mui/material";
import { useMovimientos } from "./MovimientosProvider";
import { useState } from "react";
import { funciones } from "../../../Functions";
import { DatePickerCustom } from "../../../Components/MuiCustom/DatePickerCustom";
import useInitialState from "./useInitialState";
import ButtonTip from "../../../Components/Botones/ButtonTip";

const ListaMovimientos = () => {
  const { getData, getBuscarMovimientos, lang,setDesdeFecha,setHastaFecha,setDialog,dialog,setForm,lista,setIdCaja,listaCajas,cargando,movimientos,setTipoRegistro, listaMonedas,setMonedaFilter
  } = useMovimientos();
  const {columnsTable} = useInitialState()

  const today = new Date()

  const [desde, setDesde] = useState(today);
  const [hasta, setHasta] = useState(today);



  const [idCajita, setIdCajita] = useState("");
  const [idRegistrito,setIdRegistrito] = useState("");
  const [idMoneda,setIdMoneda] = useState("")

  const changeDatadesde = (e) => setDesde(e);
  const changeDatahasta = (e) => setHasta(e);

  const Filtrar = () => {
    setHastaFecha(funciones.getDateYMD( hasta ));
    setDesdeFecha(funciones.getDateYMD( desde ));
    setIdCaja(idCajita);
    setTipoRegistro(idRegistrito);
    setMonedaFilter(idMoneda);
  };

  const buscarMov = ()=>{
    let valor = document.getElementById('_buscarMovimiento').value;
    if(valor===''){return false;}
    getBuscarMovimientos(valor,funciones.getDateYMD( desde ),funciones.getDateYMD( hasta ))
  }
  const pressEnterBuscaMov= (e)=>{ if(e.key==='Enter') { buscarMov()} }
  

  const abrir = () => setDialog({...dialog,registrar:true})
  const abrirForm = f =>{ setForm(f); setDialog({...dialog,detalles:true})}
  

  const Acciones = ({rowProps}) => (
      <ButtonTip title='Ver más detalles' onClick={()=>abrirForm(rowProps)} icon="sms" />
  );

  const search = (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={6} md={2} lg={2}>
        <DatePickerCustom 
        label={lang.desde}
        value={ (desde)}
        defaultValue={desde}
        onChange={changeDatadesde}
        name="desdeFecha"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2} lg={2}>
      <DatePickerCustom 
        label={lang.hasta}
        value={hasta}
        defaultValue={hasta}
        onChange={changeDatahasta}
        name="hastaFecha"
        />
      </Grid>
      <Grid item xs={12} sm={4} md={3} lg={2}>
        <FormControl fullWidth>
          <InputLabel>{lang.seleccione_caja}</InputLabel>
          <Select name="id_caja" onChange={(e) => {setIdCajita(e.target.value);}} value={idCajita}>
            <MenuItem value="">{lang.todos}</MenuItem>
            {listaCajas.map((item, index) => (
              <MenuItem key={index} value={item.id_caja}>
                {item.nombre_caja}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4} md={3} lg={2}>
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
      <Grid item xs={12} sm={4} md={2} lg={2}>
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
      <Grid item xs={12} sm={6} md={5} lg={2}>
        <Stack direction='row' spacing={1}>
          <ButtonTip icon='manage_search' title='Filtrar' onClick={Filtrar} />
          <ButtonTip icon='cleaning_services' title='Limpiar' onClick={getData} />
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6} md={6} >
        <TextField fullWidth label="Buscar movimientos" onKeyUp={pressEnterBuscaMov} id="_buscarMovimiento" 
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={buscarMov}><Icon>search</Icon></IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Stack direction='row' spacing={1}>
        <Button variant="contained" onClick={abrir}>
          {lang.registrar_movimiento}
        </Button>
        <Button startIcon={<Icon>feed</Icon>} variant="contained" onClick={()=>{setDialog({...dialog,reportes:true})}}>
          Reportes
        </Button>
        </Stack>
      </Grid>
      <Grid item >
      <Alert severity="success" variant="outlined" icon={false}>
        <Typography variant="h5">
          {lang.entrada}: {funciones.numberSeparator(movimientos.ingresoEfectivo + movimientos.ingresoSinEfectivo)}
        </Typography>
        </Alert>
      </Grid>
      <Grid item >
        <Alert severity="error" variant="outlined" icon={false}>
        <Typography variant="h5">
          {lang.salida}: {funciones.numberSeparator(movimientos.egresos)}{" "}
        </Typography>
        </Alert>
      </Grid>
      <Grid item >
        <Alert severity="info" variant="outlined" icon={false}>
        <Typography variant="h5">
          {lang.totalCaja}: {funciones.numberSeparator(movimientos.totalCaja)}
        </Typography>
        </Alert>
      </Grid>
    </Grid>
  );
  return (
      <Tablas
        icon={{ name:"leaderboard" }}
        caption={`${lang.total_movimiento}: ${funciones.numberSeparator(movimientos.ingresoTotal)}`}
        title={lang.movimientos_caja}
        subtitle={lang.long_movimiento_caja}
        inputs={search}
        columns={columnsTable}
        Accions={Acciones}
        datas={lista}
        loading={cargando}
        showOptions
      />
  );
};

export default ListaMovimientos;
