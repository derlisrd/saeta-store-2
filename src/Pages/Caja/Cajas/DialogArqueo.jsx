import {Button,Dialog,DialogActions,DialogContent,DialogTitle,Grid,TextField,Typography, Zoom} from "@mui/material";
import React, { Fragment, useState } from "react";
import { useCajas } from "./CajasProvider";
import { useDatosEmpresa } from "../../../Contexts/DatosEmpresaProvider";
import NumberFormatCustom from "../../../Components/thirty/NumberFormatCustom";
const DialogArqueo = () => {
  const {dialogs,setDialogs,listaRegistrosMonedas,funciones,totalSumaMonedasArqueo,setTotalSumaMonedasArqueo,lang} = useCajas();
  const {MONEDA_PRINCIPAL } = useDatosEmpresa();

  const [cantidadMoneda, setCantidadMoneda] = useState({});

  const onChange = (e) => {
    const { value, name } = e.target;
    let valor_cantidad = parseInt(value);

    if (value === "") {
      valor_cantidad = 0;
    }
    let obj = { ...cantidadMoneda };
    obj[name] = valor_cantidad;
    setCantidadMoneda(obj);
    let suma = 0;

    for (const i in obj) {
      let found = listaRegistrosMonedas.find(
        (elem) => elem.id_monedas_registro === i
      );
      let valor = parseInt(found.valor_moneda_registro);

      suma += obj[i] * valor;
    }

    setTotalSumaMonedasArqueo(suma);
  };

  const finalizarArqueo = () => {
    setDialogs({ ...dialogs, arqueo: false, arqueoFinal: true });
    setCantidadMoneda({});
  };

  const cerrar = () => {
    setDialogs({ ...dialogs, arqueo: false });
    setCantidadMoneda({});
  };

  return (
    <>
      {dialogs.arqueo && (
        <Dialog fullWidth maxWidth="md" open={dialogs.arqueo} onClose={cerrar} TransitionComponent={Zoom}>
          <DialogTitle>{lang.arqueo_caja}</DialogTitle>
          <DialogContent dividers>
            {
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="button">
                    {lang.billetes_y_monedas}
                  </Typography>
                </Grid>
                {listaRegistrosMonedas.map((e, i) => {
                  return (
                    <Fragment key={i}>
                      <Grid item xs={6} md={3}>
                        <TextField
                          InputProps={{
                            inputComponent: NumberFormatCustom,
                            inputProps: { min: 0 },
                          }}
                          helperText={e.descripcion_registro_moneda} name={e.id_monedas_registro} onChange={onChange}
                        />
                      </Grid>
                    </Fragment>
                  );
                })}
              </Grid>
            }
            <Grid item xs={12}>
              <Typography variant="h6">
                {lang.total_en_efectivo}:{" "}
                {funciones.numberSeparator(totalSumaMonedasArqueo)}{" "}
                {MONEDA_PRINCIPAL.nombre_moneda}{" "}
              </Typography>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={finalizarArqueo} variant="contained">{lang.confirmar}</Button>
            <Button variant="contained" onClick={cerrar}>{lang.cancelar}</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default DialogArqueo;
