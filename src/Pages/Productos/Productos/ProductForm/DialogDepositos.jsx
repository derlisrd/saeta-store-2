import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, TextField } from '@mui/material';
import { APICALLER } from '../../../../Api/ApiCaller';
import { useProductForm } from './ProductFormProvider';
function DialogDepositos() {

    const {dialogs,setDialogs,listas,setearListas,token_user,formulario,setFormulario} = useProductForm()
    const name = React.useRef(null);
    const [load,setLoad] = React.useState(false)
    const cerrar = ()=> setDialogs({...dialogs,depositos:false});

    const enviar = async()=>{
        setLoad(true)
        let list = {...listas}
        let form = {...formulario}
        let nombre = name.current.value;
        if(nombre!==""){
        let res = await APICALLER.insert({table:'depositos',data:{nombre_deposito:nombre},token:token_user})
        if(res.response==="ok"){
            let nuevo = {id_deposito: res.last_id, nombre_deposito:nombre}
            list.depositos.push(nuevo);
            form.id_deposito_producto = res.last_id;
            setearListas(list);
            setFormulario(form);
        }
        }
        cerrar()
        setLoad(false)
    }
  return (
    <Dialog open={dialogs.depositos} fullWidth onClose={cerrar}>
      <DialogTitle>Nuevo depósito</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
            <Grid item xs={12}> {load && <LinearProgress />}</Grid>
            <Grid item xs={12}>
                <TextField required autoFocus autoComplete='off' inputRef={name} fullWidth label="Nombre de marca" />
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

export default DialogDepositos