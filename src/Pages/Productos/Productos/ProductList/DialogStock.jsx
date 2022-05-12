import { Button, Dialog, DialogActions, DialogContent,DialogTitle,Grid, LinearProgress,List,ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { useProductos } from './ProductosProvider'

const DialogStock = () => {

    const {dialogs,setDialogs,cargando,formStock} = useProductos();

    const close = ()=>{ setDialogs({...dialogs,stock:false})}


  return (
    <Dialog fullWidth open={dialogs.stock} onClose={close}>
        <DialogTitle>{formStock.nombre_producto}</DialogTitle>
        <DialogContent dividers>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {cargando.stock && <LinearProgress />}
                </Grid>
                <Grid item xs={12}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {formStock.listaStock.map((e,i) => (
                    <ListItem
                    key={i}
                    secondaryAction={<Typography variant='button'>{e.stock_producto_deposito} {formStock.medida}</Typography>}
                    >
                    <ListItemText primary={e.nombre_deposito} />
                    </ListItem>
                ))}
                </List>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant='outlined' onClick={close}>Cerrar</Button>
        </DialogActions>
    </Dialog>
  )
}

export default DialogStock
