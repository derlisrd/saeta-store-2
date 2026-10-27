import { Button, Icon, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useVentas } from "./VentasProvider";

const AyudaPresupuesto = () => {
 const { dialogs, lang, setDialogs,datosFacturas,indexFactura} = useVentas();

  const da = {...datosFacturas.facturas[indexFactura]}
  return (
    <>
      <Button
        variant="outlined"
        size="small"
        color="error"
        onClick={() => {
          setDialogs({ ...dialogs, ayuda: true });
        }}
      >
        {lang.ayuda}
      </Button>
      {da.itemsFactura.length > 0 && (
        <Tooltip title="Imprimir presupuesto" placement="top">
          <IconButton
            onClick={() => {
              setDialogs({ ...dialogs, imprimirPresupuesto: true });
            }}
          >
            <Icon>print</Icon>
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default AyudaPresupuesto;
