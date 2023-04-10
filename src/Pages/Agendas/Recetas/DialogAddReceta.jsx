import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, LinearProgress, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import swal from 'sweetalert'
import { useLogin } from '../../../Contexts/LoginProvider'
import { APICALLER } from '../../../Services/api'
import { useRecetas } from './RecetasProvider'
import SearchCliente from './SearchCliente'

const DialogAddReceta = () => {

  const {dialogs,setDialogs,formCliente,setFormCliente,getData} = useRecetas()
  const {userData} = useLogin()
  const {token_user} = userData
  const [error,setError] = useState({
    active:false,
    message:""
  })
  const [loading,setLoading] = useState(false)
  const initialForm = {
    cliente_id_receta:"",
    lejos_esfe_od:"0",
    lejos_esfe_oi:"0",
    lejos_cili_od:"0",
    lejos_cili_oi:"0",
    lejos_eje_od:"0",
    lejos_eje_oi:"0",

    cerca_esfe_od:"0",
    cerca_esfe_oi:"0",
    cerca_cili_od:"0",
    cerca_cili_oi:"0",
    cerca_eje_od:"0",
    cerca_eje_oi:"0",

    adicion_od:"0",
    adicion_oi:"0",
    obs_receta:""
  }
  const  [form,setForm] = useState(initialForm)
  const change = e=>{
    setForm({...form,[e.target.name]:e.target.value})
  }


  const guardar = async()=>{
    
    let f = {...form}
    f.cliente_id_receta = formCliente.cliente_id_receta
    if(f.cliente_id_receta === ""){
      setError({active:true,message:"Ingrese un cliente"});
      return false;
    }
    setLoading(true)
    let res = await APICALLER.insert({table:'recetas',data:f,token:token_user})
    if(res.response){
      swal({timer:1500, icon:'success', text:'Receta agregada correctamente'})
      close()
      getData()
    }
    else{
      console.log(res);
    }
    setLoading(false)
    setError({active:false,message:""});
  }

  const openRegistrar = ()=>{ setDialogs({...dialogs,registrarCliente:true})}

  const close = ()=>{ setDialogs({...dialogs,add:false}); setForm(initialForm); setFormCliente({...formCliente,active:false}) }

  return (
    <Dialog fullWidth maxWidth="lg" open={dialogs.add} onClose={close}>
      <DialogTitle>Agregar receta</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} >
            {
              error.active && <Alert severity='error'>{error.message}</Alert> 
            }
            {loading && <LinearProgress />}
          </Grid>
          
          <Grid item xs={12} md={8}>
            <SearchCliente  />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button fullWidth variant='contained' onClick={openRegistrar} startIcon={<Icon>add</Icon>} size='large'>Registrar</Button>
          </Grid>
          <Grid item xs={12}>
            { formCliente.active && <Alert icon={false}>Nombre: {formCliente.nombre} | Doc: {formCliente.doc} | Tel: {formCliente.tel}</Alert> }
          </Grid>
          <Grid item xs={12}><Typography variant='button'>OJO DERECHO VISION LEJANA</Typography> </Grid>
          <Grid item xs={12} sm={4}>
            <TextField autoFocus label="Derecho esférico" value={form.lejos_esfe_od} onChange={change} name="lejos_esfe_od" fullWidth type="number" />  
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Derecho cilindrico" value={form.lejos_cili_od} onChange={change} name="lejos_cili_od" fullWidth type="number" />  
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Derecho eje" value={form.lejos_eje_od} onChange={change} name="lejos_eje_od" fullWidth type="number" />  
          </Grid>
          <Grid item xs={12}><Typography variant='button'>OJO IZQUIERDO VISION LEJANA</Typography> </Grid>
          <Grid item xs={12} sm={4}>
            <TextField  label="Izquierdo esférico" value={form.lejos_esfe_oi} onChange={change} name="lejos_esfe_oi" fullWidth type="number" />  
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Izquierdo cilindrico" value={form.lejos_cili_oi} onChange={change} name="lejos_cili_oi" fullWidth type="number" />  
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Izquierdo eje" value={form.lejos_eje_oi} onChange={change} name="lejos_eje_oi" fullWidth type="number" />  
          </Grid>

          <Grid item xs={12}><Typography variant='button'>OJO DERECHO VISION CERCANA</Typography> </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Derecho esférico" value={form.cerca_esfe_od} onChange={change} name="cerca_esfe_od" fullWidth type="number" />  
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Derecho cilindrico" value={form.cerca_cili_od} onChange={change} name="cerca_cili_od" fullWidth type="number" />  
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Derecho eje" value={form.cerca_eje_od} onChange={change} name="cerca_eje_od" fullWidth type="number" />  
          </Grid>
          <Grid item xs={12}><Typography variant='button'>OJO IZQUIERDO VISION CERCANA</Typography> </Grid>
          <Grid item xs={12} sm={4}>
            <TextField  label="Izquierdo esférico" value={form.cerca_esfe_oi} onChange={change} name="cerca_esfe_oi" fullWidth type="number" />  
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Izquierdo cilindrico" value={form.cerca_cili_oi} onChange={change} name="cerca_cili_oi" fullWidth type="number" />  
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Izquierdo eje" value={form.cerca_eje_oi} onChange={change} name="cerca_eje_oi" fullWidth type="number" />  
          </Grid>

          

          <Grid item xs={12}><Typography variant='button'>Adición</Typography> </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Derecho" value={form.adicion_od} onChange={change} name="adicion_od" fullWidth type="number" />  
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Izquierdo" value={form.adicion_oi} onChange={change} name="adicion_oi" fullWidth type="number" />  
          </Grid>
          <Grid item xs={12}>
            <TextField label="Observaciones" value={form.obs_receta} onChange={change} name="obs_receta" fullWidth />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={guardar}>Registrar</Button>
        <Button variant='outlined' onClick={close}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogAddReceta
