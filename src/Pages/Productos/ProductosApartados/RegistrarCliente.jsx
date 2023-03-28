import {Dialog,DialogActions,DialogContent,DialogTitle,Grid,TextField,Button,LinearProgress,Alert} from '@mui/material'
import { useState } from 'react';
import { APICALLER } from '../../../Services/api';
import { useProductosApartados } from './ProductosApartadosProvider';



function RegistrarCliente() {

    const {dialogs,llaveDialog,setFormSelect,token_user} = useProductosApartados()
    const [loading,setLoading] = useState(false)
    const initialError = {active:false,message:'',code:0}
    const [error,setError] = useState(initialError)

    const verificar = async(e)=>{
        e.preventDefault()
        let form = new FormData(e.target)
        let datas =  Object.fromEntries(form)        
        setLoading(true)

        let res = await APICALLER.get({table:'clientes',where:`ruc_cliente,=,'${datas.ruc_cliente}'`})

        if(res.found>0){
            setError({active:true,message:'Ese cliente ya está registrado con ese doc.',code:1})
            setLoading(false)
            document.getElementById('ruc_cliente').focus()
            return false;
        }

        let resp = await APICALLER.insert({table:'clientes',data:datas,token:token_user})

        if(resp.response){
            
            setFormSelect((pre)=>{ 
                return  {...pre,
                    id_cliente_apartado:resp.last_id,
                    nombre_cliente:datas.nombre_cliente,
                    ruc_cliente:datas.ruc_cliente} 
                }
            )
        }
        setLoading(false)
        close()
    }


    const close = ()=>{ llaveDialog('registrarCliente',false)}

    return ( <Dialog fullWidth open={dialogs.registrarCliente} onClose={close} >
        <form onSubmit={verificar}>
        <DialogTitle>
            Registrar Cliente
        </DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                    {error.active && <Alert severity='error'>{error.message}</Alert>}
                </Grid>
                <Grid item xs={12}>
                    <TextField error={error.code===1} name="ruc_cliente" fullWidth label="Doc." required autoFocus autoComplete='off' id="ruc_cliente" />
                </Grid>
                <Grid item xs={12}>
                    <TextField name="nombre_cliente" fullWidth label="Nombre completo" required autoComplete='off' />
                </Grid>
                <Grid item xs={12}>
                    <TextField name="telefono_cliente" fullWidth label="Telefono de contacto" />
                </Grid>
                <Grid item xs={12}>
                    <TextField name="direccion_cliente" fullWidth label="Dirección" />
                </Grid>
                <Grid item xs={12}>
                    <TextField name="email_cliente" fullWidth label="E-mail" />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={close}>Cerrar</Button>
            <Button variant='contained' type='submit'>Registrar</Button>
        </DialogActions>
        </form>
    </Dialog> );
}

export default RegistrarCliente;