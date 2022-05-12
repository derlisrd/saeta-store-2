import {
  Alert,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import { useTurnos } from "./TurnosProvider";

const TurnosDialogsEdit = () => {
  const {
    dialogs,
    setDialogs,
    cargando,
    listaEmpleados,
    formEdit,
    setFormEdit,cambiarEstado
  } = useTurnos();

  const cerrar = () => {
    setDialogs({ ...dialogs, editar: false });
  };

  const onChangeEdit = (e) => {
    const { value, name } = e.target;
    setFormEdit({ ...formEdit, [name]: value });
  };

  return (
    <Dialog open={dialogs.editar} maxWidth="md" onClose={cerrar} fullWidth>
      <DialogTitle>Cambiar estado</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          
          <Grid item xs={12}>
            {cargando.serviciosEdit && <LinearProgress />}
          </Grid>
          <Grid item xs={12}>
            <Alert severity="info" icon={false}>
              CLIENTE: {formEdit.nombre_cliente}
            </Alert>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {formEdit.servicios.map((e, i) => (
                <Chip
                  label={e.nombre_producto}
                  value={e.id_producto}
                  key={i}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Seleccione empleado</InputLabel>
              <Select
                name="id_empleado_turno"
                value={formEdit.id_empleado_turno}
                onChange={onChangeEdit}
              >
                <MenuItem value="0" disabled>
                  Seleccione empleado
                </MenuItem>
                {listaEmpleados.map((e, i) => (
                  <MenuItem key={i} value={e.id_empleado}>
                    {e.nombre_empleado}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Cambiar estado</FormLabel>
              <RadioGroup onChange={onChangeEdit} name="estado_turno">
                <FormControlLabel
                  value="0"
                  control={
                    <Radio
                      color="error"
                      checked={formEdit.estado_turno === "0"}
                    />
                  }
                  label="EN ESPERA"
                />
                <FormControlLabel
                  value="1"
                  control={
                    <Radio
                      color="success"
                      checked={formEdit.estado_turno === "1"}
                    />
                  }
                  label="ATENDIDO"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio checked={formEdit.estado_turno === "2"} />}
                  label="FINALIZADO"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={cambiarEstado} color="primary">
          CAMBIAR ESTADO
        </Button>
        <Button variant="outlined" color="secondary" onClick={cerrar}>
          CANCELAR
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TurnosDialogsEdit;
