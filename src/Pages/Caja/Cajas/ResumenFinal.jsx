import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useCallback, useEffect,useState } from 'react'
import { APICALLER } from '../../../Services/api';
import { useCajas } from './CajasProvider';
import CierreResumen from './CierreResumen';

const ResumenFinal = () => {

    const {dialogs,setDialogs,lang,datosCajaCierre,funciones,valoresCierre} = useCajas();
    const [cargando,setCargando] = useState(true)

    const [datos,setDatos] = useState({})

    function cerrar (){
        setDialogs({...dialogs,resumenfinal:false});
    }



   

    const getMovimientosCaja = useCallback(async () => {
        if (dialogs.resumenfinal) {
          setCargando(true);
          let ID_CAJA = datosCajaCierre.id_caja;
          let rescate_fecha_apertura = datosCajaCierre.fecha_apertura;
    
          let promise = await Promise.all([
            APICALLER.get({
              table: "cajas_movimientos",include:"cajas_registros,cajas",
              on: "id_tipo_registro,id_cajas_registro,id_caja,id_caja_movimiento",
              where:`id_caja_movimiento,=,${ID_CAJA},and,fecha_movimiento,>=,'${rescate_fecha_apertura}'`
            }),
            APICALLER.get({table:'cajas_users',include:"users",on:"id_user_caja,id_user",where:`id_caja_caja,=,${ID_CAJA}`,fields:'nombre_user'}),
            APICALLER.get({table:"facturas",include:"facturas_formas_pagos",on:"id_facturas_formas_pago,id_forma_pago_factura",
            where:`id_caja_factura,=,${ID_CAJA},and,fecha_factura,>=,'${rescate_fecha_apertura}',and,tipo_factura,<>,2`}),
            APICALLER.get({table:'cajas_registros',where:"tipo_registro,=,0",fields:"id_cajas_registro"})
            ])

            
            
            setDatos({});
          }
          setCargando(false);
        
      }, [datosCajaCierre, dialogs]);


      console.log(datos);

    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getMovimientosCaja();} return () => {isActive = false; ca.abort();};
      }, [getMovimientosCaja]);



  return (
    <Dialog fullScreen open={dialogs.resumenfinal} onClose={cerrar}>
    <DialogTitle>
        {lang.resumen_cierre_caja}
    </DialogTitle>
    <DialogContent dividers>
 
      
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
