import { Dialog, DialogActions, DialogContent, DialogTitle, Icon, Zoom,Link } from "@mui/material";
import { useVentas } from '../VentasProvider';
import { useDatosEmpresa } from '../../../../Contexts/DatosEmpresaProvider';
import ButtonCustom from "../../../../Components/MuiCustom/ButtonCustom";
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './stylesA4.css';
import { funciones } from "../../../../Functions";
import { APIURL } from '../../../../App/Config/config';

const ImprimirFacturaA4 = () => {
  const {dialogs,setDialogs,indexFactura,datosFacturas,cerrarDialogFactura,lastID} = useVentas();
  const {EMPRESA} = useDatosEmpresa()

  const DF = datosFacturas.facturas[indexFactura];
  const DF2 = {...datosFacturas}
  //found caja relacionada con la factura
  const foundIndex = DF2.listaFacturas.findIndex(e => e.id_caja_empresa===DF.datosFactura.id_caja);
  const FACTURA = DF2.listaFacturas[foundIndex] ??  {}  ;



  const url_pdf = APIURL+'pdf_factura/'+lastID;

  const divRef = useRef();
  const handlePrint = useReactToPrint({
        content: () => divRef.current,
  });
  const cerrar = ()=>{ 
    setDialogs({...dialogs,imprimirFacturaA4:false});
    cerrarDialogFactura();
  }

  let SUBTOTAL5 = 0;
  let SUBTOTAL10 = 0;
  let TOTALIVA5 = 0;
  let TOTALIVA10 = 0;
  let TOTAL = DF.total - DF.descuento
  let EXENTAS = 0;
  DF.itemsFactura.forEach(e => {
    let subtotal = e.precio_guardado*(e.cantidad_producto);
    let iva_porcent = e.iva_porcentaje;
    if(iva_porcent === 5){
      SUBTOTAL5 += subtotal;
      TOTALIVA5 += (subtotal * iva_porcent) / (100 + iva_porcent);
    }else
    if(iva_porcent === 10){
      SUBTOTAL10 += subtotal;
      TOTALIVA10 += (subtotal * iva_porcent) / (100 + iva_porcent);
    }else
    if(iva_porcent===0){
      EXENTAS  += subtotal;
    }
  });

  return (
    <Dialog open={dialogs.imprimirFacturaA4} fullScreen onClose={cerrar} TransitionComponent={Zoom}>
      <DialogTitle>Imprimir Factura </DialogTitle>
      <DialogContent>
      <div className="container" ref={divRef}>
  <table className="tabla cabezera border-trl">
    <tbody>
      <tr>
        <td className="titulos bg-smoke text-center">
          <h3>{EMPRESA.nombre_empresa}</h3>
          <h5>De: {EMPRESA.propietario_empresa}</h5>
          <small>{EMPRESA.categoria_empresa}</small>
          <br />
          <small>{EMPRESA.direccion_empresa} Tel: {EMPRESA.telefono_empresa}</small>
        </td>
        <td className="datos bg-smoke text-center">
          <h5>Timbrado nº: {FACTURA?.timbrado_factura}</h5>
          <h5>RUC: {EMPRESA.ruc_empresa}</h5>
          <h5>Inicio vigencia: {FACTURA?.inicio_timbrado}</h5>
          <h5>Fin vigencia: {FACTURA?.fin_timbrado}</h5>
          <h4>Factura nº: {FACTURA?.nro_datos_factura} {  funciones.cerosantes(DF.datosFactura.nro_factura,7) } </h4>
        </td>
      </tr>
    </tbody>
  </table>
  <table className="tabla datos_cliente">
    <tbody>
      <tr>
        <td className="cliente">
          <h5>Fecha emisión: {DF.datosFactura.fecha_factura}</h5>
          <h5>NOMBRE O RAZON SOCIAL: {DF.datosCliente.nombre_cliente}</h5>
          <h5>RUC O CI: {DF.datosCliente.ruc_cliente}</h5>
          <h5>DIRECCION: {DF.datosCliente.direccion_cliente}</h5>
        </td>
        <td className="factura">
          <h5>Cond. de venta: {DF.datosFactura.tipoFactura === "1" ? "Contado" : "Crédito"}</h5>
        </td>
      </tr>
    </tbody>
  </table>
  <table className="tabla tabla_descripcion">
    <tbody>
      <tr className="descripcion_head">
        <td width="3%">COD.</td>
        <td width="3%">CANT.</td>
        <td width="46%">DESCRIPCION.</td>
        <td width="12%">PRECIO</td>
        <td width="12%">EXENTAS</td>
        <td width="12%">5%</td>
        <td width="12%">10%</td>
      </tr>
      {
        DF.itemsFactura.map((e,i)=>(
          <tr key={i}>
            <td width="3%"><small>{e.codigo_producto}</small></td>
            <td width="3%"><small>{e.cantidad_producto}</small></td>
            <td width="46%">
              <small>{e.nombre_producto}</small>
            </td>
            <td width="12%">
              <small>{funciones.numberFormat(e.precio_guardado)}</small>
            </td>
            <td width="12%">
              <small>{e.iva_porcentaje===0 ? funciones.numberFormat(e.precio_guardado*e.cantidad_producto) : 0}</small>
            </td>
            <td width="12%">
              <small>{e.iva_porcentaje===5 ? funciones.numberFormat(e.precio_guardado*e.cantidad_producto) : 0}</small>
            </td>
            <td width="12%">
              <small>{e.iva_porcentaje===10 ? funciones.numberFormat(e.precio_guardado*e.cantidad_producto) : 0}</small>
            </td>
          </tr>
        ))
      }
    </tbody>
  </table>
  <table className="tabla">
    <tbody>
      <tr>
            <td width="3%"></td>
            <td width="3%"></td>
            <td width="46%"><br /></td>
            <td width="12%"></td>
            <td width="12%"></td>
            <td width="12%"></td>
            <td width="12%"></td>
          </tr>
      <tr className="subtotales bg-smoke">
        <td colSpan={4}>SUBTOTAL:</td>
        <td width='12%' className="text-right">
          {funciones.numberFormat(EXENTAS)}
        </td>
        <td width='12%' className="text-right">
          {funciones.numberFormat(SUBTOTAL5)}
        </td>
        <td width='12%' className="text-right">
          {funciones.numberFormat(SUBTOTAL10)}
        </td>
      </tr>
      <tr className="total">
        <td colSpan={4}>DESCUENTO:</td>
        <td className="text-right" colSpan={3}>
          {funciones.numberFormat(DF.descuento)}
        </td>
      </tr>
      <tr className="total">
        <td colSpan={3}>
          <small>Liquidación IVA</small>
        </td>
        <td className="text-right">
          <small>5%: {funciones.numberFormat(TOTALIVA5)}</small>
        </td>
        <td className="text-right">
          <small>10%: {funciones.numberFormat(TOTALIVA10)} </small>
        </td>
        <td className="text-right" colSpan={2}>
          <small>Total IVA: {funciones.numberFormat(DF.total_iva)}</small>
        </td>
      </tr>
      <tr className="total">
        <td colSpan={5}>
          <small>Total: {funciones.NumeroALetras(TOTAL,'')}</small>
        </td>
        <td className="text-right" colSpan={2}>
          {funciones.numberFormat(TOTAL)}
        </td>
      </tr>
    </tbody>
  </table>
  <table className="datos_graficos">
    <tbody>
      <tr>
        <td className="grafica" valign="top">
          <small>
            {FACTURA.obs_empresa_factura} {FACTURA.fecha_empresa_factura}
          </small>
        </td>
        <td className="fiscales">
          <small>Original: Cliente</small>
          <br />
          <small>Duplicado: Archivo tributario</small>
          <br />
          <small>Triplicado: Contabilidad</small>
        </td>
      </tr>
    </tbody>
  </table>
</div>

      </DialogContent>
      <DialogActions>
      <ButtonCustom size='large' variant='outlined' 
        component={Link} sx={{ mr:1 }}
        href={url_pdf}
        startIcon={<Icon>picture_as_pdf</Icon>}>PDF</ButtonCustom>

        <ButtonCustom 
          size="large"
          variant="contained"
          color="primary"
          startIcon={<Icon>print</Icon>}
          onClick={handlePrint}
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

export default ImprimirFacturaA4
