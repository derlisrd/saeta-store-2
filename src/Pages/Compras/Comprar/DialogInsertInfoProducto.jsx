import { Stack, Typography } from "@mui/material";
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
          {funciones.numberFormat(compras.insertProducto?.costo_producto)}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Typography variant="button">
          {lang.precio_balcon}:{" "}
          {funciones.numberFormat(compras.insertProducto?.precio_producto)}
        </Typography>
        <Typography variant="button">
          {lang.precio_mayorista}:{" "}
          {funciones.numberFormat(compras.insertProducto?.preciom_producto)}
        </Typography>
      </Stack>
    </>
  );
};

export default DialogInsertInfoProducto;
