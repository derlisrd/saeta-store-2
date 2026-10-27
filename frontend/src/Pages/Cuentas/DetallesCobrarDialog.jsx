import { Button, Dialog,DialogActions,DialogContent,DialogTitle,Icon,Zoom } from '@mui/material'
import printJS from "print-js";
import { useCuentas } from './CuentasProvider'
import { useDatosEmpresa } from '../../Contexts/DatosEmpresaProvider';

const DetallesCobrarDialog = () => {
    const {dialogs,setDialogs,funciones, lang,formCobrar} = useCuentas()
    const {EMPRESA,MONEDAS} = useDatosEmpresa()

    function cerrar(){
        setDialogs({...dialogs,detalles:false})
    }

    function imprimir(){
        printJS({ type: "html", printable: "print",style:'*{font-family:monospace}' });
    }

    let monedaactual= MONEDAS.filter(e=> parseInt(e.id_moneda) === parseInt(formCobrar.id_moneda_caja))
    let mon = monedaactual[0]
    const montoFaltante = parseFloat(formCobrar.monto_total_factura) - parseFloat(formCobrar.recibido_factura)


  return (
    <Dialog onClose={cerrar} TransitionComponent={Zoom} fullWidth open={dialogs.detalles}>
        <DialogTitle>{lang.detalles}</DialogTitle>
        <DialogContent dividers>
            <div id="print">
                <table width="350px">
                    <thead>
                        <tr>
                            <td>
                                <strong> {EMPRESA.nombre_empresa}</strong>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>{lang.cliente} : {formCobrar.nombre_cliente} - {formCobrar.ruc_cliente}</strong>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>{lang.recibo_nro}: {formCobrar.nro_factura}</strong>
                            </td>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <td>
                                <strong>{lang.monto_total}: {funciones.numberFormat(formCobrar.monto_total_factura)} {mon?.abreviatura_moneda} </strong>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>{lang.monto_recibido}: {funciones.numberFormat(formCobrar.recibido_factura)} {formCobrar.abreviatura_moneda}</strong>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>
                                {lang.monto_faltante}: {funciones.numberFormat(montoFaltante)} {formCobrar.abreviatura_moneda}
                                    
                                </strong>
                            </td>
                        </tr>
                    </thead>
                </table>
            </div>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" startIcon={<Icon>print</Icon>} onClick={imprimir}>
                {lang.imprimir}
            </Button>
            <Button variant="contained" onClick={cerrar}>
                {lang.cerrar}
            </Button>
        </DialogActions>
    </Dialog>
  )
}

export default DetallesCobrarDialog
