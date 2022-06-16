import {Dialog,Grid,TextField,FormControl,InputLabel,Select,MenuItem,Zoom,DialogContent,
  DialogTitle,DialogActions,Button,LinearProgress,Alert} from "@mui/material";
import NumberFormatCustom from '../../Components/thirty/NumberFormatCustom'
import { useCuentas } from "./CuentasProvider";
import React from 'react'
const CuentasCobrarDialog = () => {
  const {dialogs,setDialogs,formCobrar,formasDePago,idFormasPago,setIdFormasPago,obs,setObs,cobrarCuenta, cargandoMov} = useCuentas();


  const cobrar = e=>{
    e.preventDefault();
    cobrarCuenta();
  }

  const cerrar = () => {setDialogs({ ...dialogs, cobrar: false });};

  
  return (
    <Dialog onClose={cerrar} TransitionComponent={Zoom} fullWidth open={dialogs.cobrar}>
      <form onSubmit={cobrar}>
        <DialogTitle>Cuenta a cobrar</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              { cargandoMov && <LinearProgress /> }
          </Grid>
            <Grid item xs={12}>
              <Alert severity="info">
                Nro de factura a cobrar: {formCobrar.nro_factura}
              </Alert>
            </Grid>
            <Grid item xs={12}>
              <Alert severity="warning">
                Caja: {formCobrar.nombre_caja}
              </Alert>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel variant="outlined">Formas de pago</InputLabel>
                <Select required name="id_formas_pago" value={idFormasPago}
                  onChange={e => {setIdFormasPago(e.target.value);}}
                >
                  {formasDePago.map((d, index) => (
                    <MenuItem key={index} value={d.id_facturas_formas_pago}>
                      {d.descripcion_forma_pago}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Monto a cobrar" fullWidth value={formCobrar.monto_total_factura} disabled InputProps={{inputComponent: NumberFormatCustom}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Observaciones y referencias" fullWidth value={obs} onChange={e => setObs(e.target.value)}/>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button disabled={cargandoMov} variant="outlined" type="submit">
            Cobrar
          </Button>
          <Button variant="outlined" onClick={cerrar}>
            Cerrar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CuentasCobrarDialog
