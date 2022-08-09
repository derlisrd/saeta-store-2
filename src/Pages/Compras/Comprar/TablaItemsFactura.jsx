import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { useCompras } from '../ComprasProvider';
import {StylesTabla} from "./StylesTabla";
import { columnas } from './TablaColumnas';


const TablaItemsFactura = () => {
  const classes = StylesTabla();
  const {lang} = useCompras()
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
          
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TablaItemsFactura
