import {
  Dialog,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Zoom,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  LinearProgress,Alert
} from "@mui/material";
import NumberFormatCustom from '../../Componentes/NumberFormatCustom'
import { useCuentas } from "./CuentasProvider";
import {useState} from 'react';

const CuentasPagarDialog = () => {
  const {
    dialogs,
    setDialogs,
    listaCajas,
    formPagar,
    formasDePago,
    idCaja,
    setIdCaja,
    idFormasPago,
    setIdFormasPago,
    obs,
    setObs,
    pagarCuenta, cargandoMov
  } = useCuentas();


  const [error,setError] = useState({
      error:false,
      errorMsj:"",
  })
  const cerrar = () => {
    setDialogs({ ...dialogs, pagar: false });
  };

  const pagar = async (e) => {
    e.preventDefault();
    let indexCaja = listaCajas.findIndex((e) => e.id_caja === idCaja);
    let montoCaja = parseFloat(listaCajas[indexCaja].monto_caja) ;
    let montoPagar = parseFloat(formPagar.total_factura_compra);
    if(montoCaja< montoPagar && idFormasPago==="1"){
        setError({error:true,errorMsj: "No hay suficiente dinero en la caja para pagar esta cuenta"})
        return false;
    }
    else{
        setError({error:false,errorMsj: ""})
        pagarCuenta();
    }
  };

  return (
    <Dialog
      onClose={cerrar}
      TransitionComponent={Zoom}
      fullWidth
      open={dialogs.pagar}
    >
      <form onSubmit={pagar}>
        <DialogTitle>Cuenta a pagar </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              { cargandoMov && <LinearProgress /> }
              {
                  error.error && <Alert severity="error">{error.errorMsj}</Alert>
              }
          </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel variant="outlined">Seleccione la caja</InputLabel>
                <Select
                  name="id_caja_movimiento"
                  variant="outlined"
                  value={idCaja}
                  onChange={(e) => {
                    setIdCaja(e.target.value);
                  }}
                  required
                >
                  {
                    <MenuItem disabled value="">
                      Seleccione una caja
                    </MenuItem>
                  }
                  {listaCajas.map((d, index) => (
                    <MenuItem key={index} value={d.id_caja}>
                      {d.nombre_caja}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel variant="outlined">Formas de pago</InputLabel>
                <Select
                    required
                  name="id_formas_pago"
                  variant="outlined"
                  value={idFormasPago}
                  onChange={(e) => {
                    setIdFormasPago(e.target.value);
                  }}
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
                label="Monto"
                fullWidth
                value={formPagar.total_factura_compra}
                disabled
                InputProps={{
                    inputComponent: NumberFormatCustom,               
                  }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Observaciones y referencias"
                fullWidth
                value={obs}
                onChange={(e) => setObs(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button disabled={cargandoMov} variant="outlined" type="submit">
            Pagar
          </Button>
          <Button variant="outlined" onClick={cerrar}>
            Cerrar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CuentasPagarDialog;
