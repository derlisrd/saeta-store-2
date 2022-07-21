import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, Typography } from '@mui/material';
import React, { Fragment, useCallback, useEffect,useState } from 'react'
import { APICALLER } from '../../../Services/api';
import { useCajas } from './CajasProvider';

const ResumenFinal = () => {

    const {dialogs,setDialogs,lang,datosCajaCierre,funciones,valoresCierre} = useCajas();
    const [cargando,setCargando] = useState(true)

    const [datos,setDatos] = useState({
      registros:[]
    })

    function cerrar (){
        setDialogs({...dialogs,resumenfinal:false});
    }



   

    const getMovimientosCaja = useCallback(async () => {
        if (dialogs.resumenfinal) {
          setCargando(true);
          let cajas_monedas = [...valoresCierre]
          let ID_CAJA = datosCajaCierre.id_caja;
          let rescate_fecha_apertura = datosCajaCierre.fecha_apertura;
    
          let promises = await Promise.all([
            APICALLER.get({
              table: "cajas_movimientos", include:"cajas,cajas_registros,monedas ",
              on:"id_caja,id_caja_movimiento,id_moneda_movimiento,id_moneda,id_tipo_registro,id_cajas_registro",
              fields:"id_moneda_movimiento,id_tipo_registro,id_cajas_movimiento, detalles_movimiento, descripcion_registro,nombre_caja,monto_movimiento,monto_sin_efectivo,id_caja,id_cajas_registro,abreviatura_moneda,id_moneda",
              where:`id_caja_movimiento,=,${ID_CAJA},and,fecha_movimiento,>=,'${rescate_fecha_apertura}'`}),
            APICALLER.get({table:'cajas_users',include:"users",on:"id_user_caja,id_user",where:`id_caja_caja,=,${ID_CAJA}`,fields:'nombre_user'}),
            APICALLER.get({table:"facturas",include:"facturas_formas_pagos",on:"id_facturas_formas_pago,id_forma_pago_factura",where:`id_caja_factura,=,${ID_CAJA},and,fecha_factura,>=,'${rescate_fecha_apertura}',and,tipo_factura,<>,2`}),
            APICALLER.get({table:'cajas_registros',fields:"id_cajas_registro,descripcion_registro,tipo_registro",where:"tipo_registro,<,2"})
            ])

            let movimiento = promises[0], usuarios =promises[1], facturas = promises[2], registro = promises[3], responsable = usuarios.results[0].nombre_user;
            
            let registros = registro.results;
            
            let movimientos = movimiento.results
            var cajas = [];
            cajas_monedas.forEach(i=>{ 
              let registros_movimientos = [];
              registros.forEach(e=>{
                  registros_movimientos.push({...e,cantidad:0,no_efectivo:0})
              })
              cajas.push({
                id_moneda_caja_moneda: i.id_moneda_caja_moneda,
                id_cajas_moneda: i.id_cajas_moneda,
                abreviatura_moneda: i.abreviatura_moneda,
                nombre_moneda: i.nombre_moneda,
                registros_movimientos,
                monto_inicial_caja:parseFloat(i.monto_inicial_caja),
                total_ingreso:0,
                total_ingreso_no_efectivo:0,
                total_egreso:0
              })
            })


            
            movimientos.forEach(e=>{
                let foundMoneda = cajas.findIndex(i=> i.id_moneda_caja_moneda === e.id_moneda_movimiento);
                
                  if(foundMoneda>=0){
                    let foundRegistro = registros.findIndex(i=> i.id_cajas_registro === e.id_tipo_registro);
                    if(foundRegistro>=0){
                        let tiporegistro = parseInt(cajas[foundMoneda].registros_movimientos[foundRegistro].tipo_registro);
                        let cantidad_efectivo = parseFloat(e.monto_movimiento);
                        let cantidad_no_efectivo = parseFloat(e.monto_sin_efectivo);
                        cajas[foundMoneda].registros_movimientos[foundRegistro].cantidad += cantidad_efectivo;
                        cajas[foundMoneda].registros_movimientos[foundRegistro].no_efectivo += cantidad_no_efectivo;
                        if(tiporegistro===1){
                          cajas[foundMoneda].total_ingreso += cantidad_efectivo;
                          cajas[foundMoneda].total_ingreso_no_efectivo += cantidad_no_efectivo;
                        }
                        else{
                          cajas[foundMoneda].total_egreso += cantidad_efectivo;
                        }
                    }
                  }
            })

            let obj = {
              nombre_caja: datosCajaCierre.nombre_caja,
              responsable,
              fecha_apertura: datosCajaCierre.fecha_apertura,
              cajas:valoresCierre,
              registros: cajas
            }
            setDatos(obj); 
          }
          setCargando(false);
        
      }, [datosCajaCierre, dialogs,valoresCierre]);


      console.log(datos);

    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getMovimientosCaja();} return () => {isActive = false; ca.abort();};
      }, [getMovimientosCaja]);


    if(cargando){
      return <></>
    }


  return (
    <Dialog fullScreen open={dialogs.resumenfinal} onClose={cerrar}>
    <DialogTitle>
        {lang.resumen_cierre_caja}
    </DialogTitle>
    <DialogContent dividers>
    <Grid container spacing={2}>
      
          <Grid item xs={12} sm={12} md={6}>
            <Alert variant='outlined' icon={false}>
              <Typography variant='button'>{lang.nombre_caja}: {datos.nombre_caja}</Typography>
              <br />
              <Typography variant='button'>{lang.usuario_responsable}: {datos.responsable}</Typography>
            </Alert>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Alert variant='outlined' icon={false}>
            <Typography variant='button'>{lang.fecha_apertura}: {datos.fecha_apertura}</Typography>
            </Alert>
          </Grid>

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


    </Grid>
    </DialogContent>
    <DialogActions>
      <Button variant="contained" size="large" >
       {lang.volver_arqueo}
      </Button>
      <Button variant="contained" size="large">
        {lang.confirmar}
      </Button>
      <Button variant="contained" size="large" onClick={cerrar}>
        {lang.cancelar}
      </Button>
    </DialogActions>
  </Dialog>
  )
}

export default ResumenFinal
