
import { Dialog, DialogContent,Button,DialogActions,DialogTitle, Grid, Alert } from "@mui/material"
import Funciones from "../../../Funciones"
import { useMovimientos } from "./MovimientosProvider"

const DialogDetallesMovimientos = () => {


  const {dialog,setDialog,form} = useMovimientos()
  const cerrar = ()=> { setDialog({...dialog,detalles:false})}
  
 
  return (
    <Dialog fullWidth open={dialog.detalles} onClose={cerrar}>
        <DialogTitle>Detalles de movimiento</DialogTitle>
        <DialogContent >
          <Grid container>
            <Grid item xs={12}>
              <h3>Caja: {form.nombre_caja}</h3>
              <h3>Usuario: {form.nombre_user}</h3>
              <h4>Detalles: {form.detalles_movimiento}</h4>
              <h4>Cantidad en efectivo: { Funciones.numberFormat( form.monto_movimiento)}</h4>
              <h4>Cantidad sin efectivo: { Funciones.numberFormat( form.monto_sin_efectivo)}</h4>
            </Grid>
            <Grid item xs={12}>
              <Alert icon={false} severity={form.tipo_registro==="1" ? 'success' : 'warning'}>
                {form.descripcion_registro}
              </Alert>
            </Grid> 
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={cerrar}>
            Cerrar
          </Button>
        </DialogActions>
    </Dialog>
  )
}

export default DialogDetallesMovimientos
