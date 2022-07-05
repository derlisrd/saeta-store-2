import {Alert,Button,CircularProgress,FormControlLabel,Grid,Icon,IconButton,InputAdornment,Radio,Tooltip,Typography,Zoom} from "@mui/material";
import React, { useEffect } from "react";
import TextFieldCustom from "../../../Components/MuiCustom/TextFieldCustom";
import ButtonCustom from "../../../Components/MuiCustom/ButtonCustom";
import InfoCliente from "./InfoCliente";
import InfoDeposito from "./InfoDeposito";
import InfoNota from "./InfoNota";
import ListaAguarda from "./ListaAguarda";
import { useVentas } from "./VentasProvider";
import VentasTabla from "./VentasTabla";

const VentasFactura = () => {
  const { dialogs, lang, setDialogs, cargas,inputCodigo, valorConvertido,inputCantidad,verificarExisteEnTabla,Aguardar,datosFacturas,indexFactura,CancelarFacturaActual,changeMonedas,Anotar} = useVentas();

  const da = {...datosFacturas.facturas[indexFactura]}
  const ABM = da?.datosMoneda.abreviatura_moneda;

  const openDialogBuscaProducto = () => {setDialogs({ ...dialogs, buscarProducto: true });};

  const presionaEnterPaBuscar = (e)=>{
    if (e.key === `Enter`) verificarExisteEnTabla(inputCodigo.current.value);  
  }

  const openFinalizarDialog = ()=>{
    if(datosFacturas.facturas[indexFactura].itemsFactura.length >0){
      setDialogs({ ...dialogs, finalizarVenta: true });
    }
  }



  useEffect(()=>{
    function handle (e){
      if (e.ctrlKey && e.code==="KeyB") {
      setDialogs({ ...dialogs, buscarProducto: true });
      //console.log("render")
      }
      if (e.ctrlKey && e.code==="KeyM") {
        inputCodigo?.current?.focus();
      }
       if (e.ctrlKey && e.code==="KeyI") {
        setDialogs({ ...dialogs, finalizarVenta: true });
      } 
    }
    document.addEventListener("keypress",handle)
    return ()=> document.removeEventListener("keypress",handle)
  },[dialogs,setDialogs,inputCodigo])
  


  return (
    <Grid container  columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
      <Grid item >
        <InfoCliente /> <InfoNota /> 
      </Grid>
      <Grid item xs={12} sm={3} md={3}>
        <InfoDeposito />
      </Grid>
      <Grid item xs={12} sm={3}>
        {datosFacturas.facturas.length > 1 && <Button>En espera({datosFacturas.facturas.length - 1})</Button>}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={8}>
        <VentasTabla />
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={4}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
          <Grid xs={12} item>
            <TextFieldCustom
              onKeyPress={presionaEnterPaBuscar}
              inputRef={inputCantidad}
              type="number"
              name="cantidad"
              label={lang.cantidad}
              defaultValue="1"
            />
          </Grid>
          <Grid xs={12} item>
            <ButtonCustom
              variant="contained"
              fullWidth
              size="large"
              onClick={()=>{verificarExisteEnTabla(inputCodigo.current.value)}}
            >
              {lang.agregar_item}
            </ButtonCustom>
          </Grid>
          
          <Grid xs={12} item >
            <Zoom in={datosFacturas.facturas[indexFactura]?.itemsFactura.length>0}>
              <Grid container spacing={2}>
              
              
                <Grid item xs={12} sm={6} md={12} lg={6}>
                  <ButtonCustom
                    variant="contained"
                    onClick={openFinalizarDialog}
                    color="success" fullWidth
                  >
                    {lang.finalizar}
                  </ButtonCustom>
                </Grid>
                <Grid item xs={12} sm={6} md={12} lg={6}>
                  <ButtonCustom
                    variant="outlined"
                    size="large"
                    fullWidth
                    onClick={CancelarFacturaActual}
                  >
                    {lang.cancelar}
                  </ButtonCustom>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ButtonCustom
                    variant="outlined"
                    size="large"
                    fullWidth
                    onClick={Aguardar}
                    color="warning"
                  >
                    {lang.esperar}
                  </ButtonCustom>
                </Grid>
                <Grid item xs={12} sm={6}>
                  
                    <ButtonCustom
                      size="large"
                      fullWidth  variant="outlined"
                      onClick={Anotar}
                      color="secondary"
                    >
                      {lang.anotar}
                    </ButtonCustom>
                  
                </Grid>
                <Grid xs={12} item>
                <Alert severity="info" icon={false}>
                  <Typography variant="h6"> {lang.total}: {valorConvertido(da.total)} {ABM} </Typography>
                </Alert>
                </Grid>
              </Grid>
            </Zoom>
          </Grid>
          <Grid item xs={12}>
            {
              datosFacturas.listaMonedas.map((e,i)=>(
                  <FormControlLabel key={i} value={e.id_moneda} name="listaMonedas" onChange={()=>{changeMonedas(e)}}  label={e.abreviatura_moneda} labelPlacement="end"
                    control={<Radio checked={da.datosMoneda.id_moneda===e.id_moneda} /> }
                  />
              ))
            }
            
          </Grid>
          <Grid item xs={12}>
            <Button
                 variant="outlined"
                size="small"
                color="error"
                onClick={()=>{setDialogs({...dialogs,ayuda:true})}}
              >
                {lang.ayuda}
              </Button>
              {da.itemsFactura.length>0 && 
              <Tooltip title="Imprimir presupuesto" placement="top">
              <IconButton onClick={()=>{setDialogs({...dialogs,imprimirPresupuesto:true})}}>
                <Icon>print</Icon>
              </IconButton>
              </Tooltip>
              }
            </Grid>
          <Grid item xs={12}>
            <ListaAguarda />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default VentasFactura;
