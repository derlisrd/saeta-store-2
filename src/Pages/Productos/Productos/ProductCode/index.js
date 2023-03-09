import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useBarcode } from "react-barcodes";
import { useQuery } from "../../../../Hooks/useQuery";
import printJS from "print-js";


const ProductCode = () => {
  let query = useQuery();
  const CODIGO = query.get("code") || "no-code";

  const [cant, setCant] = useState([0]);
  const { inputRef } = useBarcode({
    value: CODIGO,
    options: {
      background: "#fff",
      font: "monospace",
      height: 50,
    },
  });
  const add = ()=>{
    let c = cant.length + 1;
    let ca = [...cant];
    ca.push(c);
    setCant(ca);
  }
  const imprimir = () => {
    printJS({ type: "html", printable: "print_code" });
  };
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
        <div id="print_code">
          {cant.map((e) => (
            <canvas key={e} ref={inputRef} />
          ))}
        </div>
      </Grid>
    </Grid>
    </Box>
  );
};

export default ProductCode;
