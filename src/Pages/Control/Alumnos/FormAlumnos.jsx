import { Dialog, DialogContent, DialogTitle,Grid,TextField,DialogActions,Button, Alert } from '@mui/material'
import React from 'react'
import { useAlumnos } from './AlumnosProvider'

const FormAlumnos = () => {
  const {form, setForm,dialogs,setDialogs,mensaje,setMensaje,Guardar,initialForm} = useAlumnos();
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
      <DialogTitle>Formulario de alumno</DialogTitle>
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
          <Grid item xs={12} sm={6}>
              <TextField autoFocus error={mensaje.id==="doc"} label="Documento" fullWidth value={form.doc_alumno}  name="doc_alumno" onChange={onChange}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField type="date" label="Fecha de nacimiento" fullWidth value={form.fecha_nacimiento} name="fecha_nacimiento" onChange={onChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
              <TextField  label="Nombre" error={mensaje.id==="nombre"} fullWidth value={form.nombre_alumno} name="nombre_alumno" onChange={onChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField  label="Apellido" error={mensaje.id==="apellido"} fullWidth value={form.apellido_alumno} name="apellido_alumno" onChange={onChange} />
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

export default FormAlumnos
