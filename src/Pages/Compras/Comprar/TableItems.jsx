import { Stack, TableCell, TableRow, Tooltip,IconButton,Icon,Typography } from "@mui/material";
import React from "react";
import { useCompras } from "../ComprasProvider";

import { StylesTabla } from "./StylesTabla";
import TableOpciones from "./TableOpciones";

const TableItems = ({items}) => {
  const classes = StylesTabla();
  const {funciones,compras,setearCompras,inputCodigo} = useCompras()

  const restar = i =>{
    let datos = {...compras}
    let stock = parseFloat(datos.items[i].stock) - 1;

    if(stock > 0) {
      datos.items[i].stock = stock
      setearCompras(datos)
      inputCodigo.current.focus()
    }
  }
  const sumar = i =>{
    let datos = {...compras}
    datos.items[i].stock = parseFloat(datos.items[i].stock) + 1;
    setearCompras(datos)
    inputCodigo.current.focus()
  }

  return (
    items.map((d,i)=>(
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
              <IconButton  onClick={(e) => {restar(i)}}>
                <Icon>remove_circle_outline</Icon>
              </IconButton>
            </Tooltip>
            <Typography variant="h6">{d.stock}</Typography>

            <IconButton onClick={() => {sumar(i)}}>
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
        <span className={classes.columname}>COSTO</span>
        <span>{funciones.numberFormat(d.costo_producto)}</span>
      </TableCell>

      <TableCell className={classes.tableitem}>
        <span className={classes.columname}>SUBTOTAL</span>
        <span>
          {funciones.numberFormat(parseFloat(d.costo_producto)*parseFloat(d.stock))}
        </span>
      </TableCell>

      <TableCell className={classes.tableitem}>
              <TableOpciones index={i} />
      </TableCell>
    </TableRow>
    ))
  );
};

export default TableItems;
