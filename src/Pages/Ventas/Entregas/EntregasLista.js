import {
  Button,
  Grid,
  Typography,
  Icon,
  Avatar,
  TextField,
  Container,
  CircularProgress,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

import { useEntregas } from "./EntregasProvider";
import EntregasView from "./EntregasView";

const EntregasLista = () => {
  const { nroFactura, getFactura, lista, cargando, tipoFactura, setTipoFactura } = useEntregas();

  const [error, setError] = useState(false);
  const [errorMsj, setErrorMsj] = useState("Ingrese el número de factura");
  const PressEnter = (e) => {
    e.key === "Enter" && Consultar();
  };

  const Consultar = () => {
    let nro = nroFactura.current.value;

    if (nro === "") {
      setError(true);
      setErrorMsj("Ingrese correctamente el número de factura");
      nroFactura.current.focus();
      return false;
    }
    setError(false);
    setErrorMsj("Ingrese el número de factura");
    getFactura();
  };

  return (
    <Container disableGutters>
      <Grid container spacing={2} justify="flex-start" alignItems="flex-start">
        <Grid item xs={12} md={1}>
          <Avatar
            variant="rounded"
            style={{
              padding: 8,
              backgroundColor: `#3f51b5`,
            }}
          >
            <Icon fontSize="large">delivery_dining</Icon>
          </Avatar>
        </Grid>
        <Grid item xs={12} md={11}>
          <Typography variant="button">Entregas</Typography>
          <br />
          <Typography variant="caption">
            En el módulo de ENTREGAS se dan salida a los productos vendidos del
            stock del sistema. Ingresando el número de factura se visualiza los
            productos pendientes de entregas.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel variant="outlined">Tipo</InputLabel>
            <Select
              variant="outlined"
              onChange={(e)=>{ setTipoFactura(e.target.value) }}
              name="tipo_factura"
              value={tipoFactura}
            >
                <MenuItem value="0">
                  Recibo
                </MenuItem>
                <MenuItem value="1">
                  Factura Contado
                </MenuItem>
                <MenuItem value="2">
                  Factura Crédito
                </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            
            onKeyPress={PressEnter}
            inputRef={nroFactura}
            label={ `Número de ${tipoFactura==="0" ? "recibo" : "factura"}`}
            helperText={errorMsj}
            autoFocus
            variant="outlined"
            fullWidth
            error={error}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {cargando && <CircularProgress size={24} />}
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Button
            size="large"
            variant="outlined"
            onClick={Consultar}
            color="primary"
          >
            Consultar
          </Button>
        </Grid>

        <Grid item xs={12}>
        
          <EntregasView datos={lista} />
          
        </Grid>
      </Grid>
    </Container>
  );
};

export default EntregasLista;
