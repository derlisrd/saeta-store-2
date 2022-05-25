import { Dialog, DialogActions, Zoom, Icon, Stack, CircularProgress } from "@mui/material";
import { CustomButton } from "../../../Componentes/Customs/muiCustom";
import printJS from "print-js";
import ReactToPdf from "react-to-pdf";
import React, { useRef } from "react";
import { useFacturas } from "./FacturasProvider";
import Funciones from "../../../Funciones";

const ImpresionFactura = () => {
  const { dialogs, setDialogs, formulario, itemsFactura,cargandoFactura } = useFacturas();
  const refPDF = useRef(null);
  const EMPRESA = JSON.parse(localStorage.getItem("dataEmpresa"));
  const DF = { ...formulario };

  

  let TOTAL5 = 0;
  let TOTAL10 = 0;
  let TOTALIVA5 = 0;
  let TOTALIVA10 = 0;
  let TOTALIVA = 0;
  let TOTAL = 0;
  let EXENTAS = 0;

  itemsFactura.forEach((e) => {
    let subtotal = parseFloat(e.precio_producto_factura) * parseFloat(e.cantidad_producto);
    TOTAL = +subtotal;
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
    TOTALIVA += TOTALIVA5 + TOTALIVA10;
  });

  const imprimir = () => {
    printJS({
      type: "html",
      printable: "print_factura",
      style: ` .border1 {border:1px solid silver} 
      .maindiv{margin:20px auto; font-family:monospace;  max-width:198mm}
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
    >
      {cargandoFactura ? (
        <Stack sx={{ padding: "20px" }} alignItems="center"><CircularProgress /></Stack>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "25px auto",
            fontFamily: "monospace",
          }}
          id="print_factura"
          className="maindiv"
          ref={refPDF}
        >
          <table
            align="center"
            border="1"
            style={{
              borderCollapse: "collapse",
            }}
            className="collapse"
          >
            <thead>
              <tr>
                <td width="70%" align="center" colSpan="3">
                  <h2>{EMPRESA.nombre_empresa}</h2>
                  <p>De: {EMPRESA.propietario_empresa}</p>
                  <p>{EMPRESA.categoria_empresa}</p>
                  <p>
                    Tel:{EMPRESA.telefono_empresa} - {EMPRESA.direccion_empresa}
                  </p>
                </td>
                <td width="30%" align="center" valign="top">
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
                <td width="70%" align="center" colSpan="3">
                  <p>Fecha: {Funciones.getFechaActualString()}</p>
                  <p>Nombre o Razón Social: {DF?.nombre_cliente}</p>
                  <p>Dirección: {DF?.direccion_cliente}</p>
                </td>
                <td width="30%" align="center" valign="top">
                  <p>
                    Condición de venta:{" "}
                    {DF.tipo_factura === "1" ? "Contado" : "Crédito"}
                  </p>
                  <p>RUC/CI: {DF?.ruc_cliente}</p>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td align="center" colSpan="4" valign="top">
                  <table
                    width="740px"
                    style={{ borderCollapse: "collapse" }}
                    className="collapse"
                    border="1"
                  >
                    <thead>
                      <tr align="left">
                        <th width="10%" align="center">
                          CANT.
                        </th>
                        <th width="50%" align="center">
                          <p>PRODUCTO / SERVICIO</p>
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
                              {Funciones.numberSeparator(
                                e.precio_producto_factura
                              )}
                            </span>
                          </td>
                          <td width="10%" align="center">
                            {e.porcentaje_impuesto === "0" ?
                              Funciones.numberSeparator(
                                parseFloat(e.precio_producto_factura) * parseFloat(e.cantidad_producto)
                              ) : "0"}
                          </td>
                          <td width="10%" align="center">
                            {e.porcentaje_impuesto === "5" ?
                              Funciones.numberSeparator(
                                parseFloat(e.precio_producto_factura) * parseFloat(e.cantidad_producto)
                              ) : "0"}
                          </td>
                          <td width="10%" align="center">
                            {e.porcentaje_impuesto === "10" ?
                              Funciones.numberSeparator(
                                parseFloat(e.precio_producto_factura) * parseFloat(e.cantidad_producto)
                              ) : "0"}
                          </td>
                        </tr>
                      ))}
                      <tr style={{ height:"30px" }}><td colSpan="6"> </td></tr>
                      <tr>
                        <td colSpan="3">
                          <p>SUBTOTALES:</p>
                        </td>
                        <td align="center">{Funciones.numberSeparator(EXENTAS)}</td>
                        <td align="center">{Funciones.numberSeparator(TOTAL5)}</td>
                        <td align="center">{Funciones.numberSeparator(TOTAL10)}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td width="70%" colSpan="3">
                  <b>
                    TOTAL A PAGAR: {DF.abreviatura_moneda} {" "}
                    {Funciones.NumeroALetras(TOTAL, "")}
                  </b>
                </td>
                <td width="30%" align="right">
                  <b>{Funciones.numberSeparator(TOTAL)}</b>
                </td>
              </tr>
              <tr>
                <td>LIQUIDACION IVA</td>
                <td>5%: {Funciones.numberSeparator( parseInt(Funciones.redondeo2decimales(TOTALIVA5)))}</td>
                <td>10%: {Funciones.numberSeparator( parseInt(Funciones.redondeo2decimales(TOTALIVA10)))}</td>
                <td align="right">
                  TOTAL IVA:{Funciones.redondeo2decimales(TOTALIVA)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <DialogActions>
      <ReactToPdf
              targetRef={refPDF}
              x={8} y={8}
              filename={`${DF?.nro_datos_factura} ${DF.nro_factura}.pdf`}
            >
              {({ toPdf }) => (
                <CustomButton
                  variant="outlined"
                  startIcon={<Icon>picture_as_pdf</Icon>}
                  onClick={toPdf}
                >
                  PDF
                </CustomButton>
              )}
            </ReactToPdf>
        <CustomButton
          size="large"
          variant="contained"
          color="primary"
          startIcon={<Icon>print</Icon>}
          onClick={imprimir}
        >
          Imprimir
        </CustomButton>
        <CustomButton
          size="large"
          variant="outlined"
          color="primary"
          onClick={cerrar}
        >
          Cerrar
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default ImpresionFactura;
