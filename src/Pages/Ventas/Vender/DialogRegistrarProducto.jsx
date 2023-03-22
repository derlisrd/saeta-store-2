import {Dialog,DialogTitle,DialogActions,DialogContent,Grid, TextField,Button, InputLabel, FormControl, Select, MenuItem, LinearProgress} from '@mui/material'
import { APICALLER } from '../../../Services/api';
import { useVentas } from './VentasProvider';
import { useState } from 'react';
import TextFieldNumber from '../../../Components/UI/TextFieldNumber';
function DialogRegistrarProducto() {

    const {dialogs,llaveDialog,datosFacturas,token_user,insertarProductoTabla} = useVentas()
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState({active:false,code:0,message:''})
    let dep = (datosFacturas.listaDepositos);

    const close = ()=> llaveDialog('registrarProducto',false)

    const enviar = async(e)=>{
        e.preventDefault()
        let form = new FormData(e.target)
        let obj =  Object.fromEntries(form)
        let datas = {
            id_marca_producto:1,
            id_categoria_producto:1,
            id_impuesto_producto:2,
            id_proveedor_producto:1,
            id_unidad_medida_producto:1,
            codigo_producto:obj.codigo_producto,
            nombre_producto:obj.nombre_producto,
            costo_producto:obj.costo_producto,
            precio_producto:obj.precio_producto,
            preciom_producto:obj.precio_producto
        }
        setLoading(true)
        let averigua = await APICALLER.get({table:'productos',where:`codigo_producto,=,'${obj.codigo_producto}'`})
        if(averigua.found>0){
            setError({active:true,code:1,message:'Ese código ya existe'})
            document.getElementById('codigo_producto').focus()
            setLoading(false)
            return false;
        }
        setError({active:false,code:0,message:''})
        let res = await APICALLER.insert({table:'productos',data:datas,token:token_user})
        if(res.response){
           let dep_datas = {
            id_producto_deposito: res.last_id,
            id_deposito_deposito: obj.id_deposito,
            stock_producto_deposito: obj.stock
           }
           let dep = await APICALLER.insert({table:'productos_depositos',data:dep_datas,token:token_user})
           
           if(dep.response){
                let info = {
                    codigo_producto:obj.codigo_producto,
                    nombre_producto:obj.nombre_producto,
                    costo_producto:obj.costo_producto,
                    precio_producto:obj.precio_producto,
                    preciom_producto:obj.precio_producto,
                    stock_producto_deposito: obj.stock,
                    porcentaje_impuesto: 10,
                    porcentaje_comision:0,
                    tipo_producto:1,
                    id_productos_deposito: dep.last_id,
                    id_impuesto:2,
                    id_producto: res.last_id,
                    url_imagen: '',
                    preguntar_precio:"0"
                }
               insertarProductoTabla(info,1)
               close();
           }else{
            console.log(dep);
           }

            
        }
        setLoading(false)
    }

    return ( <Dialog open={dialogs.registrarProducto} fullWidth onClose={close} >
        <form onSubmit={enviar}>
        <DialogTitle>Registrar producto</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    {loading && <LinearProgress />}
                </Grid> 
                <Grid item xs={12} sm={6}>
                    <TextField required fullWidth id='codigo_producto' error={error.code===1} helperText={error.code===1 && error.message} autoFocus name='codigo_producto' label="Código" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required fullWidth autoComplete='off' name="nombre_producto" label="Nombre" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextFieldNumber required fullWidth autoComplete='off' name="costo_producto" label="Costo" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextFieldNumber required fullWidth autoComplete='off' name="precio_producto" label="Precio de venta" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextFieldNumber required fullWidth autoComplete='off' name="stock" label="Cantidad de Stock" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                    <InputLabel id="id_deposito">Depósito</InputLabel>
                    <Select
                        value="1"
                        name="id_deposito"
                        label="Depósito"
                    >
                        {
                            dep.map((e,i)=>(
                                <MenuItem key={i} value={e.id_deposito}>{e.nombre_deposito}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={close}>Cerrar</Button>
            <Button type='submit' variant='contained'>Guardar</Button>
        </DialogActions>
        </form>
    </Dialog> );
}

export default DialogRegistrarProducto;