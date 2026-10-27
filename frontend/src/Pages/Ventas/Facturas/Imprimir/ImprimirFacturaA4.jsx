import { Button, CircularProgress, Dialog, DialogActions, Icon, Stack, Zoom,Link, DialogTitle} from '@mui/material'
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import ButtonCustom from '../../../../Components/MuiCustom/ButtonCustom';
import { useDatosEmpresa } from '../../../../Contexts/DatosEmpresaProvider';
import { useLang } from '../../../../Contexts/LangProvider';
import { useFacturas } from '../FacturasProvider';
import { funciones } from '../../../../Functions';
import { APIURL } from '../../../../App/Config/config';

const ImprimirFacturaA4 = () => {

  const {dialogs,setDialogs,formulario,itemsFactura,loadings} = useFacturas();
  const {lang} = useLang()
  const {EMPRESA} = useDatosEmpresa()
  const FACTURA = { ...formulario };
  const id = FACTURA?.id_factura;  
  //console.log(formulario);
  const url_pdf = APIURL+'pdf_factura/'+id;
  const divRef = useRef();
  const handlePrint = useReactToPrint({content: () => divRef.current});

  const cerrar = ()=>setDialogs({...dialogs,imprimirFacturaA4:false});
  const enviarEmail = ()=> setDialogs({...dialogs,mail:true})
  
  //const TOTAL = DF.monto_total_factura
  

  let SUBTOTAL5 = 0;
  let SUBTOTAL10 = 0;
  let TOTALIVA5 = 0;
  let TOTALIVA10 = 0;
  let TOTAL = parseFloat(FACTURA.monto_total_factura) - parseFloat(FACTURA.descuento_factura)
  let EXENTAS = 0;
  itemsFactura.forEach(e => {
    let cantidad = parseFloat(e.cantidad_producto)
    let precio = parseFloat(e.precio_producto_factura)
    let subtotal = precio*(cantidad);
    let iva_porcent = parseFloat(e.porcentaje_impuesto);
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
    <Dialog open={dialogs.imprimirFacturaA4} fullWidth maxWidth="md" onClose={cerrar} TransitionComponent={Zoom}>
      <DialogTitle>Imprimir Factura A4</DialogTitle>
      {loadings.factura ? (
        <Stack sx={{ padding: "20px" }} alignItems="center"><CircularProgress /></Stack>
      ) : (
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
                <h4>Factura nº: {FACTURA?.nro_datos_factura} {  funciones.cerosantes(FACTURA.nro_factura,7) } </h4>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="tabla datos_cliente">
          <tbody>
            <tr>
              <td className="cliente">
                <h5>Fecha emisión: {FACTURA.fecha_factura}</h5>
                <h5>NOMBRE O RAZON SOCIAL: {FACTURA.nombre_cliente}</h5>
                <h5>RUC O CI: {FACTURA.ruc_cliente}</h5>
                <h5>DIRECCION: {FACTURA.direccion_cliente}</h5>
              </td>
              <td className="factura">
                <h5>Cond. de venta: {FACTURA.tipoFactura === "1" ? "Contado" : "Crédito"}</h5>
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
              itemsFactura.map((e,i)=>(
                <tr key={i}>
                  <td width="3%"><small>{e.codigo_producto}</small></td>
                  <td width="3%"><small>{e.cantidad_producto}</small></td>
                  <td width="46%">
                    <small>{e.nombre_producto}</small>
                  </td>
                  <td width="12%">
                    <small>{funciones.numberFormat(e.precio_producto_factura)}</small>
                  </td>
                  <td width="12%">
                    <small>{e.porcentaje_impuesto==='0' ? funciones.numberFormat(e.precio_producto_factura*e.cantidad_producto) : 0}</small>
                  </td>
                  <td width="12%">
                    <small>{e.porcentaje_impuesto==='5' ? funciones.numberFormat(e.precio_producto_factura*e.cantidad_producto) : 0}</small>
                  </td>
                  <td width="12%">
                    <small>{e.porcentaje_impuesto==='10' ? funciones.numberFormat(e.precio_producto_factura*e.cantidad_producto) : 0}</small>
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
                {funciones.numberFormat(FACTURA.descuento_factura)}
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
                <small>Total IVA: {funciones.numberFormat(FACTURA.total_iva)}</small>
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
      )}
      <DialogActions>
        <Button size='large' variant='outlined' onClick={enviarEmail} startIcon={<Icon>alternate_email</Icon>}>Enviar</Button>
        <Button size='large' variant='outlined' 
        component={Link}
        href={url_pdf}
        startIcon={<Icon>picture_as_pdf</Icon>}>PDF</Button>
        <ButtonCustom 
          size="large"
          variant="contained"
          color="primary"
          startIcon={<Icon>print</Icon>}
          onClick={handlePrint}
        >
          {lang.imprimir}
        </ButtonCustom>
        <ButtonCustom
          size="large"
          variant="outlined"
          color="primary"
          onClick={cerrar}
        >
          {lang.cerrar}
        </ButtonCustom>
      </DialogActions>
    </Dialog>
  )
}

export default ImprimirFacturaA4
