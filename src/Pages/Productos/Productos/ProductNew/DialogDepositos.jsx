import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, TextField } from '@mui/material';
import { APICALLER } from '../../../../Services/api';
import { useProductForm } from './ProductFormProvider';
function DialogDepositos() {

    const {dialogs,setDialogs,listas,setearListas,token_user,formulario,setFormulario,lang} = useProductForm()
    const name = React.useRef(null);
    const [load,setLoad] = React.useState(false)
    const cerrar = ()=> setDialogs({...dialogs,depositos:false});

    const enviar = async(e)=>{
        e.preventDefault()
        let list = {...listas}
        let form = {...formulario}
        let nombre = name.current.value;
        if(nombre==='') {return false;}
        setLoad(true)
        if(nombre!==""){
        let res = await APICALLER.insert({table:'depositos',data:{nombre_deposito:nombre},token:token_user})
        if(res.response){
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
      <form onSubmit={enviar}>
      <DialogTitle>{lang.nuevo_deposito}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
            <Grid item xs={12}> {load && <LinearProgress />}</Grid>
            <Grid item xs={12}>
                <TextField required autoFocus autoComplete='off' inputRef={name} fullWidth label={lang.nombre} />
            </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
          <Button onClick={cerrar}>{lang.cerrar}</Button>
          <Button variant="contained" type='submit'>{lang.guardar}</Button>
      </DialogActions>
      </form>
    </Dialog>
  )
}

export default DialogDepositos