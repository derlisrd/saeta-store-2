import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  InputAdornment,
  LinearProgress,
  TextField,
} from "@mui/material";
import { useRef, useState } from "react";
import { APICALLER } from "../../../Services/api";
import { useLogin } from "../../../Contexts/LoginProvider";
import { useVentas } from "./VentasProvider";

const DialogRegistroCliente = () => {
  const {
    dialogs,
    setDialogs,
    datosFacturas,
    indexFactura,
    setearFactura,
    setErrors,
    errors,
    lang,
  } = useVentas();
  const { userData } = useLogin();
  const { token_user } = userData;
  /* const initialForm = {
    ruc_cliente: "",
    nombre_cliente: "",
    direccion_cliente: "",
    telefono_cliente: "",
    email_cliente: "",
  };
  const [formCliente, setFormCliente] = useState(initialForm); */
  const initialErros = {
    ruc_cliente: false,
    nombre_cliente: false,
    ruc_error: "",
    nombre_error: "",
  };
  const [formError, setFormError] = useState(initialErros);
  const [cargando, setCargando] = useState(false);

  const ruc_cliente = useRef(null);
  const nombre_cliente = useRef(null);

  const cerrar = () => {
    setDialogs({ ...dialogs, registrarCliente: false,buscarCliente:false,cambioCliente:false });
    //setFormCliente(initialForm);
    setFormError(initialErros);
    setCargando(false);
  };

  /* const cambiarValor = (e) => {
    const { name, value } = e.target;
    setFormCliente({ ...formCliente, [name]: value });
  }; */

  const VerificarRegistro = async (e) => {
    e.preventDefault()
    setFormError(initialErros);
    const data = new FormData(e.target)
    let formCliente = (Object.fromEntries(data.entries()));
    
    if (formCliente.ruc_cliente.length < 3) {
      setFormError({
        ...formError,
        ruc_cliente: true,
        ruc_error: "Complete este dato",
      });
      ruc_cliente.current?.focus();
      return false;
    }

    if (formCliente.nombre_cliente.length < 4) {
      setFormError({
        ...formError,
        nombre_cliente: true,
        nombre_error: "El nombre debe tener al menos 5 letras",
      });
      nombre_cliente.current?.focus();
      return false;
    }

    let ruc = ruc_cliente.current.value;
    setCargando(true);
    const res = await APICALLER.get({
      table: "clientes",
      fields: "id_cliente",
      where: `ruc_cliente,=,'${ruc}'`,
    });

    if (res.found === 0) {
      const ins = await APICALLER.insert({
        table: "clientes",
        data: formCliente,
        token: token_user,
      });
      if (ins.response) {
        let fa = { ...datosFacturas };
        fa.facturas[indexFactura].datosCliente.id_cliente = ins.last_id;
        fa.facturas[indexFactura].datosCliente.ruc_cliente =
          formCliente.ruc_cliente;
        fa.facturas[indexFactura].datosCliente.nombre_cliente =
          formCliente.nombre_cliente;
        fa.facturas[indexFactura].datosCliente.direccion_cliente =
          formCliente.direccion_cliente;
        setErrors({ ...errors, cliente: false, clienteMensaje: "" });
        setearFactura(fa);
        cerrar();
      }
    } else {
      setFormError({
        ...formError,
        ruc_cliente: true,
        ruc_error: "Ese cliente ya esta registrado.",
      });
      ruc_cliente.current.focus();
    }
    setCargando(false);
  };

  return (
    <Dialog open={dialogs.registrarCliente} onClose={cerrar} fullWidth>
      <form onSubmit={VerificarRegistro}>
        <DialogTitle>{lang.registrar_cliente}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {cargando && <LinearProgress />}
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="off"
                required
                inputRef={ruc_cliente}
                
                label="Nro Documento"
                autoFocus
                fullWidth
                name="ruc_cliente"
                
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon color="disabled">description</Icon>
                    </InputAdornment>
                  ),
                }}
                error={formError.ruc_cliente}
                helperText={formError.ruc_error}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                inputRef={nombre_cliente}
                autoComplete="off"
                label="Nombre o nombre de empresa"
                fullWidth
                name="nombre_cliente"
                
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon color="disabled">person</Icon>
                    </InputAdornment>
                  ),
                }}
                error={formError.nombre_cliente}
                helperText={formError.nombre_error}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Teléfono"
                fullWidth
                autoComplete="off"
                name="telefono_cliente"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon color="disabled">phone</Icon>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Dirección"
                fullWidth
                autoComplete="off"
                name="direccion_cliente"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon color="disabled">location_city</Icon>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                autoComplete="off"
                name="email_cliente"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon color="disabled">alternate_email</Icon>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            type="submit"
          >
            {lang.registrar}
          </Button>
          <Button onClick={cerrar}>
            {lang.cancelar}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DialogRegistroCliente;
