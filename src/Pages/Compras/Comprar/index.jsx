import { Dialog, DialogContent, DialogTitle, Grid, Icon, IconButton, Tooltip, Zoom } from '@mui/material'
import React from 'react'
import { useCompras } from '../ComprasProvider'
import InsertarCodigoProducto from './InsertarCodigoProducto'
import TablaItemsFactura from './TablaItemsFactura'


const Comprar = () => {
  const {lang,setDialogs,dialogs} = useCompras()


  const close = ()=>{ setDialogs({...dialogs,main:false}) }

  return (
    <Dialog onClose={close} fullScreen open={dialogs.main} >
      <DialogTitle>
          <Tooltip
            title={<h2>{lang.volver_menu_principal}</h2>}
            TransitionComponent={Zoom}
            arrow
            placement="right-start"
          >
            <IconButton onClick={close} color="primary">
              <Icon>arrow_back_ios_new</Icon>
            </IconButton>
          </Tooltip>
          {lang.compras}

        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}  lg={4}>
                <InsertarCodigoProducto />
            </Grid>
            <Grid item xs={12} sm={12} lg={8} >
                <TablaItemsFactura />
            </Grid>
          </Grid>
        </DialogContent>
    </Dialog>
  )
}

export default Comprar
