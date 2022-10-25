import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, TextField } from '@mui/material'
import React from 'react'
import { APICALLER } from '../../../../Services/api'
import { useProductForm } from './ProductFormProvider'

const DialogMarcas = () => {

    const {dialogs,setDialogs,listas,setearListas,token_user,formulario,setFormulario} = useProductForm()
    const name = React.useRef(null);
    const [load,setLoad] = React.useState(false)
    
    const cerrar = ()=> setDialogs({...dialogs,marcas:false});
    const enviar = async()=>{
        setLoad(true)
        let list = {...listas}
        let form = {...formulario}
        let nombre = name.current.value;
        if(nombre!=="" && nombre!==null ){
        let res = await APICALLER.insert({table:'marcas',data:{nombre_marca:nombre},token:token_user})
        //console.log(res);
        if(res.response){
            let nuevo = {id_marca: res.last_id, nombre_marca:nombre}
            list.marcas.push(nuevo);
            form.id_marca_producto = res.last_id;
            setearListas(list);
            setFormulario(form);
        }else{ console.log(res)}
        }
        
        cerrar()
        setLoad(false)
    }

  return (
    <Dialog open={dialogs.marcas} fullWidth onClose={cerrar}>
      <DialogTitle>Nueva Marca</DialogTitle>
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

export default DialogMarcas
