import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useFacturas } from './FacturasProvider'

const DialogDevolucion = () => {

    const {dialogs,setDialogs,setStatusDevolucion,statusDevolucion,loadings,finalizarDevolucion} = useFacturas()

    

    const close = ()=>{
        setDialogs({...dialogs,devolucion:false});
        setStatusDevolucion({...statusDevolucion,active:false})
    }
  return (
    <Dialog open={dialogs.devolucion} onClose={close} fullWidth>
        <DialogTitle>
            Devolución
        </DialogTitle>
      <DialogContent dividers>
        <Stack sx={{ width:'100%' }}> {loadings.devolucion && <LinearProgress /> }  </Stack>
        {statusDevolucion.active &&
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cod</TableCell>
              <TableCell align="right">Producto</TableCell>
              <TableCell align="right">Deposito</TableCell>
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="right">Devolver</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statusDevolucion.productos.map((row,i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.codigo_producto}
                </TableCell>
                <TableCell align="right">{row.nombre_producto}</TableCell>
                <TableCell align="right">{row.nombre_deposito}</TableCell>
                <TableCell align="right">{row.cantidad_producto}</TableCell>
                <TableCell align="right">{row.check ? "SI" : "NO"} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        }
      </DialogContent>
      <DialogActions>
        <Button size="large" variant='outlined' color='warning' onClick={finalizarDevolucion}>Finalizar</Button>
        <Button size="large" variant='outlined' onClick={close}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogDevolucion
