import { Grid, Typography } from "@mui/material";
import { CustomButton } from "../../../../Components";
import React from "react";
import { useProductForm } from "./ProductFormProvider";
import Funciones from "../../../../Funciones";

const ProductButtonHead = () => {
  const { cargas,stock,formulario} = useProductForm();
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
            <CustomButton
              onClick={() => {}}
              color="primary"
              type="submit"
              variant="outlined"
              disabled={GUARDAR_ACTIVO}
            >
              GUARDAR
            </CustomButton>
          </Grid>
          <Grid item>
            <CustomButton
              color="error"
              onClick={() => {Funciones.goto("productos")}}
              variant="outlined"
              disabled={cargas.guardar}
            >
              Cerrar
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductButtonHead;
