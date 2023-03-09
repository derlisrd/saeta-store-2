import {Dialog,DialogTitle,DialogContent,TextField,DialogActions,LinearProgress,Select,MenuItem,FormControl,InputLabel,Button,Zoom, Grid, Alert, FormControlLabel, FormLabel, Radio} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { APICALLER } from "../../../Services/api";
import { useMovimientos } from "./MovimientosProvider";
import NumberFormatCustom from "../../../Components/thirty/NumberFormatCustom";
import { useLogin } from "../../../Contexts/LoginProvider";
import { funciones } from "../../../Functions";
import swal from "sweetalert";

const RegistrarMovimiento = () => {
  const { setDialog, dialog,getData,lang } = useMovimientos();

  const [errors,setErrors] = useState({
    status:false,
    message:""
  });
  const [listas,setListas] = useState({ 
    registros:[],
    cajas:[],
    monedas:[]
  }
  )
  const {userData} = useLogin()
  const { id_user, token_user } = userData;

  const [cargando, setCargando] = useState(true);
  const initialFormulario = {
    id_tipo_registro: "",
    monto_movimiento: "",
    id_cajas_moneda: "",
    id_caja_movimiento: "",
    motivo_movimiento: "",
    tipo_movimiento:"1"
  };
  const [formulario, setFormulario] = useState(initialFormulario);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };
  const cerrar = () => {
    setDialog({...dialog,registrar:false});
    setFormulario(initialFormulario);
  };
  const getListaRegistros = useCallback(async () => {
   
    if (dialog.registrar) {

      let promises = await Promise.all([ 
      APICALLER.get({
        table: "cajas",include:'cajas_users,cajas_monedas,monedas',
        on: "id_caja_caja,id_caja,id_caja,id_caja_moneda,id_moneda_caja_moneda,id_moneda",
        where: `id_user_caja,=,${id_user},and,estado_caja,=,'open'`,
        fields: "nombre_caja,id_caja,monto_caja_moneda,monto_no_efectivo,nombre_moneda,id_caja,id_cajas_moneda,id_moneda,id_cajas_moneda"}), 
      APICALLER.get({ table: "cajas_registros",where:"show_registro,=,1" }),
      APICALLER.get({ table: "cajas",include:"cajas_users",on:"id_caja_caja,id_caja",where: `id_user_caja,=,${id_user},and,estado_caja,=,'open'`})
    ])
    
    if(promises[2].response){
      setListas({
        cajas: promises[2].results,
        registros: promises[1].results,
        monedas: promises[0].results,
      });
    }
    
    }
    setCargando(false);
  }, [dialog, id_user]);



  const EfectuarMovimiento = async () => {
    
    setErrors({...errors,status:false})
    let f = {...formulario}
    if(f.id_caja_movimiento==="" || f.monto_movimiento==="" || f.id_cajas_moneda===""){
      setErrors({status:true,message: lang.complete_datos_correctamente})
      return false;
    }

    
    let tipo_movimiento = parseInt(f.tipo_movimiento);

    let foundMoneda = listas.monedas.find( e=> e.id_cajas_moneda === f.id_cajas_moneda);
    
    
    let foundRegistro = listas.registros.find( e=> e.id_cajas_registro === f.id_tipo_registro);
    let id_moneda = foundMoneda.id_moneda
    let cantidad_actual = tipo_movimiento === 1 ? parseFloat(foundMoneda.monto_caja_moneda) :  parseFloat(foundMoneda.monto_no_efectivo);
    let cantidad_nueva;
    
    
    if( parseInt(foundRegistro.tipo_registro) === 1){
      cantidad_nueva = parseFloat(f.monto_movimiento) + cantidad_actual;
    }

    if( parseInt(foundRegistro.tipo_registro) === 0){
      cantidad_nueva =  cantidad_actual - parseFloat(formulario.monto_movimiento);
    }

    if(cantidad_nueva < 0){
      setErrors({status:true,message: lang.no_hay_suficientes_fondos_en_caja})
      return false;
    }

    

    let datos_cajas_movimientos = {
      id_moneda_movimiento: id_moneda,
      id_caja_movimiento: f.id_caja_movimiento,
      id_user_movimiento: id_user,
      id_tipo_registro: f.id_tipo_registro,
      monto_movimiento: tipo_movimiento === 1 ? f.monto_movimiento : 0,
      monto_sin_efectivo: tipo_movimiento === 0 ? f.monto_movimiento : 0,
      detalles_movimiento: f.motivo_movimiento ,
      fecha_movimiento: funciones.getFechaHorarioString(),
    };

    
    let datos_cajas_monedas = tipo_movimiento === 1 ? { monto_caja_moneda : cantidad_nueva} : { monto_no_efectivo : cantidad_nueva}

    

      setCargando(true);
      let promesas = [
        APICALLER.insert({table:"cajas_movimientos",token:token_user,data:datos_cajas_movimientos}),
        APICALLER.update({table:"cajas_monedas",token:token_user,data:datos_cajas_monedas,id: foundMoneda.id_cajas_moneda})
      ]
      let promises = await Promise.all(promesas)
      if(promises[0].response && promises[1].response){
        swal({text:lang.movimiento_registrado,icon:'success',timer:1300}).then(()=>{cerrar();getData();})
      } else{
        console.log(promises);
      }  
      setCargando(false);
  }





  useEffect(() => {
    const ca = new AbortController();
    let isActive = true;
    if (isActive) {
      getListaRegistros();
      
    }
    return () => {
      isActive = false;
      ca.abort();
    };
    
  }, [getListaRegistros]);


  const listaCajasMonedasFiltrada = listas.monedas.filter(e=>e.id_caja === formulario.id_caja_movimiento ) || [];

  return (
    <Dialog fullWidth open={dialog.registrar} onClose={cerrar} TransitionComponent={Zoom}>
      <DialogTitle>
        {lang.registrar_movimiento}
      </DialogTitle>
      <DialogContent dividers>

    <Grid container spacing={2}>
      <Grid item xs={12}>
        {cargando && <LinearProgress />}
        {errors.status && 
          <Alert severity="error">
            {errors.message}
          </Alert>
        }
      </Grid>

      <Grid item xs={12} sm={6}>
      <FormControl fullWidth>
          <InputLabel >
            {lang.seleccione_caja}
          </InputLabel>
          <Select
            name="id_caja_movimiento"
            value={formulario.id_caja_movimiento}
            onChange={onChange}
          >
            {listas.cajas.map((d, index) => (
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
              value={formulario.id_cajas_moneda}
              onChange={onChange}
            >
              {listaCajasMonedasFiltrada.map((d, index) => (
                <MenuItem key={index} value={d.id_cajas_moneda}>
                  {d.nombre_moneda} 
                </MenuItem>
              ))}
            </Select>
          </FormControl>
      </Grid>     

      <Grid item xs={12}>
        <FormControl fullWidth>
            <InputLabel>
              {lang.selecciona_registro}
            </InputLabel>
            <Select
              name="id_tipo_registro"
              value={formulario.id_tipo_registro}
              onChange={onChange}
            >
              {listas.registros.map((d, index) => (
                <MenuItem key={index} value={d.id_cajas_registro}>
                  {d.descripcion_registro} (
                  {d.tipo_registro === "1" ? `Ingreso` : `Retiro`})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
      </Grid>
      
      <Grid item xs={12}>
        <TextField
            fullWidth
            label={lang.monto_movimiento}
            value={formulario.monto_movimiento}
            name="monto_movimiento" autoComplete="off"
            InputProps={{
              inputComponent: NumberFormatCustom,inputProps: { min: 0 }
            }}
            onChange={onChange}
          />
      </Grid>
      <Grid item xs={12}>
            <FormLabel component="legend">Tipo: </FormLabel>
                <FormControlLabel
                  value="1"
                  control={
                    <Radio
                      checked={formulario.tipo_movimiento==="1"}
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
                      checked={formulario.tipo_movimiento==="0"}
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
            value={formulario.motivo_movimiento}
          />
      </Grid>
    </Grid>
  </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disabled={cargando}
          onClick={EfectuarMovimiento}
        >
          {lang.registrar}
        </Button>
        <Button variant="contained" onClick={cerrar}>
          {lang.cancelar}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default RegistrarMovimiento;
