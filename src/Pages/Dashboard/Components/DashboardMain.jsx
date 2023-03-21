import { Box, Grid, Typography } from "@mui/material";
import LoadingLinear from "../../../Components/UI/LoadingLinear";
import { useDashboard } from "../DashboardProvider";
import Dolar from "./Dolar";
import MasVendidos from "./MasVendidos";
import UltimasVentas from "./UltimasVentas";
import UltimosProductos from "./UltimosProductos";
import VentasDia from "./VentasDia";
import VentasMes from "./VentasMes";

function DashboardMain() {
  const { isLoading, datas } = useDashboard();
  if (isLoading) {
    return <LoadingLinear />;
    }
    //console.log(datas);
  return (
    <Box m={1}>
      <Grid container spacing={2} alignItems="flex-start">
      <Grid item xs={12}>
        <Typography variant="h4">Visión general</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <VentasDia valor={datas.ventasHoy} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <VentasMes valor={datas.ventasMes} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
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
