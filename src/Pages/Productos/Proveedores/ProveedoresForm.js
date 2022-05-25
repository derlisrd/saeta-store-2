import {Dialog,DialogContent, DialogActions,DialogTitle,TextField,Button,LinearProgress, Grid} from '@mui/material'
import React from 'react'
import { useProveedores } from './ProveedoresProvider'

const ProveedoresForm = () => {
    
    const {openDialog,setOpenDialog,formulario,enviarFormulario,setFormulario,cargando} = useProveedores();

    const cerrar = ()=>{
      setOpenDialog(false)
      setFormulario({nombre_proveedor:"",telefono_proveedor:"",ruc_proveedor:""})
    }
    const onChange = (e)=>{
      const {name,value} = e.target
      setFormulario({...formulario,[name]:value})
    }

  return (
    <Dialog open={openDialog} fullWidth onClose={cerrar}>
      <form onSubmit={enviarFormulario}>
        <DialogTitle>
          Proveedor
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
                  label="Nombre de proveedor"
                  variant="outlined"
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
              label="Documento del proveedor"
              variant="outlined"
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
              label="Teléfono de contacto"
              variant="outlined"
              disabled={cargando}
            />
            </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button disabled={cargando} variant="outlined" onClick={enviarFormulario}  > { formulario.id_proveedor ? `EDITAR` : `AGREGAR`}</Button>
          <Button variant="outlined"  onClick={()=>cerrar()}>CERRAR</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ProveedoresForm
