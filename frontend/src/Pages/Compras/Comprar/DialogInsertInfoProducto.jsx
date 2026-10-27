import { Alert, Stack, Typography } from "@mui/material";
import { useCompras } from "../ComprasProvider";

const DialogInsertInfoProducto = () => {
  const { lang, compras, funciones } = useCompras();

  
      
  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Typography variant="button">
          {lang.nombre}: {compras.insertProducto?.nombre_producto}
        </Typography>
        <Typography variant="button">
          {lang.costo_anterior}:{" "}
          {funciones.numberFormat(compras.insertProducto?.precio_compra)}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Typography variant="button">
          {lang.precio_balcon}:{" "}
          {funciones.numberFormat(compras.insertProducto?.precio_venta)}
        </Typography>
        <Typography variant="button">
          {lang.precio_mayorista}:{" "}
          {funciones.numberFormat(compras.insertProducto?.preciom_venta)}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Alert severity="warning" icon={false}>
          <Typography variant="button">
            {lang.proveedor}: {compras.insertProducto?.nombre_proveedor}
          </Typography>
        </Alert>
      </Stack>
    </>
  );
};

export default DialogInsertInfoProducto;
