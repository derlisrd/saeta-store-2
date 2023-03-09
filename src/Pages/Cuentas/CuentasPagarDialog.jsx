import {Dialog,Grid,TextField,FormControl,InputLabel,Select,MenuItem,Zoom,DialogContent,DialogTitle,DialogActions,Button,LinearProgress,Alert} from "@mui/material";
import NumberFormatCustom from '../../Components/thirty/NumberFormatCustom'
import { useCuentas } from "./CuentasProvider";
import {useState} from 'react';

const CuentasPagarDialog = () => {
  const {dialogs,setDialogs,formPagar,pagarCuenta, cargando,lang,listas,error} = useCuentas();


  const [form,setForm] = useState({
    id_caja:"",
    obs:""
  })
  const change = e=>{
    const {value,name} = e.target
    setForm({...form,[name]:value})
  }

  const cerrar = () => {setDialogs({ ...dialogs, pagar: false });};

  const pagar = async (e) => {
    e.preventDefault();    
    pagarCuenta(form)
  };

  return (
    <Dialog
      onClose={cerrar}
      TransitionComponent={Zoom}
      fullWidth
      open={dialogs.pagar}
    >
      <form onSubmit={pagar}>
        <DialogTitle>{lang.cuenta_a_pagar} </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              { cargando.mov && <LinearProgress /> }
              {
                  error.error && <Alert severity="error">{error.errorMsj}</Alert>
              }
          </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel >{lang.seleccione_caja}</InputLabel>
                <Select
                  name="id_caja"
                  value={form.id_caja}
                  onChange={change}
                  required
                >
                  {
                    <MenuItem disabled value="">
                      {lang.seleccione_caja}
                    </MenuItem>
                  }
                  {listas.cajas.map((d, index) => (
                    <MenuItem key={index} value={d.id_caja}>
                      {d.nombre_caja}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={lang.monto}
                fullWidth
                value={formPagar.total_factura_compra}
                disabled
                InputProps={{inputComponent: NumberFormatCustom}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={lang.observaciones}
                fullWidth
                name="obs" autoComplete="off"
                value={form.obs}
                onChange={change}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button disabled={cargando.mov} variant="contained" size="large" type="submit">
            {lang.pagar}
          </Button>
          <Button variant="contained" size="large" onClick={cerrar}>
            {lang.cerrar}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CuentasPagarDialog;
