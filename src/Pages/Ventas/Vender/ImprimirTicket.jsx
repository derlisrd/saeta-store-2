import { Dialog, Zoom,Icon, DialogActions } from '@mui/material'
import React from 'react'
import { useVentas } from './VentasProvider'
import { CustomButton } from "../../../Componentes/Customs/muiCustom";
import printJS from "print-js";

const ImprimirTicket = () => {
    const {dialogs,setDialogs,indexFactura,datosFacturas,Funciones,cerrarDialogFactura} = useVentas();
    
    const EMPRESA = JSON.parse( localStorage.getItem('dataEmpresa') );
    const imprimir = () => {
      printJS({ type: "html", printable: "print_factura", style:"#print_factura{font-family:monospace}" });
    };

    const DF = datosFacturas.facturas[indexFactura];
    
    const cerrar = ()=>{ 
      setDialogs({...dialogs,imprimirTicket:false});
      cerrarDialogFactura();
  }

  return (
    <Dialog open={dialogs.imprimirTicket}
    maxWidth="xs"
    onClose={cerrar}
    TransitionComponent={Zoom}>
        <div style={{display:"flex",justifyContent:"center",padding:"25px",margin:"0 auto"}} id="print_factura">
        <table
          border="0"
          style={{
            width: `${EMPRESA.dimesion_ticket}`,
            borderCollapse: "collapse",
          }} 
        >
          <thead style={{ fontSize: "11px" }}>
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
                <strong> RECIBO NRO: {DF.datosFactura.nro_factura}</strong>
              </td>
            </tr>
            <tr>
              <td align="center">Moneda: {DF.datosMoneda.nombre_moneda}</td>
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
                    {DF.itemsFactura.map((item, i) => (
                      <tr
                        key={i}
                        style={{ fontSize: "10px", textTransform: "lowercase" }}
                      >
                        <td valign="top">{item.cantidad_producto}</td>
                        <td valign="top">{item.nombre_producto}</td>
                        <td valign="top">{Funciones.numberSeparator(item.precio_guardado)}</td>
                        <td valign="top">
                          {Funciones.numberSeparator(item.precio_guardado * item.cantidad_producto)}
                        </td>
                        
                      </tr>
                    ))}
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
              <td>
              <table width="100%" style={{ fontSize: "12px" }}>
                  <tbody>
                  <tr><th>SUBTOTAL: {Funciones.numberSeparator(DF.total)}</th></tr>
                    {DF.descuento>0&&<tr><th> DESCUENTO: -{DF.descuento} </th></tr>}
                    <tr>
                      <th>TOTAL: {Funciones.numberSeparator(DF.total-DF.descuento)}{" "}{DF.datosMoneda.abreviatura_moneda}</th>
                    </tr>
                    <tr>
                      <th>
                        
                        {Funciones.NumeroALetras(
                          DF.total - DF.descuento,
                          DF.datosMoneda.abreviatura_moneda
                        )}{" "}
                      </th>
                    </tr>
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
              <td align="left">CLIENTE: {DF.datosCliente.nombre_cliente}</td>
            </tr>
            <tr>
              <td align="left">DOC: {DF.datosCliente.ruc_cliente}</td>
            </tr>
            <tr>
              <td align="left">FECHA EMISION: {DF.datosFactura.fecha_factura}</td>
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
    
        <DialogActions>
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
  )
}

export default ImprimirTicket
