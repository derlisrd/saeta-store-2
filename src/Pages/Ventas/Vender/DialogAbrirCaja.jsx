import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, Button, InputAdornment, Icon} from '@mui/material'
import React,{useState} from 'react'
import NumberFormatCustom from '../../../Componentes/NumberFormatCustom';
import { useVentas } from './VentasProvider'

const DialogAbrirCaja = () => {
  const {dialogs,setDialogs,id_user,} = useVentas();
  //const storage = JSON.parse(localStorage.getItem("dataMonedas"));

  const cerrar = ()=>{ setDialogs({...dialogs,abrirCaja:false})}
  const initialForm = {id_user_caja:id_user,id_moneda_caja:"",nombre_caja:"",monto_inicial:""}
  const [form,setForm] = useState(initialForm)

  const enviar = async()=>{
    
    cerrar();
  }

  const change = e=>{
    const {name,value} = e.target;
    setForm({...form,[name]:value});
  }
  
return (
    <Dialog fullWidth open={dialogs.abrirCaja} >
      <DialogTitle>Abrir caja</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField onChange={change} name="nombre_caja" value={form.nombre_caja} autoFocus fullWidth label="Nombre de caja" />
            </Grid>
            <Grid item xs={12}>
              <TextField onChange={change} name="monto_inicial" value={form.monto_inicial} fullWidth label="Monto inicial en caja"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon style={{ color: "#ffa501" }}>attach_money</Icon>
                  </InputAdornment>
                ),
                inputProps: { min: 0 },
                inputComponent: NumberFormatCustom,
              }}
              />
            </Grid>
            <Grid item xs={12}>

            </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
          <Button variant="outlined" onClick={enviar}>Abrir</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogAbrirCaja;
