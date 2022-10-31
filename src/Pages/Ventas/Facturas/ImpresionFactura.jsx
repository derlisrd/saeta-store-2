import { Dialog, DialogActions, Zoom, Icon, Stack, CircularProgress, DialogContent,Link   } from "@mui/material";
import ButtonCustom  from "../../../Components/MuiCustom/ButtonCustom";
import printJS from "print-js";
//import ReactToPdf from "react-to-pdf";
import React, { useRef } from "react";
import { useFacturas } from "./FacturasProvider";
import {funciones} from "../../../Functions";
import { APIURL } from "../../../App/Config/config";

const ImpresionFactura = () => {
  const { dialogs, setDialogs, formulario, itemsFactura,cargandoFactura } = useFacturas();
  const refPDF = useRef(null);
  const EMPRESA = JSON.parse(localStorage.getItem("dataEmpresa"));
  const DF = { ...formulario };

  const id = DF?.id_factura;
  const url_pdf = APIURL+'pdf_factura/'+id;
 
  let TOTAL5 = 0;
  let TOTAL10 = 0;
  let TOTALIVA5 = 0;
  let TOTALIVA10 = 0;
  let TOTALIVA = 0;
  let TOTAL = 0;
  let EXENTAS = 0;

  itemsFactura.forEach((e) => {
    let subtotal = parseFloat(e.precio_producto_factura) * parseFloat(e.cantidad_producto);
    TOTAL += subtotal;
    let iva_porcent = parseFloat(e.porcentaje_impuesto);
    if (iva_porcent === "5") {
      TOTAL5 += subtotal;
      TOTALIVA5 += (subtotal * iva_porcent) / (100 + iva_porcent);
    } else if (iva_porcent === 10) {
      TOTAL10 += subtotal;
      TOTALIVA10 += (subtotal * iva_porcent) / (100 + iva_porcent);
    }else if(iva_porcent === 0){
      EXENTAS += subtotal;
    }
    
  });
  TOTALIVA = TOTALIVA5 + TOTALIVA10;


  const imprimir = () => {
    printJS({
      type: "html",
      printable: "print_factura",
      style: ` .border1 {border:none} 
      .maindiv{margin:0px auto; font-size:9px; font-family:monospace;max-width:198mm;display:flex;flex-direction:column;}
      .maindiv td{ padding-left:10px;}
      .collapse{border-collapse:collapse; border-color:silver}
      `,
    });
  };

  const cerrar = () => {
    setDialogs({ ...dialogs, imprimirFactura: false });
  };
  return (
    <Dialog
      open={dialogs.imprimirFactura}
      fullWidth
      maxWidth="md"
      onClose={cerrar}
      TransitionComponent={Zoom}
    ><DialogContent sx={{ margin:"0px auto" }}>
      {cargandoFactura ? (
        <Stack sx={{ padding: "20px" }} alignItems="center"><CircularProgress /></Stack>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection:'column',
            margin: "10px auto 0",
            fontFamily: "monospace",
          }}
          id="print_factura"
          className="maindiv"
          ref={refPDF}
        >
          <table
            width="740px"
            style={{ borderCollapse: "collapse" }}
            className="collapse"
            border="1"
          >
            <tbody>
              <tr>
                <td width="65%" align="left" colSpan="3" style={{ fontSize:"10px" }}>
                { EMPRESA.logo_url_empresa ? <img src={EMPRESA.logo_url_empresa} alt="logo" width={200} height={40}  /> : <h2>{EMPRESA.nombre_empresa}</h2> }
                  
                  <p> De: {EMPRESA.propietario_empresa}</p>
                  <small> {EMPRESA.categoria_empresa} Tel:{EMPRESA.telefono_empresa} - {EMPRESA.direccion_empresa}</small>
                </td>
                <td width="35%" align="left" valign="top" className="fontsize11" style={{ fontSize:"10px" }}>
                <p>RUC: {EMPRESA?.ruc_empresa}</p>
                  <p>TIMBRADO NRO: {DF?.timbrado_factura}</p>
                  <p>Inicio vigencia: {DF?.inicio_timbrado}</p>
                  <p>Fin vigencia: {DF?.fin_timbrado} </p>
                  <b>
                    FACTURA NRO: {DF?.nro_datos_factura} {DF.nro_factura}
                  </b>
                </td>
              </tr>
              <tr>
                <td width="65%" align="left" colSpan="3" style={{ fontSize:"12px" }}>
                  <p>Fecha: {DF.fecha_factura}</p>
                  <p>Nombre o Razón Social: {DF?.nombre_cliente}</p>
                  <p>Dirección: {DF?.direccion_cliente}</p>
                </td>
                <td width="35%" align="left" valign="top" className="fontsize11" style={{ fontSize:"12px" }}>
                  <p>
                    Cond. de venta:{" "}
                    {DF.tipo_factura === "1" ? "Contado" : "Crédito"}
                  </p>
                  <p>RUC/CI: {DF?.ruc_cliente}</p>
                </td>
              </tr>
            </tbody>
            </table>
          <br/>
          <div style={{ width:"100%"}}>
            <table width="740" style={{ borderCollapse: "collapse",padding:"2px" }}className="collapse" border="1">
                    <thead>
                      <tr align="left">
                        <th width="10%" align="center">
                          CANT.
                        </th>
                        <th width="50%" align="center">
                          <p>DESCRIPCION</p>
                        </th>
                        <th width="10%" align="center">
                          PRECIO
                        </th>
                        <th width="10%" align="center">
                          EXENTA
                        </th>
                        <th width="10%" align="center">
                          5%
                        </th>
                        <th width="10%" align="center">
                          10%
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemsFactura.map((e, i) => (
                        <tr key={i} style={{ fontSize: "10px" }}>
                          <td width="10%" align="center" valign="center">
                            {e.cantidad_producto}
                          </td>
                          <td width="50%">{e.nombre_producto}</td>
                          <td width="10%" align="center">
                            <span>
                              {funciones.numberSeparator(
                                e.precio_producto_factura
                              )}
                            </span>
                          </td>
                          <td width="10%" align="center">
                            {e.porcentaje_impuesto === "0" ?
                              funciones.numberSeparator(
                                parseFloat(e.precio_producto_factura) * parseFloat(e.cantidad_producto)
                              ) : "0"}
                          </td>
                          <td width="10%" align="center">
                            {e.porcentaje_impuesto === "5" ?
                              funciones.numberSeparator(
                                parseFloat(e.precio_producto_factura) * parseFloat(e.cantidad_producto)
                              ) : "0"}
                          </td>
                          <td width="10%" align="center">
                            {e.porcentaje_impuesto === "10" ?
                              funciones.numberSeparator(
                                parseFloat(e.precio_producto_factura) * parseFloat(e.cantidad_producto)
                              ) : "0"}
                          </td>
                        </tr>
                      ))}
                      </tbody></table>
                      </div>
                      <br/>
                      <table width="740px" style={{ borderCollapse: "collapse" }}className="collapse" border="1">
                        <tbody>
                      <tr>
                        <td width="70%">
                          <p>SUBTOTALES:</p>
                        </td>
                        <td width="10%" align="center">{funciones.numberSeparator(EXENTAS)}</td>
                        <td width="10%" align="center">{funciones.numberSeparator(TOTAL5)}</td>
                        <td width="10%" align="center">{funciones.numberSeparator(TOTAL10)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <br/>
              <table width="740px" style={{ borderCollapse: "collapse" }}className="collapse" border="1">
                <tbody>
                <tr>
                  <td width="70%" colSpan="3">
                    <b>
                      Letras: 
                      {funciones.NumeroALetras(TOTAL, "")} {DF.abreviatura_moneda} 
                    </b>
                  </td>
                  <td width="30%" align="right">
                    <b>{funciones.numberSeparator(TOTAL)}</b>
                  </td>
                </tr>
              <tr>
                <td>LIQUIDACION IVA</td>
                <td>5%: {funciones.numberSeparator( parseInt(funciones.redondeo2decimales(TOTALIVA5)))}</td>
                <td>10%: {funciones.numberSeparator( parseInt(funciones.redondeo2decimales(TOTALIVA10)))}</td>
                <td align="right">
                  TOTAL IVA:{funciones.numberSeparator(parseInt(funciones.redondeo2decimales(TOTALIVA)))}
                </td>
              </tr>
              <tr>
                <td colSpan="4">
                  {DF.obs_empresa_factura}
                </td>
              </tr>
              <tr>
                <td colSpan="4">
                  Fecha: {DF.fecha_empresa_factura}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      </DialogContent>
      <DialogActions>
      {/* <ReactToPdf
              targetRef={refPDF}
              x={8} y={8}
              filename={`${DF?.nro_datos_factura} ${DF.nro_factura}.pdf`}
            >
              {({ toPdf }) => (
                <ButtonCustom
                  variant="outlined"
                  startIcon={<Icon>picture_as_pdf</Icon>}
                  onClick={toPdf}
                >
                  PDF
                </ButtonCustom>
              )}
            </ReactToPdf> */}
            <ButtonCustom
                  component={Link}
                  href={url_pdf}
                  startIcon={<Icon>picture_as_pdf</Icon>}
                  onClick={()=>{}}
                >
                  PDF
            </ButtonCustom>

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
  );
};

export default ImpresionFactura;
