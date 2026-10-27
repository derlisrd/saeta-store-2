import {CircularProgress,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography} from "@mui/material";

import { StylesTablaFacturaReponsive } from "../../../../../Components/UI/Tablas/StylesTablaFacturaReponsive";
import Items from "./Items";
import { useNotas } from "../../NotasProvider";

const TablaItems = () => {
  const classes = StylesTablaFacturaReponsive();
  const { datosNotas, indexFactura,cargas } = useNotas();
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
      { datosNotas.facturas[indexFactura]?.itemsFactura?.length !== 0 && (
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
          <tr><td align="center"><CircularProgress /></td></tr> : <Items />
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaItems;
