import {
  Alert,AlertTitle,InputLabel,FormControl,CircularProgress,Dialog,DialogActions,DialogContent,DialogTitle,FormControlLabel,Grid,Icon,IconButton,InputAdornment,Radio,TextField,Tooltip,Typography,
  Zoom,MenuItem,Select,Checkbox,Stack} from "@mui/material";
import { CustomButton, CustomField } from "../../../Componentes/Customs/muiCustom";
import { useVentas } from "./VentasProvider";
import NumberFormatCustom from "../../../Componentes/NumberFormatCustom";
import { useRef,useState } from "react";


const DialogFinalizar = () => {
  const {MetodoDescuento,permisos,
    dialogs,setDialogs,datosFacturas,indexFactura,Funciones,errors,cargas,setCargas,consultarCliente,changeInputsDatosFactura,setErrors,initialErrors,verificarYEnviarFactura,AgregarCantidadMetodoPago,cantidadRecibidaRef,borrarMetodoPago,//permisos, Anotar
  } = useVentas();
  const inputDoc = useRef(null);
  const [descuentoPorcent,setDescuentoPorcent] = useState(0);
  const [descuentoAbsoluto,setDescuentoAbsoluto] = useState(0);
  const fd = datosFacturas;
  const fa = fd.facturas[indexFactura];

  //const HACERVENTA = permisos.some(e=> parseInt(e.id_permiso_permiso)=== 51);
  //const HACERNOTA = permisos.some(e=> parseInt(e.id_permiso_permiso)=== 50);
  const HACERDESCUENTO = permisos.some(e=> parseInt(e.id_permiso_permiso)=== 71);

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
    if(fa.datosFactura.formasPago.length<1 && fa.datosFactura.tipoFactura!=="2"){
      e.factura.error = true;
      e.factura.errorMensaje =
        "Agregue al menos un método de pago";
      setErrors(e);
      cantidadRecibidaRef.current?.focus();
      return false;
    }
    if ((isNaN(cr) || cr < fa.total) && fa.datosFactura.tipoFactura !== "2") {
      e.factura.error = true;
      e.factura.errorMensaje =
        "La cantidad abonada no puede ser menor al total de la factura";
      setErrors(e);
      cantidadRecibidaRef.current?.focus();
      return false;
    }
    if (cj === "") {
      e.factura.error = true;
      e.factura.errorMensaje = "Seleccione una caja por favor";
      setErrors(e);
      return false;
    }
    if (v === "") {
      e.factura.error = true;
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
    if(isNaN(valor)){valor = 0}
    if(porcentaje){
      valor>0 ? setDescuentoPorcent(valor) : setDescuentoPorcent(0);
      MetodoDescuento(valor,true)
    }else{
      valor>0 ? setDescuentoAbsoluto(valor) : setDescuentoAbsoluto(0);
      MetodoDescuento(valor,false)
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
        <Tooltip title={<h2>Volver a factura</h2>} TransitionComponent={Zoom} arrow placement="right-start">
            <IconButton onClick={cerrar}><Icon>arrow_back_ios_new</Icon></IconButton>
          </Tooltip>FINALIZAR VENTA - TOTAL: {Funciones.numberSeparator(Funciones.redondeo2decimales(TOTAL))} {ABM}</DialogTitle>
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
              </Grid><Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel variant="outlined">Seleccione caja</InputLabel>
                  <Select
                    error={errors.factura.errorMensaje ==="Seleccione una caja por favor"}
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
                  <InputLabel variant="outlined">
                    Seleccione vendedor
                  </InputLabel>
                  <Select
                    error={
                      errors.factura.errorMensaje ===
                      "Seleccione un vendedor por favor"
                    }
                    variant="outlined"
                    name="id_empleado"
                    onChange={changeInputsDatosFactura}
                    fullWidth
                    value={fa.datosFactura.id_empleado}
                  >
                    <MenuItem value="" selected disabled>
                      <em>Seleccione vendedor</em>
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
                  <InputLabel variant="outlined">Método de pago</InputLabel>
                  <Select
                    value={fa.datosFactura.id_formaPago}
                    name="id_formaPago" onChange={changeInputsDatosFactura}
                    variant="outlined" disabled={fa.datosFactura.tipoFactura === "2"}
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
                  variant="outlined" label="Observaciones de pago"
                />
              </Grid>
              <Grid item sm={12} md={8}>
                <CustomField
                  label="Cantidad recibida"
                  onKeyPress={e => {e.key === "Enter" && verificar();}}
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
              <Grid item sm={12} md={4}>
                <CustomButton disabled={fa.datosFactura.tipoFactura === "2"} variant="outlined"
                  onClick={() => {AgregarCantidadMetodoPago(); }}
                  startIcon={<Icon>add</Icon>}
                >
                  Agregar
                </CustomButton>
              </Grid>
              {
                HACERDESCUENTO && <>
                <Grid item xs={12} sm={12} md={6}>
                <CustomField fullWidth
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
                <CustomField fullWidth
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
                    <h3>{Funciones.numberSeparator(fa.descuento/valorMoneda)} {ABM}</h3>
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

        <CustomButton
          color="primary"
          variant="contained"
          size="large"
          onClick={verificar}
          disabled={cargas.finalizarVenta || fa.itemsFactura.length < 1 }
        >
          FINALIZAR
        </CustomButton>
        <CustomButton onClick={cerrar} color="error" variant="outlined" size="large">
          CANCELAR
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default DialogFinalizar;
