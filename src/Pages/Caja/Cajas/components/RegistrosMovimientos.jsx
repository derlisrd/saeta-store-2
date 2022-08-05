import { Grid, Typography } from "@mui/material";
import { funciones } from "../../../../Functions";

const RegistrosMovimientos = ({ registro }) => {
  return (
    <>
      <Grid item xs={12} sm={8}>
        <Typography variant="button">
          {registro.descripcion_registro}:
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography variant="button">
          {funciones.numberFormat(registro.cantidad)}
        </Typography>
      </Grid>
    </>
  );
};

export default RegistrosMovimientos;
