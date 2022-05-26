import { Grid, Typography } from "@mui/material";
import { CustomButton } from "../../../../Components";
import React from "react";
import { useProductFormEdit } from "./ProductFormEditProvider";
import Funciones from "../../../../Funciones";

const ProductButtonHead = () => {
  const { cargas} = useProductFormEdit();
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h5"> EDITAR </Typography>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          alignItems="flex-start"
        >
          <Grid item>
            <CustomButton
              onClick={() => {}}
              color="primary"
              type="submit"
              variant="outlined"
              disabled={cargas.guardar}
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
              Volver
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductButtonHead;
