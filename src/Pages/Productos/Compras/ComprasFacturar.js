import { Grid, TextField, Typography, Button, Icon, CircularProgress, InputAdornment, FormControlLabel, Radio, IconButton, FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import ComprasTabla from "./ComprasTabla";
import { useCompras } from "./ComprasProvider";
import { funciones } from "../../../Functions";
import SnackAlert from "../../../Components/UI/SnackAlert";
import LoadingBackDrop from "../../../Components/UI/LoadingBackDrop";
import {useRef} from 'react'
import swal from "sweetalert";
import InfoDeposito from "./InfoDeposito";
const ComprasFacturar = () => {
  const {
    inputCodigo,ConsultarProducto,datosCompra,
    setDatosCompra,cargandoItem, idDeposito,
    EfectuarCompra,dialogs,setDialogs, cargando,listaCajas,error,setError,LimpiarTodo
  } = useCompras();

  const nroFacturaRef = useRef(null);

  const PresionaEnter = e => e.key === "Enter" && openDialogCompra();

  const CambioDatos = (e) => {
    setDatosCompra({ ...datosCompra, [e.target.name]: e.target.value });
  };
  const CambioFecha = (e)=>{ 
    var d1 = new Date();
    var d2 = new Date(e.target.value);
    if(d1>d2){
      swal({text:'La fecha no puede ser en el pasado',icon:'error'});
    }
    else{
      setDatosCompra({...datosCompra,fecha_pago:e.target.value})
    }
  }

  const openDialogCompra = () => {
    var codigo = inputCodigo.current.value;
    if (codigo === "") {
      setError({...error, error: true, msj:"Ingrese código correctamente"})
    } else {
      ConsultarProducto();
    }
  };



  const validarCompra = () => {

    if(datosCompra.itemsFactura.length<1){
      setError({...error, error: true, msj:"No hay items en la factura"})
      return false
    }
    if(datosCompra.idCaja==="" && datosCompra.tipo_factura==="1"){
      setError({...error, error: true, msj:"Seleccione la caja"})
      return false
    }
    if(datosCompra.nro_factura===""){
      setError({...error, error: true, msj:"Especifique el número de factura"})
      nroFacturaRef.current.focus();
      return false
    }
    setError({...error, error: false, msj:""})
    EfectuarCompra();
  };


  const cerrarError = ()=>{
    setError({...error, error: false})
  }


  return (
    <>
    <SnackAlert onClose={cerrarError} open={error.error} message={error.msj} />
    <Grid container spacing={1}>
      <Grid item xs={12} md={9}>
        <Grid container spacing={1}>
          <Grid item sm={12} md={6}>
            <TextField
              autoFocus fullWidth label="Código" onKeyPress={PresionaEnter} inputRef={inputCodigo}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" >
                    <IconButton onClick={() => { idDeposito ? setDialogs({...dialogs,buscar:true}) : setError({...error, error:true, msj:"Elija depósito"}) }}>
                      <Icon>search</Icon>{" "}
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {cargandoItem && <CircularProgress size={24} />}
                  </InputAdornment>
                ),
              }}
              helperText="Ingrese el código del producto o busquelo con la lupa"
            />
          </Grid>
          <Grid item sm={12} md={2}>
            <Button size="large" color="primary" variant="outlined" onClick={openDialogCompra}>
              Consultar
            </Button>
          </Grid>
          <Grid item sm={12} md={4}>
             { !cargando && <InfoDeposito /> }
          </Grid>
          <Grid item sm={12}>
            {
              cargando ? <LoadingBackDrop /> : <ComprasTabla />
            }
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">DATOS DE COMPRA</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              name="fecha_compra"
              label="Fecha"
              value={datosCompra.fecha_compra}
              onChange={CambioDatos}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              inputRef={nroFacturaRef}
              name="nro_factura"
              onChange={CambioDatos}
              label="Nro factura"
              autoComplete="off"
              value={datosCompra.nro_factura}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormControlLabel
                value="1"
                control={
                  <Radio
                    checked={datosCompra.tipo_factura === "1"}
                    onChange={(e) => {
                      setDatosCompra({ ...datosCompra, tipo_factura: "1" });
                    }}
                    color="primary"
                  />
                }
                label="Factura contado"
                labelPlacement="end"
              />
              <FormControlLabel
                value="2"
                control={
                  <Radio
                    checked={datosCompra.tipo_factura === "2"}
                    color="primary"
                    onChange={(e) => {
                      setDatosCompra({
                        ...datosCompra,
                        tipo_factura: "2",
                        idCaja: "",
                      });
                    }}
                  />
                }
                label="Factura crédito"
                labelPlacement="end"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            {datosCompra.tipo_factura === "1" && (
              <FormControl fullWidth>
                <InputLabel variant="outlined">Seleccione la caja</InputLabel>
                <Select
                  name="id_caja"
                  variant="outlined"
                  disabled={datosCompra.tipo_factura === "2"}
                  value={datosCompra.idCaja}
                  onChange={(e) => {
                    setDatosCompra({ ...datosCompra, idCaja: e.target.value });
                  }}
                >
                  {listaCajas.length < 1 && (
                    <MenuItem disabled>No hay cajas disponibles</MenuItem>
                  )}
                  <MenuItem disabled>Seleccione caja</MenuItem>
                  {listaCajas.map((d, index) => (
                    <MenuItem key={index} value={d.id_caja}>
                      {d.nombre_caja}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Grid>

          <Grid item xs={12}>
          {
            datosCompra.tipo_factura === "2" &&
            <TextField
              type="date"
              disabled={datosCompra.tipo_factura === "1"}
              name="fecha_pago"
              label="Fecha de pago"
              helperText="En caso de que sea factura a crédito"
              value={datosCompra.fecha_pago}
              onChange={CambioFecha}
            />
          }
          </Grid>
          <Grid item xs={12}>
            <Typography variant="button">
              TOTAL: {funciones.numberSeparator(datosCompra.total_factura)}{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              size="large"
              color="secondary"
              onClick={validarCompra}
              fullWidth
            >
              Procesar compra
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              size="large"
              color="primary"
              onClick={LimpiarTodo}
              fullWidth
            >
              Nueva
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>


    </>
  );
};

export default ComprasFacturar;
