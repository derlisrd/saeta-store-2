import { Grid } from "@mui/material";
import Botones from "./Botones";
import Inputs from "./Inputs";

function NotaMain() {
    return (<Grid container  columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid item >
          CLIENTE
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          deposito
        </Grid>
        <Grid item xs={12} sm={3}>
          
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8}>
           tabla de items
        </Grid>
  
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            
              <Inputs />
            
            <Grid xs={12} item >
              <Botones />
            </Grid>
            <Grid item xs={12}>
              monedas
            </Grid>
            <Grid item xs={12}>
                prespuesto
            </Grid>
            <Grid item xs={12}>
              aguarda
            </Grid>
          </Grid>
        </Grid>
      </Grid>);
}

export default NotaMain;