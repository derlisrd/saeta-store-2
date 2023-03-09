import {Dialog,DialogContent, DialogActions,DialogTitle,TextField,Button,LinearProgress,Zoom, Grid} from '@mui/material'
import React from 'react'
import { useProveedores } from './ProveedoresProvider'

const ProveedoresForm = () => {
    
    const {openDialog,setOpenDialog,formulario,enviarFormulario,setFormulario,cargando, lang} = useProveedores();

    const cerrar = ()=>{
      setOpenDialog(false)
      setFormulario({nombre_proveedor:"",telefono_proveedor:"",ruc_proveedor:""})
    }
    const onChange = (e)=>{
      const {name,value} = e.target
      setFormulario({...formulario,[name]:value})
    }

  return (
    <Dialog open={openDialog} fullWidth TransitionComponent={Zoom}  onClose={cerrar}>
      <form onSubmit={enviarFormulario}>
        <DialogTitle>
          {lang.proveedor}
        </DialogTitle>
        <DialogContent dividers>
        
            <Grid container spacing={2}>
                <Grid item xs={12}>
                {cargando && <LinearProgress  />}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                  autoFocus
                  name="nombre_proveedor"
                  value={formulario.nombre_proveedor}
                  onChange={onChange}
                  fullWidth
                  label={lang.nombre}
                  required
                  disabled={cargando}
                />
                </Grid>
            
            <Grid item xs={12}>
              
            <TextField
              name="ruc_proveedor"
              value={formulario.ruc_proveedor}
              onChange={onChange}
              fullWidth
              label={lang.documento}
              required
              disabled={cargando}
              />
              </Grid>
            <Grid item xs={12}>
            <TextField
              name="telefono_proveedor"
              value={formulario.telefono_proveedor}
              onChange={onChange}
              fullWidth
              label={lang.telefono}
              disabled={cargando}
            />
            </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button disabled={cargando} variant="contained" type="submit"  > {lang.guardar}</Button>
          <Button variant="contained"  onClick={()=>cerrar()}>{lang.cerrar}</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ProveedoresForm
