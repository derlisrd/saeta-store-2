import { Alert, Grid, Typography, Zoom } from "@mui/material";
import ButtonCustom from "../../../../Components/MuiCustom/ButtonCustom";
import { useLang } from "../../../../Contexts/LangProvider";
import { useNotas } from "../NotasProvider";

function Botones() {
    const {datosNotas,indexFactura,Anotar,CancelarFacturaActual,Aguardar,valorConvertido} = useNotas();
    const {lang} = useLang()
    const da = {...datosNotas.facturas[indexFactura]}
    const ABM = da?.datosMoneda.abreviatura_moneda;
    return ( <Zoom in={datosNotas.facturas[indexFactura]?.itemsFactura.length > 0}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={12} lg={6}>
            <ButtonCustom
              size="large"
              fullWidth
              variant="contained"
              onClick={Anotar}
              color="success"
            >
              {lang.finalizar}
            </ButtonCustom>
          </Grid>
          <Grid item xs={12} sm={6} md={12} lg={6}>
            <ButtonCustom
              variant="outlined"
              size="large"
              fullWidth
              onClick={CancelarFacturaActual}
            >
              {lang.cancelar}
            </ButtonCustom>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ButtonCustom
              variant="outlined"
              size="large"
              fullWidth
              onClick={Aguardar}
              color="warning"
            >
              {lang.esperar}
            </ButtonCustom>
          </Grid>
          <Grid item xs={12} sm={6}>
            
          </Grid>
          <Grid xs={12} item>
            <Alert severity="info" icon={false}>
              <Typography variant="h6">
                {" "}
                {lang.total}: {valorConvertido(da.total)} {ABM}
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </Zoom> );
}

export default Botones;