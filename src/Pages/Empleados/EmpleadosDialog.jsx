import { Radio,Dialog, DialogContent, DialogTitle, FormControlLabel, FormLabel, Grid,  TextField, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, LinearProgress } from '@mui/material'
import React,{useState} from 'react'
import swal from 'sweetalert'
import { APICALLER } from '../../Api/ApiCaller'
import NumberFormatCustom from '../../Componentes/NumberFormatCustom'
import { useLogin } from '../../Contextos/LoginProvider'
import { useEmpleados } from './EmpleadosProvider'

const EmpleadosDialog = () => {
  const {token_user} = useLogin()

  
  const [load,setLoad] = useState(false);
  const {dialogs,setDialogs,getLista,form,setForm,initialForm,listaRols} = useEmpleados();

    const cerrar = ()=>{
        setDialogs({...dialogs,agregar:false});
        setForm(initialForm)
   
    }

    const enviarForm = async(e)=>{
      e.preventDefault();
      setLoad(true)
      if(form.id_empleado === ''){
        delete form.id_empleado;
        let res = await APICALLER.insert({token:token_user,table:'empleados',data:form});
        if(res.response==='ok'){
          swal({icon:'success',timer:1500,text:'Agregado correctamente'});
        }else{
          console.log(res);
        }
     
      }else{
        
        let res = await APICALLER.update({token:token_user,table:"empleados",id:form.id_empleado,data:form});
        if(res.response==='ok'){
          swal({icon:'success',timer:1500,text:'Actualizado correctamente'});
        }else{
          console.log(res);
        }
      }
      setDialogs({...dialogs,agregar:false});
      setLoad(false)
      getLista();
    }



    const onChange = e =>{
      const {name,value} = e.target;
      setForm({...form,[name]:value});
    }

  return ( 
    <Dialog onClose={cerrar} open={dialogs.agregar} fullWidth>
      <form onSubmit={enviarForm}>
      <DialogTitle>
       { form.id_empleado === '' ? 'Agregar empleado' : 'Editar empleado'}
      </DialogTitle>
      <DialogContent dividers>
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {load && <LinearProgress />}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required label="Nombre" onChange={onChange} name="nombre_empleado" value={form.nombre_empleado} helperText="Nombres" fullWidth autoFocus />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required label="Apellido" onChange={onChange} name="apellido_empleado" value={form.apellido_empleado} helperText="Apellidos" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required label="Documento" onChange={onChange} name="doc_empleado" value={form.doc_empleado} helperText='Nro de documento' fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <InputLabel variant="outlined">Rol de empleado</InputLabel>
                <Select
                  name="id_rol"
                  value={form.id_rol}
                  onChange={onChange}
                  variant="outlined"
                  required
                >
                  <MenuItem value='0' disabled>
                      Seleccione rol
                    </MenuItem>
                  {listaRols.map((d) => (
                    <MenuItem key={d.id_empleados_rol} value={d.id_empleados_rol}>
                      {d.descripcion_rol}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Nro de contacto" onChange={onChange} name="telefono_empleado" value={form.telefono_empleado} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required label="Salario" onChange={onChange} name="salario_empleado" value={form.salario_empleado}  fullWidth 
              InputProps={{
                inputComponent: NumberFormatCustom,inputProps: { min: 0 }
              }}
            />
          </Grid>
          <Grid item xs={12}>
          <FormLabel component="legend">Tipo de salario</FormLabel>
                <FormControlLabel
                  value="1"
                  control={
                    <Radio
                      name="tipo_salario"
                      checked={form.tipo_salario === "1"}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                  label="Jornales"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="2"
                  control={
                    <Radio
                      name="tipo_salario"
                      checked={form.tipo_salario === "2"}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                  label="Comisiones"
                  labelPlacement="end"
                />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" type="onsubmit" >Guardar</Button>
        <Button variant="outlined" onClick={cerrar}>Cancelar</Button>
      </DialogActions>
    </form>
    </Dialog>
  )
}

export default EmpleadosDialog
