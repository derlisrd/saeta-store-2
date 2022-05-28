import {Alert,Dialog,DialogContent,DialogTitle,Grid,Icon, IconButton, Stack,Zoom} from "@mui/material";
import { useFacturas } from "./FacturasProvider";
import {funciones} from '../../../Functions'
const FacturasDialogEstado = () => {
  const { dialogs, setDialogs, formulario } = useFacturas();
  const cerrar = () => {
    setDialogs({ ...dialogs, estado: false });
  };
  
  return (
    <Dialog fullWidth open={dialogs.estado} onClose={cerrar} TransitionComponent={Zoom}>
      <DialogTitle>
          <Stack justifyContent="space-between" direction="row" >
            <div>Estado</div>
            <div><IconButton onClick={cerrar}><Icon>close</Icon></IconButton> </div>
          </Stack>
      </DialogTitle>
      <DialogContent dividers >
        <Grid container>
          <Grid item xs={12}>
            <h3>Fecha de venta: {formulario?.fecha_factura}</h3>
            <h3>Tipo: {formulario?.tipo_factura==="0" ? 'Recibo' : 'Factura'} NRO: {formulario?.nro_factura}</h3>
            <h3>Cliente: {formulario?.nombre_cliente} {formulario.apellido_cliente} {formulario?.ruc_cliente} </h3>
            <h3>Vendedor: {formulario?.nombre_user}</h3>
            <h3>Total: {funciones.numberSeparator(formulario?.monto_total_factura)} {formulario?.abreviatura_moneda}</h3>
            <h3>Descuento: {funciones.numberSeparator(formulario?.descuento_factura)} {formulario?.abreviatura_moneda}</h3>
            <h3>Observación: {formulario?.obs_factura}</h3>
          </Grid>
          <Grid item xs={12}>
            {(parseInt(formulario.estado_factura) === 1) ? (
              <Alert variant="outlined" severity="warning" icon={<Icon color="warning">savings</Icon>}>Cobrado</Alert>
            ) : (
              <Alert variant="outlined" severity="error" icon={<Icon>thumb_down</Icon>}>
                Cobranza pendiente
              </Alert>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default FacturasDialogEstado;
