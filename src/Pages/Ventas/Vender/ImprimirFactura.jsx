import { Dialog, Zoom, DialogActions, Icon, DialogContent } from "@mui/material";

import ButtonCustom from "../../../Components/MuiCustom/ButtonCustom";
import { useVentas } from "./VentasProvider";
import printJS from "print-js";
import { useRef } from "react";
const ImprimirFactura = () => {
  const refPDF = useRef(null);
  const {
    dialogs,setDialogs,
    cerrarDialogFactura,
    indexFactura,
    datosFacturas,
    Funciones,
  } = useVentas();

  const EMPRESA = JSON.parse(localStorage.getItem("dataEmpresa"));
  const DF = datosFacturas.facturas[indexFactura];
  const DF2 = {...datosFacturas}

  // found caja relacionada con la factura
  const foundIndex = DF2.listaFacturas.findIndex(e => e.id_caja_empresa===DF.datosFactura.id_caja);
  const FACTURA = DF2.listaFacturas[foundIndex] ? DF2.listaFacturas[foundIndex] : {}  ;
  
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



  const cerrar = ()=>{ 
    setDialogs({...dialogs,imprimirFactura:false});
    cerrarDialogFactura();
}

const imprimir = () => {
  printJS({
    type: "html",
    printable: "print_factura",
    style: ` .border1 {border:none} 
    .maindiv{margin:20px auto; font-size:10px; font-family:monospace;max-width:198mm;display:flex;flex-direction:column;}
    .maindiv td{ padding:5px;  }
    .collapse{border-collapse:collapse; border-color:black;}
    .p_2{ padding:2 rem;}
    `,
  });
};

  return (
    <Dialog
      open={dialogs.imprimirFactura}
      fullWidth
      maxWidth="md"
      onClose={cerrarDialogFactura}
      TransitionComponent={Zoom}
    ><DialogContent>
      <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection:'column',
            margin: "8px auto",
            fontFamily: "monospace",
          }}
          id="print_factura"
          className="maindiv"
          ref={refPDF}
        >
          <table width="740px" align='center' style={{ borderCollapse: "collapse" }} className="collapse" border="1">
          <tbody>
            <tr>
              <td width="65%" align="left" colSpan="3" style={{ fontSize:"11px", padding:"3px"}} className='p_2'>
                { EMPRESA.logo_url_empresa ? <img src={EMPRESA.logo_url_empresa} alt="logo" width={200} height={40}  /> : <h2>{EMPRESA.nombre_empresa}</h2> }
                
                <p>De: {EMPRESA.propietario_empresa}</p>
                <p>{EMPRESA.categoria_empresa}</p>
                <p  className='fontsize9'>
                  Tel:{EMPRESA.telefono_empresa} - {EMPRESA.direccion_empresa}
                </p>
              </td>
              <td width="65%" align="left" colSpan="3" style={{ fontSize:"9px" }}>
                <p>RUC: {EMPRESA?.ruc_empresa}</p>
                <p>TIMBRADO NRO: {FACTURA?.timbrado_factura}</p>
                <p>Inicio vigencia: {FACTURA?.inicio_timbrado}</p>
                <p>Fin vigencia: {FACTURA?.fin_timbrado} </p>
                <b>FACTURA NRO: {FACTURA?.nro_datos_factura} {DF.datosFactura.nro_factura}</b>
              </td>
            </tr>
            <tr>
              <td width="65%" align="left" colSpan="3" style={{ fontSize:"10px" }}>
                <p>Fecha: {Funciones.getFechaActualString()}</p>
                <p>Nombre o Razón Social: {DF.datosCliente.nombre_cliente}</p>
                <p>Dirección: {DF.datosCliente.direccion_cliente}</p>
              </td>
              <td width="35%" align="left" valign="top"style={{ fontSize:"10px" }}>
                <p>
                  Cond. de venta:{" "}
                  {DF.datosFactura.tipoFactura === "1" ? "Contado" : "Crédito"}
                </p>
                <p>RUC/CI: {DF.datosCliente.ruc_cliente}</p>
              </td>
            </tr>
          </tbody>
          </table>
          <div >
          <table width="740px" align='center' style={{ borderCollapse: "collapse" }} className="collapse" border="1">
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
                    {DF.itemsFactura.map((e, i) => (
                      <tr key={i} style={{ fontSize: "10px" }} valign='top'>
                        <td width="10%" align="center" valign="center">
                          {e.cantidad_producto}
                        </td>
                        <td width="50%">{e.nombre_producto}</td>
                        <td width="10%" align="center">
                          <span>
                            {Funciones.numberSeparator(e.precio_guardado)}
                          </span>
                        </td>
                        <td width="10%" align="center">
                            {e.iva_porcentaje === 0 &&
                              Funciones.numberSeparator(
                                (e.precio_guardado) * (e.cantidad_producto)
                              )}
                          </td>
                          <td width="10%" align="center">
                            {e.iva_porcentaje === 5 &&
                              Funciones.numberSeparator(
                                (e.precio_guardado) * (e.cantidad_producto)
                              )}
                          </td>
                          <td width="10%" align="center">
                            {e.iva_porcentaje === 10 &&
                              Funciones.numberSeparator(
                                (e.precio_guardado) * (e.cantidad_producto)
                              )}
                          </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
                                <br/>
                <table width="740px" align='center'  style={{borderCollapse:"collapse"}} className="collapse" border="1">
                  <tbody>
                    <tr>
                        <td width="70%">
                          <p>SUBTOTALES:</p>
                        </td>
                        <td width="10%" align="center">{Funciones.numberSeparator(EXENTAS)}</td>
                        <td width="10%" align="center">{Funciones.numberSeparator(TOTAL5)}</td>
                        <td width="10%" align="center">{Funciones.numberSeparator(TOTAL10)}</td>
                    </tr>
                    </tbody>
                </table>
                <br/>
              <table align='center' width="740px"  style={{borderCollapse:"collapse"}} className="collapse" border="1">
                <tbody>
            <tr>
              <td width="70%" colSpan="3">
                <b>
                  TOTAL A PAGAR: {DF.datosMoneda.abreviatura_moneda} {" "}
                  {Funciones.NumeroALetras(DF.total, "")}
                </b>
              </td>
              <td width="30%" align="right">
                <b>{Funciones.numberSeparator(DF.total)}</b>
              </td>
            </tr>
            <tr>
              <td>LIQUIDACION IVA</td>
              <td>5%: {Funciones.redondeo2decimales(TOTALIVA5)}</td>
              <td>10%: {Funciones.redondeo2decimales(TOTALIVA10)}</td>
              <td align="right">TOTAL IVA:{Funciones.redondeo2decimales(DF.total_iva)}</td>
            </tr>
            <tr>
                <td colSpan="4">
                  {FACTURA?.obs_empresa_factura}
                </td>
              </tr>
              <tr>
                <td colSpan="4">
                  Fecha: {FACTURA?.fecha_empresa_factura}
                </td>
              </tr>
          </tbody>
        </table>
      </div>
      </DialogContent>
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
  );
};

export default ImprimirFactura;
