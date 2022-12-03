import { Radio,Dialog, DialogContent, DialogTitle, FormControlLabel, FormLabel, Grid,  TextField, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, LinearProgress } from '@mui/material'
import React,{useState} from 'react'
import swal from 'sweetalert'
import { APICALLER } from '../../Services/api'
import NumberFormatCustom from '../../Components/thirty/NumberFormatCustom'
import { useLogin } from '../../Contexts/LoginProvider'
import { useEmpleados } from './EmpleadosProvider'

const EmpleadosDialog = () => {

  const {userData} = useLogin()
  const {token_user} = userData

  
  const [load,setLoad] = useState(false);
  const {dialogs,setDialogs,getLista,form,setForm,initialForm,listaRols,lang} = useEmpleados();

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
        if(res.response){
          swal({icon:'success',timer:1500,text:lang.agregado_correctamente});
        }else{
          console.log(res);
        }
     
      }else{
        
        let res = await APICALLER.update({token:token_user,table:"empleados",id:form.id_empleado,data:form});
        if(res.response){
          swal({icon:'success',timer:1500,text:lang.actualizado_correctamente});
        }else{
          console.log(res);
        }
      }
      setDialogs({...dialogs,agregar:false});
      setLoad(false)
      setForm(initialForm)
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
       {lang.empleados}
      </DialogTitle>
      <DialogContent dividers>
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {load && <LinearProgress />}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required label={lang.nombre} onChange={onChange} name="nombre_empleado" value={form.nombre_empleado} fullWidth autoFocus />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required label={lang.apellido} onChange={onChange} name="apellido_empleado" value={form.apellido_empleado}  fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required label={lang.documento} onChange={onChange} name="doc_empleado" value={form.doc_empleado} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <InputLabel >{lang.rol_empleado}</InputLabel>
                <Select
                  name="id_rol"
                  value={form.id_rol}
                  onChange={onChange}
                  required
                >
                  <MenuItem value='0' disabled>
                      {lang.seleccionar}
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
            <TextField label={lang.telefono} onChange={onChange} name="telefono_empleado" value={form.telefono_empleado} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required label={lang.salario} onChange={onChange} name="salario_empleado" value={form.salario_empleado}  fullWidth 
              InputProps={{
                inputComponent: NumberFormatCustom,inputProps: { min: 0 }
              }}
            />
          </Grid>
          <Grid item xs={12}>
          <FormLabel component="legend">{lang.tipo_salario}</FormLabel>
                <FormControlLabel
                  value="1"
                  control={
                    <Radio
                      name="tipo_salario"
                      checked={form.tipo_salario === "1"}
                      onChange={onChange}
                    />
                  }
                  label={lang.jornales}
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="2"
                  control={
                    <Radio
                      name="tipo_salario"
                      checked={form.tipo_salario === "2"}
                      onChange={onChange}
                    />
                  }
                  label={lang.comisiones}
                  labelPlacement="end"
                />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" size="large" type="onsubmit" >{lang.guardar}</Button>
        <Button variant="contained" size="large" onClick={cerrar}>{lang.cancelar}</Button>
      </DialogActions>
    </form>
    </Dialog>
  )
}

export default EmpleadosDialog
