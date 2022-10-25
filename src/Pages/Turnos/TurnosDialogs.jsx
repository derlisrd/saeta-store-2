import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Alert,
  Autocomplete,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Box,
  Chip,
} from "@mui/material";
import React, {
  useRef,
  useState,
  Fragment,
} from "react";
import { APICALLER } from "../../Services/api";
import LoadingBackDrop  from "../../Components/UI/LoadingBackDrop"; 
import { useTurnos } from "./TurnosProvider";

const TurnosDialogs = () => {
  const {
    dialogs,
    setDialogs,
    form,
    setForm,
    AgregarTurno,
    cargando,
    listaEmpleados,
    listaServicios,
  } = useTurnos();

  const [listaClientes, setListaClientes] = useState([]);
  const [errores, setErrores] = useState({
    completo: false,
    mensaje: "",
  });
  const inputBuscaCliente = useRef(null);

  const cerrar = () => setDialogs({ ...dialogs, agregar: false });

  const changeServices = (elem) => {
    let f = { ...form };
    const { value } = elem.target;
    let i = f.servicios.length;
    let index = f.servicios.findIndex((ex) => ex.id_producto === value[i]);

    if (index > -1) {
    } else {
      let found = listaServicios.find((e) => e.id_producto === value[i]);
      if (found) {
        f.servicios.push(found);
        setForm(f);
      }
    }
  };
  const deleteChip = (fr) => {
    let f = { ...form };
    let i = f.servicios.findIndex((e) => e.id_producto === fr.id_producto);
    if (i > -1) {
      f.servicios.splice(i, 1);
    }
    setForm(f);
  };

  const onChangeEdit = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const buscarClientes = async (e) => {
    let txt = e.target.value;
    let res = await APICALLER.get({
      table: "clientes",
      filtersSearch: txt,
      filtersField: "nombre_cliente",
    });
    res.response ? setListaClientes(res.results) : console.log(res);
  };
  const insertClient = (e, value) => {
    setForm({
      ...form,
      id_cliente_turno: value.id_cliente,
      nombre_cliente: value.nombre_cliente,
    });
  };

  const verificarTodo = () => {
    let m = form;
    if (
      m.servicios.length < 1 ||
      m.id_empleado_turno === "" ||
      m.horario_turno === "" ||
      m.fecha_turno === "" ||
      m.id_cliente_turno === ""
    ) {
      setErrores({
        ...errores,
        completo: true,
        mensaje: "Complete todos los datos correctamente",
      });
      return false;
    }
    AgregarTurno();
  };

  

  const abrirRegistrar = () =>
    setDialogs({ ...dialogs, registrarCliente: true });

  return (
    <Dialog open={dialogs.agregar} maxWidth="md" onClose={cerrar} fullWidth>
      {cargando.servicios ? (
        <LoadingBackDrop />
      ) : (
        <Fragment>
          <DialogTitle>
            {form.id_turno === "" ? "AGENDAR TURNO" : "CAMBIAR ESTADO"}
          </DialogTitle>
          <DialogContent dividers>
              <Grid container spacing={2}>
                {errores.completo && (
                  <Grid item xs={12}>
                    <Alert severity="error">{errores.mensaje}</Alert>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Autocomplete
                    loadingText="Cargando..."
                    noOptionsText="No hay clientes con ese nombre"
                    onChange={insertClient}
                    disableClearable
                    options={listaClientes}
                    getOptionLabel={(option) =>
                      option.nombre_cliente + " " + option.ruc_cliente
                    }
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        autoFocus
                        inputRef={inputBuscaCliente}
                        onChange={buscarClientes}
                        fullWidth
                        label="Buscar por nombre de cliente..."
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={7}>
                  <FormControl fullWidth>
                    <InputLabel>Seleccione empleado</InputLabel>
                    <Select
                      name="id_empleado_turno"
                      value={form.id_empleado_turno}
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
                <Grid item sm={5} xs={12} justifyContent="flex-end">
                  <Button variant="outlined" onClick={abrirRegistrar}>
                    Registrar nuevo cliente
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {form.servicios.map((e, i) => (
                      <Chip
                        label={e.nombre_producto}
                        value={e.id_producto}
                        key={i}
                        color="primary"
                        variant="outlined"
                        onDelete={() => deleteChip(e)}
                      />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Seleccione servicio</InputLabel>
                    <Select
                      multiple
                      onChange={changeServices}
                      name="servicios"
                      value={form.servicios}
                      input={<OutlinedInput label="Servicios" />}
                    >
                      {listaServicios.map((e, i) => (
                        <MenuItem key={i} value={e.id_producto}>
                          <Checkbox
                            checked={
                              form.servicios.findIndex(
                                (fi) => fi.id_producto === e.id_producto
                              ) > -1
                            }
                          />
                          <ListItemText primary={e.nombre_producto} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Alert severity="info" icon={false} variant="outlined">
                    CLIENTE: {form.nombre_cliente}
                  </Alert>
                </Grid>

                <Grid item xs={6}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Estado de atencion</FormLabel>
                    <RadioGroup onChange={onChangeEdit} name="estado_turno">
                      <FormControlLabel
                        value="0"
                        control={
                          <Radio
                            color="error"
                            checked={form.estado_turno === "0"}
                          />
                        }
                        label="EN ESPERA"
                      />
                      <FormControlLabel
                        value="1"
                        control={
                          <Radio
                            color="success"
                            checked={form.estado_turno === "1"}
                          />
                        }
                        label="ATENDIDO"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    helperText="Fecha de turno"
                    type="date"
                    name="fecha_turno"
                    onChange={onChangeEdit}
                    required
                    fullWidth
                  />

                  <TextField
                    fullWidth
                    helperText="Horario"
                    type="time"
                    name="horario_turno"
                    onChange={onChangeEdit}
                    required
                  />
                </Grid>
              </Grid>
            
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={verificarTodo}
              color="primary"
            >
              AGREGAR TURNO
            </Button>
            <Button variant="outlined" color="secondary" onClick={cerrar}>
              Cancelar
            </Button>
          </DialogActions>
        </Fragment>
      )}
    </Dialog>
  );
};

export default TurnosDialogs;
