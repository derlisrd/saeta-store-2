import { Button, Dialog, DialogActions, DialogContent,DialogTitle,Grid, LinearProgress} from '@mui/material'
import React, { Fragment } from 'react'
import { useProductos } from './ProductosProvider'

const DialogStock = () => {

    const {dialogs,setDialogs,cargando,formStock,lang} = useProductos();

    const close = ()=>{ setDialogs({...dialogs,stock:false})}


  return (
    <Dialog fullWidth open={dialogs.stock} onClose={close}>
        <DialogTitle>{formStock.nombre_producto}</DialogTitle>
        <DialogContent dividers>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {cargando.stock && <LinearProgress />}
                </Grid>
                {
                    formStock.listaStock.map((e,i) => (
                        <Fragment key={i}>
                            <Grid item xs={12}>{lang.deposito} : {e.nombre_deposito}  </Grid>
                            <Grid item xs={12}>{lang.cantidad} : {e.stock_producto_deposito}  </Grid>
                            <Grid item xs={12}>{lang.unidad_medida} : {formStock.medida} </Grid>
                        </Fragment>
                    ))
                }
                
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant='contained' onClick={close}>{lang.cerrar}</Button>
        </DialogActions>
    </Dialog>
  )
}

export default DialogStock

