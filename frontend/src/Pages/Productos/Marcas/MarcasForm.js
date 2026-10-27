import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Grid, LinearProgress,Zoom
} from "@mui/material";
import { useMarcas } from "./MarcasProvider";

const MarcasForm = () => {
  const {
    formulario,
    setFormulario,
    openDialog,
    setOpenDialog,
    cargando,
    enviarFormulario,lang
  } = useMarcas();
  const cerrar = () => {
    setFormulario({ nombre_marca: "" });
    setOpenDialog(false);
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  return (
    <Dialog fullWidth open={openDialog} onClose={cerrar} TransitionComponent={Zoom}>
      <form onSubmit={enviarFormulario}>
        <DialogTitle>{lang.marcas}</DialogTitle>
        <DialogContent dividers>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              {cargando && <LinearProgress /> }
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                autoComplete="off"
                value={formulario.nombre_marca}
                name="nombre_marca"
                onChange={onChange}
                fullWidth
                label={lang.nombre}
                disabled={cargando}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="submit">
            {lang.guardar}
          </Button>
          <Button variant="contained" onClick={cerrar}>
            {lang.cerrar}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MarcasForm;
