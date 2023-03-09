import { Alert, Button, Dialog,DialogActions,DialogContent,DialogTitle, Grid, LinearProgress, TextField } from '@mui/material'
import React from 'react'
import { useCajas } from './CajasProvider'
import { useEffect,useState } from 'react';

const DialogEditar = () => {

  const {dialogs,setDialogs,formEdit,errors,setErrors,editarCaja,cargas,lang} = useCajas();

  const [form,setForm] = useState({})

  const onChange = e=>{
    const {value,name} = e.target
    setForm({...form,[name]:value})
  }

  const verificar = ()=>{
    if(form.nombre_caja===""){
      setErrors({...errors,editar:true,editarMensaje:lang.complete_nombre})
      return false;
    }
    editarCaja(form);
    setErrors({...errors,editar:false,editarMensaje:""})
  }

  const cerrar = ()=>{ setDialogs({...dialogs,editar:false}); setErrors({...errors,editar:false,editarMensaje:""})}

  useEffect(() => {
    setForm(formEdit)
  }, [formEdit])

  return (
    <Dialog fullWidth open={dialogs.editar} onClose={cerrar} >
      <DialogTitle>{lang.editar_nombre}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          {
              errors.editar && <Alert icon={false} severity="error">{errors.editarMensaje}</Alert>
            }
            {
              cargas.editar && <LinearProgress />
            }
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus autoComplete='off'
              fullWidth
              disabled={cargas.editar} 
              name="nombre_caja"
              value={form.nombre_caja}
              onChange={onChange}
              label={lang.nombre_caja}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" disabled={cargas.editar} onClick={verificar}>{lang.editar}</Button>
        <Button variant="contained" onClick={cerrar}>{lang.cancelar}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogEditar
