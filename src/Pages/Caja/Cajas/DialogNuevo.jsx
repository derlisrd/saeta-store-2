import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import NumberFormatCustom from "../../../Componentes/NumberFormatCustom";
import { useCajas } from "./CajasProvider";

const DialogNuevo = () => {
  const {
    dialogs,
    setDialogs,
    formNew,
    setFormNew,
    initialFormNew,
    listaUsers, listaMonedas, errors,setErrors,agregarCajaNueva,cargas
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
  return (
    <Dialog open={dialogs.nuevo} onClose={cerrar} fullWidth>
      <DialogTitle>Habilitar y agregar nueva caja</DialogTitle>
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
              autoFocus
              required
              fullWidth
              name="nombre_caja"
              value={formNew.nombre_caja}
              onChange={onChange}
              label="Nombre de caja"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="monto_inicial"
              value={formNew.monto_inicial}
              onChange={onChange}
              label="Monto inicial"
              InputProps={{
                inputComponent: NumberFormatCustom,
                inputProps: { min: 0 },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Asignar a un usuario</InputLabel>
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
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={verificar}>Agregar</Button>
        <Button variant="outlined" onClick={cerrar}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogNuevo;
