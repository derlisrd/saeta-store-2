import { Grid,Alert,Typography } from "@mui/material";
import { Fragment } from "react";

function ResumenFinalDatos({datos}) {
    return (  <Fragment>
        {
            datos.registros.map((dato,index)=>(
              <Fragment key={index}>
                <Grid item xs={12}>
                  <Typography variant='button'>{dato.nombre_moneda}: </Typography>
                </Grid>

                
                <Grid item xs={12} sm={12} md={6}>
                  <Alert icon={false}>
                  {
                    dato.registros_movimientos.map((registro,i)=>(
                      (registro.tipo_registro==="1" && (registro.cantidad>0 || registro.no_efectivo>0 )) &&
                      <span key={i}>
                        <Typography variant='overline'>{registro.descripcion_registro}:</Typography> <Typography variant='button'>{funciones.numberFormat(registro.cantidad)}</Typography>
                      </span>
                    ))
                  }
                  </Alert>
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
                <Grid item xs={12} sm={12} md={4}>
                  TOTAL INGRESO : {dato.total_ingreso}
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  TOTAL SIN EFECTIVO : {dato.total_ingreso_no_efectivo}
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  TOTAL EGRESO : {dato.total_egreso}
                </Grid>
              </Fragment>
            ))
          }
    </Fragment>);
}

export default ResumenFinalDatos;