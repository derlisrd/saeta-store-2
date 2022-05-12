import {
  Dialog,
  DialogTitle,
  Icon,
  IconButton,
  DialogContent,
  TextField,
  DialogActions,
  LinearProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button, 
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { APICALLER } from "../../../Api/ApiCaller";
import { StylesGenerales } from "../../../Styles/StylesGenerales";
import { useMovimientos } from "./MovimientosProvider";
import NumberFormatCustom from "../../../Componentes/NumberFormatCustom";
import { useLogin } from "../../../Contextos/LoginProvider";
import { Funciones } from "../../../Funciones/Funciones";
import swal from "sweetalert";

const RegistrarMovimiento = () => {
  const classes = StylesGenerales();
  const { setDialog, dialog, fecha,getData } = useMovimientos();
  const [listaRegistros, setListaRegistros] = useState([]);
  const [listaCajas, setListaCajas] = useState([]);

  const { id_user, token_user } = useLogin();

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

      let res = await Promise.all([await APICALLER.get({
        table: "cajas",include:'cajas_users',
        on: "id_caja_caja,id_caja",
        where: `id_user_caja,=,${id_user},and,estado_caja,=,1`,
        fields: "nombre_caja,id_caja,monto_caja",
      }),await APICALLER.get({ table: "cajas_registros",where:"show_registro,=,1" })])
      
      res[0].response === "ok" ? setListaCajas(res[0].results) : console.log(res[0]);
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
    <Dialog fullWidth open={dialog.registrar} onClose={cerrar}>
      <DialogTitle>
        <div className={classes.titulodialog}>
          REGISTRAR MOVIMIENTO
          <IconButton onClick={cerrar}>
            <Icon>close</Icon>
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {cargando && <LinearProgress />}

        <FormControl className={classes.selects}>
          <InputLabel className={classes.labelSelect}>
            Seleccione la caja
          </InputLabel>
          <Select
            name="id_caja_movimiento"
            variant="outlined"
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
        <TextField
          className={classes.textfield}
          fullWidth
          variant="outlined"
          label="Monto efectivo en caja"
          disabled
          value={`Gs. ${Funciones.numberSeparator(VALOR_EN_CAJA)}`}
        />

        <FormControl className={classes.selects}>
          <InputLabel className={classes.labelSelect}>
            Selecciona registro
          </InputLabel>
          <Select
            name="id_tipo_registro"
            variant="outlined"
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

        <TextField
          className={classes.textfield}
          fullWidth
          label="Monto de movimiento"
          value={montoMovimiento}
          InputProps={{
            inputComponent: NumberFormatCustom,inputProps: { min: 0 }
          }}
          onChange={(e) => {
            setMontoMovimiento(
              e.target.value === "" ? 0 : parseFloat(e.target.value)
            );
          }}
          variant="outlined"
        />
        <TextField
          className={classes.textfield}
          variant="outlined"
          label="Observaciones y detalles"
          onChange={onChange}
          name="motivo_movimiento"
          fullWidth
          value={formulario.motivo_movimiento}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          disabled={cargando}
          onClick={EfectuarMovimiento}
          color="primary"
        >
          Registrar
        </Button>
        <Button variant="outlined" onClick={cerrar}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default RegistrarMovimiento;
