import {Alert,Button,Checkbox,Dialog,DialogActions,DialogContent,DialogTitle,FormControlLabel,FormGroup,Grid,InputLabel,LinearProgress,Radio,Stack,TextField} from "@mui/material";
import NumberFormatCustom from "../../../Components/thirty/NumberFormatCustom";
import { useCajas } from "./CajasProvider";
import { Fragment, useEffect,useState } from 'react';

const DialogNuevo = () => {
  const {dialogs,setDialogs,formNew,initialFormNew,listas,agregarCajaNueva,cargas,lang} = useCajas();
  
  
  
  const [form,setForm] = useState(initialFormNew)
  const [monedas,setMonedas] = useState([])
  const [usuarios,setUsuarios] = useState([])
  const initialError = {active:false,message:'',code:0}
  const [error,setError] = useState(initialError)

  const onChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const changeUsuario = e=>{
    let newarray = [...usuarios]
    //console.log(e.target.checked,e.target.value)
    
    if(e.target.checked){
      let index1 =  newarray.findIndex(i=> i.id_user_caja === e.target.value)
      //console.log(index1)
      if(index1<0){
        newarray.push({id_user_caja: e.target.value})
      }
    }else{
      let index =  newarray.findIndex(i=> i.id_user_caja === e.target.value)
      if(index>=0){
        newarray.splice(index, 1);
      }
    }
    setUsuarios(newarray);
  }

  const changeMoneda = e=>{
    let newarray = [...monedas]
    if(e.target.checked){
      let activo = newarray.length===0 ? "1" : "0";
      let obj = {id_moneda: e.target.value,monto_inicial_caja:"0",active_moneda_caja:activo}
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
  const changeActiveMoneda = id =>{
    let array = [...monedas];
    let index1 = array.findIndex(item=> item.id_moneda === id);
    let index2 = array.findIndex(item=> item.active_moneda_caja==="1")
    array[index1].active_moneda_caja = "1"
    array[index2].active_moneda_caja = "0"
    setMonedas(array);
  }
  

  const verificar = ()=>{
    if(form.nombre_caja===""){
      setError({active:true,code:1,message:'Ingrese nombre de caja de caja'})
      document.getElementById('nombre_caja').focus()
      return false;
    }
    /* if(form.id_user_caja===""){
      setErrors({...errors,nuevo:true,nuevoMensaje:lang.seleccione_usuario});
      return false;
    } */
    if(usuarios.length<1){
      setError({active:true,code:2,message:'Seleccione al menos un usuario'})
      return false;
    }
    if(monedas.length<1){
      setError({active:true,code:3,message:'Seleccione una moneda'})
      return false;
    }
     
    /* if(form.id_moneda_caja===""){
      setErrors({...errors,nuevo:true,nuevoMensaje:lang.seleccione_moneda});
      return false;
    } */
    if(parseFloat(form.monto_inicial)<0){
      setError({active:true,code:4,message:'Monto no puede ser negativo'})
      return false;
    }
   
    setError(initialError)
    agregarCajaNueva(form,monedas,usuarios);
    setForm(initialFormNew);
    setMonedas([]);
    setUsuarios([])
  }

  const cerrar = () => {
    setDialogs({ ...dialogs, nuevo: false });
    setForm(initialFormNew);
    setMonedas([])
    setUsuarios([])
    setError(initialError)
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
              error.active && <Alert icon={false} severity="error">{error.message}</Alert>
            }
            {
              cargas.nuevo && <LinearProgress />
            }
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus required fullWidth autoComplete="off" id="nombre_caja"
              name="nombre_caja" disabled={cargas.nuevo} error={error.code===1}
              value={form.nombre_caja}
              onChange={onChange}
              label={lang.nombre_de_caja}
            />
          </Grid>
          <Grid item xs={12}>
            
          </Grid>
          <Grid item xs={12}>
          <FormGroup>
            <InputLabel>{lang.asignar_usuarios}</InputLabel>
            {
            listas.users.map((d,i) => (<FormControlLabel  key={i} control={<Checkbox name={d.id_user} value={d.id_user} onChange={changeUsuario} />} label={d.nombre_user}/>))
            }
          </FormGroup>
          </Grid>
          <Grid item xs={12}>

          <FormGroup>
          <InputLabel>{lang.monedas_de_caja}</InputLabel>
          {listas.monedas.map((d,i) => (
            <Fragment key={i}>
              <FormControlLabel key={i} control={<Checkbox 
                onChange={changeMoneda} value={d.id_moneda} name={d.id_moneda} />} 
                label={d.nombre_moneda} />
                {
                  monedas.map((elem,index)=>(
                    elem.id_moneda === d.id_moneda &&
                    <Stack direction="row" key={index} spacing={2}>
                      <TextField onChange={(e)=>{changeValorInicial(e,elem.id_moneda)}} autoComplete='off'
                        fullWidth name="monto_inicial" value={elem.monto_inicial_caja} 
                        label={lang.monto_inicial+": "+d.nombre_moneda}InputProps={{inputComponent: NumberFormatCustom,inputProps: { min: 0 }}}
                      />
                      <FormControlLabel onChange={(e)=>{changeActiveMoneda(elem.id_moneda)}}  value="1" name="active_moneda_caja" control={<Radio checked={ elem.active_moneda_caja === '1'} />} label="Moneda principal" />
                    </Stack>
                  
                  )
                  )}
            </Fragment>
            ))}
              
          </FormGroup>

          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
      <Button variant="contained" size="large" disabled={cargas.nuevo}  onClick={verificar}>{lang.abrir}</Button>
        <Button variant="contained" size="large"  onClick={cerrar}>
          {lang.cancelar}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogNuevo;
