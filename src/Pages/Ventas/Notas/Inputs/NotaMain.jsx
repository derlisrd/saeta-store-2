import { Grid } from "@mui/material";
import Botones from "./Botones";
import InfoCliente from "./InfoCliente";
import InfoDeposito from "./InfoDeposito";
import Inputs from "./Inputs";
import TablaItems from "./TablaItems";

function NotaMain() {
    return (<Grid container  columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid item >
          <InfoCliente />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <InfoDeposito />
        </Grid>
        <Grid item xs={12} sm={3}>
          
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={9}>
           <TablaItems />
        </Grid>
  
        <Grid item xs={12} sm={12} md={12} lg={3}>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            
              <Inputs />
            
            <Grid xs={12} item >
              <Botones />
            </Grid>
            <Grid item xs={12}>
              
            </Grid>
            <Grid item xs={12}>
                
            </Grid>
            <Grid item xs={12}>
              
            </Grid>
          </Grid>
        </Grid>

      </Grid>);
}

export default NotaMain;