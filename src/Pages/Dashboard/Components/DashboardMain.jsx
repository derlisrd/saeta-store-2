import { Grid } from "@mui/material";
import { useDashboard } from "../DashboardProvider";
import Dolar from "./Dolar";
import UltimasVentas from "./UltimasVentas";
import VentasDia from "./VentasDia";
import VentasMes from "./VentasMes";


function DashboardMain() {
    const {isLoading,datas} = useDashboard()

    return (<Grid container spacing={2} alignItems="center" >
        <Grid item xs={12} sm={6} md={4}>
            <VentasDia />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
            <VentasMes/>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
            <Dolar />
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
            <UltimasVentas />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
            <UltimasVentas />
        </Grid>
    </Grid>);
}

export default DashboardMain;