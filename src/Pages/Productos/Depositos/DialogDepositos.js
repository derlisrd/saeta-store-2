import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField, Zoom
} from "@mui/material";
import {  useRef } from "react";
import { useDepositos } from "./DepositosProvider";

const DialogDepositos = () => {
  const { setDialogs, dialogs, guardar,form,setForm,editar,lang} = useDepositos();
  const nombre_depositoRef = useRef(null);

  const cerrar = () => {
    setDialogs({ ...dialogs, editar: false });
    setForm({ nombre_deposito: "",id_deposito:"" });
  };
  

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const guardarValidate = (e) => {
    e.preventDefault();
    if (form.nombre_deposito === "" || form.nombre_deposito.length < 1) {
      nombre_depositoRef.current.focus();
      return false;
    }
    if(form.id_deposito===""){
      guardar(form);
      
    }
    else{
      editar(form);
      
    }
    cerrar();
  };

  return (
    <Dialog open={dialogs.editar} onClose={cerrar} TransitionComponent={Zoom} fullWidth>
      <DialogTitle>{lang.deposito}</DialogTitle>
    <form onSubmit={guardarValidate}>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              inputRef={nombre_depositoRef}
              onChange={onChange}
              name="nombre_deposito"
              autoFocus
              value={form.nombre_deposito}
              fullWidth
              label={lang.nombre}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" type="submit">
          {lang.guardar}
        </Button>
        <Button variant="contained" onClick={cerrar}>
          {lang.cancelar}
        </Button>
      </DialogActions>
      </form>
    </Dialog>
  );
};

export default DialogDepositos;
