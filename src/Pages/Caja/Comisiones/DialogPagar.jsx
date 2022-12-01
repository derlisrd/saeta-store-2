import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, Zoom,Alert,FormControl,InputLabel,Select, MenuItem, TextField, FormLabel, FormControlLabel, Radio, AlertTitle } from '@mui/material'
import { useLang } from '../../../Contexts/LangProvider'
import { useComisiones } from './ComisionesProvider'
import {useState} from 'react'
import NumberFormatCustom from '../../../Components/thirty/NumberFormatCustom'

const DialogPagar = () => {

  const {lang} = useLang()
  const { dialogs,setDialogs,formPagar,datos } = useComisiones()

  const [form,setForm] = useState({
    id_caja_movimiento : '',
    id_cajas_moneda : '',
    tipo_movimiento : '1',
    motivo_movimiento:''
  }) 

  const [errors,setErrors] = useState({status:false,message:''})
  const [cargando,setCargando] = useState(false)

  const onChange = e=>{ const {value,name} = e.target; setForm({...form,[name]:value})}

  const pagar = ()=>{
    setErrors({...errors,status:false})
    let f = {...form}
    if(f.id_caja_movimiento==="" || f.id_cajas_moneda===""){
      setErrors({status:true,message: lang.complete_datos_correctamente})
      return false;
    }
    setCargando(false)
    console.log(formPagar)
  }
  const cerrar = ()=> { setDialogs({...dialogs,pagar:false})}

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
