import { Dialog, DialogActions, Icon, Zoom } from '@mui/material';
import printJS from 'print-js';
import ButtonCustom from '../../../../Components/MuiCustom/ButtonCustom';
import { useDatosEmpresa } from '../../../../Contexts/DatosEmpresaProvider';
import { useVentas } from '../VentasProvider';

const ImprimirTicketRecibo = () => {
    const {dialogs,setDialogs,indexFactura,datosFacturas,cerrarDialogFactura,valorConvertido} = useVentas();
    
    const {EMPRESA} = useDatosEmpresa()
    const imprimir = () => {
      printJS({ type: "html", printable: "print_factura", style:"#print_factura{font-family:monospace; padding:0; margin:0;}" });
    };

    const DF = datosFacturas.facturas[indexFactura];
    const widthDimension = EMPRESA.dimension_ticket+"mm";
    const cerrar = ()=>{ 
      setDialogs({...dialogs,imprimirTicketRecibo:false});
      cerrarDialogFactura();
  }

  


  return (
    <Dialog open={dialogs.imprimirTicketRecibo} maxWidth="xs" onClose={cerrar} TransitionComponent={Zoom}>
        <div style={{display:"flex",justifyContent:"center",padding:"25px",margin:"0 auto"}} id="print_factura">
        <table border="0" style={{width: widthDimension,borderCollapse: "collapse"}} 
        >
          <thead style={{ fontSize: "10px" }}>
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
                <strong> Recibo: {DF.datosFactura.nro_factura}</strong>
              </td>
            </tr>
            <tr>
              <td align="center">
                <strong> {DF.datosFactura.tipoFactura==="3" && "CREDITO CUOTA"  }</strong>
              </td>
            </tr>
            <tr>
              <td align="center">Moneda: {DF.datosMoneda.nombre_moneda}</td>
            </tr>
          </thead>
          <tbody>
          <tr><td align='center'>{"-------------"}</td></tr>
            <tr>
              <td>
                <table width="100%">
                <tbody>
                    <tr style={{ fontSize: "10px" }}>
                      <td><b>C</b></td>
                      <td><b>desc</b></td>
                      <td><b>pre</b></td>
                      <td><b>sub</b></td>
                      
                    </tr>
                    {DF.itemsFactura.map((item, i) => (
                      <tr
                        key={i}
                        style={{ fontSize: "10px", textTransform: "lowercase" }}
                      >
                        <td valign="top">{item.cantidad_producto}</td>
                        <td valign="top">{item.nombre_producto}</td>
                        <td valign="top">{valorConvertido(item.precio_guardado)}</td>
                        <td valign="top">
                          {valorConvertido(item.precio_guardado * item.cantidad_producto)}
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr><td align='center'>{"-------------"}</td></tr>
            <tr>
              <td >
              <table width="100%" style={{ fontSize: "11px" }}>
                  <tbody>
                  <tr><td><b>Sub: {valorConvertido(DF.total)} {DF.datosMoneda.abreviatura_moneda}</b></td></tr>
                    {DF.descuento>0&&<tr><td> Descuento: -{valorConvertido(DF.descuento)} </td></tr>}
                    <tr>
                      <td><b>Total: {valorConvertido(DF.total-DF.descuento)}{" "}{DF.datosMoneda.abreviatura_moneda}</b></td>
                    </tr>
                    <tr>
                      <td><b>Abonado: {valorConvertido(DF.datosFactura.totalAbonado)} {DF.datosMoneda.abreviatura_moneda}</b></td>
                    </tr>
                    {/* <tr>
                      <th>
                        LETRAS:  {" "}
                        {Funciones.NumeroALetras(
                          valorConvertido((DF.total - DF.descuento),true),
                          DF.datosMoneda.abreviatura_moneda
                        )}
                      </th>
                    </tr> */}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
          <tfoot style={{ fontSize: "10px" }}>
          <tr>
              <td align='center'>{"-------------"}</td>
            </tr>
            <tr>
              <td align="left">Cliente: {DF.datosCliente.nombre_cliente}</td>
            </tr>
            <tr>
              <td align="left">Doc: {DF.datosCliente.ruc_cliente}</td>
            </tr>
            <tr>
              <td align="left">Fecha:  {  DF.datosFactura.fecha_factura }</td>
            </tr>
            <tr>
              <td align="center">
                *{EMPRESA.mensaje_recibo_empresa} *
              </td>
            </tr>
          </tfoot>
        </table>
        </div>
    
        <DialogActions>
        <ButtonCustom 
          size="large"
          variant="contained"
          color="primary"
          startIcon={<Icon>print</Icon>}
          onClick={imprimir}
        >
          Imprimir
        </ButtonCustom>
        <ButtonCustom
          size="large"
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

export default ImprimirTicketRecibo
