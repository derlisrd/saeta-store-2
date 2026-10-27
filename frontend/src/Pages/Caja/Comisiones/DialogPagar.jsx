import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, Zoom,Alert,FormControl,InputLabel,Select, MenuItem, TextField, FormLabel, FormControlLabel, Radio, AlertTitle } from '@mui/material'
import { useLang } from '../../../Contexts/LangProvider'
import { useComisiones } from './ComisionesProvider'
import {useState} from 'react'
import NumberFormatCustom from '../../../Components/thirty/NumberFormatCustom'
import { funciones } from '../../../Functions'
import { useLogin } from '../../../Contexts/LoginProvider'
import { APICALLER } from '../../../Services/api'
import swal from 'sweetalert'

const DialogPagar = () => {

  const {lang} = useLang()
  const { dialogs,setDialogs,formPagar,datos,getData } = useComisiones()
  const {userData} = useLogin()
  const {id_user,token_user} = userData
  const initialForm = {
    id_caja_movimiento : '',
    id_cajas_moneda : '',
    tipo_movimiento : '1',
    motivo_movimiento:''
  }
  const [form,setForm] = useState(initialForm) 

  const [errors,setErrors] = useState({status:false,message:''})
  const [cargando,setCargando] = useState(false)

  const onChange = e=>{ const {value,name} = e.target; setForm({...form,[name]:value})}

  const pagar = async ()=>{
    setErrors({...errors,status:false})
    let f = {...form}
    if(f.id_caja_movimiento==="" || f.id_cajas_moneda===""){
      setErrors({status:true,message: lang.complete_datos_correctamente})
      return false;
    }
    let tipo_movimiento = parseInt(f.tipo_movimiento)
    let montoApagar = parseFloat(formPagar.comision_valor);
    let foundMoneda = datos.monedas.find( e=> e.id_cajas_moneda === f.id_cajas_moneda);
    let id_moneda = foundMoneda.id_moneda

    let cantidad_actual = tipo_movimiento === 1 ? parseFloat(foundMoneda.monto_caja_moneda) :  parseFloat(foundMoneda.monto_no_efectivo);

    let cantidad_nueva = cantidad_actual - montoApagar;

    if(cantidad_nueva < 0){
      setErrors({status:true,message: lang.no_hay_suficientes_fondos_en_caja})
      return false;
    }
    //console.log(foundMoneda)
    let datos_cajas_movimientos = {
      id_moneda_movimiento: id_moneda,
      id_caja_movimiento: f.id_caja_movimiento,
      id_user_movimiento: id_user,
      id_tipo_registro: 8, // otros pagos
      monto_movimiento: tipo_movimiento === 1 ? montoApagar : 0,
      monto_sin_efectivo: tipo_movimiento === 0 ? montoApagar : 0,
      detalles_movimiento: 'Pago de comisión. Registro interno: '+formPagar.id_empleado+'. ' + f.motivo_movimiento,
      fecha_movimiento: funciones.getFechaHorarioString(),
    };

    let datos_cajas_monedas = tipo_movimiento === 1 ? { monto_caja_moneda : cantidad_nueva} : { monto_no_efectivo : cantidad_nueva} 

   
    setCargando(true);
      let promesas = [
        APICALLER.insert({table:"cajas_movimientos",token:token_user,data:datos_cajas_movimientos}),
        APICALLER.update({table:"cajas_monedas",token:token_user,data:datos_cajas_monedas,id: foundMoneda.id_cajas_moneda}),
        APICALLER.update({table:'comisions',token:token_user,data:{pagado_comision:1},id: formPagar.id_comision})
      ]
      let promises = await Promise.all(promesas)
      if(promises[0].response && promises[1].response){
        swal({text:lang.movimiento_registrado,icon:'success',timer:1300}).then(()=>{
          cerrar();
          getData();
        })
      } else{
        console.log(promises);
      }  
      setCargando(false);
    
  }



  const cerrar = ()=> { 
    setDialogs({...dialogs,pagar:false})
    setForm(initialForm)
  }

  const listaCajasMonedasFiltrada =  datos.monedas.filter(e=>e.id_caja === form.id_caja_movimiento ) || [];

  
  return (
  <Dialog fullWidth open={dialogs.pagar} onClose={cerrar} TransitionComponent={Zoom}>
        <DialogTitle>{lang.pagar_comision}</DialogTitle>
        <DialogContent >
        <Grid container spacing={2}>
      <Grid item xs={12}>
        {cargando && <LinearProgress />}
        {errors.status && 
          <Alert severity="error">
            {errors.message}
          </Alert>
        }
      </Grid>
        <Grid item xs={12}><Alert variant='outlined' icon={false}><AlertTitle>{formPagar.nombre_empleado} {formPagar.apellido_empleado}</AlertTitle></Alert></Grid>
      <Grid item xs={12} sm={6}>
      <FormControl fullWidth>
          <InputLabel >
            {lang.seleccione_caja}
          </InputLabel>
          <Select
            name="id_caja_movimiento"
            value={form.id_caja_movimiento}
            onChange={onChange}
          >
            <MenuItem value='' disabled>
                {lang.seleccione_caja}
              </MenuItem>
            {datos.cajas.map((d, index) => (
              <MenuItem key={index} value={d.id_caja}>
                {d.nombre_caja}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
            <InputLabel>
              {lang.selecciona_moneda}
            </InputLabel>
            <Select
              name="id_cajas_moneda"
              value={form.id_cajas_moneda}
              onChange={onChange}
              disabled={form.id_caja_movimiento === ''}
            >
              <MenuItem value='' disabled>
                {lang.selecciona_moneda}
              </MenuItem>
              {listaCajasMonedasFiltrada.map((d, index) => (
                <MenuItem key={index} value={d.id_cajas_moneda}>
                  {d.nombre_moneda} 
                </MenuItem>
              ))}
            </Select>
          </FormControl>
      </Grid>     

      
      <Grid item xs={12}>
        <TextField
            fullWidth
            label={lang.monto_movimiento}
            value={formPagar.comision_valor}
            name="monto_movimiento" autoComplete="off"
            InputProps={{
              inputComponent: NumberFormatCustom,inputProps: { min: 0 }
            }}
            disabled
          />
      </Grid>
      <Grid item xs={12}>
            <FormLabel component="legend">Tipo: </FormLabel>
                <FormControlLabel
                  value="1"
                  control={
                    <Radio
                      checked={form.tipo_movimiento==="1"}
                      name="tipo_movimiento"
                      onChange={onChange}
                      color="primary"
                    />
                  }
                  label="EFECTIVO"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="0"
                  control={
                    <Radio
                      name="tipo_movimiento"
                      checked={form.tipo_movimiento==="0"}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                  label="NO EFECTIVO"
                  labelPlacement="end"
                />
          </Grid>
      <Grid item xs={12}>
        <TextField
            label={lang.obs_detalles}
            onChange={onChange} autoComplete="off"
            name="motivo_movimiento"
            fullWidth
            value={form.motivo_movimiento}
          />
      </Grid>
    </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" disabled={form.id_cajas_moneda === ''} onClick={pagar}>{lang.pagar}</Button>
          <Button variant="contained" onClick={cerrar}>{lang.cerrar}</Button>
        </DialogActions>
    </Dialog>
  )
}

export default DialogPagar
