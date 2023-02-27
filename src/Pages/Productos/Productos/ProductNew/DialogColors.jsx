import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, TextField } from '@mui/material'
import { useProductForm } from './ProductFormProvider'
import React from 'react';
import { APICALLER } from '../../../../Services/api';

const DialogColors = () => {
    const {dialogs,setDialogs,listas,setearListas,token_user,formulario,setFormulario,lang} = useProductForm()
    const desc = React.useRef(null);
    const [load,setLoad] = React.useState(false)
    const cerrar = ()=>{
        setDialogs({...dialogs,colors:false})
    }
    const enviar = async()=>{
        setLoad(true)
        let list = {...listas}
        let form = {...formulario}
        let nombre = desc.current.value;
        if(nombre!==""){
        let res = await APICALLER.insert({table:'colors',data:{descripcion_color:nombre},token:token_user})
        if(res.response){
            let nuevo = {id_color: res.last_id, descripcion_color:nombre}
            list.colors.push(nuevo);
            form.color_id = res.last_id;
            setearListas(list);
            setFormulario(form);
        }
        }
        cerrar()
        setLoad(false)
    }
  return (
    <Dialog open={dialogs.colors} fullWidth onClose={cerrar}>
      <DialogTitle>{lang.nuevo_color}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
            <Grid item xs={12}> {load && <LinearProgress />}</Grid>
            <Grid item xs={12}>
                <TextField required autoFocus autoComplete='off' inputRef={desc} fullWidth label={lang.descripcion} />
            </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
          <Button variant="contained" onClick={enviar}>Guardar</Button>
          <Button variant="contained" onClick={cerrar}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogColors
