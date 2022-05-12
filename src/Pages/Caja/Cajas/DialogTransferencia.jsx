import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { useCajas } from "./CajasProvider";
import NumberFormatCustom from "../../../Componentes/NumberFormatCustom";

const DialogTransferencia = () => {
  const {
    setDialogs,
    dialogs,
    lista,
    formTransferencia,
    setFormTransferencia,
    initialTransferencia,
    errors,
    setErrors,
    cargas,Funciones,transferir
  } = useCajas();

  const verificar = () => {
    if (formTransferencia.id_caja_transferencia === "") {
      setErrors({
        ...errors,
        transferencia: true,
        transferenciaMensaje: "Indique la caja a la que desea transferir",
      });
      return false;
    }
    if ( parseFloat(formTransferencia.monto_transferir) > parseFloat(formTransferencia.monto_caja)) {
      setErrors({...errors,transferencia: true,transferenciaMensaje: "En la caja no hay suficientes fondos"});
      return false;
    }
    setErrors({ ...errors, transferencia: false, transferenciaMensaje: "" });
    transferir();
  };



  const onChange = (e) => {
    const { value, name } = e.target;
    setFormTransferencia({ ...formTransferencia, [name]: value });
  };

  const listaCajaFiltradas = lista.filter(
    (e) => e.id_caja !== formTransferencia.id_caja
  );

  const cerrar = () => {
    setDialogs({ ...dialogs, transferencia: false });
    setErrors({ ...errors, transferencia: false, transferenciaMensaje: "" });
    setFormTransferencia(initialTransferencia);
  };
  return (
    <Dialog open={dialogs.transferencia} onClose={cerrar} fullWidth>
      <DialogTitle>Transferencia de caja en caja</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {errors.transferencia && (
              <Alert icon={false} severity="error">
                {errors.transferenciaMensaje}
              </Alert>
            )}
            {cargas.transferencia && <LinearProgress />}
          </Grid>
          <Grid item xs={12}>
            <Alert icon={false}>
              Caja: {formTransferencia.nombre_caja} - Monto: {Funciones.numberSeparator( isNaN(formTransferencia.monto_caja) ? 0 : formTransferencia.monto_caja )} {formTransferencia.abreviatura_moneda}
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Transferir a...</InputLabel>
              <Select
                onChange={onChange}
                name="id_caja_transferencia"
                value={formTransferencia.id_caja_transferencia}
                fullWidth
              >
                {listaCajaFiltradas.map((d, i) => (
                  <MenuItem key={i} value={d.id_caja}>
                    {d.nombre_caja}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              disabled={cargas.transferencia}
              name="monto_transferir"
              value={formTransferencia.monto_transferir}
              onChange={onChange}
              label="Monto a transferir"
              InputProps={{
                inputComponent: NumberFormatCustom,
                inputProps: { min: 0 },
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" disabled={cargas.transferencia} onClick={verificar}>
          Transferir
        </Button>
        <Button variant="outlined" disabled={cargas.transferencia} onClick={cerrar}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogTransferencia;
