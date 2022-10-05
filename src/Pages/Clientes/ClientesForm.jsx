import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Grid, LinearProgress, Radio, RadioGroup, TextField, Zoom } from '@mui/material'
import { useEffect,useState } from 'react';
import { funciones } from '../../Functions';
import { useClientes } from './ClientesProvider'

const ClientesForm = () => {
    const {dialogs,setDialogs,lang,cargando,formulario,editar,agregar,errors}= useClientes();
    const initialFormulario = {
        id_cliente:null,
        nombre_cliente:"",
        ruc_cliente:"",
        tipo_cliente:"3",
        telefono_cliente:"",
        direccion_cliente:"",
        email_cliente:"",
        nacimiento_cliente: funciones.fechaActualDMY()
    }

    const [form,setForm] = useState(initialFormulario)
    const send = e=>{
      e.preventDefault();
      if(form.id_cliente===null){
        agregar(form)
      }
      else{
        editar(form)
      }
    }


    
    const onChange = e=>{
        const {value,name} = e.target;
        let newformulario = {...form}
        newformulario[name] = value;
        setForm(newformulario);
    }
    const cerrar = ()=>{ setDialogs({...dialogs,form:false});  }
    

    useEffect(() => {
      setForm(formulario)
    }, [formulario])


  return (
    <Dialog open={dialogs.form} fullWidth onClose={cerrar} TransitionComponent={Zoom} >
      <form onSubmit={send}>
      <DialogTitle>
            {lang.cliente}
      </DialogTitle>
      <DialogContent dividers>
      <Grid container spacing={2}>
            <Grid item xs={12}>
              {cargando.guardar && <LinearProgress />}
              {errors.error && <Alert severity='error'>{errors.message}</Alert>}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                onChange={onChange}
                name="nombre_cliente"
                required
                value={form.nombre_cliente && form.nombre_cliente}
                fullWidth
                label={lang.nombre}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required error={errors.id==="ruc"}
                onChange={onChange}
                name="ruc_cliente"
                disabled={formulario.id_cliente!==null}
                value={form.ruc_cliente}
                label={lang.ruc_de_empresa}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="telefono_cliente"
                label={lang.nro_telefono}
                onChange={onChange}
                value={
                  form.telefono_cliente !== null
                    ? form.telefono_cliente
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
                form.direccion_cliente !== null
                ? form.direccion_cliente
                : ``
              }
              />
              </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth type="email"
                onChange={onChange}
                name="email_cliente"
                value={
                  form.email_cliente !== null
                    ? form.email_cliente
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
                  value={form.tipo_cliente}
                  onChange={onChange}
                >
                  <FormControlLabel
                    value={3}
                    control={
                      <Radio checked={form.tipo_cliente === "3"} />
                    }
                    label={lang.casual}
                  />
                  <FormControlLabel
                    value={2}
                    control={
                      <Radio checked={form.tipo_cliente === "2"} />
                    }
                    label={lang.minorista}
                  />
                  <FormControlLabel
                    value={1}
                    control={
                      <Radio checked={form.tipo_cliente === "1"} />
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
