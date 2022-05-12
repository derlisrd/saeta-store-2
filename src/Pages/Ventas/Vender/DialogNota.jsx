import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'
import React,{useRef} from 'react'
import { useVentas } from './VentasProvider'

const DialogNota = () => {
  const {setDialogs,dialogs,CargarNota} = useVentas();
  const codigoRef = useRef(null);

  const cerrar = ()=>{setDialogs({...dialogs,nota:false}) }

  const enviar = ()=>{
    let val = codigoRef.current.value;

    if(val!==""){
      CargarNota(val);
    }
  }

  return (
    <Dialog open={dialogs.nota} fullWidth maxWidth="sm" onClose={cerrar}>
      <DialogTitle>Ingresar número de nota</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField required inputRef={codigoRef} onKeyPress={e => {e.key === "Enter" && enviar()}} autoFocus fullWidth label="Ingrese nro de nota" />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={enviar}>Ingresar</Button>
        <Button variant='outlined' onClick={cerrar}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogNota
