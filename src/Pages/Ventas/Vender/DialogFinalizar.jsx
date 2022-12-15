import {
  Alert,AlertTitle,InputLabel,FormControl,CircularProgress,Dialog,DialogActions,DialogContent,DialogTitle,FormControlLabel,Grid,Icon,IconButton,InputAdornment,Radio,TextField,Tooltip,Typography,
  Zoom,MenuItem,Select,Checkbox,Stack} from "@mui/material";
import NumberFormatCustom from "../../../Components/thirty/NumberFormatCustom";
import TextFieldCustom from "../../../Components/MuiCustom/TextFieldCustom";
import ButtonCustom from "../../../Components/MuiCustom/ButtonCustom";
import { useVentas } from "./VentasProvider";
import { useRef,useState } from "react";


const DialogFinalizar = () => {
  const {MetodoDescuento,permisos, lang, changeMonedas,
    dialogs,setDialogs,datosFacturas,indexFactura,Funciones,errors,cargas,setCargas,consultarCliente,changeInputsDatosFactura,setErrors,initialErrors,verificarYEnviarFactura,AgregarCantidadMetodoPago,cantidadRecibidaRef,borrarMetodoPago,//permisos, Anotar
  } = useVentas();
  const inputDoc = useRef(null);
  const [descuentoPorcent,setDescuentoPorcent] = useState(0);
  const [descuentoAbsoluto,setDescuentoAbsoluto] = useState(0);
  const fd = {...datosFacturas};
  const fa = fd.facturas[indexFactura];

  //const HACERVENTA = permisos.some(e=> parseInt(e.id_permiso_permiso)=== 51);
  //const HACERNOTA = permisos.some(e=> parseInt(e.id_permiso_permiso)=== 50);
  const HACERDESCUENTO = permisos.some(e=> parseInt(e.id_permiso_permiso)=== 62);

  const cerrar = () => {
    if (!cargas.finalizarVenta) {
      setDialogs({ ...dialogs, finalizarVenta: false });
      setErrors(initialErrors);
    }
  };

  

  const verificar = () => {
    let f = fa.datosFactura;
    let cr = parseFloat(f.totalAbonado) + fa.descuento;
    let cj = f.id_caja;
    let v = f.id_empleado;
    let e = { ...errors };
    
    let listaFacturas = fd.listaFacturas,
    id_caja = fa.datosFactura.id_caja;
    let found = listaFacturas.findIndex(e=>e.id_caja_empresa === id_caja);
    if(found<0 && (fa.datosFactura.tipoFactura==="1" || fa.datosFactura.tipoFactura==="2" )){
      e.factura.error = true;
      e.id_error = 1;
      e.factura.errorMensaje = lang.no_relacion_con_caja;
      setErrors(e);
      return false;
    }
    

    if(fa.datosFactura.formasPago.length<1 && fa.datosFactura.tipoFactura!=="2"){
      e.factura.error = true; 
      e.factura.errorMensaje =
        "Agregue al menos un método de pago";
      setErrors(e);
      cantidadRecibidaRef.current?.focus();
      return false;
    }

    if (cj === "") {
      e.factura.error = true;
      e.id_error = 1;
      e.factura.errorMensaje = "Seleccione una caja por favor";
      setErrors(e);
      return false;
    }

    
    if(! fd.monedasdecajas.some(elem=> elem.id_caja_moneda===f.id_caja && elem.id_moneda_caja_moneda === fa.datosMoneda.id_moneda)){
      e.factura.error = true;
      e.id_error = 1;
      e.factura.errorMensaje ="Esa moneda no esta habilitada para esta caja";
      setErrors(e);
      cantidadRecibidaRef.current?.focus();
      return false;
    }


    if ((isNaN(cr) || cr < fa.total) && parseInt(fa.datosFactura.tipoFactura) < 2) {
      e.factura.error = true;
      e.factura.errorMensaje =
        "La cantidad abonada no puede ser menor al total de la factura";
      setErrors(e);
      cantidadRecibidaRef.current?.focus();
      return false;
    }
    
    if (v === "") {
      e.factura.error = true;
      e.id_error = 2;
      e.factura.errorMensaje = "Seleccione un vendedor por favor";
      setErrors(e);
      return false;
    }
    setErrors(initialErrors);
    setCargas({...cargas,finalizarVenta:true});
    verificarYEnviarFactura();
  };

  const hacerDescuento = (e,porcentaje=false)=>{
    let valor = parseFloat(e.target.value);
    let valorMoneda = parseFloat(fa.datosMoneda.valor_moneda)
    if(isNaN(valor)){valor = 0}
    if(porcentaje){
      valor>0 ? setDescuentoPorcent(valor) : setDescuentoPorcent(0);
      MetodoDescuento(valor,true)
    }else{
      valor>0 ? setDescuentoAbsoluto(valor*valorMoneda) : setDescuentoAbsoluto(0);
      MetodoDescuento(valor*valorMoneda,false)
    }
  }
  
  /* CONSTANTES Y VARIABLES ABREVIADOS */
  const PORCENTAJE_DESCUENTO = fa.descuento*100 / fa.total;
  const DESCUENTO_IVA = fa.total_iva * PORCENTAJE_DESCUENTO / 100;
  const valorMoneda = parseFloat(fa.datosMoneda.valor_moneda);
  const TOTAL = (fa.total - fa.descuento)/ valorMoneda;

  const TOTALIVA = (fa.total_iva - (DESCUENTO_IVA)) / valorMoneda;
  const ABM = fa?.datosMoneda.abreviatura_moneda;
  const CR = isNaN(parseFloat(fa.datosFactura.totalAbonado)) ? 0 : parseFloat(fa.datosFactura.totalAbonado)/valorMoneda;
  const CAMBIO = CR - TOTAL;


  
  return (
    <Dialog
      open={dialogs.finalizarVenta}
      fullScreen
      maxWidth="lg"
      onClose={cerrar}
      TransitionComponent={Zoom}
    >
      <DialogTitle>
        <Tooltip title={<h2>{lang.volver_factura}</h2>} TransitionComponent={Zoom} arrow placement="right-start">
            <IconButton onClick={cerrar}><Icon>arrow_back_ios_new</Icon></IconButton>
          </Tooltip>{lang.finalizar_venta} - TOTAL: {Funciones.numberSeparator(Funciones.redondeo2decimales(TOTAL))} {ABM}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            {errors.factura.error && (
              <Alert severity="error">{errors.factura.errorMensaje}</Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} >
                <TextField
                  onKeyPress={e => {e.key === "Enter" && consultarCliente(inputDoc.current.value);}}
                  label="Documento de cliente"placeholder="Documento de cliente"fullWidth inputRef={inputDoc}variant="outlined" 
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {cargas.cargandoCliente ? (<CircularProgress size={24} />) : (
                          <Tooltip TransitionComponent={Zoom} arrow title={<h2>Buscar cliente</h2>}>
                            <IconButton onClick={() =>setDialogs({...dialogs,buscarCliente: true})}>
                              <Icon>search</Icon>
                            </IconButton>
                          </Tooltip>
                        )}
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <Tooltip TransitionComponent={Zoom} arrow title={<h2>Registrar cliente</h2>}>
                        <IconButton onClick={() => {setDialogs({...dialogs,registrarCliente: true});}}>
                          <Icon color="primary">person_add_alt_1</Icon>
                        </IconButton>
                      </Tooltip>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel variant="outlined">Seleccione caja</InputLabel>
                  <Select
                    error={errors.id_error === 1}
                    value={fa.datosFactura.id_caja} name="id_caja"onChange={changeInputsDatosFactura} fullWidth
                  >
                    <MenuItem value="" disabled>
                      <em>Seleccione caja</em>
                    </MenuItem>
                    {fd.listaCajas.map((e, i) => (
                      <MenuItem value={e.id_caja} selected key={i}>
                        {e.nombre_caja}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Alert
                  severity={errors.cliente ? "error" : "info"}
                  icon={false} variant="outlined" >
                  <AlertTitle> DOC: {fa.datosCliente.ruc_cliente} <br /> NOMBRE: {fa.datosCliente.nombre_cliente}</AlertTitle>
                  <AlertTitle>{errors.clienteMensaje}</AlertTitle>
                </Alert>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel >
                    {lang.seleccione_vendedor}
                  </InputLabel>
                  <Select
                    error={errors.factura.errorMensaje === "Seleccione un vendedor por favor"}
                    name="id_empleado"
                    onChange={changeInputsDatosFactura}
                    fullWidth
                    value={fa.datosFactura.id_empleado}
                  >
                    <MenuItem value="" selected disabled>
                      <em>{lang.seleccione_vendedor}</em>
                    </MenuItem>

                    {fd.listaVendedores.map((e, i) => (
                      <MenuItem value={e.id_empleado} key={i}>
                        {e.nombre_empleado} {e.apellido_empleado}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">TIPO CLIENTE:</Typography>
                <FormControlLabel
                  value="1"name="tipoCliente"onChange={changeInputsDatosFactura}
                  control={
                    <Radio color="primary"checked={fa.datosFactura.tipoCliente === "1"}/>
                  }
                  label={`Normal`} labelPlacement="end"
                />
                <FormControlLabel value="2" name="tipoCliente" disabled={!fd.facturaActiva || 1 > 0} onChange={changeInputsDatosFactura}
                  control={<Radio color="primary" checked={fa.datosFactura.tipoCliente === "2"}/>}
                  label={`Retentor`} labelPlacement="end"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">CONDICION DE VENTA:</Typography>
                <FormControlLabel value="0" name="tipoFactura" onChange={changeInputsDatosFactura}
                  control={
                    <Radio checked={fa.datosFactura.tipoFactura === "0" || fa.datosCliente.ruc_cliente === "0"}/>
                  }
                  label="TICKET RECIBO" labelPlacement="end"
                />
                <FormControlLabel
                  value="1" disabled={
                    !fd.facturaActiva || fa.datosCliente.ruc_cliente === "0"
                  } name="tipoFactura" onChange={changeInputsDatosFactura}
                  control={<Radio checked={fa.datosFactura.tipoFactura === "1"} />}
                  label="CONTADO" labelPlacement="end"
                />
                <FormControlLabel
                  value="2" disabled={!fd.facturaActiva || fa.datosCliente.ruc_cliente === "0"}
                  name="tipoFactura" onChange={changeInputsDatosFactura}
                  control={
                    <Radio checked={fa.datosFactura.tipoFactura === "2" && fa.datosCliente.ruc_cliente !== "0"}/>
                  }
                  label="CRÉDITO" labelPlacement="end"
                />
                <FormControlLabel
                  value="3" disabled={fa.datosCliente.ruc_cliente === "0"}
                  name="tipoFactura" onChange={changeInputsDatosFactura}
                  control={<Radio checked={fa.datosFactura.tipoFactura === "3" && fa.datosCliente.ruc_cliente !== "0"}/>}
                  label="CUOTA" labelPlacement="end"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {fa.datosFactura.tipoFactura === "2" && (
                  <TextField
                    label="Fecha de cobro" type="date"
                    onChange={changeInputsDatosFactura}
                    value={fa.datosFactura.fecha_cobro_factura} name="fecha_cobro_factura"
                  />
                )}
              </Grid>
              <Grid item xs={12} >
                <FormControlLabel
                  control={
                    <Checkbox
                      name="entregado_items"
                      value={
                        fa.datosFactura.entregado_items === "1" ? "0" : "1"
                      }
                      checked={fa.datosFactura.entregado_items === "1"}
                      onChange={changeInputsDatosFactura}
                    />
                  }
                  label="Items ya entregados"
                />
              </Grid>
              <Grid item xs={12} >
              <Alert icon={false}>Formas de pago</Alert>
                {fa.datosFactura.formasPago.map((e, i) => (
                  <Stack key={i} direction="row" alignItems={"center"}>
                    <IconButton onClick={()=> borrarMetodoPago(i,e.cantidad)}><Icon>clear</Icon></IconButton>
                    <Typography variant="body1">{e.descripcion}: {Funciones.numberSeparator(e.cantidad/valorMoneda)} - {e.obs}</Typography>
                  </Stack>
                ))}
              </Grid>
              <Grid item xs={12} md={12}>
                {fa.datosFactura.tipoFactura === "2" && (
                  <TextField variant="outlined" label="Orden de compra" helperText="Si no tiene deje en blanco" value={fa.datosFactura.ordenCompra} name="ordenCompra" onChange={changeInputsDatosFactura}/>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel >Método de pago</InputLabel>
                  <Select
                    value={fa.datosFactura.id_formaPago}
                    name="id_formaPago" onChange={changeInputsDatosFactura}
                     disabled={fa.datosFactura.tipoFactura === "2"}
                  >
                    <MenuItem value="" selected disabled>
                      <em>Seleccione forma de pago</em>
                    </MenuItem>
                    {fd.listaFormasPago.map((e, i) => (
                      <MenuItem value={e.id_facturas_formas_pago} key={i}>
                        {e.descripcion_forma_pago}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth value={fa.datosFactura.obs_pago}
                  name="obs_pago" onChange={changeInputsDatosFactura}
                  label="Observaciones de pago"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <TextFieldCustom
                  label="Cantidad recibida"
                  onKeyPress={e => {e.key === "Enter" && AgregarCantidadMetodoPago();}}
                  autoFocus inputRef={cantidadRecibidaRef} disabled={fa.datosFactura.tipoFactura === "2"}
                  autoComplete="off"name="cantidad_recibida"
                  value={fa.datosFactura.cantidad_recibida}
                  onChange={changeInputsDatosFactura} fullWidth color="success" variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">{ABM}</InputAdornment>
                    ),
                    inputComponent: NumberFormatCustom,
                    inputProps: { min: 0 },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <ButtonCustom disabled={fa.datosFactura.tipoFactura === "2"} variant="outlined"
                  onClick={() => {AgregarCantidadMetodoPago(); }}
                  startIcon={<Icon>add</Icon>} fullWidth
                >
                  {lang.agregar}
                </ButtonCustom>
              </Grid>
              {
                HACERDESCUENTO && <>
                <Grid item xs={12} sm={12} md={6}>
                <TextFieldCustom fullWidth
                  disabled={descuentoAbsoluto>0}
                  label="Descuento %" onChange={(e)=>{hacerDescuento(e,true)}}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                    inputComponent: NumberFormatCustom,
                    inputProps: { min: 0, max: 100, maxLength:2},
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={12} md={6}>
                <TextFieldCustom fullWidth
                  disabled={descuentoPorcent>0}
                  label={`Descuento ${ABM}`} onChange={(e)=>{hacerDescuento(e)}}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">{ABM}</InputAdornment>
                    ),
                    inputComponent: NumberFormatCustom,
                    inputProps: { min: 0 },
                  }}
                />
              </Grid>
                </>
              }
              <Grid item xs={12}>
              {
              datosFacturas.listaMonedas.map((e,i)=>(
                  <FormControlLabel key={i} value={e.id_moneda} name="listaMonedas" onChange={()=>{changeMonedas(e)}}  label={e.abreviatura_moneda} labelPlacement="end"
                    control={<Radio checked={fa.datosMoneda.id_moneda===e.id_moneda} /> }
                  />
                  ))
                }
              </Grid>
              <Grid item xs={12} sm={12}>
                <Alert icon={false} variant="outlined" severity="info">
                <Grid container>
                <Grid item xs={6} sm={6}>
                    <h3>TOTAL A PAGAR:</h3>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <h3>{Funciones.numberSeparator(Funciones.redondeo2decimales(TOTAL))} {ABM}</h3>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <h3>ABONADO:</h3>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <h3>{Funciones.numberSeparator(fa.datosFactura.totalAbonado/valorMoneda)} {ABM}</h3>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <h3>DESCUENTOS:</h3>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <h3>{Funciones.numberSeparator(fa.descuento)} {ABM}</h3>
                  </Grid>
                  
                  <Grid item xs={6} sm={6}>
                    <h3>IMPUESTO:</h3>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <h3>{Funciones.numberSeparator(Funciones.redondeo2decimales(TOTALIVA))} {ABM}</h3>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <h3>CAMBIO:</h3>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <h3>{CAMBIO <= 0 ? "0 "+ ABM : Funciones.numberSeparator(CAMBIO) + " " + ABM}</h3>
                  </Grid>
                  <Grid item xs={6} sm={12}>
                    <Typography variant="overline">SON: {Funciones.NumeroALetras(TOTAL, ABM)}</Typography>
                  </Grid>
                </Grid>
              </Alert>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <ButtonCustom
          variant="contained"
          onClick={verificar}
          disabled={cargas.finalizarVenta || fa.itemsFactura.length < 1 }
        >
          {lang.finalizar}
        </ButtonCustom>
        <ButtonCustom onClick={cerrar} color="error" variant="outlined" >
          {lang.cancelar}
        </ButtonCustom>
      </DialogActions>
    </Dialog>
  );
};

export default DialogFinalizar;
