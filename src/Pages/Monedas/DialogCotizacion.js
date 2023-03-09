import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Button,
  LinearProgress,Zoom, Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { APICALLER } from "../../Services/api";
import { useMonedas } from "./MonedasProvider";
import { useLogin } from "../../Contexts/LoginProvider";
import NumberFormatCustom from "../../Components/thirty/NumberFormatCustom";

const DialogCotizacion = () => {
  const {userData} = useLogin();
  const { token_user } = userData
  const {
    setDialogCotizacion,
    dialogCotizacion,
    datosMonedas,
    lista,
    setLista,lang
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
     if (res.response ) {
      let index = lista.findIndex(i => i.id_moneda === datosMonedas.id_moneda);
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
    <Dialog open={dialogCotizacion} onClose={cerrar} TransitionComponent={Zoom} fullWidth>
      <DialogTitle>
       {lang.cambiar_cotizacion}
      </DialogTitle>
      <DialogContent dividers>
        {cargando && <LinearProgress />}
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <TextField
              autoFocus
              onChange={onChange}
              name="valor_moneda"
              InputProps={{ 
                inputComponent:NumberFormatCustom,
              }}
              value={data.valor_moneda}
              label={lang.cotizacion}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={enviar}
          disabled={cargando}
        >
          {lang.ok}
        </Button>
        <Button variant="contained" onClick={cerrar}>
          {lang.cerrar}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCotizacion;
