import {Alert,Button,Checkbox,Dialog,DialogActions,DialogContent,DialogTitle,FormControl,FormControlLabel,FormGroup,FormHelperText,Grid,InputLabel,LinearProgress,MenuItem,Select,TextField} from "@mui/material";
import NumberFormatCustom from "../../../Components/thirty/NumberFormatCustom";
import { useCajas } from "./CajasProvider";
import { useEffect,useState } from 'react';

const DialogNuevo = () => {
  const {dialogs,setDialogs,formNew,initialFormNew,listaUsers, listaMonedas, errors,setErrors,agregarCajaNueva,cargas,lang} = useCajas();
  
  
  
  const [form,setForm] = useState(initialFormNew)

  
  const onChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  

  const verificar = ()=>{
    if(form.nombre_caja===""){
      setErrors({...errors,nuevo:true,nuevoMensaje:lang.ingrese_nombre_caja});
      return false;
    }
    if(form.id_user_caja===""){
      setErrors({...errors,nuevo:true,nuevoMensaje:lang.seleccione_usuario});
      return false;
    }
    if(form.id_moneda_caja===""){
      setErrors({...errors,nuevo:true,nuevoMensaje:lang.seleccione_moneda});
      return false;
    }
    if(parseFloat(form.monto_inicial)<0){
      setErrors({...errors,nuevo:true,nuevoMensaje:lang.monto_inicial_negativo});
      return false;
    }
    //setErrors({...errors,nuevo:false,nuevoMensaje:""});
    console.log(form)
    //agregarCajaNueva(form);
  }

  const cerrar = () => {
    setDialogs({ ...dialogs, nuevo: false });
    setForm(initialFormNew);
  };


useEffect(() => {
  setForm(formNew)
}, [formNew])

  return (
    <Dialog fullWidth open={dialogs.nuevo}  onClose={cerrar}>
      <DialogTitle>
      {lang.habilitar_nueva_caja}
      </DialogTitle>
      <DialogContent dividers>
      <Grid container spacing={2}>
          <Grid item xs={12}>
            {
              errors.nuevo && <Alert icon={false} severity="error">{errors.nuevoMensaje}</Alert>
            }
            {
              cargas.nuevo && <LinearProgress />
            }
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus required fullWidth autoComplete="off"
              name="nombre_caja"
              value={form.nombre_caja}
              onChange={onChange}
              label={lang.nombre_de_caja}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="monto_inicial"
              value={form.monto_inicial}
              onChange={onChange}
              label={lang.monto_inicial}
              InputProps={{
                inputComponent: NumberFormatCustom,
                inputProps: { min: 0 },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>{lang.asignar_usuario}</InputLabel>
              <Select
                onChange={onChange}
                name="id_user_caja"
                value={form.id_user_caja}
                fullWidth
              >
                {listaUsers.map((d) => (
                  <MenuItem key={d.id_user} value={d.id_user}>
                    {d.nombre_user}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText> </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>

          <FormGroup>
          <InputLabel>{lang.monedas_de_caja}</InputLabel>
          {listaMonedas.map((d,i) => (
            <FormControlLabel key={i}  control={<Checkbox 
              onChange={onChange} name={`id_moneda[${d.id_moneda}]`} value={form.id_moneda[{id_moneda:d.id_moneda}]}  />} 
              label={d.nombre_moneda} />
            ))}  
          </FormGroup>

          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
      <Button variant="contained" size="large"  onClick={verificar}>{lang.abrir}</Button>
        <Button variant="contained" size="large"  onClick={cerrar}>
          {lang.cancelar}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogNuevo;
