import { Grid } from "@mui/material";
import LoadingLinear from "../../../Components/UI/LoadingLinear";
import { useDashboard } from "../DashboardProvider";
import Dolar from "./Dolar";
import MasVendidos from "./MasVendidos";
import UltimasVentas from "./UltimasVentas";
import VentasDia from "./VentasDia";
import VentasMes from "./VentasMes";

function DashboardMain() {
  const { isLoading, datas } = useDashboard();
  if (isLoading) {
    return <LoadingLinear />;
    }

  return (
    <Grid container spacing={2} alignItems="flex-start">
      <Grid item xs={12} sm={6} md={4}>
        <VentasDia valor={datas.ventasHoy} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <VentasMes valor={datas.ventasMes} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Dolar compra={datas.cotizacion.compra} venta={datas.cotizacion.venta} />
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <UltimasVentas movimientos={datas.movimientos} />
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <MasVendidos masvendidos={datas.masvendidos} />
      </Grid>
    </Grid>
  );
}

export default DashboardMain;
