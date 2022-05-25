import React,{Fragment} from 'react'
import { funciones as Funciones } from "../../../Functions";
import { Typography,Grid, TextField,Alert,LinearProgress } from '@mui/material'
import { useCajas } from './CajasProvider';


const CierreResumen = ({datos,cargando}) => {
  
  const moneda = "Gs.";

  const {totalSumaMonedasArqueo} = useCajas()
  const arqueo = totalSumaMonedasArqueo;
  const FALTANTE = (datos.saldoFinal - arqueo)>0 ? datos.saldoFinal - arqueo : 0  ;
  const SOBRANTE = (arqueo - datos.saldoFinal)> 0 ? arqueo - datos.saldoFinal : 0 ;

  //console.log(datos);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        { cargando && <LinearProgress  />}
      </Grid>
      <Grid item xs={6}>
        <Alert icon={false} severity="warning" >
          <Typography variant="button" >Monto inicial : {Funciones.numberSeparator(datos.montoInicial)} {moneda}</Typography>
        </Alert>
      </Grid>
      <Grid item xs={6}>
        <Alert icon={false} severity="warning" >
          <Typography variant="button" >FECHA DE APERTURA: {datos.fechaApertura} </Typography>
        </Alert>
      </Grid>
      <Grid item xs={12} sm={6} >
        <Alert icon={false} severity="info" >
        <Typography variant="button" >Nombre caja: </Typography> <Typography variant="overline" > {datos.nombreCaja} </Typography>
        </Alert>
      </Grid>
      <Grid item xs={12} sm={6}>
      <Alert icon={false} severity="info" >
        <Typography variant="button" >Responsable: </Typography> {datos.nombre_user}
        </Alert>
      </Grid>
      <Grid item xs={12}>
        <Alert severity="info" icon={false}>
          <Typography variant="h5">VENTAS SIN EFECTIVO: { Funciones.numberSeparator(datos.montoSinEfectivo)} {moneda}</Typography>
        </Alert>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid container spacing={1}  >
            <Grid item xs={12}>
              <Alert  icon={false}>
                <Typography variant="button" >INGRESOS </Typography>
              </Alert>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="overline" >Ventas totales:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">
                {Funciones.numberSeparator(datos.ventasContado)} {moneda}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
              {
                  datos.ventasDescripcion.map(e=>(
                    <Fragment key={e.id}>
                    <Grid item xs={6}><Typography variant="overline">{e.descripcion}</Typography> </Grid>
                    <Grid item xs={6}><Typography variant="overline">{Funciones.numberSeparator(e.monto)} {moneda}</Typography></Grid>
                    </Fragment>
                  ))
                }
              
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="overline" >Depósitos en caja:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">
              { Funciones.numberSeparator(datos.depositos)} {moneda}
              </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="overline" >Cobros de créditos:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">
                { Funciones.numberSeparator(datos.cobrosVentasCredito)} {moneda}
              </Typography>
            </Grid>
            
            <Grid item xs={6}>
                <Typography variant="overline" >Otros ingresos:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">
                { Funciones.numberSeparator(datos.otrosIngresos)} {moneda}
              </Typography>
            </Grid>

          
        </Grid>
      </Grid>



      <Grid item xs={12} sm={6}>
        <Grid container spacing={1}   >
          
            <Grid item xs={12}>
              <Alert severity="error" icon={false}>
                <Typography variant="button" >EGRESOS </Typography>
              </Alert>
            </Grid>

            <Grid item xs={6}>
                <Typography variant="overline" >Compras contado:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">
              { Funciones.numberSeparator(datos.comprasContado)} {moneda}
              </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="overline" >Retiros de caja:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">
              { Funciones.numberSeparator(datos.retiros)} {moneda}
              </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="overline" >Pagos de créditos:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">
                { Funciones.numberSeparator(datos.pagoComprasCredito)} {moneda}
              </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="overline" >Descuentos:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">
                { Funciones.numberSeparator(datos.descuentos)} {moneda}
              </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="overline" >Otros egresos:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">
                { Funciones.numberSeparator(datos.otrosPagos)} {moneda}
              </Typography>
            </Grid>
          
        </Grid>
      </Grid>
      <Grid item xs={6}>
       { FALTANTE!==0  && 
        <Alert severity="error" variant="outlined" icon={false}>
          <Typography variant="button">FALTANTE: {Funciones.numberSeparator(FALTANTE)} {moneda}</Typography>
        </Alert>
        }
      </Grid>
      <Grid item xs={6}>
        {
          SOBRANTE!==0 && 
        <Alert severity="info" variant="outlined" icon={false}>
          <Typography variant="button">SOBRANTE: {Funciones.numberSeparator(SOBRANTE)} {moneda}</Typography>
        </Alert>
        }
      </Grid>
      {
        (SOBRANTE>0 || FALTANTE>0) &&
        <Grid item xs={12}>
          <TextField variant="outlined" fullWidth label="Declarar sobrante o faltante" />
        </Grid>
      }
      
      <Grid item xs={12} md={6}>
        <Alert severity="success" variant="outlined" icon={false}>
          <Typography variant="h6">SALDO FINAL: {Funciones.numberSeparator(datos.saldoFinal)} {moneda}</Typography>
        </Alert>
      </Grid>
      <Grid item xs={12} md={6}>
        <Alert severity="warning" variant="outlined" icon={false}>
          <Typography variant="h6">ARQUEO DE CAJA: {Funciones.numberSeparator(arqueo)} {moneda}</Typography>
        </Alert>
      </Grid>
      
      <Grid item xs={12}>
        {
          (SOBRANTE===0 && FALTANTE===0) && <Alert severity='success'>Arqueo correcto</Alert>
        }
      </Grid>
    </Grid>
  )
}

export default CierreResumen
