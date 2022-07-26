import {Dialog,DialogTitle,DialogContent,TextField,DialogActions,LinearProgress,Select,MenuItem,FormControl,InputLabel,Button,Zoom, Grid} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { APICALLER } from "../../../Services/api";
import { useMovimientos } from "./MovimientosProvider";
import NumberFormatCustom from "../../../Components/thirty/NumberFormatCustom";
import { useLogin } from "../../../Contexts/LoginProvider";
import { funciones } from "../../../Functions";
import swal from "sweetalert";

const RegistrarMovimiento = () => {
  const { setDialog, dialog, fecha,getData,lang } = useMovimientos();
  const [listaRegistros, setListaRegistros] = useState([]);
  const [listaCajas, setListaCajas] = useState([]);

  const {userData} = useLogin()
  const { id_user, token_user } = userData;

  const [cargando, setCargando] = useState(true);
  const initialFormulario = {
    id_tipo_registro: "",
    id_caja_movimiento: "",
    motivo_movimiento: "",
  };
  const [formulario, setFormulario] = useState(initialFormulario);
  const [montoMovimiento, setMontoMovimiento] = useState(0);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };
  const cerrar = () => {
    setDialog({...dialog,registrar:false});
    setFormulario(initialFormulario);
    setMontoMovimiento(0);
  };
  const getListaRegistros = useCallback(async () => {
    if (dialog.registrar) {

      let res = await Promise.all([ 
      APICALLER.get({
        table: "cajas",include:'cajas_users,cajas_monedas,monedas',
        on: "id_caja_caja,id_caja,id_caja,id_caja_moneda,id_moneda_caja_moneda,id_moneda",
        where: `id_user_caja,=,${id_user},and,estado_caja,=,'open'`,
        fields: "nombre_caja,id_caja,monto_caja_moneda,nombre_moneda,id_caja,id_cajas_moneda"}), 
      APICALLER.get({ table: "cajas_registros",where:"show_registro,=,1" }),
      APICALLER.get({ table: "cajas",where: `id_user_caja,=,${id_user},and,estado_caja,=,'open'`})
    ])

      res[2].response === "ok" ? setListaCajas(res[0].results) : console.log(res[0]);
      "ok"===res[1].response?setListaRegistros(res[1].results):console.log(res[1]); 
    }
    setCargando(false);
  }, [dialog, id_user]);

  /*==================================================================*/
  /*==================================================================*/
  let VALOR_EN_CAJA = 0;
  let found = listaCajas.find(e=> e.id_caja === formulario.id_caja_movimiento);
  VALOR_EN_CAJA = found ? parseFloat(found.monto_caja) : "0";
  /*==================================================================*/
  /*==================================================================*/

  const EfectuarMovimiento = async () => {
    if (formulario.id_tipo_registro === "") {
      return false;
    }
    if (formulario.id_caja_movimiento === "") {
      return false;
    }

    setCargando(true);
    let f = new Date();
    let fecha_actual = `${fecha} ${f.getHours()}:${f.getMinutes()}:${f.getSeconds()}`;
    let TIPO_REGISTRO = listaRegistros.find(
      (item) => item.id_cajas_registro === formulario.id_tipo_registro
    );
    // si es 0 entonces va a restar sino suma

    var datos = {
      id_caja_movimiento: formulario.id_caja_movimiento,
      id_user_movimiento: id_user,
      id_tipo_registro: TIPO_REGISTRO.id_cajas_registro,
      monto_movimiento: montoMovimiento,
      detalles_movimiento: formulario.motivo_movimiento,
      fecha_movimiento: fecha_actual,
    };
    let datosUpdate = {};

    if (TIPO_REGISTRO.tipo_registro === "0") {
      if (VALOR_EN_CAJA < montoMovimiento) {
        console.log("MONTO ES MAYOR A LO QUE HAY");
        setCargando(false);
        return false;
      } else {
        datosUpdate = {
          monto_caja: VALOR_EN_CAJA - montoMovimiento,
        };
      }
    } else {
      datosUpdate = {
        monto_caja: VALOR_EN_CAJA + montoMovimiento,
      };
    }

    let res = await Promise.all([APICALLER.update({
      table: "cajas",
      data: datosUpdate,
      id: formulario.id_caja_movimiento,
      token: token_user,
    }),await APICALLER.insert({
      table: "cajas_movimientos",
      token: token_user,
      data: datos,
    })])
    if(res[0].response==="ok" && res[1].response==="ok"){
      swal({text:'Movimiento de caja registrado',icon:'success',timer:1200}).then(()=>{cerrar();getData();})
    }
    else{
      console.log(res)
    }
    setCargando(false);
  };

  useEffect(() => {
    const ca = new AbortController();
    let isActive = true;
    if (isActive) {
      getListaRegistros();
      setCargando(false);
    }
    return () => {
      isActive = false;
      ca.abort();
    };
    
  }, [getListaRegistros]);

  return (
    <Dialog fullWidth open={dialog.registrar} onClose={cerrar} TransitionComponent={Zoom}>
      <DialogTitle>
        {lang.registrar_movimiento}
      </DialogTitle>
      <DialogContent dividers>

    <Grid container spacing={2}>
      <Grid item xs={12}>
        {cargando && <LinearProgress />}
      </Grid>

      <Grid item xs={12}>
      <FormControl fullWidth>
          <InputLabel >
            {lang.seleccione_caja}
          </InputLabel>
          <Select
            name="id_caja_movimiento"
            value={formulario.id_caja_movimiento}
            onChange={onChange}
          >
            {listaCajas.map((d, index) => (
              <MenuItem key={index} value={d.id_caja}>
                {d.nombre_caja}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
            fullWidth
            label={lang.monto_efe_caja}
            disabled
            value={`${funciones.numberSeparator(VALOR_EN_CAJA)}`}
          />
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
            <InputLabel>
              {lang.selecciona_registro}
            </InputLabel>
            <Select
              name="id_tipo_registro"
              value={formulario.id_tipo_registro}
              onChange={onChange}
            >
              {listaRegistros.map((d, index) => (
                <MenuItem key={index} value={d.id_cajas_registro}>
                  {d.descripcion_registro} (
                  {d.tipo_registro === "1" ? `Ingreso` : `Retiro`})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
            fullWidth
            label={lang.monto_movimiento}
            value={montoMovimiento}
            InputProps={{
              inputComponent: NumberFormatCustom,inputProps: { min: 0 }
            }}
            onChange={(e) => {
              setMontoMovimiento(
                e.target.value === "" ? 0 : parseFloat(e.target.value)
              );
            }}
          />
      </Grid>
      <Grid item xs={12}>
        <TextField
            label={lang.obs_detalles}
            onChange={onChange}
            name="motivo_movimiento"
            fullWidth
            value={formulario.motivo_movimiento}
          />
      </Grid>
    </Grid>
  </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disabled={cargando}
          onClick={EfectuarMovimiento}
          color="primary"
        >
          {lang.registrar}
        </Button>
        <Button variant="contained" onClick={cerrar}>
          {lang.cancelar}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default RegistrarMovimiento;
