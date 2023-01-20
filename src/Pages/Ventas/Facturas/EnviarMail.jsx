import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Zoom } from '@mui/material'
import { useFacturas } from './FacturasProvider'

const EnviarMail = () => {

    const {dialogs,setDialogs} = useFacturas()

    const cerrar = ()=>{
        setDialogs({...dialogs,mail:false})
    }

  return (
    <Dialog open={dialogs.mail} fullWidth onClose={cerrar} TransitionComponent={Zoom} >
        <DialogTitle>Enviar Factura por E-mail</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField size='large' autoFocus label="Nombre" fullWidth />
            </Grid>
            <Grid item xs={12}>
                <TextField size='large' label="Email" type="email" fullWidth />
            </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' size='large'>Enviar</Button>
        <Button variant='outlined' onClick={cerrar} size='large'>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EnviarMail
