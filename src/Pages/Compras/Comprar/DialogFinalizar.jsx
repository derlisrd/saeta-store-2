import { Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton, Tooltip, Zoom,Grid, Typography, TextField } from '@mui/material'

import React, { Fragment, useState } from 'react'
import { AlertError } from '../../../Components/MuiCustom/AlertsCustom';
import ButtonCustom from '../../../Components/MuiCustom/ButtonCustom';
import { DatePickerCustom } from '../../../Components/MuiCustom/DatePickerCustom';
import { useCompras } from '../ComprasProvider';
import Comprobantes from './Comprobantes';
import ListaCajas from './ListaCajas';

const DialogFinalizar = () => {


    const {dialogs,setDialogs,lang,funciones} = useCompras();

    const initialForm = {
      tipo_factura_compra:"",
      comprobante_nro:"",
      id_cajas_moneda:"",
      fecha_pago:funciones.fechaActualYMD(),
    }
    const initialError = {
      active: false,
      id_error: null,
      msj:""
    }
    const [error,setError] = useState(initialError);
    const [form,setForm] = useState(initialForm)

    const change = e=>{ 
      const {value,name} = e.target
     setForm({...form,[name]:value})
    }

    const enviar = ()=>{
      setError({
        active:true,
        msj:"ERROR",
        id_error:1
      })
    }

    const close = ()=>{
        setDialogs({...dialogs,finalizar:false})
    }

  return (
    <Dialog onClose={close} open={dialogs.finalizar} fullScreen>
      <DialogTitle>
        <Tooltip
          title={<h2>{lang.volver_atras}</h2>}
          TransitionComponent={Zoom}
          arrow
          placement="right-start"
        >
          <IconButton onClick={close} color="primary">
            <Icon>arrow_back_ios_new</Icon>
          </IconButton>
        </Tooltip>
        {lang.finalizar_compras}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {error.active && <AlertError>{error.msj}</AlertError>}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="button">{lang.datos_comprobante}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Comprobantes form={form} setForm={setForm} error={error} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <TextField
              name="comprobante_nro"
              value={form.comprobante_nro}
              onChange={change}
              label={lang.nro_comprobante}
              fullWidth
            />
          </Grid>

          {parseInt(form.tipo_factura_compra) > 1 && (
            <Fragment>
              <Grid item xs={12}>
                <Typography variant="button">{lang.fecha_pago}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <DatePickerCustom
                  value={form.fecha_pago}
                  label={lang.fecha_pago}
                  onChange={(d) => {
                    setForm({ ...form, fecha_pago: d });
                  }}
                  name="fecha_pago"
                />
              </Grid>
            </Fragment>
          )}
          {
            parseInt(form.tipo_factura_compra)<2 && (
              <>
              <Grid item xs={12}>
                <Typography variant="button">{lang.caja}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <ListaCajas form={form} setForm={setForm} error={error} />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={3}></Grid>
              </>
            )
          }

          
        </Grid>
      </DialogContent>
      <DialogActions>
        <ButtonCustom
          variant="contained"
          color="success"
          onClick={enviar}
          fullWidth
        >
          {lang.finalizar}{" "}
        </ButtonCustom>
        <ButtonCustom variant="outlined" onClick={close} fullWidth>
          {lang.cancelar}{" "}
        </ButtonCustom>
      </DialogActions>
    </Dialog>
  );
}

export default DialogFinalizar
