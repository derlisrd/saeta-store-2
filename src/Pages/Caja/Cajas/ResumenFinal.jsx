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
          let ID_CAJA = datosCajaCierre.id_caja;
          let rescate_fecha_apertura = datosCajaCierre.fecha_apertura;
    
          let promises = await Promise.all([
            APICALLER.get({
              table: "cajas_movimientos", include:"cajas,cajas_registros,monedas ",
              on:"id_caja,id_caja_movimiento,id_moneda_movimiento,id_moneda,id_tipo_registro,id_cajas_registro",
              fields:"id_cajas_movimiento, detalles_movimiento, descripcion_registro,nombre_caja,monto_movimiento,monto_sin_efectivo,id_caja,id_cajas_registro,abreviatura_moneda,id_moneda",
              where:`id_caja_movimiento,=,${ID_CAJA},and,fecha_movimiento,>=,'${rescate_fecha_apertura}'`}),
            APICALLER.get({table:'cajas_users',include:"users",on:"id_user_caja,id_user",where:`id_caja_caja,=,${ID_CAJA}`,fields:'nombre_user'}),
            APICALLER.get({table:"facturas",include:"facturas_formas_pagos",on:"id_facturas_formas_pago,id_forma_pago_factura",where:`id_caja_factura,=,${ID_CAJA},and,fecha_factura,>=,'${rescate_fecha_apertura}',and,tipo_factura,<>,2`}),
            APICALLER.get({table:'cajas_registros',fields:"id_cajas_registro,descripcion_registro,tipo_registro"})
            ])

            let movimientos = promises[0], usuarios =promises[1], facturas = promises[2], registro = promises[3], responsable = usuarios.results[0].nombre_user;
            
            let registros = registro[3].results;

            movimientos.results.forEach(elem=>{

            })

            let obj = {
              nombre_caja: datosCajaCierre.nombre_caja,
              responsable,
              fecha_apertura: datosCajaCierre.fecha_apertura,
              cajas:valoresCierre,
              registros:registro[3].results
            }
            setDatos(obj);
          
            
            
            
          }
          setCargando(false);
        
      }, [datosCajaCierre, dialogs]);


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

          <Grid item xs={12} sm={12} md={6}>
            <Alert variant='outlined' icon={false}>
              {
                datos?.registros.map((e)=>(
                  parseInt(e.tipo_registro) === 1 && (
                    <Fragment key={e.id_cajas_registro}>
                      <Typography variant='button'>{e.descripcion_registro}</Typography>
                      <br />
                    </Fragment>
                  )
                ))
              }
            </Alert>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Alert variant='outlined' severity='error' icon={false}>
              {
                datos?.registros.map((e)=>(
                  parseInt(e.tipo_registro) === 0 && (
                    <Fragment key={e.id_cajas_registro}>
                      <Typography variant='button'>{e.descripcion_registro}</Typography>
                      <br />
                    </Fragment>
                  )
                ))
              }
            </Alert>
          </Grid>


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
