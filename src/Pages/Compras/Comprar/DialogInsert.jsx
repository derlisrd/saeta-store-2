import { Dialog, DialogContent } from '@mui/material'
import React from 'react'
import { useCompras } from '../ComprasProvider'

const DialogInsert = () => {

    const {dialogs,setDialogs} = useCompras();

    const close = ()=>{
        setDialogs({...dialogs,insert:false})
    }

  return (
    <Dialog onClose={close} open={dialogs.insert} fullWidth >
      
      <DialogContent dividers>

      </DialogContent>
    </Dialog>
  )
}

export default DialogInsert
