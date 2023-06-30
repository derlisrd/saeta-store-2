import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { useBarcode } from "react-barcodes";
import { useQuery } from "../../../../Hooks/useQuery";
import styles from './style.module.css';
import { useReactToPrint } from 'react-to-print';
import { funciones } from "../../../../Functions";

const ProductCode = () => {
  let query = useQuery();
  const CODIGO = query.get("code") || "no-code";
  const precio = query.get("price") || "0";
  const refPrint = useRef(null);
  const [cant, setCant] = useState([0]);
  const { inputRef } = useBarcode({
    value: CODIGO,
    options: {
      background: "#fff",
      font: "monospace",
      fontSize:"14px",
      height: 60,
      width:1
    },
  });
  const add = ()=>{
    let c = cant.length + 1;
    let ca = [...cant];
    ca.push(c);
    setCant(ca);
  }

  const imprimir = useReactToPrint({
    content: () => refPrint.current,
  });

  useEffect(()=>{

  })

  return (
    <Box p={2} boxShadow={4} borderRadius={4} m={1} bgcolor="background.paper">
    <Grid
      container
      spacing={2}
      justifyContent="center"
    >
        <Grid item xs={12}>
            <Typography variant="h6">Código de barras</Typography>
        </Grid>
      <Grid item xs={12}>
        <Stack direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 2, md: 4 }}>
        <Button variant="outlined" size="large" onClick={imprimir}>
          Imprimir
        </Button>
        <Button variant="outlined" size="large" onClick={add}>
          Agregar Copia
        </Button>
        <Button variant="outlined" size="large" onClick={()=>{}}>
          Productos
        </Button>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <div id="print_code" ref={refPrint} className={styles.codigo_barra} >
          {cant.map((e) => (
            <div key={e} className={styles.codigo_content}>
            <canvas ref={inputRef} />
            <p>Precio: {funciones.numberFormat(precio)} </p>
            </div>
          ))}
          
        </div>
      </Grid>
    </Grid>
    </Box>
  );
};

export default ProductCode;
