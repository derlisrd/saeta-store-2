import { CircularProgress, Dialog, DialogActions, Icon, Stack, Zoom } from "@mui/material";
import printJS from "print-js";
import ButtonCustom from "../../../../Components/MuiCustom/ButtonCustom";
import { useDatosEmpresa } from "../../../../Contexts/DatosEmpresaProvider";
import { funciones } from "../../../../Functions";
import { useFacturas } from "../FacturasProvider";





const ImprimirTicketFactura = () => {
  const {dialogs,setDialogs,formulario,itemsFactura,cargandoFactura} = useFacturas();
  const {EMPRESA} = useDatosEmpresa()
  const DF = { ...formulario };
  //const id = DF?.id_factura;  
  const imprimir = () => {
    printJS({ type: "html", printable: "print_factura", style:"#print_factura{font-family:monospace; padding:0; margin:0;}" });
  };
  const cerrar = ()=>{ 
    setDialogs({...dialogs,imprimirTicketFactura:false});
  }
  const widthDimension = EMPRESA.dimension_ticket+"mm";

  //const valorConvertido =()=>{}

  let TOTAL5 = 0;
  let TOTAL10 = 0;
  let TOTALIVA = 0;
  let TOTALIVAG = 0;
  let TOTALIVA5 = 0;
  let TOTALIVA10 = 0;
  let EXENTAS = 0;
  
  itemsFactura.forEach(e => {
    let subtotal = parseFloat(e.precio_producto_factura)* parseFloat(e.cantidad_producto);
    let iva_porcent = parseInt(e.porcentaje_impuesto);
    if(iva_porcent === 5){
      TOTAL5 += subtotal;
      TOTALIVA5 += (subtotal * iva_porcent) / (100 + iva_porcent);
    }else
    if(iva_porcent === 10){
      TOTAL10 += subtotal;
      TOTALIVA10 += (subtotal * iva_porcent) / (100 + iva_porcent);
    }else
    if(iva_porcent===0){
      EXENTAS  += subtotal;
    }
  });
  let DESCUENTO = parseFloat(DF.descuento_factura);
  let MONTO_TOTAL = parseFloat(DF.monto_total_factura) - DESCUENTO
  
  TOTALIVA = 0
  TOTALIVAG = 0


  return (
    <Dialog open={dialogs.imprimirTicketFactura} maxWidth="xs" onClose={cerrar} TransitionComponent={Zoom}>
      {cargandoFactura ? (
        <Stack sx={{ padding: "20px" }} alignItems="center"><CircularProgress /></Stack>
      ) : (
        <div style={{display:"flex",justifyContent:"center",padding:"25px",margin:"0 auto"}} id="print_factura">
        <table border="0" style={{width: widthDimension,borderCollapse: "collapse"}} >
          <tbody style={{ fontSize: "10px" }}>
            <tr>
              <td align="center" >
                <strong>{EMPRESA.nombre_empresa}</strong>
                <br />
                <small>De: {EMPRESA.propietario_empresa}</small>
                <br />
                <small>Ruc: {EMPRESA.ruc_empresa}</small>
                <br />
                <small>{EMPRESA.direccion_empresa}</small>
                <br />
                <small>{EMPRESA.categoria_empresa}</small>
              </td>
            </tr>
            <tr>
              <td align="center">
                <strong> Factura {DF.tipo_factura === "1" ? "Contado" : "Crédito"} nro {DF?.nro_datos_factura} {  funciones.cerosantes(DF.nro_factura,7) }</strong>
                <br />
                <small> Timbrado: {DF?.timbrado_factura}</small>
                <br/>
                <small>Válido Desde:{DF?.inicio_timbrado} Hasta: {DF?.fin_timbrado}</small>
              </td>
            </tr>
            <tr>
              <td align="center">
                <strong> {DF.tipo_factura==="3" && "CREDITO CUOTA"  }</strong>
              </td>
            </tr>          
          <tr><td align='center'>{"-------------"}</td></tr>
            <tr>
              <td>
                <table width="100%">
                <tbody>
                    <tr style={{ fontSize: "10px" }}>
                      <th>Cod.</th>
                      <th>Ca</th>
                      <th>Desc.</th>
                      <th>Prec.</th>
                      <th>SubT.</th>
                      <th>IVA.</th>
                    </tr>
                    {itemsFactura.map((item, i) => (
                      <tr
                        key={i}
                        style={{ fontSize: "10px", textTransform: "lowercase" }}
                      >
                        <td valign="top">{item.codigo_producto}</td>
                        <td valign="top"><small>{item.cantidad_producto}</small></td>
                        <td valign="top"><small>{item.nombre_producto}</small></td>
                        <td valign="top">{(item.precio_producto_factura)}</td>
                        <td valign="top">
                          {(item.precio_producto_factura * item.cantidad_producto)}
                        </td>
                        <td valign="top">{item.porcentaje_impuesto}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr> 
              <td align='center'>{"-------------"}</td>
            </tr>
            <tr>
              <td><b>Total: {(MONTO_TOTAL)}{" "}{DF.abreviatura_moneda}</b></td>
            </tr>
            <tr>
              <td>
              <small>Total Exentas : {funciones.redondeo2decimales(EXENTAS)} {' '}</small><br />
              <small>Total grabadas 5% : {funciones.redondeo2decimales(TOTAL5)} {' '}</small><br />
              <small>Total grabadas 10% : {funciones.redondeo2decimales(TOTAL10)}</small>
              <br/>
              <small>Total grabadas : {funciones.redondeo2decimales(TOTALIVAG)} </small></td>
            </tr>
            <tr><td></td></tr>
            <tr>
              <td><small>Liquidacion IVA</small><br/>
              <small>IVA 5% : {funciones.redondeo2decimales(TOTALIVA5)} {' '}</small><br />
              <small>IVA 10% : {funciones.redondeo2decimales(TOTALIVA10)}</small>
              <br/>
              <small>Total IVA : {funciones.redondeo2decimales(TOTALIVA)} </small></td>
            </tr>
          </tbody>
          <tfoot style={{ fontSize: "10px" }}>
            <tr>
              <td align='center'>{"-------------"}</td>
            </tr>
            <tr>
              <td align="left">
                <small>Cliente: {DF.nombre_cliente}</small>
                <br />
                <small>Ci o ruc: {DF.ruc_cliente}</small>
                <br />
                <small>Fecha de emision: { funciones.fechaActualDMY( DF.fecha_factura )}</small>
              </td>
            </tr>
            <tr>
              <td align="left">
                <small>
                  {DF.obs_empresa_factura} {DF.fecha_empresa_factura}
                </small>
                <br/>
                <small>**Original: cliente. Duplicado: archivo tributario.**</small><br/>
                <small>
                  Los datos impresos en esta factura requieren de cuidados especiales. Para ello evitese: el contacto directo con plásticos, solventes de productos químicos, exposición al calor y humedad en exeso, luz solar o lámparas fluorescentes.
                </small>
              </td>
            </tr>
          </tfoot>
        </table>
        </div>) }
    
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
export default ImprimirTicketFactura