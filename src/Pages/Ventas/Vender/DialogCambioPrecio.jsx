import {Dialog,DialogActions,DialogContent,DialogTitle,Grid,InputAdornment,Typography,Zoom} from "@mui/material";
import { useRef, useState } from "react";

import NumberFormatCustom from "../../../Components/thirty/NumberFormatCustom";
import TextFieldCustom from "../../../Components/MuiCustom/TextFieldCustom";
import ButtonCustom from "../../../Components/MuiCustom/ButtonCustom";
import { useVentas } from "./VentasProvider";

const DialogCambioPrecio = () => {
  const {dialogs,setDialogs,datosFacturas,indexFactura,indexPrecioCambiar,errors,setErrors,cambiarPrecio,setIndexPrecioCambiar,valorConvertido} = useVentas();
  const cerrar = () => {
    setDialogs({ ...dialogs, cambiarPrecio: false });setErrors({...errors,cambioPrecio:false,cambioPrecioMensaje:""});
    setIndexPrecioCambiar(-1);
  }
  const input = useRef(null);
  const [inputPrecio,setInputPrecio]= useState('');
  const fd = datosFacturas.facturas[indexFactura];
  const pr = indexPrecioCambiar < 0 ? null : fd.itemsFactura[indexPrecioCambiar];

  const verificar = ()=>{
    let valueprecio = parseFloat(inputPrecio) * parseFloat(fd.datosMoneda.valor_moneda) ;
    if(valueprecio < pr.preciom_producto){
      setErrors({...errors,cambioPrecio:true,cambioPrecioMensaje:"El precio no puede ser menor que el establecido"});
      input.current.focus();
    }
    else{
      cambiarPrecio(indexPrecioCambiar,valueprecio);
      cerrar();
    }
  }
  
  
  return (
    <>
    {
      indexPrecioCambiar >= 0 && 
    
    <form onSubmit={verificar}>
    <Dialog
      fullWidth
      open={dialogs.cambiarPrecio}
      onClose={cerrar}
      TransitionComponent={Zoom}
    >
      <DialogTitle>Cambiar de precio</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">
              Precio original: { valorConvertido(pr.precio_original)}{" "}
              {fd.datosMoneda.abreviatura_moneda}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Precio mayorista: { valorConvertido(pr.preciom_producto)}{" "}
              {fd.datosMoneda.abreviatura_moneda}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Precio actual: { valorConvertido(pr.precio_guardado)}{" "}
              {fd.datosMoneda.abreviatura_moneda}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextFieldCustom
              inputRef={input}
              onKeyPress={e=> e.key === 'Enter' && verificar()}
              onChange={e=>{ setInputPrecio(e.target.value)}}
              autoComplete='off'
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {fd.datosMoneda.abreviatura_moneda}
                  </InputAdornment>
                ),
                inputComponent: NumberFormatCustom,
                inputProps: { min: 0 },
              }}
              fullWidth
              name="precio_nuevo"
              error={errors.cambioPrecio}
              helperText={errors.cambioPrecioMensaje}
              label="Nuevo precio de venta"
              autoFocus
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <ButtonCustom variant="outlined" color="primary" onClick={verificar}>
          CAMBIAR
        </ButtonCustom>
        <ButtonCustom variant="outlined" color="secondary" onClick={cerrar}>
          Cancelar
        </ButtonCustom>
      </DialogActions>
    </Dialog>
    </form>
    }
    </>
  );
};

export default DialogCambioPrecio;
