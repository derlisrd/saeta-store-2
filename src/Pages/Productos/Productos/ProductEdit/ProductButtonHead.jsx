import { Grid, Typography } from "@mui/material";
import ButtonCustom from "../../../../Components/MuiCustom/ButtonCustom";
import React from "react";
import { useProductFormEdit } from "./ProductFormEditProvider";
import useGoto from "../../../../Hooks/useGoto";

const ProductButtonHead = () => {
  const { cargas,lang} = useProductFormEdit();
  const go = useGoto()
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h6"> {lang.editar_producto} </Typography>
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
            <ButtonCustom
              variant="contained"
              type="submit"
              disabled={cargas.guardar}
            >
              {lang.guardar}
            </ButtonCustom>
          </Grid>
          <Grid item>
            <ButtonCustom
              color="error"
              variant="outlined"
              onClick={() => {go.to("productos")}}
              disabled={cargas.guardar}
            >
              {lang.volver}
            </ButtonCustom>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductButtonHead;
