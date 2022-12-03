import { Button, Dialog, DialogActions, Zoom } from '@mui/material'
import { useDatosEmpresa } from '../../../Contexts/DatosEmpresaProvider'
import { useLang } from '../../../Contexts/LangProvider'
import { useComisiones } from './ComisionesProvider'
import printJS from "print-js";

const DialogRecibo = () => {
  const {lang} = useLang()
  const { dialogs,setDialogs,formRecibo } = useComisiones()
  const {EMPRESA} = useDatosEmpresa()
  const imprimir = () => {
    printJS({ type: "html", printable: "print_factura", style:"#print_factura{font-family:monospace}" });
  };
  const cerrar = ()=> { setDialogs({...dialogs,recibo:false})}
  const widthDimension = EMPRESA.dimension_ticket+"mm";

  return (
  <Dialog maxWidth="xs" open={dialogs.recibo} onClose={cerrar} TransitionComponent={Zoom}>
<div style={{display:"flex",justifyContent:"center",padding:"25px",margin:"0 auto"}} id="print_factura" >
        <table
          border="0"
          style={{
            width: widthDimension,
            borderCollapse: "collapse",
          }} 
        >
          <thead style={{ fontSize: "11px" }}>
            <tr>
              <td align='center'>
              { EMPRESA.logo_url_empresa && <img src={EMPRESA.logo_url_empresa} alt="logo" width={250} height={50}  />}
              </td>
            </tr>
            <tr>
              <td align="center" style={{ fontSize: "15px" }}>
                {EMPRESA.nombre_empresa}
              </td>
            </tr>

            <tr>
              <td align="center">{EMPRESA.direccion_empresa}</td>
            </tr>
            <tr>
              <td align="center">Tel: {EMPRESA.telefono_empresa}</td>
            </tr>
            <tr>
              <td align="center">
                <strong> RECIBO NRO: {formRecibo.id_comision}</strong>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <hr />
              </td>
            </tr>
            <tr>
              <td>
                <table width="100%">
                  <tbody>
                   
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <hr />
              </td>
            </tr>
            <tr>
              <td >
              <table width="100%" style={{ fontSize: "12px" }}>
                  <tbody>
                  
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <hr />
              </td>
            </tr>
          </tbody>
          <tfoot style={{ fontSize: "11px" }}>
            <tr>
              <td align="center">
                Los datos impresos requieren un cuidado especial. Para ello
                evite exponer al calor y humedad en exceso, luz solar o lámparas
              </td>
            </tr>
          </tfoot>
        </table>
        </div>

        <DialogActions>
          <Button variant="contained" onClick={imprimir}>
            {lang.imprimir}
          </Button>
          <Button variant="contained" onClick={cerrar}>
            {lang.cerrar}
          </Button>
        </DialogActions>
    </Dialog>
  )
}

export default DialogRecibo
