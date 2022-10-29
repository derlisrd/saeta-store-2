import { Grid, Typography } from "@mui/material";
import  ButtomCustom  from "../../../../Components/MuiCustom/ButtonCustom";
import React from "react";
import { useProductForm } from "./ProductFormProvider";
import useGoto from "../../../../Hooks/useGoto";

const ProductButtonHead = () => {
  const { cargas,stock,formulario,lang} = useProductForm();
  const go = useGoto();
  let GUARDAR_ACTIVO = (formulario.tipo_producto==="1" && stock.length===0) || cargas.guardar
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography variant="h6">{lang.nuevo}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container  direction="row"  spacing={2} justifyContent="flex-end"  alignItems="flex-start" >
          <Grid item>
            <ButtomCustom
              type="submit"
              variant="outlined"
              disabled={GUARDAR_ACTIVO}
            >
              {lang.guardar}
            </ButtomCustom>
          </Grid>
          <Grid item>
            <ButtomCustom
              color="error"
              onClick={() => {go.to("productos")}}
              variant="outlined"
              disabled={cargas.guardar}
            >
              {lang.cerrar}
            </ButtomCustom>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductButtonHead;
