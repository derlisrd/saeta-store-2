import {Alert,Button,Dialog,DialogActions,DialogContent,DialogTitle,FormControl,Grid,InputLabel,LinearProgress,MenuItem,Select,TextField} from "@mui/material";
import React from "react";
import { useCajas } from "./CajasProvider";
import NumberFormatCustom from "../../../Components/thirty/NumberFormatCustom";

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
    cargas,funciones,transferir,lang
  } = useCajas();

  const verificar = () => {
    if (formTransferencia.id_caja_transferencia === "") {
      setErrors({
        ...errors,
        transferencia: true,
        transferenciaMensaje: lang.indique_caja_a_transferir,
      });
      return false;
    }
    if ( parseFloat(formTransferencia.monto_transferir) > parseFloat(formTransferencia.monto_caja)) {
      setErrors({...errors,transferencia: true,transferenciaMensaje: lang.no_hay_suficientes_fondos_en_caja});
      return false;
    }
    setErrors({ ...errors, transferencia: false, transferenciaMensaje: "" });
    transferir();
  };



  const onChange = (e) => {
    const { value, name } = e.target;
    setFormTransferencia({ ...formTransferencia, [name]: value });
  };

  const listaCajaFiltradas = lista.filter(e => e.id_caja !== formTransferencia.id_caja);

  const cerrar = () => {
    setDialogs({ ...dialogs, transferencia: false });
    setErrors({ ...errors, transferencia: false, transferenciaMensaje: "" });
    setFormTransferencia(initialTransferencia);
  };
  return (
    <Dialog open={dialogs.transferencia} onClose={cerrar} fullWidth>
      <DialogTitle>{lang.transferencia_caja_a_caja}</DialogTitle>
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
              {lang.caja}: {formTransferencia.nombre_caja} - {lang.monto}: {funciones.numberSeparator( isNaN(formTransferencia.monto_caja) ? 0 : formTransferencia.monto_caja )} {formTransferencia.abreviatura_moneda}
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>{lang.transferir_a}...</InputLabel>
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
              label={lang.monto_a_transferir}
              InputProps={{
                inputComponent: NumberFormatCustom,
                inputProps: { min: 0 },
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" disabled={cargas.transferencia} onClick={verificar}>
          {lang.transferir}
        </Button>
        <Button variant="contained" disabled={cargas.transferencia} onClick={cerrar}>
          {lang.cerrar}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogTransferencia;
