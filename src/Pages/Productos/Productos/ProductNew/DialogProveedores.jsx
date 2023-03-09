import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, TextField } from '@mui/material'
import React from 'react'
import { APICALLER } from '../../../../Services/api'
import { useProductForm } from './ProductFormProvider'

const DialogProveedores = () => {

    const {dialogs,setDialogs,listas,setearListas,token_user,formulario,setFormulario} = useProductForm()
    const name = React.useRef(null);
    const ruc = React.useRef(null);
    const [load,setLoad] = React.useState(false)
    
    const cerrar = ()=> setDialogs({...dialogs,proveedores:false});
    const enviar = async()=>{
        setLoad(true)
        let list = {...listas}
        let form = {...formulario}
        let nombre = name.current.value;
        let doc = ruc.current.value;
        if(nombre!=="" && doc !=="" && doc!==null && nombre!==null ){
        let res = await APICALLER.insert({table:'proveedors',data:{nombre_proveedor:nombre,ruc_proveedor:doc,telefono_proveedor:"0"},token:token_user})
        //console.log(res);
        if(res.response){
            let nuevo = {id_proveedor: res.last_id, nombre_proveedor:nombre}
            list.proveedores.push(nuevo);
            form.id_proveedor_producto = res.last_id;
            setearListas(list);
            setFormulario(form);
        }else{ console.log(res)}
        }
        
        cerrar()
        setLoad(false)
    }

  return (
    <Dialog open={dialogs.proveedores} fullWidth onClose={cerrar}>
      <DialogTitle>Nuevo Proveedor</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
            <Grid item xs={12}> {load && <LinearProgress />}</Grid>
            <Grid item xs={12}>
                <TextField required autoFocus autoComplete='off' inputRef={name} fullWidth label="Nombre de proveedor" />
            </Grid>
            <Grid item xs={12}>
                <TextField required autoComplete='off' inputRef={ruc} fullWidth label="Doc de proveedor" />
            </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
          <Button variant="outlined" onClick={enviar}>Guardar</Button>
          <Button variant="outlined" onClick={cerrar}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogProveedores
