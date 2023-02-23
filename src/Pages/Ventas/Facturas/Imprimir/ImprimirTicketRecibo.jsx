import { CircularProgress, Dialog, DialogActions, Icon, Stack, Zoom } from "@mui/material";
import printJS from "print-js";
import ButtonCustom from "../../../../Components/MuiCustom/ButtonCustom";
import { useDatosEmpresa } from "../../../../Contexts/DatosEmpresaProvider";
import { funciones } from "../../../../Functions";
import { useFacturas } from "../FacturasProvider";

const ImpresionTicketRecibo = () => {

  const {EMPRESA} = useDatosEmpresa()
  const {dialogs,setDialogs,formulario,itemsFactura,loadings} = useFacturas();
  
    const imprimir = () => {
      printJS({ type: "html", printable: "print_factura",style:'*{font-family:monospace;} .textMono{font-family:monospace;font-size:10px;}' });
    };

    
  const widthDimension = EMPRESA.dimension_ticket+"mm";

  const DF = {...formulario}

  const cerrar = ()=>{
    setDialogs({...dialogs,imprimirTicketRecibo:false})
  }

  return (
    <Dialog open={dialogs.imprimirTicketRecibo} maxWidth="xs" onClose={cerrar} TransitionComponent={Zoom}>
      {loadings.factura ? (
        <Stack sx={{ padding: "20px" }} alignItems="center"><CircularProgress /></Stack>
      ) : 
        <div style={{display:"flex",justifyContent:"center",padding:"25px",margin:"0 auto"}} id="print_factura">
        <table border="0" style={{width: widthDimension,borderCollapse: "collapse"}} >
          <thead style={{ fontSize: "10px" }}>
          <tr>
              <td align='center'>
              {EMPRESA.logo_url_empresa && <img src={EMPRESA.logo_url_empresa} alt="logo" width={200} height={40}  />}
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
                <strong> Recibo: {DF.nro_factura}</strong>
              </td>
            </tr>
            <tr>
              <td align="center">Moneda: {DF.nombre_moneda}</td>
            </tr>
            <tr><td align='center'>{"--------------------"}</td></tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <table width="100%">
                <tbody>
                    <tr style={{ fontSize: "11px" }}>
                      <td>C</td>
                      <td>DES</td>
                      <td>PRE</td>
                      <td>SUB</td>
                      
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
            <tr><td align='center'>{"------------------"}</td></tr>
            <tr>
              <td>
              <table width="100%" style={{ fontSize: "11px" }}>
                  <tbody>
                  <tr><td><b>Subt: {funciones.numberSeparator(DF.monto_total_factura)} {DF.abreviatura_moneda}</b></td></tr>
                    {parseInt(DF.descuento_factura)>0&&<tr><td> DESCUENTO: -{DF.descuento_factura} </td></tr>}
                    <tr>
                      <td><b>Total: {funciones.numberSeparator(parseFloat(DF.monto_total_factura)-parseInt(DF.descuento_factura))}{" "}{DF.abreviatura_moneda}</b></td>
                    </tr>
                    {/* <tr>
                      <td>
                        
                        {funciones.NumeroALetras(
                          parseFloat(DF.monto_total_factura) - parseFloat(DF.descuento_factura),
                          DF.abreviatura_moneda
                        )}{" "}
                      </th>
                    </tr> */}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
          <tfoot style={{ fontSize: "10px" }}>
          <tr>
              <td>{" "}</td>
            </tr>
            <tr>
              <td align="left">Cliente: {DF.nombre_cliente}</td>
            </tr>
            <tr>
              <td align="left">Doc: {DF.ruc_cliente}</td>
            </tr>
            <tr>
              <td align="left">Fecha:  { funciones.fechaActualDMY( DF.fecha_factura )}</td>
            </tr>
            <tr>
              <td align="center">
                *{EMPRESA.mensaje_recibo_empresa}*
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

export default ImpresionTicketRecibo
