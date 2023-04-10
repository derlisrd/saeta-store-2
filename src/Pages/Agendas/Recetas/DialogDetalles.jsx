import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon } from '@mui/material'
import printJS from 'print-js'
import { useRecetas } from './RecetasProvider'

const DialogDetalles = () => {

    const {dialogs,setDialogs,detalles} = useRecetas()
    const close = ()=>{ setDialogs({...dialogs,detalles:false}) }

    const imprimir = () => {
        printJS({ type: "html", printable: "print_receta", 
        style:"*{font-family:monospace;} ._table{border-collapse:collapse} ._table td{padding:5px}" });
      };

  return (
    <Dialog maxWidth="sm" open={dialogs.detalles} onClose={close}>
      <DialogTitle>Detalles de receta</DialogTitle>
      <DialogContent dividers>
          <div id='print_receta'>
            <table width="360" className='_table' align='center' border={1} style={{ borderCollapse:'collapse',fontFamily:'monospace' }}>
                <tbody>
                    <tr>
                        <td colSpan="2">Nombre: <b>{detalles.nombre_cliente} - {detalles.ruc_cliente}</b></td>
                    </tr>

                    <tr>
                        <td><b>DERECHO</b></td>
                        <td><b>IZQUIERDO</b></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><b>LEJOS:</b></td>
                    </tr>
                    <tr>
                        <td>Esf:{detalles.lejos_esfe_od} Cil:{detalles.lejos_cili_od}  Eje:{detalles.lejos_eje_od}</td>
                        <td>Esf:{detalles.lejos_esfe_oi} Cil:{detalles.lejos_cili_oi}  Eje:{detalles.lejos_eje_oi}</td>
                    </tr>
                    <tr>
                        <td colSpan="2"><b>CERCA:</b></td>
                    </tr>
                    <tr>
                        <td>Esf:{detalles.cerca_esfe_od} Cil:{detalles.cerca_cili_od}  Eje:{detalles.cerca_eje_od}</td>
                        <td>Esf:{detalles.cerca_esfe_oi} Cil:{detalles.cerca_cili_oi}  Eje:{detalles.cerca_eje_oi}</td>
                    </tr>
                    <tr>
                        <td colSpan="2"><b>ADICION:</b></td>
                    </tr>
                    <tr>
                        <td>{detalles.adicion_od}</td>
                        <td>{detalles.adicion_oi}</td>
                    </tr>
                    <tr>
                        <td colSpan="2">OBS: {detalles.obs_receta}</td>
                    </tr>
                    <tr>
                        <td colSpan="2">Fecha: {detalles.updated_at}</td>
                    </tr>
                </tbody>
            </table>
          </div>
      </DialogContent>
      <DialogActions>
        <Button size='large' onClick={imprimir} variant='contained' startIcon={<Icon>print</Icon>}>Imprimir</Button>
        <Button variant='outlined' onClick={close}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogDetalles
