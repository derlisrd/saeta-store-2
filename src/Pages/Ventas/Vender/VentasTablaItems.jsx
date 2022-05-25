import { Alert, AlertTitle, TableCell, TableRow,Icon,IconButton,Typography,Stack, Tooltip } from "@mui/material";
import { useVentas } from "./VentasProvider";
import VentasTablaOpciones from "./VentasTablaOpciones";
import {StylesTabla} from "./StylesTabla";
const VentasTablaItems = () => {
  const classes = StylesTabla();

  const { datosFacturas, indexFactura,Funciones,restarCantidad,sumarCantidad } = useVentas();

  const items = [...datosFacturas.facturas[indexFactura].itemsFactura];
  const valorMoneda = parseFloat(datosFacturas.facturas[indexFactura].datosMoneda.valor_moneda);

  return (
    <>
      {datosFacturas.facturas[indexFactura]?.itemsFactura.length === 0 ? (
        <>
          <TableRow className={classes.tablelist} hover>
            <TableCell colSpan={7} align="center">
              <Alert severity="warning" variant="outlined" icon={false}>
                <AlertTitle>FACTURA VACÍA</AlertTitle>
              </Alert>
            </TableCell>
          </TableRow>
        </>
      ) : (
        items.map((d, i) => (
          <TableRow key={i} className={classes.tablelist}>
            <TableCell className={classes.tableitem}>
              <span className={classes.columname}>COD.</span>
              <span>{d.codigo_producto}</span>
            </TableCell>

            <TableCell className={classes.tableitem}>
              <span className={classes.columname}>CANT.</span>
              <span>
                
                <Stack direction="row">
                  <Tooltip title="Restar 1">
                  <IconButton onClick={(e) => {restarCantidad(parseFloat(d.cantidad_producto), i)}}>
                    <Icon>remove_circle_outline</Icon>
                  </IconButton>
                  </Tooltip>
                  <Typography variant="h6">{d.cantidad_producto}</Typography>
                  
                  <IconButton onClick={(e) => {sumarCantidad(parseFloat(d.cantidad_producto), i)}}>
                    <Icon>add_circle_outline</Icon>
                  </IconButton>
                </Stack>
              </span>
            </TableCell>

            <TableCell className={classes.tableitem}>
              <span className={classes.columname}>DESC.</span>
              <span>{d.nombre_producto}</span>
            </TableCell>

            <TableCell className={classes.tableitem}>
              <span className={classes.columname}>IVA</span>
              <span>{d.iva_porcentaje}</span>
            </TableCell>

            <TableCell className={classes.tableitem}>
              <span className={classes.columname}>PRECIO</span>
              <span>
                {Funciones.numberSeparator(d.precio_guardado / valorMoneda)}
              </span>
            </TableCell>

            <TableCell className={classes.tableitem}>
              <span className={classes.columname}>SUBTOTAL</span>
              <span>
                {Funciones.numberSeparator(d.subtotal_precio / valorMoneda)}
              </span>
            </TableCell>

            <TableCell className={classes.tableitem}>
              <VentasTablaOpciones index={i} />
            </TableCell>
          </TableRow>
        ))
      )}
    </>
  );
};

export default VentasTablaItems;
