import {Alert,Button,FormControl,FormHelperText,Grid,InputLabel,LinearProgress,MenuItem,Select,TextField} from "@mui/material";
import NumberFormatCustom from "../../../Components/thirty/NumberFormatCustom";
import { useCajas } from "./CajasProvider";
import ModalDialog from "../../../Components/UI/ModalDialog";

const DialogNuevo = () => {
  const {
    dialogs,
    setDialogs,
    formNew,
    setFormNew,
    initialFormNew,
    listaUsers, listaMonedas, errors,setErrors,agregarCajaNueva,cargas,lang
  } = useCajas();

  const onChange = (e) => {
    const { value, name } = e.target;
    setFormNew({ ...formNew, [name]: value });
  };


  const verificar = ()=>{
    if(formNew.nombre_caja===""){
      setErrors({...errors,nuevo:true,nuevoMensaje:"Ingrese el nombre de caja"});
      return false;
    }
    if(formNew.id_user_caja===""){
      setErrors({...errors,nuevo:true,nuevoMensaje:"Seleccione un usuario"});
      return false;
    }
    if(formNew.id_moneda_caja===""){
      setErrors({...errors,nuevo:true,nuevoMensaje:"Seleccione una moneda"});
      return false;
    }
    if(parseFloat(formNew.monto_inicial)<0){
      setErrors({...errors,nuevo:true,nuevoMensaje:"El monto inicial no puede ser negativo"});
      return false;
    }
    setErrors({...errors,nuevo:false,nuevoMensaje:""});
    agregarCajaNueva();
  }

  const cerrar = () => {
    setDialogs({ ...dialogs, nuevo: false });
    setFormNew(initialFormNew);
  };
  const Acciones = (<>
  <Button variant="outlined" onClick={verificar}>Agregar</Button>
        <Button variant="outlined" onClick={cerrar}>
          Cerrar
        </Button></>)
  return (

      <ModalDialog title="Habilitar y agregar nueva caja" fullWidth open={dialogs.nuevo} ActionsButtons={Acciones} onClose={cerrar} >

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
              autoFocus
              required
              fullWidth
              name="nombre_caja"
              value={formNew.nombre_caja}
              onChange={onChange}
              label={lang.nombre_de_caja}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="monto_inicial"
              value={formNew.monto_inicial}
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
                value={formNew.id_user_caja}
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
            <FormControl fullWidth>
              <InputLabel>Moneda de caja</InputLabel>
              <Select
                onChange={onChange}
                name="id_moneda_caja"
                value={formNew.id_moneda_caja}
                fullWidth
              >
                {listaMonedas.map((d,i) => (
                  <MenuItem key={i} value={d.id_moneda}>
                    {d.nombre_moneda}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText> </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
</ModalDialog>
  );
};

export default DialogNuevo;
