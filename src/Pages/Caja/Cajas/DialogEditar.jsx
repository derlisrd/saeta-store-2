import { Alert, Button, Dialog,DialogActions,DialogContent,DialogTitle, Grid, LinearProgress, TextField } from '@mui/material'
import React from 'react'
import { useCajas } from './CajasProvider'

const DialogEditar = () => {

  const {dialogs,setDialogs,setFormEdit,formEdit,errors,setErrors,editarCaja,cargas} = useCajas();

  const onChange = e=>{
    const {value,name} = e.target
    setFormEdit({...formEdit,[name]:value})
  }

  const verificar = ()=>{
    if(formEdit.nombre_caja===""){
      setErrors({...errors,editar:true,editarMensaje:"Complete el nombre por favor"})
      return false;
    }
    editarCaja();
    setErrors({...errors,editar:false,editarMensaje:""})
  }

  const cerrar = ()=>{ setDialogs({...dialogs,editar:false}); setErrors({...errors,editar:false,editarMensaje:""})}
  return (
    <Dialog fullWidth open={dialogs.editar} onClose={cerrar} >
      <DialogTitle>Editar nombre</DialogTitle>
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
              autoFocus
              fullWidth
              disabled={cargas.editar} 
              name="nombre_caja"
              value={formEdit.nombre_caja}
              onChange={onChange}
              label="Nombre de caja"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" disabled={cargas.editar} onClick={verificar}>Editar</Button>
        <Button variant="outlined" onClick={cerrar}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogEditar
