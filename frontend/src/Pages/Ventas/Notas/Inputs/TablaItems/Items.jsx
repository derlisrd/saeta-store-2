import { TableCell, TableRow,Icon,IconButton,Typography,Stack, Tooltip } from "@mui/material";
import { useNotas } from "../../NotasProvider";
import Vacio from "./Vacio";
import Opciones from "./Opciones";
import { StylesTablaFacturaReponsive } from "../../../../../Components/UI/Tablas/StylesTablaFacturaReponsive";
import { funciones } from "../../../../../Functions";

const Items = () => {
  const classes = StylesTablaFacturaReponsive();

  const { datosNotas, indexFactura,restarCantidad,sumarCantidad} = useNotas();

  const items = [...datosNotas.facturas[indexFactura].itemsFactura];
  const valorMoneda = parseFloat(datosNotas.facturas[indexFactura].datosMoneda.valor_moneda);

  return (
    <>
      {datosNotas.facturas[indexFactura]?.itemsFactura.length === 0 ? (
        
          <Vacio colSpan={7} classes={classes} />
        
      ) : (
        items.map((d, i) => (
          <TableRow key={i} className={classes.tablelist}>
            <TableCell className={classes.tableitem}>
              <span className={classes.columname}>COD.</span>
              <span>{(d.codigo_producto).substr(0,10)}</span>
            </TableCell>

            <TableCell className={classes.tableitem}>
              <span className={classes.columname}>CANT.</span>
              <span>
                <Stack direction="row" spacing={0}>
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
                {funciones.numberSeparator(d.precio_guardado / valorMoneda)}
              </span>
            </TableCell>

            <TableCell className={classes.tableitem}>
              <span className={classes.columname}>SUBTOTAL</span>
              <span>
                {funciones.numberSeparator(d.subtotal_precio / valorMoneda)}
              </span>
            </TableCell>

            <TableCell className={classes.tableitem}>
              <Opciones index={i} />
            </TableCell>
          </TableRow>
        ))
      )}
    </>
  );
};

export default Items;
