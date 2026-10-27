import {Dialog,DialogContent,DialogTitle,Fade,Icon,IconButton,Tooltip,Zoom} from "@mui/material";
import React from "react";

import LoadingBackDrop  from "../../../Components/UI/LoadingBackDrop";
import SnackAlert from "../../../Components/MuiCustom/SnackAlert";
import VentasFactura from "./VentasFactura";

import { useVentas } from "./VentasProvider";

const VentasMain = () => {
  const { errors, setErrors, cargas, dialogs, setDialogs,datosFacturas,indexFactura,lang,valorConvertido } =
    useVentas();
  const cerrar = () => {
    setDialogs({ ...dialogs, main: false,finalizarVenta:false });
  };
  const fa = datosFacturas.facturas[indexFactura];
  const ABM = fa?.datosMoneda.abreviatura_moneda;
  


  return (
    <>
      {
        cargas.general && <LoadingBackDrop />
      }
      <Dialog open={dialogs.main} fullScreen TransitionComponent={Fade}>
        <DialogTitle>
          <Tooltip
            title={<h2>{lang.volver_menu_principal}</h2>}
            TransitionComponent={Zoom}
            arrow
            placement="right-start"
          >
            <IconButton onClick={cerrar} color="primary">
              <Icon>arrow_back_ios_new</Icon>
            </IconButton>
          </Tooltip>

         {lang.nueva_venta} | {lang.total}: { fa.total ? valorConvertido(fa.total) : ""} {ABM}
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
          {cargas.finalizarVenta ? <LoadingBackDrop /> : <VentasFactura />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VentasMain;
