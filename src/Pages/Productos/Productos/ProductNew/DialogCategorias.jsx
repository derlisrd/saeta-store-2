import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormLabel, Grid, LinearProgress, Radio, TextField } from '@mui/material'
import React from 'react'
import { APICALLER } from '../../../../Services/api'
import { useProductForm } from './ProductFormProvider'

const DialogCategorias = () => {

    const {dialogs,setDialogs,listas,setearListas,token_user,formulario,setFormulario} = useProductForm()
    const name = React.useRef(null);
    const [tipo,setTipo] = React.useState('1');
    const [load,setLoad] = React.useState(false)
    
    const cerrar = ()=> setDialogs({...dialogs,categorias:false});
    const enviar = async()=>{
        setLoad(true)
        let list = {...listas}
        let form = {...formulario}
        let nombre = name.current.value; 
        if(nombre!==""){
        let res = await APICALLER.insert({table:'categorias',data:{nombre_categoria:nombre,tipo_categoria:tipo},token:token_user})
        if(res.response){
            let nuevo = {id_categoria: res.last_id, nombre_categoria:nombre,tipo_categoria:tipo}
            list.categorias.push(nuevo);
            form.id_categoria_producto = res.last_id;
            setearListas(list);
            setFormulario(form);
        }
        }
        
        cerrar()
        setLoad(false)
    }

  return (
    <Dialog open={dialogs.categorias} fullWidth onClose={cerrar}>
      <DialogTitle>Nueva categoría</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
            <Grid item xs={12}> {load && <LinearProgress />}</Grid>
            <Grid item xs={12}>
                <TextField required autoFocus autoComplete='off' inputRef={name} fullWidth label="Nombre de categoria" />
            </Grid>
            <Grid item xs={12}>
            <FormLabel component="legend">Tipo:</FormLabel>
              <FormControlLabel
                value="1"
                control={
                  <Radio
                    checked={tipo === "1"}
                    onChange={()=>{setTipo("1")}}
                    color="primary"
                  />
                }
                label="Artículo"
                labelPlacement="end"
              />
              <FormControlLabel
                value="2"
                control={
                  <Radio
                    checked={tipo === "2"}
                    onChange={()=>{setTipo("2")}}
                    color="primary"
                  />
                }
                label="Servicio"
                labelPlacement="end"
              />
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

export default DialogCategorias
