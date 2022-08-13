import { Stack, TableCell, TableRow, Tooltip,IconButton,Icon,Typography } from "@mui/material";
import React from "react";
import { StylesTabla } from "./StylesTabla";
import TableOpciones from "./TableOpciones";

const TableItems = ({items}) => {
  const classes = StylesTabla();
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
              <IconButton
                onClick={(e) => {
                  
                }}
              >
                <Icon>remove_circle_outline</Icon>
              </IconButton>
            </Tooltip>
            <Typography variant="h6">{d.stock}</Typography>

            <IconButton
              onClick={(e) => {
                
              }}
            >
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
        <span>

        </span>
      </TableCell>

      <TableCell className={classes.tableitem}>
        <span className={classes.columname}>PRECIO</span>
        <span>
          
        </span>
      </TableCell>

      <TableCell className={classes.tableitem}>
        <span className={classes.columname}>SUBTOTAL</span>
        <span>
          
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
