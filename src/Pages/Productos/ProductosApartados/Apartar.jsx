import {Dialog,DialogActions,DialogContent,DialogTitle,Button,Grid,Alert,TextField,LinearProgress} from '@mui/material'
import { useState,useEffect } from 'react'
import swal from 'sweetalert'
import NumberFormatCustom from '../../../Components/thirty/NumberFormatCustom'
import { funciones } from '../../../Functions'
import { APICALLER } from '../../../Services/api'
import BuscarCliente from './BuscarCliente'
import BuscarProducto from './BuscarProducto'
import { useProductosApartados } from './ProductosApartadosProvider'
import SelecDeposito from './SelectDeposito'

const Apartar = () => {

    const {dialogs,llaveDialog,id_user,token_user,getLista,formSelect} = useProductosApartados()
    const fecha = funciones.getFechaHorarioString()
    const initialError = {active:false,message:'',code:0}
    const [error,setError] = useState(initialError)
    const [loading,setLoading] = useState(false)
    const initialForm = {
        id_producto_apartado:'',
        nombre_producto:'',
        codigo_producto:'',
        id_deposito_apartado:'',
        id_cliente_apartado:'',
        nombre_cliente:'',
        ruc_cliente:'',
        id_user_apartado:'',
        cantidad_apartado:''
    }
    const [form,setForm] = useState(initialForm)

    const change = e=>{
        const { value,name} = e.target
        setForm({...form,[name]:value})
    }

    const verificar = async(e)=>{
        e.preventDefault()
        let f = {...form}
        if(f.id_cliente_apartado===''){
            setError({active:true,message:'Seleccione cliente',code:1})
            return false
        }
        if(f.id_deposito_apartado===''){
            setError({active:true,message:'Seleccione deposito',code:2})
            return false
        }
        if(f.id_producto_apartado===''){
            setError({active:true,message:'Seleccione producto',code:3})
            return false
        }
        
        if(f.cantidad_apartado===''){
            setError({active:true,message:'Indique cantidad',code:4})
            document.getElementById('cantidad_apartado').focus()
            return false
        }
        
        setError({active:false,message:'',code:0})
        setLoading(true)
        let res = await APICALLER.get({table:'productos_depositos',where:`id_deposito_deposito,=,${f.id_deposito_apartado},and,id_producto_deposito,=,${f.id_producto_apartado}`})

        if(res.response){
            if(res.found>0){
                let cantidad_pedida = parseFloat(res.first.stock_producto_deposito) - parseFloat(f.cantidad_apartado)
                
                if(cantidad_pedida<0){
                    setError({active:true,message:`No hay suficiente stock. Stock actual: ${res.first.stock_producto_deposito}`,code:4})
                    setLoading(false)
                    return false;
                }
                
                let update_form = { 
                    stock_producto_deposito: cantidad_pedida,
                 }
                 delete f.codigo_producto; delete f.nombre_producto; delete f.nombre_producto; delete f.nombre_cliente; delete f.ruc_cliente;
                let insert_form = {
                    ...f,
                    id_deposito_producto_apartado: res.first.id_productos_deposito,
                    id_user_apartado:id_user,
                    fecha_apartado:fecha
                 }
                await Promise.all([
                    APICALLER.update({table:'productos_depositos',data:update_form,id:res.first.id_productos_deposito,token:token_user}),
                    APICALLER.insert({table:'productos_apartados',data:insert_form,token:token_user})
                ])
                swal({title:'Listo', text:'Producto apartado con éxito',timer:1500})

            }else{
                setLoading(false)
                setError({active:true,message:'Producto no disponible en ese depósito',code:2})
                return false
            }
            
        }else{console.log(res);}

        setLoading(false)
        close() 
        getLista()

    }

    const close = ()=> { llaveDialog('apartar',false); setForm(initialForm); setLoading(false); setError(initialError) }
    useEffect(()=>{
        setForm(formSelect)
    },[formSelect])
  return (
    <Dialog open={dialogs.apartar} onClose={close} fullWidth >
        <form onSubmit={verificar}>
        <DialogTitle>
            Apartar
        </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
                {loading && <LinearProgress />} 
                {error.active && <Alert severity='error'>{error.message}</Alert>}
            </Grid>
            <Grid item xs={12}>
                {form.id_cliente_apartado !=='' && 
                <Alert icon={false}>
                    {form.nombre_cliente} {form.ruc_cliente}
                </Alert>
                }
            </Grid>
            <Grid item xs={12} sm={8}>
                <BuscarCliente error={error} setForm={setForm} form={form} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <Button onClick={()=>{llaveDialog('registrarCliente',true);}} variant='outlined'>Registrar</Button>
            </Grid>
            <Grid item xs={12}>
                <SelecDeposito error={error} onChange={change} form={form} />
            </Grid>
            <Grid item xs={12} sm={8}>
                <BuscarProducto error={error} setForm={setForm} form={form} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField label="Cantidad a apartar" 
                    name='cantidad_apartado'
                    id="cantidad_apartado"
                    autoComplete='off'
                    error={error.code===4}
                    value={form.cantidad_apartado}
                    onChange={change}
                InputProps={{
                    inputProps: { min: 0 },
                    inputComponent: NumberFormatCustom,
                }}
            /> 
            </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cerrar</Button>
        <Button type='submit' variant='contained' >Apartar</Button>
      </DialogActions>
      </form>
    </Dialog>
  )
}

export default Apartar
