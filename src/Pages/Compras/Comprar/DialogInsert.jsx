import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Zoom } from '@mui/material'
import {useState} from 'react'
import { useCompras } from '../ComprasProvider'

const DialogInsert = () => {

    const {dialogs,setDialogs,lang,compras,} = useCompras();
    const initialForm = {
      stock:"",
      costo_producto:"",
      precio_producto:"",
      preciom_producto:""
    }
    const [form,setForm] = useState(initialForm)
    const close = ()=>{
        setDialogs({...dialogs,insert:false})
        setForm(initialForm)
    }

    const change = e=>{
      const {value,name} = e.target;
      setForm({ ...form, [name]: value })
    }

    const insertar = (e) => {
      e.preventDefault();
      console.log(form)
    }
    

  return (
    <Dialog onClose={close} open={dialogs.insert} fullWidth TransitionComponent={Zoom} >
      <form onSubmit={insertar}>
      <DialogTitle>
        {lang.insertar_producto_factura}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <Alert icon={false}>
            {compras.insertProducto?.nombre_producto}
          </Alert>
        </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth name="stock" autoFocus autoComplete="off" value={form.stock} onChange={change} label={lang.stock_comprado}  />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth name="costo_producto" autoComplete="off" onChange={change} value={form.costo_producto} label={lang.costo} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth name="precio_producto" helperText={lang.precio_balcon} autoComplete="off" onChange={change} value={form.precio_producto} label={lang.precio} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth name="preciom_producto" helperText={lang.precio_mayorista} autoComplete="off" onChange={change} value={form.preciom_producto} label={lang.precio_con_descuento} />
          </Grid>

        </Grid>
      </DialogContent>
      <DialogActions>
        <Button type='submit' variant="contained">{lang.insertar}</Button>
        <Button onClick={close} variant="contained">{lang.cancelar}</Button>
      </DialogActions>
    </form>
    </Dialog>
  )
}

export default DialogInsert
