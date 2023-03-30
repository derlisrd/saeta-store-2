import { Box, Grid, Typography } from "@mui/material";
import LoadingLinear from "../../../Components/UI/LoadingLinear";
import { useDashboard } from "../DashboardProvider";
import Dolar from "./Dolar";
import MasVendidos from "./MasVendidos";
import MonedaPrincipal from "./MonedaPrincipal";
import UltimasVentas from "./UltimasVentas";
import UltimosProductos from "./UltimosProductos";
import VentasDia from "./VentasDia";
import VentasMes from "./VentasMes";
import VentasTotales from "./VentasTotales";

function DashboardMain() {
  const { isLoading, datas } = useDashboard();
  if (isLoading) {
    return <LoadingLinear />;
    }
    //console.log(datas);
  return (
    <Box m={1} paddingBottom={3}>
      <Grid container spacing={2} alignItems="flex-start">
      <Grid item xs={12}>
        <Typography variant="h4">Visión general</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <VentasDia valor={datas.ventasHoy} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <VentasMes valor={datas.ventasMes} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
       <VentasTotales />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3} >
        <MonedaPrincipal />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={3}>
        <Dolar cotizacion={datas.cotizacion} />
      </Grid>
      <Grid item xs={12} sm={12} >
        <UltimasVentas movimientos={datas.movimientos} />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <MasVendidos masvendidos={datas.masvendidos} />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <UltimosProductos productos={datas.productos} />
      </Grid>
    </Grid>
    </Box>
  );
}

export default DashboardMain;
