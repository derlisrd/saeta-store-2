import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useState,useEffect,useCallback } from 'react'
import { APICALLER } from '../../../Services/api';
import { useCajas } from './CajasProvider';
import CierreResumen from './CierreResumen';
import { useLogin } from "../../../Contexts/LoginProvider";
import swal from 'sweetalert';

const DialogArqueoFinal = () => {

  const {dialogs,setDialogs,setTotalSumaMonedasArqueo,datosCajaCierre,totalSumaMonedasArqueo,funciones,getLista,lang} = useCajas();
  const {userData} = useLogin()
  const {token_user,id_user} = userData;
  const datosIniciales = {
    montoInicial: 0,
    saldoFinal: 0,
    ventasContado: 0,
    cobrosVentasCredito: 0,
    depositos: 0,
    retiros: 0,
    comprasContado: 0,
    pagoComprasCredito: 0,
    otrosIngresos: 0,
    otrosPagos: 0,
    fechaApertura: "",
    montoSinEfectivo: 0,
    montoEfectivo:0,
    nombreCaja: "",
    ventasDescripcion:[],
  };
  const [cargando,setCargando] = useState(true);
  const [datos, setDatos] = useState(datosIniciales);


  const getDatosCaja = useCallback(async () => {
    if (dialogs.arqueoFinal) {
      setCargando(true);
      let ID_CAJA = datosCajaCierre.id_caja;
      let rescate_fecha_apertura = datosCajaCierre.fecha_apertura;

      let promise = await Promise.all([APICALLER.get({
          table: "cajas_movimientos",include:"cajas_registros,cajas",
          on: "id_tipo_registro,id_cajas_registro,id_caja,id_caja_movimiento",
          where:`id_caja_movimiento,=,${ID_CAJA},and,fecha_movimiento,>=,'${rescate_fecha_apertura}'`,
      }),APICALLER.get({table:'cajas_users',include:"users",on:"id_user_caja,id_user",where:`id_caja_caja,=,${ID_CAJA}`,fields:'nombre_user'}),
      APICALLER.get({table:"facturas",include:"facturas_formas_pagos",on:"id_facturas_formas_pago,id_forma_pago_factura",
      where:`id_caja_factura,=,${ID_CAJA},and,fecha_factura,>=,'${rescate_fecha_apertura}',and,tipo_factura,<>,2`})
    ])
        
        let res = promise[0];
        let resuser = promise[1];
        let facturas = promise[2];
        
        if (res.response === "ok") {
          
          let nombre_caja = res.results[0].nombre_caja;
          let monto_inicial = parseFloat(datosCajaCierre.monto_inicial);
          let fechaAper = rescate_fecha_apertura;
          let Depositos = 0;
          let ventas_contado = 0;
          let Descuentos = 0;
          let saldo_final = 0; // parseFloat(ini.results[0].monto_caja);
          let monto_sin_efectivo = 0;
          let Retiros = 0;
          let cobras_ventas_credito = 0;
          let compras_contado = 0;
          let pagos_compras = 0;
          let otros_pagos = 0;
          let otros_ingresos = 0;
          let ventas_descripcion = []; //descripciones de ventas y formas de pago
          let ventasIndex=-1; // foundIndex
          let id_forma; let monto_factura = 0;
          if(facturas.found>0){
            facturas.results.forEach(e=>{
              
              id_forma = e.id_forma_pago_factura;
              monto_factura = parseFloat(e.monto_total_factura);
              ventasIndex = ventas_descripcion.findIndex(item=> item.id === id_forma )
              
               if(ventasIndex===(-1)){ 
                ventas_descripcion.push({id:id_forma,descripcion: e.descripcion_forma_pago,monto:monto_factura})
              }else{
                ventas_descripcion[ventasIndex].monto +=monto_factura; 
              } 
            })
          }
          if (res.found > 0) {
            let array = res.results;

            let tipo;
            let id_tipo;
            let monto;
            let otrosEgresosArray = [8,10,11,12,13,15];
            array.forEach((elem) => {
              tipo = parseInt(elem.tipo_registro);
              id_tipo = parseInt(elem.id_tipo_registro);
              monto = parseFloat(elem.monto_movimiento);
              saldo_final = tipo === 1 ? saldo_final + monto : tipo === 0 ? saldo_final - monto : 0;
              monto_sin_efectivo += parseFloat(elem.monto_sin_efectivo);
              ventas_contado += id_tipo === 1 ? monto : 0;
              cobras_ventas_credito += id_tipo === 2 ? monto : 0;
              Depositos += id_tipo === 4 ? monto : 0;
              Retiros += id_tipo === 5 ? monto : 0;
              compras_contado += id_tipo === 6 ? monto : 0;
              pagos_compras += id_tipo === 7 ? monto : 0;
              Descuentos += id_tipo ===17 ? monto : 0;
              otros_pagos +=
                (otrosEgresosArray.some(e=> e === id_tipo)) && tipo === 0 ? monto : 0;
              otros_ingresos += id_tipo > 9 && tipo === 1 ? monto : 0;
            });
          }
          let saldoFinalFinal = (saldo_final + monto_inicial) - monto_sin_efectivo;
          if(saldoFinalFinal<0) {saldoFinalFinal=0;}
          let obj = {
            montoInicial: monto_inicial,
            saldoFinal: saldoFinalFinal,
            montoSinEfectivo: monto_sin_efectivo,
            depositos: Depositos,
            descuentos:Descuentos,
            ventasContado: ventas_contado,
            cobrosVentasCredito: cobras_ventas_credito,
            retiros: Retiros,
            comprasContado: compras_contado,
            pagoComprasCredito: pagos_compras,
            otrosPagos: otros_pagos,
            otrosIngresos: otros_ingresos,
            fechaApertura: fechaAper,
            nombreCaja: nombre_caja,
            nombre_user: resuser.results[0].nombre_user,
            ventasDescripcion:ventas_descripcion
          };
          setDatos(obj);
      }
      setCargando(false);
    }
  }, [datosCajaCierre, dialogs]);





  const VolverArqueo = () => {
    setDialogs({...dialogs,arqueoFinal:false,arqueo: true})
    setTotalSumaMonedasArqueo(0);
  };

  const PreguntarCierre = () => {
    swal({
      text: `Desea cerrar la caja ${datosCajaCierre.nombre_caja}?`,
      buttons: [lang.cancelar, "Cerrar caja"],
    }).then((e) => {
      if (e) {
        EfectuarCierre();
      }
    });
  };

  const EfectuarCierre = async () => {
    setCargando(true);
    let data = {
      fecha_cierre: funciones.getFechaHorarioString(),
      estado_caja: "close",
      monto_cierre: datos.saldoFinal,
    };

    let datos_cierre = {
      id_caja_movimiento: datosCajaCierre.id_caja,
      id_user_movimiento: id_user,
      id_tipo_registro: "9", // 9 es cierre
      monto_movimiento: datos.saldoFinal,
      fecha_movimiento: funciones.getFechaHorarioString(),
      monto_sin_efectivo: datos.montoSinEfectivo,
      detalles_movimiento: "Cierre de caja fecha " + funciones.getFechaHorarioString()
    };
    let arqueo = {
      id_caja_arqueo: datosCajaCierre.id_caja,
      monto_arqueo: datos.saldoFinal,
      id_user_arqueo:id_user,
      tipo_arqueo:"0",
      fecha_arqueo:funciones.getFechaHorarioString()
    }

    let promise = await Promise.all([APICALLER.update({
      table: "cajas",
      data,
      token: token_user,
      id: datosCajaCierre.id_caja,
    }),APICALLER.insert({
      table: "cajas_movimientos",
      token: token_user,
      data: datos_cierre,
    }),
    APICALLER.insert({table:"cajas_arqueos",token:token_user,data:arqueo}) 
  ])
    let res = promise[0]; let rescierre = promise[1];

    if(rescierre.response === "ok" && res.response === "ok"){
      getLista();
      cerrar()
    }else{  console.log(promise);}
    setCargando(false);
    localStorage.removeItem("facturasStorage")
  };

  useEffect(() => {
    const ca = new AbortController();
    let isActive = true;
    if (isActive) {  getDatosCaja();}
    return () => { isActive = false; ca.abort(); };
  }, [getDatosCaja]);


  const FALTANTE = datos.saldoFinal - totalSumaMonedasArqueo > 0 ? datos.saldoFinal - totalSumaMonedasArqueo : 0;
  const SOBRANTE = totalSumaMonedasArqueo - datos.saldoFinal > 0  ? totalSumaMonedasArqueo - datos.saldoFinal  : 0;
  
const cerrar = ()=> {setDialogs({...dialogs,arqueoFinal:false}); setTotalSumaMonedasArqueo(0); }
return (
  <Dialog fullScreen open={dialogs.arqueoFinal} onClose={cerrar}>
    <DialogTitle>
        Cierre de caja - Resumen
    </DialogTitle>
    <DialogContent dividers>
       
       <CierreResumen
          arqueo={totalSumaMonedasArqueo}
          datos={datos}
          cargando={cargando}
        />
    </DialogContent>
    <DialogActions>
      <Button
        variant="outlined"
        size="large"
        disabled={cargando}
        onClick={VolverArqueo}
      >
        Volver a arqueo
      </Button>
      <Button
        variant="contained"
        size="large"
        disabled={cargando || FALTANTE !== 0 || SOBRANTE !== 0}
        onClick={PreguntarCierre}
        color="primary"
      >
        {lang.confirmar}
      </Button>
      <Button variant="contained" size="large" onClick={cerrar}>
        {lang.cancelar}
      </Button>
    </DialogActions>
  </Dialog>
);
  
}

export default DialogArqueoFinal
