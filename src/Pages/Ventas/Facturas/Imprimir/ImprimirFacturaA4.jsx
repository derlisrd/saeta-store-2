import { Button, CircularProgress, Dialog, DialogActions, Icon, Stack, Zoom,Link} from '@mui/material'
import printJS from 'print-js';
import styles from './facturaA4.module.css';
import ButtonCustom from '../../../../Components/MuiCustom/ButtonCustom';
import { useDatosEmpresa } from '../../../../Contexts/DatosEmpresaProvider';
import { useLang } from '../../../../Contexts/LangProvider';
import { useFacturas } from '../FacturasProvider';
import { funciones } from '../../../../Functions';
import { APIURL } from '../../../../App/Config/config';

const ImprimirFacturaA4 = () => {

  const {dialogs,setDialogs,formulario,itemsFactura,cargandoFactura} = useFacturas();
  const {lang} = useLang()
  const {EMPRESA} = useDatosEmpresa()
  const DF = { ...formulario };
  const id = DF?.id_factura;  

  const url_pdf = APIURL+'pdf_factura/'+id;
  const imprimir = () => {
    printJS({ type: "html", printable: "print_factura", 
    style:"#print_factura{font-family:monospace; padding:0; margin:0 auto;} table{border-collapse:collapse; width:210mm; margin:0 auto; border-radius:10px;}" });
  };
  const cerrar = ()=>{ 
    setDialogs({...dialogs,imprimirFacturaA4:false});
  }
  const enviarEmail = ()=>{
    setDialogs({...dialogs,mail:true})
  }
  //const TOTAL = DF.monto_total_factura

  let TOTAL5 = 0;
  let TOTAL10 = 0;
  let TOTALIVA = 0;
  //let TOTALIVAG = 0;
  let TOTALIVA5 = 0;
  let TOTALIVA10 = 0;
  let EXENTAS = 0;
  
  console.log('facturas a 4')

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
  //TOTALIVAG = 0



  return (
    <Dialog open={dialogs.imprimirFacturaA4} fullWidth maxWidth="md" onClose={cerrar} TransitionComponent={Zoom}>
      {cargandoFactura ? (
        <Stack sx={{ padding: "20px" }} alignItems="center"><CircularProgress /></Stack>
      ) : (
        <div id="print_factura" className={styles.div_central}>
          <table width="740" className={styles.table_collapse} border="1">
            <tbody>
            <tr>
              <td align='center' valign='center'>
                <b>{EMPRESA.nombre_empresa}</b>
                <br/>
                <small>De: {EMPRESA.propietario_empresa}</small>
                <br/>
                <small>{EMPRESA.categoria_empresa}</small>
                <br/>
                <small>{EMPRESA.direccion_empresa}</small>
              </td>
              <td  align='center' valign='center'>
                <strong>Ruc: {EMPRESA.ruc_empresa}</strong>
                <br />
                <small>Timbrado: {DF?.timbrado_factura}</small>
                <br/>
                <small>Inicio:{funciones.fechaActualDMY(DF?.inicio_timbrado)} </small>
                <br />
                <small>Fin:{funciones.fechaActualDMY(DF?.fin_timbrado)}</small>
                <br/>
                <strong>{DF?.nro_datos_factura} {  funciones.cerosantes(DF.nro_factura,7) }</strong>
              </td>
            </tr>
              <tr>
                <td align='center' valign='center'>
                  <b>Fecha: {funciones.fechaActualDMY( DF.fecha_factura )}</b><br />
                  <b>Nombre: {DF.nombre_cliente}</b><br />
                  <b>RUC o CI: {DF.ruc_cliente}</b>
                </td>
                <td valign='center' align='center'>
                  <b>Condición de venta: </b><br />
                  <b>{DF.tipo_factura === "1" ? "Contado" : "Crédito"}</b>
                </td>
              </tr>
            </tbody>
          </table>
          <table width="740" border="1">
            <tbody>
              <tr>
                <td>Cod.</td>
                <td>Cant.</td>
                <td>Descripcion</td>
                <td>Precio</td>
                <td>Exentas</td>
                <td>5%</td>
                <td>10%</td>
              </tr>
              {itemsFactura.map((e, i) => (
              <tr key={i} >
                          <td width="10%" align="center" valign="center">
                            {e.codigo_producto}
                          </td>
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
            </tbody>
          </table>
          <table width="740" border="1">
            <tbody>
              <tr><td align='right' colSpan="4">Descuentos: {DESCUENTO}</td></tr>
              <tr>
                <td>Subtotales</td>
                <td> { EXENTAS}</td>
                <td>{TOTAL5}</td>
                <td>{TOTAL10}</td>
              </tr>
              <tr>
                <td>Total a pagar</td>
                <td colSpan="2"> 
                      {funciones.NumeroALetras(MONTO_TOTAL, "")} {DF.abreviatura_moneda} </td>
                <td>{MONTO_TOTAL}</td>
              </tr>
              <tr>
                <td>Liquidacion de IVA</td>
                <td>5%: {funciones.redondeo2decimales(TOTALIVA5)}</td>
                <td>10%: {funciones.redondeo2decimales(TOTALIVA10)} </td>
                <td>Total IVA:{funciones.redondeo2decimales(TOTALIVA)} </td>
              </tr>
              <tr>
                <td colSpan="4">
                <small>
                  {DF.obs_empresa_factura} {DF.fecha_empresa_factura}
                </small>
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
          onClick={imprimir}
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
