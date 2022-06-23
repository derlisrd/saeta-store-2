import {Dialog,DialogContent,DialogTitle,DialogActions,Button,TextField,Select,MenuItem,FormControl,InputLabel, Grid, LinearProgress, FormControlLabel, FormLabel, Radio} from "@mui/material";
import { useState } from "react";
import { useRegistroFacturas } from "./RegistroFacturasProvider";


const DialogFacturaNew = () => {

  const { openModal, setOpenModal,lang,listaCajas,registrar,cargando} = useRegistroFacturas();
  const inicial = {
    id_empresa_empresa: "1",
    id_caja_empresa: "",
    timbrado_factura: "",
    inicio_timbrado: "",
    fin_timbrado: "",
    nro_datos_factura: "",
    nro_inicio_factura: "",
    nro_fin_factura: "",
    last_nro_factura: "",
    autoimpresor:"0",
    fecha_empresa_factura:"",
    obs_empresa_factura:""
  };
  const [formulario, setFormulario] = useState(inicial);

  const enviarFormulario = e => {
    e.preventDefault();
    registrar(formulario);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const cerrar = () => {setOpenModal(false); setFormulario(inicial) }


  return (
    <Dialog open={openModal} fullWidth maxWidth="md" scroll="body"  onClose={cerrar}>
      <form onSubmit={enviarFormulario}>
        <DialogTitle>{lang.nuevo_talonario}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
          <Grid item xs={12}>
            {cargando.save && <LinearProgress />}
          </Grid>
          <Grid item xs={12}>
          Recuerde que este formulario solo será válido cuando la SET le
            genere una factura
          </Grid>
         <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            autoFocus
            label="Timbrado nro"
            name="timbrado_factura"
            onChange={onChange}
            helperText="El timbrado debe estar correctamente"
            value={formulario.timbrado_factura}
            required

          />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            helperText="Fecha de habilitacion" type="date"
            name="fecha_empresa_factura"
            onChange={onChange}
            value={formulario.fecha_empresa_factura}
            required

          />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              helperText="Fecha inicio de timbrado"
              name="inicio_timbrado"
              onChange={onChange}
              type="date"
              value={formulario.inicio_timbrado}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            helperText="Fecha fin de timbrado"
            name="fin_timbrado"
            onChange={onChange}
            type="date"
            value={formulario.fin_timbrado}
            required
          />
</Grid>
<Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Nros iniciales de factura"
            name="nro_datos_factura"
            onChange={onChange}
            helperText="Ej: 001-002"
            value={formulario.nro_datos_factura}
            required
          />
</Grid>
<Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Nro de inicio de factura"
            name="nro_inicio_factura"
            onChange={onChange}
            helperText="Ej: 300"
            type="number"
            value={formulario.nro_inicio_factura}
            required
          />
          </Grid>

      <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Nro de final de factura"
            name="nro_fin_factura"
            onChange={onChange}
            helperText="Ej: 350"
            type="number"
            value={formulario.nro_fin_factura}
            required
          />
          </Grid>
          <Grid item xs={12}>
          <FormLabel component="legend">Autoimpresor?:</FormLabel>
          <FormControlLabel
            value="0"
            control={
              <Radio name="autoimpresor" checked={formulario.autoimpresor === "0"}  onChange={onChange}   />
            }
            label="No"
            labelPlacement="end"
          />
          <FormControlLabel
            value="1"
            control={
              <Radio name="autoimpresor" checked={formulario.autoimpresor === "1"} onChange={onChange} />
            }
            label="Si"
            labelPlacement="end"
          />
          </Grid>
          <Grid item xs={12} >
            <TextField fullWidth onChange={onChange} name="obs_empresa_factura" value={formulario.obs_empresa_factura} label="Observaciones importantes a declarar por la set" />
          </Grid>
          <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Asignar factura a caja</InputLabel>
            <Select
              value={formulario.id_caja_empresa}
              name="id_caja_empresa"
              onChange={onChange}
              required
            >
              {
                listaCajas.length<1 && <MenuItem disabled>No hay cajas disponibles</MenuItem>
              }
              {listaCajas.map((item) => (
                <MenuItem key={item.id_caja} value={item.id_caja}>
                  {item.nombre_caja}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          </Grid>
          
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" size="large" type="submit" color="primary">
            {lang.registrar}
          </Button>
          <Button variant="contained" size="large" onClick={cerrar}>
            {lang.cancelar}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DialogFacturaNew;
