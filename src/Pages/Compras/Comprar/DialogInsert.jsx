import {  Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Zoom } from '@mui/material'
import {useRef, useState} from 'react'
import NumberFormatCustom from '../../../Components/thirty/NumberFormatCustom';
import { useCompras } from '../ComprasProvider'
import DialogInsertErrores from './DialogInsertErrores';
import DialogInsertInfoProducto from './DialogInsertInfoProducto';

const DialogInsert = () => {

    const {dialogs,setDialogs,lang,compras,setearCompras,inputCodigo} = useCompras();
    const inputStock = useRef(null)
    const initialErrores ={
      active:false,
      msj:"",
      id_error:null
    }
    const [errores,setErrores] = useState(initialErrores)
    const initialForm = {
      stock:"",
      costo_producto:"",
      precio_producto:"",
      preciom_producto:"",
      id_compras_deposito:""
    }
    const [form,setForm] = useState(initialForm)
    const close = ()=>{
        setDialogs({...dialogs,insert:false})
        setForm(initialForm)
        inputCodigo.current.value = ""
        inputCodigo.current.focus()
    }

    const change = e=>{
      const {value,name} = e.target;
      setForm({ ...form, [name]: value })
    }


    const valAnteriores = ()=>{
      let f = {...form}, c = {...compras};
      let d = c.insertProducto;
      f.costo_producto = d.costo_producto;
      f.precio_producto = d.precio_producto;
      f.preciom_producto = d.preciom_producto;
      setForm(f);
      inputStock.current.focus()
    }


    const insertar = (e) => {
      e.preventDefault();
      let f = {...form}
      if(f.stock===""){
        setErrores({active:true,msj:"Inserte la cantidad de stock",id_error:1})
        return false;
      }
      if(f.costo_producto===""){
        setErrores({active:true,msj:"Inserte costo",id_error:2})
        return false;
      }
      if(f.precio_producto===""){
        setErrores({active:true,msj:"Inserte precio",id_error:3})
        return false;
      }
      if(f.preciom_producto===""){
        setErrores({active:true,msj:"Inserte precio mayorista",id_error:4})
        return false;
      }
      if(f.preciom_producto===""){
        setErrores({active:true,msj:"Inserte precio mayorista",id_error:4})
        return false;
      }

      setErrores({active:false,msj:null,id_error:null})

      let datosnuevos = {...compras}
      let itemnuevo = {...f, codigo_producto:compras.insertProducto?.codigo_producto, nombre_producto:compras.insertProducto?.nombre_producto,id_producto:compras.insertProducto?.id_producto, }
      datosnuevos.items.push(itemnuevo)
      setearCompras(datosnuevos)
      close()
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
          <DialogInsertErrores errores={errores} />
        </Grid>
        <Grid item xs={12}>
          <DialogInsertInfoProducto />
        </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={errores.id_error===1} required inputRef={inputStock}
            InputProps={{
              inputComponent: NumberFormatCustom,
              inputProps: { min: 0 },
            }} 
            fullWidth name="stock" autoFocus autoComplete="off" value={form.stock} onChange={change} label={lang.stock_comprado}  
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
            fullWidth name="costo_producto" autoComplete="off" onChange={change} value={form.costo_producto} label={lang.costo} 
            error={errores.id_error===2} required
            InputProps={{
              inputComponent: NumberFormatCustom,
              inputProps: { min: 0 },
            }} 
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
            error={errores.id_error===3} required
            InputProps={{
              inputComponent: NumberFormatCustom,
              inputProps: { min: 0 },
            }} 
             fullWidth name="precio_producto" helperText={lang.precio_balcon} autoComplete="off" onChange={change} value={form.precio_producto} label={lang.precio} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
            error={errores.id_error===4} required
            InputProps={{
              inputComponent: NumberFormatCustom,
              inputProps: { min: 0 },
            }} 
            fullWidth name="preciom_producto" helperText={lang.precio_mayorista} autoComplete="off" onChange={change} value={form.preciom_producto} label={lang.precio_con_descuento} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                  <InputLabel >
                    {lang.seleccione_deposito}
                  </InputLabel>
                  <Select
                    name="id_compras_deposito"
                    onChange={change}
                    fullWidth
                    value={form.id_compras_deposito}
                  >
                    <MenuItem value="" selected disabled>
                      {lang.seleccione_deposito}
                    </MenuItem>
                    {compras.depositos.map((e, i) => (
                      <MenuItem value={e.id_deposito} key={i}>
                        {e.nombre_deposito}
                      </MenuItem>
                    ))}
                    
                  </Select>
                </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={valAnteriores} variant="outlined">{lang.val_anteriores}</Button>
        <Button type='submit' variant="contained">{lang.insertar}</Button>
        <Button onClick={close} variant="contained">{lang.cancelar}</Button>
      </DialogActions>
    </form>
    </Dialog>
  )
}

export default DialogInsert
