import {Dialog,Grid,TextField,FormControl,InputLabel,Select,MenuItem,Zoom,DialogContent,
  DialogTitle,DialogActions,Button,LinearProgress,Alert,Icon} from "@mui/material";
import NumberFormatCustom from '../../Components/thirty/NumberFormatCustom'
import { useCuentas } from "./CuentasProvider";
import {useState} from 'react'
const CuentasCobrarDialog = () => {
  const {dialogs,setDialogs,formCobrar,cargando,lang,funciones,listas,cobrarCuenta} = useCuentas();

  const [form,setForm] = useState({
    id_forma_pago:"",
    obs:"",
    monto_cobrado:"",
    id_cajas_moneda:""
  })

  const change = e=>{
    const {value,name} = e.target
    setForm({...form,[name]:value})
  }

  const cobrar = e=>{
    e.preventDefault();
    cobrarCuenta(form);
  }

  const cerrar = () => {setDialogs({ ...dialogs, cobrar: false });};

  
  const listaMonedas = listas.monedas.filter(e=> parseInt(e.id_caja_moneda) === parseInt(formCobrar.id_caja))

  const montoFaltante = parseFloat(formCobrar.monto_total_factura) - parseFloat(formCobrar.recibido_factura)



  return (
    <Dialog onClose={cerrar} TransitionComponent={Zoom} fullWidth open={dialogs.cobrar}>
      <form onSubmit={cobrar}>
        <DialogTitle>{lang.cobrar}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              { cargando.mov && <LinearProgress /> }
          </Grid>
          <Grid item xs={12} >
              <Alert severity="success" icon={<Icon>person</Icon>}>
                {lang.cliente}: {formCobrar.nombre_cliente}
              </Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Alert severity="info">
                {lang.nro}: {formCobrar.nro_factura}
              </Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Alert severity="warning" icon={false}>
                {lang.caja}: {formCobrar.nombre_caja}
              </Alert>
            </Grid>


            <Grid item xs={12} sm={6} >
              <Alert severity="success" icon={false}>
                {lang.monto_total}: { funciones.numberFormat( formCobrar.monto_total_factura)}  {formCobrar.abreviatura_moneda}
              </Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Alert severity="success" icon={false}>
                {lang.monto_recibido}: {funciones.numberFormat(formCobrar.recibido_factura)} {formCobrar.abreviatura_moneda}
              </Alert>
            </Grid>

            <Grid item xs={12} >
              <Alert severity="error" icon={false}>
                {lang.monto_faltante}: {funciones.numberFormat(montoFaltante)} {formCobrar.abreviatura_moneda}
              </Alert>
            </Grid>


            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel >{lang.formas_de_pago}</InputLabel>
                <Select required name="id_forma_pago" value={form.id_forma_pago}
                  onChange={change}
                >
                  {listas.formasPago.map((d, index) => (
                    <MenuItem key={index} value={d.id_facturas_formas_pago}>
                      {d.descripcion_forma_pago}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel >{lang.moneda}</InputLabel>
                <Select required name="id_cajas_moneda" value={form.id_cajas_moneda}
                  onChange={change}
                >
                  {listaMonedas.map((d, index) => (
                    <MenuItem key={index} value={d.id_cajas_moneda}>
                      {d.nombre_moneda}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={lang.monto_a_cobrar} autoComplete="off" required fullWidth value={form.monto_cobrado} name="monto_cobrado" onChange={change} InputProps={{inputComponent: NumberFormatCustom}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField autoComplete="off" label={lang.observaciones} fullWidth value={form.obs} name="obs" onChange={change}/>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button disabled={cargando.mov} variant="contained" size="large" type="submit">
            {lang.cobrar}
          </Button>
          <Button variant="contained" size="large" onClick={cerrar}>
            {lang.cancelar}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CuentasCobrarDialog
