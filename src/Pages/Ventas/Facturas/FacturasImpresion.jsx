import { Dialog, Zoom, DialogActions, Icon, CircularProgress } from "@mui/material"
import { useFacturas } from "./FacturasProvider"
import { useDatosEmpresa } from "../../../Contextos/DatosEmpresaProvider";
import { CustomButton } from "../../../Componentes/Customs/muiCustom";
import printJS from "print-js";
import { Funciones } from "../../../Funciones/Funciones";

const FacturasImpresion = () => {

  const { EMPRESA } = useDatosEmpresa();
  const {dialogs,setDialogs,formulario,itemsFactura,setItemsFactura} = useFacturas()
  
  const cerrar = ()=>{
    setDialogs({...dialogs,imprimir: false})
    setItemsFactura([]);
  }

  const width = EMPRESA.dimension_ticket+"mm";
  
  const imprimir = () => {
    printJS({ type: "html", printable: "print_factura" });
  };

  
  
  const impuestosArray = [];
  var index, liquidacion, percent, iva;
  itemsFactura.forEach((item) => {
    index = impuestosArray.findIndex((e) => e.id_impuesto === item.id_impuesto);
    if (index < 0) {
      liquidacion = parseFloat(item.cantidad_producto) * parseFloat(item.precio_producto_factura);
      percent = parseFloat(item.porcentaje_impuesto);
      iva = (liquidacion / (100 + percent)) * percent;
      impuestosArray.push({
        id_impuesto: item.id_impuesto,
        porcentaje_impuesto: percent,
        nombre_impuesto: item.nombre_impuesto,
        liquidacion: liquidacion,
        iva: iva,
      });
    } else {
      liquidacion +=
        parseFloat(item.cantidad_producto) * parseFloat(item.precio_producto);
      percent = parseFloat(item.porcentaje_impuesto);
      iva += (liquidacion / (100 + percent)) * percent;
      impuestosArray[index] = {
        id_impuesto: item.id_impuesto,
        porcentaje_impuesto: percent,
        nombre_impuesto: item.nombre_impuesto,
        liquidacion: liquidacion,
        iva: iva,
      };
    }
  });

  
  return (
    <Dialog open={dialogs.imprimir} 
      onClose={cerrar}
      TransitionComponent={Zoom} >
        {
          itemsFactura.length === 0 ?
          <div style={{display:"flex",justifyContent:"center",padding:"15px",margin:"0 auto"}}>
          <CircularProgress /> 
          </div>
          :
        
        <div style={{display:"flex",justifyContent:"center",padding:"15px",margin:"0 auto"}} id="print_factura">
          {
            formulario.tipo_factura!=="0" ?
            (
              <table
          border="0"
          style={{
            width: `${width}`,
            borderCollapse: "collapse",
          }} 
        >
          <thead style={{ fontSize: "11px",margin:"0 auto", padding:"10px auto" }}>
            <tr>
              <td align="center" style={{ fontSize: "15px" }}>
                {EMPRESA.nombre_empresa}
              </td>
            </tr>
            <tr>
              <td align="center">
                {" "}
                {EMPRESA.propietario_empresa === "" ??  `De : ${EMPRESA.propietario_empresa}`}
              </td>
            </tr>
            <tr>
              <td align="center">Ruc: {EMPRESA.ruc_empresa}</td>
            </tr>
            <tr>
              <td align="center">{EMPRESA.direccion_empresa}</td>
            </tr>
            <tr>
              <td align="center">Tel: {EMPRESA.telefono_empresa}</td>
            </tr>
            <tr>
              <td align="center">Timbrado nro: {formulario?.timbrado_factura}</td>
            </tr>
            <tr>
              <td align="center">
                Fecha Inicio: {formulario?.inicio_timbrado}
              </td>
            </tr>
            <tr>
              <td align="center">Fecha Fin: {formulario?.fin_timbrado}</td>
            </tr>
            <tr>
              <td align="center">
                FACTURA NRO:  {formulario?.nro_datos_factura}-{" "} {formulario?.nro_factura}
                
              </td>
            </tr>
            <tr>
              <td align="center">Moneda: {formulario.nombre_moneda}</td>
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
                      <td>DESCRIPCION</td>
                      <td>PRE</td>
                      <td>SUBT</td>
                      <td>%</td>
                    </tr>
                    {itemsFactura.map((item, i) => (
                      <tr
                        key={i}
                        style={{ fontSize: "10px", textTransform: "lowercase" }}
                      >
                        <td valign="top">{item.cantidad_producto}</td>
                        <td valign="top">{item.nombre_producto}</td>
                        <td valign="top">{item.precio_producto_factura}</td>
                        <td valign="top">
                          {item.precio_producto_factura * item.cantidad_producto}
                        </td>
                        <td valign="top">{item.porcentaje_impuesto}</td>
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
                <table width="100%" style={{ fontSize: "11px" }}>
                  <tbody>
                    <tr>
                      <td align="left">SUBTOTALES</td>
                      <td align="left">LIQUIDACION</td>
                      <td align="left">IVA</td>
                    </tr>
                    {impuestosArray.map((item) => (
                      <tr key={item.id_impuesto}>
                        <td align="left">{item.nombre_impuesto}</td>
                        <td align="left">
                          {Funciones.numberSeparator(
                            item.liquidacion / parseFloat(formulario.valor_moneda)
                          )}
                        </td>
                        <td align="left">
                          {Funciones.numberSeparator(
                            Funciones.redondeo2decimales(
                              item.iva / parseFloat(formulario.valor_moneda)
                            )
                          )}
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
                    <tr>
                      <th>
                        TOTAL: {Funciones.numberSeparator(parseFloat(formulario.monto_total_factura))}{" "}{formulario.abreviatura_moneda}
                      </th>
                    </tr>
                    <tr>
                      <th>
                        SON:{" "}
                        {Funciones.NumeroALetras(
                          parseFloat(formulario.monto_total_factura),
                          formulario.nombre_moneda
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
              <td align="left">CLIENTE: {formulario.nombre_cliente}</td>
            </tr>
            <tr>
              <td align="left">DOC: {formulario.ruc_cliente}</td>
            </tr>
            <tr>
              <td align="left">FECHA EMISION: {formulario.fecha_factura}</td>
            </tr>
            <tr>
              <td align="left">
                FACTURA: {formulario.tipoFactura === "1" ? "CONTADO" : "CREDITO"}{" "}
              </td>
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
            )
            : 
            <table
          border="0"
          style={{ width: `${width}`, borderCollapse: "collapse" }}
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
                <strong> RECIBO NRO: {formulario.nro_factura}</strong>
              </td>
            </tr>
            <tr>
              <td align="center">Moneda: {formulario.nombre_moneda}</td>
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
                      <td>DESCRIPCION</td>
                      <td>PRE</td>
                      <td>SUBT</td>
                      
                    </tr>
                    {itemsFactura.map((item, i) => (
                      <tr
                        key={i}
                        style={{ fontSize: "10px", textTransform: "lowercase" }}
                      >
                        <td valign="top">{item.cantidad_producto}</td>
                        <td valign="top">{item.nombre_producto}</td>
                        <td valign="top">{item.precio_producto_factura}</td>
                        <td valign="top">
                          {parseFloat(item.precio_producto_factura) * parseFloat(item.cantidad_producto)}
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
                    <tr>
                      <th>
                        TOTAL: {Funciones.numberSeparator(parseFloat(formulario.monto_total_factura))}{" "}{formulario.abreviatura_moneda}
                      </th>
                    </tr>
                    <tr>
                      <th>
                        SON:{" "}
                        {Funciones.NumeroALetras(
                          parseFloat(formulario.monto_total_factura),
                          formulario.nombre_moneda
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
              <td align="left">CLIENTE: {formulario.nombre_cliente}</td>
            </tr>
            <tr>
              <td align="left">DOC: {formulario.ruc_cliente}</td>
            </tr>
            <tr>
              <td align="left">FECHA RECIBO: {formulario.fecha_factura}</td>
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
          }        
        </div>
  }
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

export default FacturasImpresion
