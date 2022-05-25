import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon } from '@mui/material'
import { useVentas } from "./VentasProvider"

const DialogAyuda = () => {

    const {dialogs,setDialogs} = useVentas()


    const cerrar = ()=>{ setDialogs({...dialogs,ayuda: false})}
    

  return (
    <Dialog open={dialogs.ayuda} fullWidth onClose={cerrar}>
        <DialogTitle>Ayuda</DialogTitle>
        <DialogContent>
            <h3>General: </h3>
            <p>Ingrese el código de barras del producto o solo el código asignado al producto. Si no conoce el código del producto presione <i>"CTRL + B"</i> para buscarlo </p>
            <p>Para salir al menú principal presione el botón superior izquierdo <Icon color="secondary">arrow_back_ios</Icon> </p>
            <h3>Atajos de teclado: </h3>
            <p><b>CTRL + b</b> : <i>Buscar producto</i></p>
            <p><b>CTRL + m</b> : <i>Enfocar en campo de código</i></p>
            <p><b>CTRL + i</b> : <i>Para finalizar la venta</i></p>
            <h3>Para más información llame al; 0983 20 20 90</h3>
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" onClick={cerrar}>Ok</Button>
        </DialogActions>
    </Dialog>
  )
}

export default DialogAyuda
