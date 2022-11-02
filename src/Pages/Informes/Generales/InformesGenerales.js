import { Typography,Grid,Card,CardContent,Icon, TextField,Alert, Box, FormControl, InputLabel, Select, MenuItem} from "@mui/material";

import LoadingLinear from "../../../Components/UI/LoadingLinear";
import { funciones } from "../../../Functions";
import CardsCustom from "./CardsCustom";
import Egresos from "./Egresos";
import GraficosMensuales from "./GraficosMensuales";
import { useInformes } from "./InformesProvider";
import Ingresos from "./Ingresos";

const InformesGenerales = () => {
  const { fechaMostrar, cargando, mesState,setMesState,tipoIngreso,setTipoIngreso} = useInformes();

  

  
  const changeMes = e=>setMesState(e.target.value);
  
  if (cargando) {
    return <LoadingLinear />;
  }
  return (
    <Box padding={3} maxWidth="xl" >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6">Informes gráficos</Typography>
          <Typography variant="button">{fechaMostrar}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField type="month" fullWidth helperText="Seleccionar mes" onChange={changeMes} value={mesState} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
                <InputLabel> Tipo: </InputLabel>
                    <Select
                        name="tipoIngreso" value={tipoIngreso}
                        onChange={(e) => { setTipoIngreso(e.target.value)}}
                    >
                        <MenuItem value="">Todos</MenuItem>
                        <MenuItem value="1">Efectivo</MenuItem>
                        <MenuItem value="2">Sin efectivo</MenuItem>
                    </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <CardsCustom />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Informe del mes { funciones.fechaMesEs(mesState) }</Typography>
              <GraficosMensuales />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={12} xl={6}>
          <Alert severity="success" icon={<Icon>credit_score</Icon>}>
            <Typography variant="h6">Ingresos mes { funciones.fechaMesEs(mesState) }</Typography>
          </Alert>
          <Ingresos />
        </Grid>
        <Grid item xs={12} sm={12} md={12} xl={6}>
          <Alert severity="error" icon={<Icon>local_atm</Icon>}>
            {" "}
            <Typography variant="h6">Egresos mes { funciones.fechaMesEs(mesState) }</Typography>{" "}
          </Alert>
          <Egresos />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InformesGenerales;
