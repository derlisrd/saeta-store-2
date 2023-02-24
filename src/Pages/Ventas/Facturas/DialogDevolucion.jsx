import { Alert,  Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { funciones } from '../../../Functions'
import { useFacturas } from './FacturasProvider'

const DialogDevolucion = () => {

    const {dialogs,setDialogs,setStatusDevolucion,statusDevolucion,loadings,finalizarDevolucion} = useFacturas()

    const close = ()=>{
        setDialogs({...dialogs,devolucion:false});
        setStatusDevolucion({...statusDevolucion,active:false})
    }
    console.log(statusDevolucion)
  return (
    <Dialog open={dialogs.devolucion} onClose={close} fullWidth>
        <DialogTitle>
            Devolución
        </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Alert icon={false}>
          <Typography variant='overline'>Tipo: <b>{ ( statusDevolucion.tipo )} </b></Typography>
          <br />
          <Typography variant='overline'>Moneda: <b>{ ( statusDevolucion.pagos?.nombre_moneda )} </b></Typography>
          <br/>
          </Alert>
          </Grid>
          <Grid item xs={12} md={6}>
          <Alert icon={false}>
          <Typography variant='overline'>Pago en efectivo: <b>{ funciones.numberFormat( statusDevolucion.pagos?.efectivo_factura )} </b></Typography>
          <br />
          <Typography variant='overline'>Pago sin efectivo: <b>{ funciones.numberFormat(statusDevolucion.pagos?.no_efectivo_factura)}</b></Typography>
          </Alert>
          </Grid>
        </Grid>
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
              <TableCell align="right">Precio</TableCell>
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
                <TableCell align="right">{ funciones.numberFormat( row.precio_producto_factura )} </TableCell>
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
