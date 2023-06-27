import { Dialog, DialogActions, Icon, Zoom } from "@mui/material";
import printJS from "print-js";
import ButtonCustom from "../../../../Components/MuiCustom/ButtonCustom";
import { useDatosEmpresa } from "../../../../Contexts/DatosEmpresaProvider";
import { funciones } from "../../../../Functions";
import { useVentas } from "../VentasProvider";


const ImprimirTicketFactura = () => {
    const {dialogs,setDialogs,indexFactura,datosFacturas,cerrarDialogFactura,valorConvertido} = useVentas();
    const {EMPRESA} = useDatosEmpresa()
    
    
    const imprimir = () => {
      printJS({ type: "html", printable: "print_factura", style:"#print_factura{font-family:monospace; padding:0; margin:0;}" });
    };
    const cerrar = ()=>{ 
      setDialogs({...dialogs,imprimirTicketFactura:false});
      cerrarDialogFactura();
    }
    const DF = datosFacturas.facturas[indexFactura];
    const DF2 = {...datosFacturas}
    //found caja relacionada con la factura
    const foundIndex = DF2.listaFacturas.findIndex(e => e.id_caja_empresa===DF.datosFactura.id_caja);
    const FACTURA = DF2.listaFacturas[foundIndex] ??  {}  ;
    const widthDimension = EMPRESA.dimension_ticket+"mm";

  let TOTAL5 = 0;
  let TOTAL10 = 0;
  let TOTALIVA5 = 0;
  let TOTALIVA10 = 0;
  let EXENTAS = 0;
  DF.itemsFactura.forEach(e => {
    let subtotal = e.precio_guardado*(e.cantidad_producto);
    let iva_porcent = e.iva_porcentaje;
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

  

  return (
    <Dialog open={dialogs.imprimirTicketFactura} maxWidth="xs" onClose={cerrar} TransitionComponent={Zoom}>
        <div style={{display:"flex",justifyContent:"center",padding:"25px",margin:"0 auto"}} id="print_factura">
        <table border="0" style={{width: widthDimension,borderCollapse: "collapse"}} >
          <tbody style={{ fontSize: "10px" }}>
            <tr>
              <td align="center" style={{ fontSize: "15px" }}>
                <small>{EMPRESA.nombre_empresa}</small>
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
                <strong> Factura {DF.datosFactura.tipoFactura === "1" ? "Contado" : "Crédito"} nro {FACTURA?.nro_datos_factura} {  funciones.cerosantes(DF.datosFactura.nro_factura,7) }</strong>
                <br />
                <small> Timbrado: {FACTURA?.timbrado_factura}</small>
                <br/>
                <small>Válido Desde:{FACTURA?.inicio_timbrado} Hasta: {FACTURA?.fin_timbrado}</small>
              </td>
            </tr>
            <tr>
              <td align="center">
                <strong> {DF.datosFactura.tipoFactura==="3" && "CREDITO CUOTA"  }</strong>
              </td>
            </tr>          
          <tr><td align='center'>{"-------------"}</td></tr>
            <tr>
              <td>
                <table width="100%">
                <tbody>
                    <tr>
                      <th>Cod.</th>
                      <th>Ca</th>
                      <th>Desc.</th>
                      <th>Prec.</th>
                      <th>SubT.</th>
                      <th>IVA.</th>
                    </tr>
                    {DF.itemsFactura.map((item, i) => (
                      <tr
                        key={i}
                        style={{ fontSize: "10px", textTransform: "lowercase" }}
                      >
                        <td valign="top">{item.codigo_producto}</td>
                        <td valign="top"><small>{item.cantidad_producto}</small></td>
                        <td valign="top"><small>{item.nombre_producto}</small></td>
                        <td valign="top">{valorConvertido(item.precio_guardado)}</td>
                        <td valign="top">
                          {valorConvertido(item.precio_guardado * item.cantidad_producto)}
                        </td>
                        <td valign="top">{item.iva_porcentaje}</td>
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
              <td><b>Total: {valorConvertido(DF.total-DF.descuento)}{" "}{DF.datosMoneda.abreviatura_moneda}</b></td>
            </tr>
            <tr>
              <td>
              <small>Total Exentas : {funciones.redondeo2decimales(EXENTAS)} {' '}</small><br />
              <small>Total grabadas 5% : {funciones.redondeo2decimales(TOTAL5)} {' '}</small><br />
              <small>Total grabadas 10% : {funciones.redondeo2decimales(TOTAL10)}</small>
              <br/>
              <small>Total grabadas : {funciones.redondeo2decimales(DF.total-DF.descuento)} </small></td>
            </tr>
            <tr><td></td></tr>
            <tr>
              <td><small>Liquidacion IVA</small><br/>
              <small>IVA 5% : {funciones.redondeo2decimales(TOTALIVA5)} {' '}</small><br />
              <small>IVA 10% : {funciones.redondeo2decimales(TOTALIVA10)}</small>
              <br/>
              <small>Total IVA : {funciones.redondeo2decimales(DF.total_iva)} </small></td>
            </tr>
          </tbody>
          <tfoot style={{ fontSize: "10px" }}>
            <tr>
              <td align='center'>{"-------------"}</td>
            </tr>
            <tr>
              <td align="left">
                <small>Cliente: {DF.datosCliente.nombre_cliente}</small>
                <br />
                <small>Ci o ruc: {DF.datosCliente.ruc_cliente}</small>
                <br />
                <small>Fecha: { DF.datosFactura.fecha_factura }</small>
              </td>
            </tr>
            <tr>
              <td align="left">
                <small>
                  {FACTURA.obs_empresa_factura} {FACTURA.fecha_empresa_factura}
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
export default ImprimirTicketFactura