import { Container,Typography,Grid,Card,CardContent,Icon, TextField,Alert} from "@mui/material";

import  LoadingBackDrop from "../../Components/UI/LoadingBackDrop";
import { funciones as Funciones } from "../../Functions";
import CardsCustom from "./CardsCustom";
import Egresos from "./Egresos";
import GraficosMensuales from "./GraficosMensuales";
import { useInformes } from "./InformesProvider";
import Ingresos from "./Ingresos";

const InformesGenerales = () => {
  const { fechaMostrar, cargando, mesState,setMesState} = useInformes();

  if (cargando) {
    return <LoadingBackDrop />;
  }

  const changeMes = e=>setMesState(e.target.value);

  return (
    <Container disableGutters maxWidth="md" >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Informes gráficos</Typography>
          <Typography variant="button">{fechaMostrar}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField type="month" helperText="Seleccionar mes" onChange={changeMes} value={mesState} />
        </Grid>
        <Grid item xs={12}>
          <CardsCustom />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Informe del mes { Funciones.fechaMesEs(mesState) }</Typography>
              <GraficosMensuales />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Alert severity="success" icon={<Icon>credit_score</Icon>}>
            <Typography variant="h6">Últimos ingresos mes { Funciones.fechaMesEs(mesState) }</Typography>
          </Alert>
          <Ingresos />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Alert severity="error" icon={<Icon>local_atm</Icon>}>
            {" "}
            <Typography variant="h6">Últimos egresos mes { Funciones.fechaMesEs(mesState) }</Typography>{" "}
          </Alert>
          <Egresos />
        </Grid>
      </Grid>
    </Container>
  );
};

export default InformesGenerales;
