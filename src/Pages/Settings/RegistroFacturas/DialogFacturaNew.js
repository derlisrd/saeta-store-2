import {Dialog,DialogContent,DialogTitle,DialogActions,Button,DialogContentText,TextField,Select,MenuItem,FormControl,InputLabel, Grid} from "@mui/material";
import { useState, useEffect } from "react";
import { APICALLER } from "../../../Services/api";
import { useLogin } from "../../../Contexts/LoginProvider";
import { useRegistroFacturas } from "./RegistroFacturasProvider";
import swal from "sweetalert";

const DialogFacturaNew = () => {
  const { token_user } = useLogin();
  const { openModal, setOpenModal, getFacturas,} = useRegistroFacturas();
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
  };
  const [formulario, setFormulario] = useState(inicial);
  const [listaCajas, setListaCajas] = useState([]);

  const enviarFormulario = async (e) => {
    e.preventDefault();
    let form = { ...formulario };
    form.last_nro_factura = formulario.nro_inicio_factura;
    localStorage.removeItem("facturasStorage");
    let res = await APICALLER.insert({
      table: "empresa_facturas",
      data: form,
      token: token_user,
    });
    if (res.response === "ok") {
      getFacturas();
      swal({icon:"success", text:"Registrado correctamente", timer:1200})
      localStorage.removeItem("facturasStorage");
      cerrar();
    } else {
      console.log(res);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const cerrar = () => {setOpenModal(false); setFormulario(inicial) }

  const getCajas = async () => {
    let res = await APICALLER.get({
      table: "cajas",
      fields: "nombre_caja,id_caja",
    });

    if(res.response==="ok"){
      setListaCajas(res.results)
    }
    else{
      console.log(res)
    }
    
  };

  useEffect(() => {
    getCajas();
  }, []);

  return (
    <Dialog open={openModal} fullWidth maxWidth="md" scroll="body"  onClose={cerrar}>
      <form onSubmit={enviarFormulario}>
        <DialogTitle>Registrar talonario</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Recuerde que este formulario solo será válido cuando la SET le
            genere una factura
          </DialogContentText>
          
          <Grid container spacing={2}>

         <Grid item xs={12}>
          <TextField
            fullWidth
            autoFocus
            label="Timbrado nro"
            variant="outlined"
            name="timbrado_factura"
            onChange={onChange}
            helperText="El timbrado debe estar correctamente"
            value={formulario.timbrado_factura}
            required

          />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              helperText="Fecha inicio de timbrado"
              variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
            name="nro_fin_factura"
            onChange={onChange}
            helperText="Ej: 350"
            type="number"
            value={formulario.nro_fin_factura}
            required
          />
          </Grid>
          <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Asignar factura a caja</InputLabel>
            <Select
              value={formulario.id_caja_empresa}
              name="id_caja_empresa"
              variant="outlined"
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
          <Button variant="outlined" type="submit" color="primary">
            Registrar
          </Button>
          <Button variant="outlined" onClick={cerrar}>
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DialogFacturaNew;
