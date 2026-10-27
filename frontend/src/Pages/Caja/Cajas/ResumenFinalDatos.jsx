import { Grid,Alert,Typography } from "@mui/material";
import { Fragment } from "react";
import { useCajas } from "./CajasProvider";
import RegistrosMovimientos from "./components/RegistrosMovimientos";

function ResumenFinalDatos({datos}) {
    const {funciones,lang} = useCajas();
    
    return (  <>
        {
            datos.registros.map((dato,index)=>(
              <Fragment key={index}>
                <Grid item xs={12}>
                  <Alert icon={false} severity="info" >
                    <Typography variant='button'>{dato.nombre_moneda}: {lang.monto_inicial} {funciones.numberFormat(dato.monto_inicial_caja)}  </Typography>
                  </Alert>
                </Grid>

                
                <Grid item xs={12} sm={12} md={6}>
                  <Grid container>
                  {
                    dato.registros_movimientos.map((registro,i)=>(
                      (registro.tipo_registro==="1" && (registro.cantidad>0 || registro.no_efectivo>0 )) &&
                      <RegistrosMovimientos key={i} registro={registro} />
                    ))
                  }
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Grid container>
                  {
                    dato.total_egreso>0 &&
                      dato.registros_movimientos.map((registro,i)=>(
                        (registro.tipo_registro==="0" && (registro.cantidad>0 || registro.no_efectivo>0 )) &&
                        <RegistrosMovimientos key={i} registro={registro} />
                      ))
                  }
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  {lang.total_ingreso} : <b>{funciones.numberFormat(dato.total_ingreso)}</b>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  {lang.total_sin_efectivo} : <b>{funciones.numberFormat(dato.total_ingreso_no_efectivo)}</b>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  {lang.total_egreso} : <b>{funciones.numberFormat(dato.total_egreso)}</b>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  {lang.total_declarado} : <b>{funciones.numberFormat(dato.declarado)}</b>
                </Grid>
                <Grid item xs={12}>
                  <Alert icon={false} variant="outlined">
                    <b>BALANCE: { (dato.monto_inicial_caja + dato.total_ingreso)-(dato.total_egreso)-(dato.declarado)} </b>
                  </Alert>
                </Grid>
                <Grid item xs={12}>
                  
                </Grid>
              </Fragment>
            ))
          }
    </>);
}

export default ResumenFinalDatos;