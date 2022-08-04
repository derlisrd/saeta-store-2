import { Grid,Typography } from "@mui/material";
import { Fragment } from "react";
import { useCajas } from "./CajasProvider";

function ResumenFinalDatos({datos}) {
    const {funciones,lang} = useCajas();
    return (  <Fragment>
        {
            datos.registros.map((dato,index)=>(
              <Fragment key={index}>
                <Grid item xs={12}>
                  <Typography variant='button'>{dato.nombre_moneda}: </Typography>
                </Grid>

                
                <Grid item xs={12} sm={12} md={6}>
                  <Grid container>
                  {
                    dato.registros_movimientos.map((registro,i)=>(
                      (registro.tipo_registro==="1" && (registro.cantidad>0 || registro.no_efectivo>0 )) &&
                      <Fragment key={i}>
                      <Grid  item xs={12} sm={8} >
                        <Typography variant='button'>{registro.descripcion_registro}:</Typography> 
                      </Grid>
                      <Grid item xs={12} sm={4} >
                        <Typography variant='button'>{funciones.numberFormat(registro.cantidad)}</Typography>
                      </Grid>
                      </Fragment>
                    ))
                  }
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                {
                  dato.total_egreso>0 &&
                  dato.registros_movimientos.map((registro,i)=>(
                    (registro.tipo_registro==="1" && (registro.cantidad>0 || registro.no_efectivo>0 )) &&
                    <span key={i}>
                      <Typography variant='overline'>{registro.descripcion_registro}:</Typography> <Typography variant='button'>{funciones.numberFormat(registro.cantidad)}</Typography>
                    </span>
                  ))
                }
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
              </Fragment>
            ))
          }
    </Fragment>);
}

export default ResumenFinalDatos;