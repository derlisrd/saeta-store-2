import {
  Button,FormControl,  FormControlLabel,  FormLabel,  DialogContent,  DialogActions,  DialogTitle,  Dialog,  Radio,  RadioGroup,  TextField,  Typography,  Breadcrumbs,  Icon,  Grid,  LinearProgress} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import swal from "sweetalert";
import { APICALLER } from "../../Api/ApiCaller";
import { useLogin } from "../../Contexts/LoginProvider";
import { useParams } from "react-router-dom";


//************************* */
const ClientesForm = () => {
  const { id } = useParams();

  const { token_user } = useLogin();

  let initialState = {
    nombre_cliente: "",
    telefono_cliente: "",
    ruc_cliente: "",
    email_cliente: "",
    direccion_cliente: "",
    tipo_cliente: "3",
  };
  const [formulario, setFormulario] = useState(initialState);
  const [cargando, setCargando] = useState(true);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const enviarNuevoCLiente = async (e) => {
    e.preventDefault();
    let call = null;
    let textsucces = "";
    if (id) {
      call = await APICALLER.update({
        table: `clientes`,
        data: formulario,
        token: token_user,
        id: id,
      });
      textsucces = "Actualizado";
    } else {
      call = await APICALLER.insert({
        table: `clientes`,
        data: formulario,
        token: token_user,
      });
      textsucces = "Agregado";
    }

    if (call.response === "ok") {
      swal({
        icon: "success",
        title: textsucces,
        timer: 1300,
      });
      
    }
  };

  const getDatas = useCallback(async () => {
    if (id) {
      let res = await APICALLER.get({
        table: "clientes",
        where: `id_cliente,=,${id}`,
      });
      setFormulario({ ...res.results[0] });
    }
    setCargando(false);
  }, [id]);


  useEffect(() => {
    const ca = new AbortController();
    let isActive = true;
    if (isActive) {
      getDatas();
    }
    return () => {
      isActive = false;
      ca.abort();
    };
  }, [getDatas]);

  const cerrar_dialog = () => {
   
  };

  return (
    <Dialog fullWidth open={true} maxWidth="md" onClose={cerrar_dialog}>
      <form onSubmit={enviarNuevoCLiente}>
        <DialogTitle>{id ? `Editar` : `Nuevo`} cliente</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {cargando && <LinearProgress />}
            </Grid>
            <Grid item xs={12}>
              <Breadcrumbs separator="›">
                <Typography variant="overline">Clientes</Typography>
                <Typography variant="overline">Nuevo</Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                onChange={onChange}
                name="nombre_cliente"
                required
                value={formulario.nombre_cliente && formulario.nombre_cliente}
                fullWidth
                label="Nombre"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                onChange={onChange}
                name="ruc_cliente"
                value={formulario.ruc_cliente}
                label="Ruc o CI"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="telefono_cliente"
                label="Número de teléfono"
                onChange={onChange}
                value={
                  formulario.telefono_cliente !== null
                    ? formulario.telefono_cliente
                    : ``
                }
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>

            <TextField
              fullWidth
              label="Dirección"
              onChange={onChange}
              name="direccion_cliente"
              value={
                formulario.direccion_cliente !== null
                ? formulario.direccion_cliente
                : ``
              }
              />
              </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                onChange={onChange}
                name="email_cliente"
                value={
                  formulario.email_cliente !== null
                    ? formulario.email_cliente
                    : ``
                }
                label="Correo Electrónico"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Tipo:</FormLabel>
                <RadioGroup
                  name="tipo_cliente"
                  value={formulario.tipo_cliente}
                  onChange={onChange}
                >
                  <FormControlLabel
                    value={3}
                    control={
                      <Radio checked={formulario.tipo_cliente === "3"} />
                    }
                    label="Casual"
                  />
                  <FormControlLabel
                    value={2}
                    control={
                      <Radio checked={formulario.tipo_cliente === "2"} />
                    }
                    label="Minorista"
                  />
                  <FormControlLabel
                    value={1}
                    control={
                      <Radio checked={formulario.tipo_cliente === "1"} />
                    }
                    label="Mayorista"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            size="large"
            startIcon={<Icon>save</Icon>}
            variant="outlined"
            color="primary"
            type="submit"
          >
            GUARDAR
          </Button>
          <Button onClick={cerrar_dialog} size="large" variant="outlined">
            CANCELAR
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ClientesForm;
