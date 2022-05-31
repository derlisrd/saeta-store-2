import { Breadcrumbs, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Grid, LinearProgress, Radio, RadioGroup, TextField, Typography, Zoom } from '@mui/material'

import { useClientes } from './ClientesProvider'

const ClientesForm = () => {
    const {dialogs,setDialogs,lang,cargando,formulario,setFormulario,editar,agregar}= useClientes();
    const initialFormulario = {
        id_cliente:null,
        nombre_cliente:"",
        ruc_cliente:"",
        tipo_cliente:"3",
        telefono_cliente:"",
        direccion_cliente:"",
        email_cliente:"",
    }

    const send = e=>{
      e.preventDefault();
      if(formulario.id_cliente===null){
        agregar()
      }
      else{
        editar()
      }
    }
    
    const onChange = e=>{
        const {value,name} = e.target;
        let newformulario = {...formulario}
        newformulario[name] = value;
        setFormulario(newformulario);
    }
    const cerrar = ()=>{ setDialogs({...dialogs,form:false}); setFormulario(initialFormulario); }
  return (
    <Dialog open={dialogs.form} fullWidth onClose={cerrar} TransitionComponent={Zoom} >
      <form onSubmit={send}>
      <DialogTitle>
            {lang.cliente_nuevo}
      </DialogTitle>
      <DialogContent dividers>
      <Grid container spacing={2}>
            <Grid item xs={12}>
              {cargando.guardar && <LinearProgress />}
            </Grid>
            <Grid item xs={12}>
              <Breadcrumbs separator="›">
                <Typography variant="overline">{lang.clientes}</Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                onChange={onChange}
                name="nombre_cliente"
                required
                value={formulario.nombre_cliente && formulario.nombre_cliente}
                fullWidth
                label={lang.nombre}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                onChange={onChange}
                name="ruc_cliente"
                value={formulario.ruc_cliente}
                label={lang.ruc_de_empresa}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="telefono_cliente"
                label={lang.nro_telefono}
                onChange={onChange}
                value={
                  formulario.telefono_cliente !== null
                    ? formulario.telefono_cliente
                    : ``
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>

            <TextField
              fullWidth
              label={lang.direccion}
              onChange={onChange}
              name="direccion_cliente"
              value={
                formulario.direccion_cliente !== null
                ? formulario.direccion_cliente
                : ``
              }
              />
              </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                onChange={onChange}
                name="email_cliente"
                value={
                  formulario.email_cliente !== null
                    ? formulario.email_cliente
                    : ``
                }
                label={lang.correo_electronico}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">{lang.tipo}:</FormLabel>
                <RadioGroup
                  name="tipo_cliente"
                  value={formulario.tipo_cliente}
                  onChange={onChange}
                >
                  <FormControlLabel
                    value={3}
                    control={
                      <Radio checked={formulario.tipo_cliente === "3"} />
                    }
                    label={lang.casual}
                  />
                  <FormControlLabel
                    value={2}
                    control={
                      <Radio checked={formulario.tipo_cliente === "2"} />
                    }
                    label={lang.minorista}
                  />
                  <FormControlLabel
                    value={1}
                    control={
                      <Radio checked={formulario.tipo_cliente === "1"} />
                    }
                    label={lang.mayorista}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
      </DialogContent>
      <DialogActions>
      <Button variant='contained' disabled={cargando.guardar} type="submit" >{lang.guardar}</Button>
        <Button variant='contained' onClick={cerrar} >{lang.cerrar}</Button>
      </DialogActions>
    </form>
    </Dialog>
  )
}

export default ClientesForm
