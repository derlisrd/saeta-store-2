import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, LinearProgress, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import NumberFormatCustom from '../../../Components/thirty/NumberFormatCustom';
import { useTransferencias } from './TransferenciasProvider'

const DialogTransferir = () => {

    
    
    const {dialogs,setDialogs,listaDepositos,formulario,idDeposito,setIdDeposito,transferir,error,setCant,cant,idDepositoSelect,cargas} = useTransferencias();
    const close = ()=>{
        setDialogs({...dialogs,transferir:false})
        setCant(0);
        setIdDeposito("");
    }

    const listafiltered = listaDepositos.filter(e=> e.id_deposito !== idDepositoSelect );
    

  return (
    <Dialog open={dialogs.transferir} onClose={close} fullWidth>
        <DialogTitle>Transferir {formulario.nombre_producto}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          {cargas.transferencia && <LinearProgress />}
        </Grid>
        <Grid item xs={12}>
          {error.active && <Alert icon={false} severity='error'>{error.msj}</Alert>}
        </Grid>
            <Grid item xs={12}>
                <TextField InputProps={{inputComponent: NumberFormatCustom}} autoFocus onChange={(e)=>{setCant(e.target.value)}} value={cant} label="Cantidad" fullWidth />
            </Grid>
            <Grid item xs={12}>
            <FormControl fullWidth>
            <InputLabel variant="outlined">Depósito</InputLabel>
              <Select
                required error={error.id==='deposito'}
                name="id_deposito"
                value={idDeposito}
                onChange={(e)=>{setIdDeposito(e.target.value)}}
                variant="outlined"
              >
                <MenuItem disabled value=''>Seleccione depósito</MenuItem>
                {listafiltered.map((d) => (
                  <MenuItem key={d.id_deposito} value={d.id_deposito}>
                    {d.nombre_deposito}
                  </MenuItem>
                ))}
          </Select>      
        </FormControl>
            </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
          <Button variant='outlined' onClick={transferir}>Tranferir</Button>
          <Button variant='outlined' onClick={close}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogTransferir
