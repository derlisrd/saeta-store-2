import { Grid, Typography } from "@mui/material";
import { funciones } from "../../../../Functions";

const RegistrosMovimientos = ({ registro }) => {
  return (
    <>
      <Grid item xs={8} sm={8}>
        <Typography variant="button">
          {registro.descripcion_registro}:
        </Typography>
      </Grid>
      <Grid item xs={4} sm={4}>
        <Typography variant="button">
          {funciones.numberFormat(registro.cantidad + registro.no_efectivo)}
        </Typography>
      </Grid>
    </>
  );
};

export default RegistrosMovimientos;
