import { Dialog,DialogActions,Zoom,Icon, CircularProgress, Stack } from '@mui/material'
import printJS from "print-js";
import ButtonCustom from '../../../Components/MuiCustom/ButtonCustom'
import { useDatosEmpresa } from '../../../Contexts/DatosEmpresaProvider';
import {funciones} from '../../../Functions';
import { useFacturas } from './FacturasProvider'
const ImpresionRecibo = () => {

  const {EMPRESA} = useDatosEmpresa()
  const {dialogs,setDialogs,formulario,itemsFactura,cargandoFactura} = useFacturas();
  
    const imprimir = () => {
      printJS({ type: "html", printable: "print",style:'.textMono{font-family:monospace}' });
    };

    
  const widthDimension = EMPRESA.dimension_ticket+"mm";

  const DF = {...formulario}

  const cerrar = ()=>{
    setDialogs({...dialogs,imprimirRecibo:false})
  }

  return (
    <Dialog
      open={dialogs.imprimirRecibo}
      fullWidth
      maxWidth="xs"
      onClose={cerrar}
      TransitionComponent={Zoom}
    >
      {
        cargandoFactura ?  <Stack sx={{ padding:"20px" }} alignItems="center"> <CircularProgress /> </Stack> : 
      
      <div style={{display:"flex",justifyContent:"center",padding:"25px",margin:"0 auto"}} id="print" className='textMono'>
        <table
          border="0"
          style={{
            width:widthDimension,
            borderCollapse: "collapse",
          }} 
        >
          <thead style={{ fontSize: "11px" }}>
          <tr>
              <td align='center'>
              { EMPRESA.logo_url_empresa && <img src={EMPRESA.logo_url_empresa} alt="logo" width={200} height={40}  />}
              </td>
            </tr>
            <tr>
              <td align="center" style={{ fontSize: "15px" }}>
                <h2>{EMPRESA.nombre_empresa}</h2>
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
                <strong> RECIBO NRO: {DF.nro_factura}</strong>
              </td>
            </tr>
            <tr>
              <td align="center">Moneda: {DF.nombre_moneda}</td>
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
                    <tr style={{ fontSize: "11px" }}>
                      <td>CA</td>
                      <td>DESC</td>
                      <td>PRE</td>
                      <td>SUBT</td>
                      
                    </tr>
                    {itemsFactura.map((e, i) => (
                      <tr
                        key={i}
                        style={{ fontSize: "10px", textTransform: "lowercase" }}
                      >
                        <td valign="top">{e.cantidad_producto}</td>
                        <td valign="top">{e.nombre_producto}</td>
                        <td valign="top">{funciones.numberFormat(e.precio_producto_factura)}</td>
                        <td valign="top">
                          {funciones.numberFormat(parseFloat(e.precio_producto_factura) * parseFloat(e.cantidad_producto))}
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td align='center' >
                -------------------------------------------
              </td>
            </tr>
            <tr>
              <td>
              <table width="100%" style={{ fontSize: "12px" }}>
                  <tbody>
                  <tr><th>SUBTOTAL: {funciones.numberSeparator(DF.monto_total_factura)}</th></tr>
                    {parseInt(DF.descuento_factura)>0&&<tr><th> DESCUENTO: -{DF.descuento_factura} </th></tr>}
                    <tr>
                      <th>TOTAL: {funciones.numberSeparator(parseFloat(DF.monto_total_factura)-parseInt(DF.descuento_factura))}{" "}{DF.abreviatura_moneda}</th>
                    </tr>
                    <tr>
                      <th>
                        
                        {funciones.NumeroALetras(
                          parseFloat(DF.monto_total_factura) - parseFloat(DF.descuento_factura),
                          DF.abreviatura_moneda
                        )}{" "}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td align='center' >
                -------------------------------------------
              </td>
            </tr>
          </tbody>
          <tfoot style={{ fontSize: "11px" }}>
            <tr>
              <td align="left">CLIENTE: {DF.nombre_cliente}</td>
            </tr>
            <tr>
              <td align="left">DOC: {DF.ruc_cliente}</td>
            </tr>
            <tr>
              <td align="left">FECHA EMISION: {DF.fecha_factura}</td>
            </tr>
            <tr>
              <td>
                <hr />
              </td>
            </tr>
            <tr>
              <td align="center">
                Los datos impresos requieren un cuidado especial. Para ello
                evite exponer al calor y humedad en exceso, luz solar o lámparas
              </td>
            </tr>
            <tr>
              <td align="center">
                {" "}
                *{EMPRESA.nombre_empresa} agradece su compra *
              </td>
            </tr>
          </tfoot>
        </table>
        </div>
      }
        <DialogActions>
        <ButtonCustom 
          variant="contained"
          color="primary"
          startIcon={<Icon>print</Icon>}
          onClick={imprimir}
        >
          Imprimir
        </ButtonCustom>
        <ButtonCustom
          variant="outlined"
          color="primary"
          onClick={cerrar}
        >
          Cerrar
        </ButtonCustom>
      </DialogActions>
    </Dialog>
  )
}

export default ImpresionRecibo
