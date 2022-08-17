import {CircularProgress,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography} from "@mui/material";
import React from "react";
import { useVentas } from "./VentasProvider";
import VentasTablaItems from "./VentasTablaItems";
import {StylesTabla} from "./StylesTabla";

const VentasTabla = () => {
  const classes = StylesTabla();
  const { datosFacturas, indexFactura,cargas } = useVentas();
  const columnas = [
    {
      field: "codigo_producto",
      title: "Cod.",
    },
    {
      field: "cantidad_producto",
      title: "Cant.",
    },
    {
      field: "nombre_producto",
      title: "Descripción",
    },
    {
      field: "iva_producto",
      title: "IVA",
    },
    {
      field: "precio_producto",
      title: "Precio",
    },
    {
      field: "subtotal_precio",
      title: "Subtotal",
    },
  ];

  return (
    <TableContainer className={classes.tableContainer}>
      <Table>
      { datosFacturas.facturas[indexFactura]?.itemsFactura?.length !== 0 && (
        <TableHead className={classes.tableheader}>
          <TableRow>
            {columnas.map((d, i) => (
              <TableCell align="left" key={i} className={classes.tablecell}>
                <Typography variant="button">{d.title}</Typography>
              </TableCell>
            ))}
            <TableCell className={classes.tablecell}>
              <Typography variant="button" >OPCIONES</Typography>
            </TableCell>
          </TableRow>
        </TableHead> ) }
        <TableBody>
          {
            cargas.items ? 
          <tr><td align="center"><CircularProgress /></td></tr> : <VentasTablaItems />
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VentasTabla;
