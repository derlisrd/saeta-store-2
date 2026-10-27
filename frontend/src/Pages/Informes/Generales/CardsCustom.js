import { Grid, Typography, Icon, CardContent, Card, Alert} from "@mui/material";
import { useInformes } from "./InformesProvider";
import { funciones } from "../../../Functions";
export default function CardsCustom() {
  const { ingresosDia, ingresosMes, egresosDia, egresosMes,tipoIngreso } = useInformes();
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Alert variant="outlined" severity="info">
          <Typography variant="overline">
            {tipoIngreso === "1" ? "Ingresos en efectivo" : tipoIngreso ==="2" ? "Ingresos sin efectivo" : "Ingresos totales del mes"}
          </Typography>
        </Alert>
      </Grid>
      <Grid xs={12} sm={12} md={6} lg={3} item>
        <Card>
          <CardContent style={{ textAlign: "center" }}>
            <Alert icon={<Icon>trending_up</Icon>} severity="success">
              <Typography variant="button" gutterBottom>
                Ingresos del día
              </Typography>
            </Alert>
            <Icon color="primary" style={{ fontSize: "60px" }}>
              trending_up
            </Icon>
            <Typography variant="h6">
              {" "}
              {funciones.numberSeparator(ingresosDia)}{" "}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid xs={12} sm={12} md={6} lg={3} item>
        <Card>
          <CardContent style={{ textAlign: "center" }}>
            <Alert icon={<Icon>trending_down</Icon>} severity="error">
              <Typography variant="button" gutterBottom>
                Egresos del día
              </Typography>
            </Alert>

            <Icon color="error" style={{ fontSize: "60px" }}>
              trending_down
            </Icon>
            <Typography variant="h6">
              {funciones.numberSeparator(egresosDia)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} sm={12} md={6} lg={3} item>
        <Card>
          <CardContent style={{ textAlign: "center" }}>
            <Alert icon={<Icon>trending_up</Icon>} severity="success">
              <Typography variant="button" gutterBottom>
                Ingresos del mes
              </Typography>
            </Alert>
            <Icon color="primary" style={{ fontSize: "60px" }}>
              trending_up
            </Icon>
            <Typography variant="h6">
              {funciones.numberSeparator(ingresosMes)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} sm={12} md={6} lg={3} item>
        <Card>
          <CardContent style={{ textAlign: "center" }}>
            <Alert icon={<Icon>trending_down</Icon>} severity="error">
              <Typography variant="button" gutterBottom>
                Egresos del mes
              </Typography>
            </Alert>
            <Icon color="error" style={{ fontSize: "60px" }}>
              trending_down
            </Icon>
            <Typography variant="h6">
              {funciones.numberSeparator(egresosMes)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
