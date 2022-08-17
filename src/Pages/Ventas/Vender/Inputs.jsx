import { CircularProgress, Grid, Icon, IconButton, InputAdornment, Stack } from "@mui/material";
import React from "react";
import ButtonCustom from "../../../Components/MuiCustom/ButtonCustom";
import TextFieldCustom from "../../../Components/MuiCustom/TextFieldCustom";
import { useVentas } from "./VentasProvider";

const Inputs = () => {

    const { dialogs, lang, setDialogs, cargas,inputCodigo,inputCantidad,verificarExisteEnTabla} = useVentas();
    const openDialogBuscaProducto = () => {setDialogs({ ...dialogs, buscarProducto: true });};

  const presionaEnterPaBuscar = (e)=>{
    if (e.key === `Enter`) verificarExisteEnTabla(inputCodigo.current.value);  
  }

  return (
    <>
      <Grid item xs={12}>
        <TextFieldCustom
          onKeyPress={presionaEnterPaBuscar}
          inputRef={inputCodigo}
          id="input_inserta_codigo_producto"
          autoComplete="off"
          autoFocus
          name="codigo_producto"
          label="Código de Producto"
          placeholder="Ctrl + b"
          helperText={lang.ingrese_codigo_pulse_enter}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={openDialogBuscaProducto}>
                  <Icon>search</Icon>
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {cargas.cargandoProducto && <CircularProgress size={24} />}
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid xs={12} md={6} lg={12} item>
      <Stack direction="row">
            
                  <IconButton onClick={(e) => {}}>
                    <Icon>remove_circle_outline</Icon>
                  </IconButton>
                  <TextFieldCustom variant="standard"
          onKeyPress={presionaEnterPaBuscar}
          inputRef={inputCantidad}
          type='number'
          name="cantidad"
          label={lang.cantidad}
          defaultValue="1"
        />    
                  
                  
                  <IconButton onClick={(e) => {}}>
                    <Icon>add_circle_outline</Icon>
                  </IconButton>
                </Stack>
        
      </Grid>
      <Grid xs={12} md={6} lg={12} item>
        <ButtonCustom
          variant="contained"
          fullWidth
          size="large"
          onClick={() => {
            verificarExisteEnTabla(inputCodigo.current.value);
          }}
        >
          {lang.agregar_item}
        </ButtonCustom>
      </Grid>
    </>
  );
};

export default Inputs;
