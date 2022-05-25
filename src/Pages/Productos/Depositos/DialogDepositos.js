import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField, Collapse
} from "@mui/material";
import {  useRef } from "react";
import { useDepositos } from "./DepositosProvider";

const DialogDepositos = () => {
  const { setDialogs, dialogs, guardar,form,setForm,editar } = useDepositos();
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
    <Dialog open={dialogs.editar} onClose={cerrar} TransitionComponent={Collapse} fullWidth>
      <DialogTitle>{form.id_deposito===""? `Agregar depósito nuevo`: `Editar depósito`}</DialogTitle>
    <form onSubmit={guardarValidate}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              inputRef={nombre_depositoRef}
              onChange={onChange}
              name="nombre_deposito"
              variant="outlined"
              autoFocus
              value={form.nombre_deposito}
              fullWidth
              label="Nombre del depósito"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" type="submit">
          Guardar
        </Button>
        <Button variant="outlined" onClick={cerrar}>
          Cancelar
        </Button>
      </DialogActions>
      </form>
    </Dialog>
  );
};

export default DialogDepositos;
