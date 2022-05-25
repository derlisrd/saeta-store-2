import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  TextField,
  Grid, LinearProgress
} from "@mui/material";
import { useMarcas } from "./MarcasProvider";

const MarcasForm = () => {
  const {
    formulario,
    setFormulario,
    openDialog,
    setOpenDialog,
    cargando,
    enviarFormulario,
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
    <Dialog fullWidth open={openDialog} onClose={cerrar}>
      <form onSubmit={enviarFormulario}>
        <DialogTitle>Marcas</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            {formulario.id_marca
              ? `Editar el nombre de la marca`
              : `Ingrese el nombre de la marca`}
          </DialogContentText>
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
                variant="outlined"
                helperText="Nombre de la marca"
                disabled={cargando}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={enviarFormulario}>
            {" "}
            {formulario.id_marca ? `EDITAR` : `AGREGAR`}
          </Button>
          <Button variant="outlined" onClick={cerrar}>
            CERRAR
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MarcasForm;
