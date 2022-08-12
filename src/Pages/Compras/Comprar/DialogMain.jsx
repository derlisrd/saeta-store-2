import React from 'react'
import { Dialog, DialogContent, DialogTitle, Grid, Icon, IconButton, Tooltip, Zoom } from '@mui/material'

import { useCompras } from '../ComprasProvider';
import Inputs from './Inputs';
import TablaItemsFactura from './TablaItemsFactura';
import LoadingBackDrop from '../../../Components/UI/LoadingBackDrop';
import PopUpErrores from './PopUpErrores';

const DialogMain = () => {
    const {lang,setDialogs,dialogs,cargas} = useCompras()
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
          <PopUpErrores />
          {cargas.main && <LoadingBackDrop />}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}  lg={4}>
              <Inputs />
            </Grid>
            <Grid item xs={12} sm={12} lg={8} >
                <TablaItemsFactura />
            </Grid>
          </Grid>
        </DialogContent>
    </Dialog>
  )
}

export default DialogMain
