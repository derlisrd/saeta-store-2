<?php

use Models\Models;
use Luecano\NumeroALetras\NumeroALetras;

        $formatter = new NumeroALetras();
        $id = $array["id"];

        $query = "SELECT 
        id_factura,nro_factura,fecha_factura,descuento_factura,tipo_factura,orden_compra,valor_moneda_factura, nombre_empresa,ruc_empresa,propietario_empresa,direccion_empresa,categoria_empresa, telefono_empresa,
        nombre_cliente,ruc_cliente,direccion_cliente,timbrado_factura,inicio_timbrado,fin_timbrado,nro_datos_factura,monto_total_factura,logo_url_empresa,obs_empresa_factura,fecha_empresa_factura
        from facturas,clientes,empresa_facturas,empresas
        WHERE 
        id_empresa_empresa = id_empresa and
        id_caja_factura = id_caja_empresa and
        id_cliente_factura = id_cliente and
        id_factura = $id";
        
       

        $pdf = Models::GET_INTERNO($query,"facturas");


?>

<html>
    <style>*{font-family:monospace;margin:0;padding:0;box-sizing:border-box}table{font-family:monospace;}.text-center{text-align:center}.text-right{text-align:right}.w-100{width:100%}.bg-smoke{background-color:#f5f5f5}.border-trl{border-top:1px solid #000;border-right:1px solid #000;border-left:1px solid #000}.container{width:204mm;margin:2mm auto 0}.cabezera{width:100%}.cabezera .titulos{width:65%;padding:8px;border-right:1px solid silver}.cabezera .datos{text-align:center;background-color:#f5f5f5;padding:8px}.datos_cliente{width:100%;border:1px solid silver}.datos_cliente .cliente{text-align:left;padding:8px;border-right:1px solid silver}.datos_cliente .factura{text-align:center;padding:8px}.items{width:100%;border-right:1px solid silver;border-left:1px solid silver}.items .head{font-weight:700}.items .head td{padding:5px;background-color:silver;text-align:right;border-bottom:1px solid silver}.items .item td{font-weight:lighter;padding:0 3px 1px 1px;text-align:right}.subtotales td{padding:5px;border-top:1px solid silver}.total td{border-top:1px solid silver;padding:5px}.datos_graficos{width:100%;border:1px solid #000}.datos_graficos .grafica{width:65%;padding:4px}.datos_graficos .fiscales{padding:4px;border-left:1px solid silver}</style>
<body>
<div class="container">
            <table class="cabezera border-trl">
                <tr>
                    <td class="titulos bg-smoke text-center">
                        <h3>'.$df['nombre_empresa'].'</h3>
                        <h5>'.$propietario.' </h5>
                        <small>'.$df['categoria_empresa']. '</small><br />
                        <small>'.$df['direccion_empresa'].' Tel:'.$df['telefono_empresa']. '</small>
                    </td>
                    <td class="datos bg-smoke text-center">
                        <h5>Timbrado nº: '.$df['timbrado_factura'].'</h5>
                        <h5>RUC: '.$df['ruc_empresa'].'</h5>
                        <h6>Inicio vigencia: '.$df['inicio_timbrado'].'</h6>
                        <h6>Fin vigencia: '.$df['fin_timbrado'].'</h6>
                        <h4>Factura nº: '.$df['nro_datos_factura'].'-'.$df['nro_factura'].' </h4>
                    </td>
                </tr>
            </table>
        
            <table class="datos_cliente">
                <tr>
                    <td class="cliente">
                        <h5>Fecha emisión: '.$df['fecha_factura'].'</h5>
                        <h5>NOMBRE O RAZON SOCIAL: '.$df['nombre_cliente'].'</h5>
                        <h5>RUC O CI: '.$df['ruc_cliente'].'</h5>
                        <h5>DIRECCION: '.$df['direccion_cliente'].'</h5>
                    </td>
                    <td class="factura">
                        <h5>Cond. de venta: '.$condicion_venta.'</h5>
                    </td>
                </tr>
            </table>
        
            <table class="items">
        
                <tr class="head">
                    <td>CANT.</td>
                    <td>DESCRIPCION.</td>
                    <td>PRECIO</td>
                    <td>EXENTAS</td>
                    <td>5%</td>
                    <td>10%</td>
                </tr>
        
               '.$items_html.
               '

               <tr><td colspan="6"><br/></td></tr>
                <tr class="subtotales bg-smoke">
                    <td colspan="3">
                        SUBTOTAL:
                    </td>
                    <td class="text-right"> <small>'.$subtotal0.'</small> </td>
                    <td class="text-right"> <small>'.$subtotal5.'</small> </td>
                    <td class="text-right"> <small>'.$subtotal10.'</small> </td>
                </tr>
                <tr class="total">
                    <td colspan="5">
                        DESCUENTO: 
                    </td>
                    <td class="text-right"> '.number_format($df['descuento_factura'], 2, ',', '.').' </td>
                </tr>

                <tr class="total">
                    <td colspan="3">
                        <small>Liquidación IVA</small>
                    </td>
                    <td class="text-right"><small>5%: '.$liqui5.'</small></td>
                    <td class="text-right"><small>10%: '.$liqui10.' </small></td>
                    <td class="text-right"><small>Total IVA: '.($liqui10 + $liqui5).' </small></td>
                </tr>

                <tr class="total">
                    <td colspan="5">
                        <small>Total: '.$numero_total_letras.'</small>
                    </td>
                    <td class="text-right"> '.number_format($df['monto_total_factura'], 2, ',', '.').' </td>
                </tr>
            </table>
        
            <table class="datos_graficos">
                <tr>
                    <td class="grafica" valign="top">
                        <small>'.$df['obs_empresa_factura'].' '.$df['fecha_empresa_factura'].'</small>
                    </td>
                    <td class="fiscales">
                        <small>Original: Cliente</small><br/>
                        <small>Duplicado: Archivo tributario</small><br/>
                        <small>Triplicado: Contabilidad</small>
                    </td>
                </tr>
            </table>
        </div>
        </body>
        </html>