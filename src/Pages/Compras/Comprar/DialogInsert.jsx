import {  Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, LinearProgress, MenuItem, Select, TextField, Zoom } from '@mui/material'
import {useRef, useState} from 'react'
import NumberFormatCustom from '../../../Components/thirty/NumberFormatCustom';
import { APICALLER } from '../../../Services/api';
import { useCompras } from '../ComprasProvider'
import DialogInsertErrores from './DialogInsertErrores';
import DialogInsertInfoProducto from './DialogInsertInfoProducto';

const DialogInsert = () => {

    const {dialogs,setDialogs,lang,compras,setearCompras,inputCodigo} = useCompras();
    const [isLoading,setIsLoading] = useState(false)
    const inputStock = useRef(null)
    const initialErrores ={
      active:false,
      msj:"",
      id_error:null
    }
    const [errores,setErrores] = useState(initialErrores)
    const initialForm = {
      id_producto_compra:"",
      id_productos_deposito: "",
      precio_compra: "",
      precio_venta: "",
      preciom_venta:"",
      cantidad_compra:"",
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
      f.id_producto_compra = d.id_producto_compra;
      f.precio_compra = d.precio_compra;
      f.precio_venta = d.precio_venta;
      f.preciom_venta = d.preciom_venta;
      setForm(f);
      inputStock.current.focus()
    }


    const insertar = async (e) => {
      e.preventDefault();
      let f = {...form}
      let fo = {...compras.insertProducto}
      if(f.cantidad_compra===""){
        setErrores({active:true,msj:"Inserte la cantidad de stock",id_error:1})
        return false;
      }
      if(f.precio_compra===""){
        setErrores({active:true,msj:"Inserte costo",id_error:2})
        return false;
      }
      if(f.precio_venta===""){
        setErrores({active:true,msj:"Inserte precio",id_error:3})
        return false;
      }
      if(f.preciom_venta===""){
        setErrores({active:true,msj:"Inserte precio mayorista",id_error:4})
        return false;
      }
      if(f.id_compras_deposito===""){
        setErrores({active:true,msj:"Inserte el deposito",id_error:5})
        return false;
      }

      setErrores({active:false,msj:null,id_error:null})
      setIsLoading(true)

      let res = await APICALLER.get({
        table:'productos_depositos',
        where:`id_producto_deposito,=,${fo.id_producto_compra},and,id_deposito_deposito,=,${f.id_compras_deposito}`
      })
      let stock_producto_deposito, id_productos_deposito;

      if(res.response){
        stock_producto_deposito = parseFloat(f.cantidad_compra) + parseFloat(res.first.stock_producto_deposito ?? 0)
        id_productos_deposito = res.first.id_productos_deposito ?? null
      }

      let datosnuevos = {...compras}
      let itemnuevo = {...f,
        stock_producto_deposito,
        id_productos_deposito,
        cantidad_compra: parseFloat(f.cantidad_compra), 
        codigo_producto:compras.insertProducto?.codigo_producto, 
        nombre_producto:compras.insertProducto?.nombre_producto,
        id_producto_compra:compras.insertProducto?.id_producto_compra, 
      }
      setIsLoading(false)
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
          {isLoading && <LinearProgress />}
        </Grid>  
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
            fullWidth name="cantidad_compra" autoFocus autoComplete="off" value={form.cantidad_compra} onChange={change} label={lang.stock_comprado}  
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
            fullWidth name="precio_compra" autoComplete="off" onChange={change} value={form.precio_compra} label={lang.costo} 
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
             fullWidth name="precio_venta" helperText={lang.precio_balcon} autoComplete="off" onChange={change} value={form.precio_venta} label={lang.precio} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
            error={errores.id_error===4} required
            InputProps={{
              inputComponent: NumberFormatCustom,
              inputProps: { min: 0 },
            }} 
            fullWidth name="preciom_venta" helperText={lang.precio_mayorista} autoComplete="off" onChange={change} value={form.preciom_venta} label={lang.precio_con_descuento} />
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
