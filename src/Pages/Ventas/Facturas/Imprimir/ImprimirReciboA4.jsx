import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Zoom } from '@mui/material'
import printJS from 'print-js';
import styles from './facturaA4.module.css'
import { useFacturas } from '../FacturasProvider';

const ImprimirReciboA4 = () => {
  const {dialogs,setDialogs,formulario} = useFacturas();
  const DF = { ...formulario };
  const cerrar = ()=>{ 
    setDialogs({...dialogs,imprimirReciboA4:false});
  }
  const imprimir = () => {
    printJS({ type: "html", printable: "print_factura", style:"#print_factura{font-family:monospace; padding:0; margin:0;}" });
  };

  const URL_VIEW_FACTURA = `http://localhost:8000/api/v1/view_pdf_factura/${DF.id_factura}`


  return (
    <Dialog open={dialogs.imprimirReciboA4} fullScreen onClose={cerrar} TransitionComponent={Zoom}>
      <DialogTitle>Imprimir</DialogTitle>
      <DialogContent dividers>
        <div className={styles.container}>
      <iframe width="1000" className={styles.responsive_iframe} height="900" title='factura' id="print_factura" frameBorder={0}
        src={URL_VIEW_FACTURA}>
      </iframe>
      </div>
      </DialogContent>
    <DialogActions>
    <Button onClick={imprimir}>Imprimir</Button>
    <Button onClick={cerrar}>Cerrar</Button>
    </DialogActions>
    </Dialog>
  )
}

export default ImprimirReciboA4
