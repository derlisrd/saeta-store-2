import {Button,Grid} from "@mui/material";
import React, { useEffect } from "react";
import InfoCliente from "./InfoCliente";
import InfoDeposito from "./InfoDeposito";
import InfoNota from "./InfoNota";
import ListaAguarda from "./ListaAguarda";
import { useVentas } from "./VentasProvider";
import VentasTabla from "./VentasTabla";
import Botones from "./Botones";
import Inputs from "./Inputs";
import ListaMonedas from "./ListaMonedas";
import AyudaPresupuesto from "./AyudaPresupuesto";

const VentasFactura = () => {
  const { dialogs, setDialogs,inputCodigo,datosFacturas} = useVentas();




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
      <Grid item xs={12} sm={4} md={4}>
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
          
            <Inputs />
          
          <Grid xs={12} item >
            <Botones />
          </Grid>
          <Grid item xs={12}>
            <ListaMonedas />
          </Grid>
          <Grid item xs={12}>
              <AyudaPresupuesto />
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
