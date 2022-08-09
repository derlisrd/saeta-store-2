import { Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton, Tooltip, Zoom } from '@mui/material'
import React from 'react'
import ButtonCustom from '../../../Components/MuiCustom/ButtonCustom';
import { useCompras } from '../ComprasProvider';

const DialogFinalizar = () => {


    const {dialogs,setDialogs,lang} = useCompras();

    const close = ()=>{
        setDialogs({...dialogs,finalizar:false})
    }

  return (
    <Dialog onClose={close} open={dialogs.finalizar} fullScreen >
      <DialogTitle>
          <Tooltip
            title={<h2>{lang.volver_atras}</h2>}
            TransitionComponent={Zoom}
            arrow
            placement="right-start"
          >
            <IconButton onClick={close} color="primary">
              <Icon>arrow_back_ios_new</Icon>
            </IconButton>
          </Tooltip>
          {lang.finalizar_compras}

        </DialogTitle>
      <DialogContent dividers>
      <h2>FINAZLIAR</h2>
      </DialogContent>
      <DialogActions>
          <ButtonCustom variant="contained" color="success" onClick={()=>{}} fullWidth>{lang.finalizar} </ButtonCustom>
          <ButtonCustom variant="outlined" onClick={close} fullWidth>{lang.cancelar} </ButtonCustom>
      </DialogActions>
    </Dialog>
  )
}

export default DialogFinalizar
