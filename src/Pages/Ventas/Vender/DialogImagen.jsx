import { Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import React from 'react'
import { useVentas } from './VentasProvider'

const DialogImagen = () => {
    const {dialogs,setDialogs,setIndexPrecioCambiar,indexPrecioCambiar,datosFacturas,indexFactura} = useVentas()

    let imagen = datosFacturas.facturas[indexFactura].itemsFactura[indexPrecioCambiar]?.url_imagen ? datosFacturas.facturas[indexFactura].itemsFactura[indexPrecioCambiar].url_imagen : null
    
    const cerrar = ()=>{ setDialogs({...dialogs,imagen: false});  setIndexPrecioCambiar(-1);}

  return (
    <>
    {
         indexPrecioCambiar >= 0 && 
    <Dialog open={dialogs.imagen} fullWidth maxWidth="lg" onClose={cerrar}>
        <DialogContent>
            <p style={{textAlign:"center"}}>
            {imagen ? <img src={imagen} alt="..." /> : "No tiene imagen" }
            </p>
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" onClick={cerrar}>Cerrar</Button>
        </DialogActions>
    </Dialog>
}
    </>  
  )
}

export default DialogImagen
