import { Grid, Typography, Icon, CardContent, Card, Alert} from "@mui/material";
import { useInformes } from "./InformesProvider";
import { funciones as Funciones } from "../../Functions";
export default function CardsCustom() {
  const { ingresosDia, ingresosMes, egresosDia, egresosMes } = useInformes();
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Alert variant="outlined" severity="info">
          <Typography variant="overline"></Typography>
        </Alert>
      </Grid>
      <Grid xs={12} sm={6} md={3} item>
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
              {Funciones.numberSeparator(ingresosDia)}{" "}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid xs={12} sm={6} md={3} item>
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
              {Funciones.numberSeparator(egresosDia)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} sm={6} md={3} item>
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
              {Funciones.numberSeparator(ingresosMes)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} sm={6} md={3} item>
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
              {Funciones.numberSeparator(egresosMes)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
