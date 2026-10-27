import { Alert, Grid, Typography, Zoom } from "@mui/material";
import React from "react";
import ButtonCustom from "../../../Components/MuiCustom/ButtonCustom";
import { useVentas } from "./VentasProvider";

const Botones = () => {

const { dialogs, lang, setDialogs, valorConvertido,Aguardar,datosFacturas,indexFactura,CancelarFacturaActual,Anotar} = useVentas();

  const da = {...datosFacturas.facturas[indexFactura]}
  const ABM = da?.datosMoneda.abreviatura_moneda;
  const openFinalizarDialog = ()=>{
    if(datosFacturas.facturas[indexFactura].itemsFactura.length >0){
      setDialogs({ ...dialogs, finalizarVenta: true });
    }
  }


  return (
    <Zoom in={datosFacturas.facturas[indexFactura]?.itemsFactura.length > 0}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={12} lg={6}>
          <ButtonCustom
            variant="contained"
            onClick={openFinalizarDialog}
            color="success"
            fullWidth
          >
            {lang.finalizar}
          </ButtonCustom>
        </Grid>
        <Grid item xs={12} sm={6} md={12} lg={6}>
          <ButtonCustom
            variant="outlined"
            size="large"
            fullWidth
            onClick={CancelarFacturaActual}
          >
            {lang.cancelar}
          </ButtonCustom>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ButtonCustom
            variant="outlined"
            size="large"
            fullWidth
            onClick={Aguardar}
            color="warning"
          >
            {lang.esperar}
          </ButtonCustom>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ButtonCustom
            size="large"
            fullWidth
            variant="outlined"
            onClick={Anotar}
            color="secondary"
          >
            {lang.anotar}
          </ButtonCustom>
        </Grid>
        <Grid xs={12} item>
          <Alert severity="info" icon={false}>
            <Typography variant="h6">
              {" "}
              {lang.total}: {valorConvertido(da.total)} {ABM}{" "}
            </Typography>
          </Alert>
        </Grid>
      </Grid>
    </Zoom>
  );
};

export default Botones;
