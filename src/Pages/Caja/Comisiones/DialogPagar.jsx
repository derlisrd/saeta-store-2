import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Zoom } from '@mui/material'
import { useLang } from '../../../Contexts/LangProvider'
import { useComisiones } from './ComisionesProvider'

const DialogPagar = () => {

  const {lang} = useLang()
  const { dialogs,setDialogs } = useComisiones()

  const cerrar = ()=> { setDialogs({...dialogs,pagar:false})}

  return (
  <Dialog fullWidth open={dialogs.pagar} onClose={cerrar} TransitionComponent={Zoom}>
        <DialogTitle>{lang.detalles_movimiento}</DialogTitle>
        <DialogContent >
          <h2>PAGAR</h2>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={cerrar}>
            {lang.cerrar}
          </Button>
        </DialogActions>
    </Dialog>
  )
}

export default DialogPagar
