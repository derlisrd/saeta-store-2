import { Dialog, DialogContent, DialogTitle, Icon, IconButton, Tooltip, Zoom } from '@mui/material'
import React from 'react'
import { useLang } from '../../../Contexts/LangProvider'
import NotaMain from './Inputs/NotaMain'
import { useNotas } from './NotasProvider'

const DialogNuevaNota = () => {

    const {dialogs,setDialogs,datosNotas,indexFactura,valorConvertido} = useNotas() 
    const da = {...datosNotas.facturas[indexFactura]}
    const ABM = da?.datosMoneda.abreviatura_moneda;

    const {lang} = useLang()

    function cerrar(){
        setDialogs({...dialogs,nuevanota:false})
    }

    


  return (
    <Dialog fullScreen onClose={cerrar} open={dialogs.nuevanota}>
        <DialogTitle>
          <Tooltip
            title={<h2>{lang.volver_menu_principal}</h2>}
            TransitionComponent={Zoom}
            arrow
            placement="right-start"
          >
            <IconButton onClick={cerrar} color="primary">
              <Icon>arrow_back_ios_new</Icon>
            </IconButton>
          </Tooltip>

         {lang.nueva_nota} | {lang.total}: {valorConvertido(da.total)} {ABM}
        </DialogTitle>
        <DialogContent dividers>
          <NotaMain />
        </DialogContent>
    </Dialog>
  )
}

export default DialogNuevaNota
