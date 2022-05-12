import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  Typography,
  Zoom,
} from "@mui/material";
import { useRef, useState } from "react";
import { CustomButton, CustomField } from "../../../Componentes/Customs/muiCustom";
import NumberFormatCustom from "../../../Componentes/NumberFormatCustom";
import { useVentas } from "./VentasProvider";

const DialogCambioPrecio = () => {
  const {dialogs,setDialogs,datosFacturas,indexFactura,indexPrecioCambiar,Funciones,errors,setErrors,cambiarPrecio,setIndexPrecioCambiar} = useVentas();
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
              Precio original: {Funciones.numberSeparator(pr.precio_original)}{" "}
              {fd.datosMoneda.abreviatura_moneda}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Precio mayorista: {Funciones.numberSeparator(pr.preciom_producto)}{" "}
              {fd.datosMoneda.abreviatura_moneda}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Precio actual: {Funciones.numberSeparator(pr.precio_guardado)}{" "}
              {fd.datosMoneda.abreviatura_moneda}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomField
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
        <CustomButton variant="outlined" color="primary" onClick={verificar}>
          CAMBIAR
        </CustomButton>
        <CustomButton variant="outlined" color="secondary" onClick={cerrar}>
          Cancelar
        </CustomButton>
      </DialogActions>
    </Dialog>
    </form>
    }
    </>
  );
};

export default DialogCambioPrecio;
