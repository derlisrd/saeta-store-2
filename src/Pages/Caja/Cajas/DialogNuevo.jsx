import {Alert,Button,Checkbox,Dialog,DialogActions,DialogContent,DialogTitle,FormControl,FormControlLabel,FormGroup,FormHelperText,Grid,InputLabel,LinearProgress,MenuItem,Select,TextField} from "@mui/material";
import NumberFormatCustom from "../../../Components/thirty/NumberFormatCustom";
import { useCajas } from "./CajasProvider";
import { Fragment, useEffect,useState } from 'react';

const DialogNuevo = () => {
  const {dialogs,setDialogs,formNew,initialFormNew,listaUsers, listaMonedas, errors,setErrors,agregarCajaNueva,cargas,lang} = useCajas();
  
  
  
  const [form,setForm] = useState(initialFormNew)
  const [monedas,setMonedas] = useState([

  ])
  
  const onChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const changeMoneda = e=>{
    let newarray = [...monedas]
    if(e.target.checked){
      let obj = {id_moneda: e.target.value,monto_inicial_caja:"0"}
      newarray.push(obj)
    }else{
      let index =  newarray.findIndex(item=> item.id_moneda === e.target.value)
      if(index>=0){
        newarray.splice(index, 1);
      }
    }
    setMonedas(newarray);
   
  }

  const changeValorInicial = (e,id)=>{
    let newarray = [...monedas]
    let index = newarray.findIndex(item=> item.id_moneda === id)
    newarray[index].monto_inicial_caja = e.target.value;
    setMonedas(newarray);
  }

  

  const verificar = ()=>{
    if(form.nombre_caja===""){
      setErrors({...errors,nuevo:true,nuevoMensaje:lang.ingrese_nombre_caja});
      return false;
    }
    if(form.id_user_caja===""){
      setErrors({...errors,nuevo:true,nuevoMensaje:lang.seleccione_usuario});
      return false;
    }
    /* if(form.id_moneda_caja===""){
      setErrors({...errors,nuevo:true,nuevoMensaje:lang.seleccione_moneda});
      return false;
    } */
    if(parseFloat(form.monto_inicial)<0){
      setErrors({...errors,nuevo:true,nuevoMensaje:lang.monto_inicial_negativo});
      return false;
    }
    setErrors({...errors,nuevo:false,nuevoMensaje:""});

    if(monedas.length<1){
      setErrors({...errors,nuevo:true,nuevoMensaje:lang.seleccione_moneda});
      return false;
    }
    agregarCajaNueva(form,monedas);

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
              <FormHelperText>{lang.asignar_usuario} </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>

          <FormGroup>
          <InputLabel>{lang.monedas_de_caja}</InputLabel>
          {listaMonedas.map((d,i) => (
            <Fragment key={i}>
              <FormControlLabel key={i}  control={<Checkbox 
                onChange={changeMoneda} value={d.id_moneda} name={d.id_moneda} />} 
                label={d.nombre_moneda} />
                {
                  monedas.some(elem=> elem.id_moneda === d.id_moneda ) &&(
              <TextField onChange={(e)=>{changeValorInicial(e,d.id_moneda)}} autoComplete='off'
                fullWidth name="monto_inicial" value={form.monto_inicial} 
                label={lang.monto_inicial+": "+d.nombre_moneda}InputProps={{inputComponent: NumberFormatCustom,inputProps: { min: 0 }}}
              />)}
            </Fragment>
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
