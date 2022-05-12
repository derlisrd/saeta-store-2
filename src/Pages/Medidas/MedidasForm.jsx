import { TextField, DialogTitle, Grid, DialogActions, Button, Zoom } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useMedidas } from "./MedidasProvider";

const MedidasForm = () => {
  const { form, setForm,dialog,setDialog,Guardar } = useMedidas();
  const cerrar = () => {
      setDialog(false)
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    Guardar()
  };

  return (
    <form onSubmit={onSubmit}>
      <Dialog open={dialog} fullWidth onClose={cerrar} TransitionComponent={Zoom}>
        <DialogTitle>Medida</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                autoFocus
                fullWidth
                variant="outlined"
                label="Descripción de medida"
                name="descripcion_medida"
                value={form.descripcion_medida}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="símbolo de abreviatura"
                variant="outlined"
                name="simbolo_medida"
                value={form.simbolo_medida}
                onChange={onChange}
                
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" onClick={onSubmit} color="primary">Guardar</Button>
            <Button variant="outlined" onClick={cerrar} color="primary">Cerrar</Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default MedidasForm;
