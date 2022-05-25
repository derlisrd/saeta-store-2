import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Icon,
  IconButton,
  TextField,
  DialogContentText,
  Button,
  LinearProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { APICALLER } from "../../Api/ApiCaller";
import { StylesGenerales } from "../../Styles/StylesGenerales";
import { useMonedas } from "./MonedasProvider";
import { useLogin } from "../../Contextos/LoginProvider";
import NumberFormatCustom from "../../Componentes/NumberFormatCustom";

const DialogCotizacion = () => {
  const classes = StylesGenerales();
  const { token_user } = useLogin();
  const {
    setDialogCotizacion,
    dialogCotizacion,
    datosMonedas,
    lista,
    setLista,
  } = useMonedas();
  const [data, setData] = useState({
    valor_moneda: "",
  });
  const [cargando, setCargando] = useState(false);
  const cerrar = () => {
    setDialogCotizacion(false);
  };

  const enviar = async () => {
    setCargando(true);
    let res = await APICALLER.update({
      table: "monedas",
      id: datosMonedas.id_moneda,
      data: data,
      token: token_user,
    });
    if (res.response === "ok") {
      let index = lista.findIndex(
        (i) => i.id_moneda === datosMonedas.id_moneda
      );
      let array = [...lista];
      array[index].valor_moneda = data.valor_moneda;
      setLista(array);
      cerrar();
    } else {
      console.log(res);
    }
    setCargando(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  useEffect(() => {
    const getDatos = () => {
      if (dialogCotizacion) {
        setData({ valor_moneda: datosMonedas.valor_moneda });
      }
    };
    getDatos();
  }, [dialogCotizacion, datosMonedas]);

  return (
    <Dialog open={dialogCotizacion} onClose={cerrar} fullWidth>
      <DialogTitle>
        <div className={classes.titulodialog}>
          <div>Cambiar cotización</div>
          <IconButton onClick={() => cerrar()}>
            <Icon>close</Icon>
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {cargando && <LinearProgress />}
        <DialogContentText>
          Con respecto a la moneda principal
        </DialogContentText>
        <TextField
          variant="outlined"
          onChange={onChange}
          name="valor_moneda"
          InputProps={{ 
            inputComponent:NumberFormatCustom,
          }}
          value={data.valor_moneda}
          label="Cotización"
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          onClick={enviar}
          disabled={cargando}
        >
          Confirmar
        </Button>
        <Button variant="outlined" onClick={cerrar}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCotizacion;
