import { Grid, Typography } from "@mui/material";
import  ButtomCustom  from "../../../../Components/MuiCustom/ButtonCustom";
import React from "react";
import { useProductForm } from "./ProductFormProvider";
import useGoto from "../../../../Hooks/useGoto";

const ProductButtonHead = () => {
  const { cargas,stock,formulario} = useProductForm();
  const go = useGoto();
  let GUARDAR_ACTIVO = (formulario.tipo_producto==="1" && stock.length===0) || cargas.guardar
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h5">NUEVO</Typography>
      </Grid>
      <Grid item>
        <Grid container  direction="row"  spacing={2} justifyContent="flex-end"  alignItems="flex-start" >
          <Grid item>
            <ButtomCustom
              onClick={() => {}}
              color="primary"
              type="submit"
              variant="outlined"
              disabled={GUARDAR_ACTIVO}
            >
              GUARDAR
            </ButtomCustom>
          </Grid>
          <Grid item>
            <ButtomCustom
              color="error"
              onClick={() => {go.to("productos")}}
              variant="outlined"
              disabled={cargas.guardar}
            >
              Cerrar
            </ButtomCustom>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductButtonHead;
