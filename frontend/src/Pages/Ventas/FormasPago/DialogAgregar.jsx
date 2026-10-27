import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, TextField, Zoom } from "@mui/material"
import { useState } from "react"
import { useLang } from "../../../Contexts/LangProvider"
import { useLogin } from "../../../Contexts/LoginProvider"
import { APICALLER } from "../../../Services/api"
import { useFormasPago } from "./FormasPagoProvider"

function DialogAgregar (){
    const {lang} = useLang()
    const {userData} = useLogin()
    const {token_user} = userData
    const {dialogs,setDialogs,getLista} = useFormasPago()
    const [loading,setLoading] = useState(false)
    const initialForm = {
        descripcion_forma_pago:"",
        porcentaje_descuento_pago:""
    }
    const [form,setForm] = useState(initialForm)
    const close = ()=>{ setDialogs({...dialogs,agregar:false})}
    const change = e=>{
        const {value,name} = e.target
        setForm({...form, [name]:value})
    }
    const enviar = async()=>{
        setLoading(true)
        
        let res = await APICALLER.insert({table:"facturas_formas_pagos",token:token_user,data:form})
        if(res.response){
            getLista()
            setForm(initialForm)
            close();
        }
        setLoading(false)
    }



    return(
        <Dialog fullWidth onClose={close} open={dialogs.agregar} TransitionComponent={Zoom}>
            <DialogTitle>
                {lang.agregar}
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
                        <TextField onChange={change} name="porcentaje_descuento_pago" value={form.porcentaje_descuento_pago} helperText={lang.porcentaje_descuento} disabled={loading} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={enviar} >{lang.agregar}</Button>
                <Button variant="contained" onClick={close} >{lang.cerrar}</Button>
            </DialogActions>
        </Dialog>
    )
}
export default DialogAgregar