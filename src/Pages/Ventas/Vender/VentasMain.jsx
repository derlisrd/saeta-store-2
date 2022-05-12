import {
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  Icon,
  IconButton,
  Tooltip,
  Zoom,
} from "@mui/material";
import React from "react";
import Loading from "../../../Componentes/Loading";
import SnackAlert from "../../../Componentes/SnackAlert";
import VentasFactura from "./VentasFactura";

import { useVentas } from "./VentasProvider";

const VentasMain = () => {
  const { errors, setErrors, Funciones, cargas, dialogs, setDialogs,datosFacturas,indexFactura } =
    useVentas();
  const cerrar = () => {
    setDialogs({ ...dialogs, main: false,finalizarVenta:false });
  };
  const fa = datosFacturas.facturas[indexFactura];
  const ABM = fa?.datosMoneda.abreviatura_moneda;
  return (
    <>
      {
        cargas.general && <Loading />
      }
      <Dialog open={dialogs.main} fullScreen TransitionComponent={Fade}>
        <DialogTitle>
          <Tooltip
            title={<h2>Volver menú principal</h2>}
            TransitionComponent={Zoom}
            arrow
            placement="right-start"
          >
            <IconButton onClick={cerrar} color="secondary">
              <Icon>arrow_back_ios_new</Icon>
            </IconButton>
          </Tooltip>

          Nueva venta - 
            Total: {Funciones.numberSeparator(Funciones.redondeo2decimales(fa.total))} {ABM}
        </DialogTitle>
        <DialogContent>
          <SnackAlert
            open={errors.error}
            severity={errors.color}
            onClose={() => {
              setErrors({ ...errors, error: false });
            }}
            message={errors.mensaje}
          />
          {cargas.finalizarVenta ? <Loading /> : <VentasFactura />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VentasMain;
