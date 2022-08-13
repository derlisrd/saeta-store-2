import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { useCompras } from '../ComprasProvider';
import {StylesTabla} from "./StylesTabla";
import { columnas } from './TablaColumnas';
import TableEmptyItems from './TableEmptyItems';
import TableItems from './TableItems';


const TablaItemsFactura = () => {
  const classes = StylesTabla();
  const {lang,compras} = useCompras()


  return (
    <TableContainer className={classes.tableContainer}>
      <Table>
      
        <TableHead className={classes.tableheader}>
          <TableRow>
            {columnas.map((d, i) => (
              <TableCell align="left" key={i} className={classes.tablecell}>
                <Typography variant="overline">{d.title}</Typography>
              </TableCell>
            ))}
            <TableCell className={classes.tablecell}>
              <Typography variant="overline" >{lang.opciones}</Typography>
            </TableCell>
          </TableRow>
        </TableHead> 
        <TableBody>
              { compras.items.length === 0 ? <TableEmptyItems colSpan={7} classes={classes} /> : <TableItems items={compras.items} /> }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TablaItemsFactura
