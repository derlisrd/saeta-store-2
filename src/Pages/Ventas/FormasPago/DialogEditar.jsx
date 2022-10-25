import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, TextField, Zoom } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useLang } from '../../../Contexts/LangProvider';
import { useLogin } from '../../../Contexts/LoginProvider';
import { APICALLER } from '../../../Services/api';
import { useFormasPago } from './FormasPagoProvider';

function DialogEditar() {

    const {lang} = useLang()
    const {userData} = useLogin()
    const {token_user} = userData;
    const {dialogs,setDialogs,formEdit,getLista} = useFormasPago()
    const [loading,setLoading] = useState(false)
    const [form,setForm] = useState({
        id_facturas_formas_pago:"",
        descripcion_forma_pago:"",
        porcentaje_descuento_pago:"",
    })
    const change = e=>{
        setForm({...form,[e.target.name]: e.target.value})
    }
    const close = ()=>{
        setDialogs({...dialogs,editar:false})
    }
    const enviar = async ()=>{
        setLoading(true)
        let f = {...form}

        let res = await APICALLER.update({table:"facturas_formas_pagos",token:token_user,id:f.id_facturas_formas_pago,
        data:{
            descripcion_forma_pago: f.descripcion_forma_pago,
            porcentaje_descuento_pago: f.porcentaje_descuento_pago
        }})
        if(res.response){
            swal({text:lang.actualizado_correctamente,icon:"success"})
        }
        getLista()
        setLoading(false)
        close()

    }

    const getDatas = useCallback(async()=>{
        if(dialogs.editar){
            let f = {...formEdit}
            setForm(f)
        }
    },[dialogs,formEdit])

    useEffect(()=>{
        const ca = new AbortController()
        let isActive = true;
        if(isActive) getDatas();
        return ()=>{isActive = false; ca.abort();}
    },[getDatas])

    return(
        <Dialog fullWidth onClose={close} open={dialogs.editar} TransitionComponent={Zoom}>
            <DialogTitle>
                {lang.editar}
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {loading && <LinearProgress /> }
                    </Grid>
                    <Grid item xs={12}>
                        <TextField autoFocus fullWidth onChange={change} name="descripcion_forma_pago" value={form.descripcion_forma_pago} label={lang.descripcion} disabled={loading} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField  onChange={change} name="porcentaje_descuento_pago" value={form.porcentaje_descuento_pago} helperText={lang.porcentaje_descuento} disabled={loading} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={enviar} >{lang.editar}</Button>
                <Button variant="contained" onClick={close} >{lang.cerrar}</Button>
            </DialogActions>
        </Dialog>
    )
}
export default DialogEditar