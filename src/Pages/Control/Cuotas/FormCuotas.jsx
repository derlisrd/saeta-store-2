import { Dialog, DialogContent, DialogTitle,Grid,TextField,DialogActions,Button, Alert } from '@mui/material'
import React from 'react'
import { useCuotas } from './CuotasProvider'
import NumberFormatCustom from '../../../Componentes/NumberFormatCustom'
const FormCuotas = () => {
  const {form, setForm,dialogs,setDialogs,mensaje,setMensaje,Guardar,initialForm} = useCuotas();
  const cerrar = ()=> {
    setDialogs({...dialogs,form:false});
    setMensaje({error:false,mensaje:"",id:""});
    setForm(initialForm);
  }
  const onChange = e=>{
    const {value,name} = e.target;
    setForm({...form,[name]:value});
  }
  return (
    <Dialog onClose={cerrar} open={dialogs.form} fullWidth>
      <DialogTitle>Formulario de cuota</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {
              mensaje.error && 
              <Alert severity='error' icon={false} variant="outlined">
                {mensaje.mensaje}
              </Alert>
            }
          </Grid>
          <Grid item xs={12} sm={12}>
              <TextField autoFocus label="Nombre de cuota" error={mensaje.id==="nombre"} fullWidth value={form.nombre_cuota} name="nombre_cuota" onChange={onChange} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField InputProps={{
                inputProps: { min: 0 },
                inputComponent: NumberFormatCustom,
              }}  label="Valor de cuota" error={mensaje.id==="valor"} fullWidth value={form.valor_cuota} name="valor_cuota" onChange={onChange} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={Guardar} >Guardar</Button>
        <Button variant="outlined" color="secondary" onClick={cerrar}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormCuotas
