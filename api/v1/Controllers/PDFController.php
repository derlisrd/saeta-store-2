<?php
namespace PDFController;

use Dompdf\Dompdf;
use Luecano\NumeroALetras\NumeroALetras;
use Models\Models;

class PDFController {


    public static function view($array){
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
        
        

        //$pdf = json_encode($pdf);

        //$df = ($pdf['results'][0]);
        $df = $pdf[0];
        
        
        
        $query_items = "SELECT nombre_producto,cantidad_producto,precio_producto_factura,porcentaje_impuesto 
        FROM facturas_items,productos,impuestos 
        WHERE 
        id_impuesto_factura = id_impuesto and
        id_producto_factura = id_producto and
        id_items_factura =  $id";
        
        $items = Models::GET_INTERNO($query_items,"facturas_items");

        $items_results = $items;

        

        $items_html = '';
        $subtotal0 = 0;
        $subtotal5 = 0; $liqui5 = 0;
        $subtotal10= 0; $liqui10 = 0;
        foreach($items_results as $i){
            $imp = $i['porcentaje_impuesto'];
            $precio = $i['precio_producto_factura'];
            $cant = $i['cantidad_producto'];
            $imp10= $imp == '10' ? $cant*$precio : 0;
            $imp5= $imp == '5' ? $cant*$precio : 0;
            $imp0= $imp == '0' ? $cant*$precio : 0;
            $subtotal0 += $imp0;
            $subtotal5 += $imp5;
            $subtotal10 += $imp10;

            

            $add = '<tr class="item">
            <td>'.$i['cantidad_producto'].'</td>
            <td><small>'.$i['nombre_producto'].'</small></td>
            <td><small>'.$precio.'</small></td>
            <td><small>'.$imp0.'</small></td>
            <td><small>'.$imp5.'</small></td>
            <td><small>'.$imp10.'</small></td>
            </tr>';
            $items_html .= $add;
        }
        $liqui10 = round($imp10 / 11,1);
        $liqui5 = round($imp5 / 22, 1);
        $numero_total_letras = $formatter->toWords($df['monto_total_factura']);
        $propietario = $df['propietario_empresa'] == '' ? '' :  'De: '.$df['propietario_empresa'];
        $condicion_venta = $df['tipo_factura'] == '1' ? 'Contado' : 'Credito';
        $html = '<html><style>*{font-family:monospace;margin:0;padding:0;box-sizing:border-box}table{font-family:monospace;}.text-center{text-align:center}.text-right{text-align:right}.w-100{width:100%}.bg-smoke{background-color:#f5f5f5}.border-trl{border-top:1px solid #000;border-right:1px solid #000;border-left:1px solid #000}.container{width:204mm;margin:2mm auto 0}.cabezera{width:100%}.cabezera .titulos{width:65%;padding:8px;border-right:1px solid silver}.cabezera .datos{text-align:center;background-color:#f5f5f5;padding:8px}.datos_cliente{width:100%;border:1px solid silver}.datos_cliente .cliente{text-align:left;padding:8px;border-right:1px solid silver}.datos_cliente .factura{text-align:center;padding:8px}.items{width:100%;border-right:1px solid silver;border-left:1px solid silver}.items .head{font-weight:700}.items .head td{padding:5px;background-color:silver;text-align:right;border-bottom:1px solid silver}.items .item td{font-weight:lighter;padding:0 3px 1px 1px;text-align:right}.subtotales td{padding:5px;border-top:1px solid silver}.total td{border-top:1px solid silver;padding:5px}.datos_graficos{width:100%;border:1px solid #000}.datos_graficos .grafica{width:65%;padding:4px}.datos_graficos .fiscales{padding:4px;border-left:1px solid silver}</style>
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
        </html>';
        echo $html;
        return;
    }

    public static function factura($array){

        $dompdf = new Dompdf();
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
        
        

        //$pdf = json_encode($pdf);

        //$df = ($pdf['results'][0]);
        $df = $pdf[0];
        
        
        
        $query_items = "SELECT nombre_producto,cantidad_producto,precio_producto_factura,porcentaje_impuesto 
        FROM facturas_items,productos,impuestos 
        WHERE 
        id_impuesto_factura = id_impuesto and
        id_producto_factura = id_producto and
        id_items_factura =  $id";
        
        $items = Models::GET_INTERNO($query_items,"facturas_items");

        $items_results = $items;

        

        $items_html = '';
        $subtotal0 = 0;
        $subtotal5 = 0; $liqui5 = 0;
        $subtotal10= 0; $liqui10 = 0;
        foreach($items_results as $i){
            $imp = $i['porcentaje_impuesto'];
            $precio = $i['precio_producto_factura'];
            $cant = $i['cantidad_producto'];
            $imp10= $imp == '10' ? $cant*$precio : 0;
            $imp5= $imp == '5' ? $cant*$precio : 0;
            $imp0= $imp == '0' ? $cant*$precio : 0;
            $subtotal0 += $imp0;
            $subtotal5 += $imp5;
            $subtotal10 += $imp10;

            

            $add = '<tr class="item">
            <td>'.$i['cantidad_producto'].'</td>
            <td><small>'.$i['nombre_producto'].'</small></td>
            <td><small>'.$precio.'</small></td>
            <td><small>'.$imp0.'</small></td>
            <td><small>'.$imp5.'</small></td>
            <td><small>'.$imp10.'</small></td>
            </tr>';
            $items_html .= $add;
        }
        $liqui10 = round($imp10 / 11,1);
        $liqui5 = round($imp5 / 22, 1);
        $numero_total_letras = $formatter->toWords($df['monto_total_factura']);
        $propietario = $df['propietario_empresa'] == '' ? '' :  'De: '.$df['propietario_empresa'];
        $condicion_venta = $df['tipo_factura'] == '1' ? 'Contado' : 'Credito';
        $html = '<html><style>*{font-family:monospace;margin:0;padding:0;box-sizing:border-box}table{font-family:monospace;}.text-center{text-align:center}.text-right{text-align:right}.w-100{width:100%}.bg-smoke{background-color:#f5f5f5}.border-trl{border-top:1px solid #000;border-right:1px solid #000;border-left:1px solid #000}.container{width:204mm;margin:2mm auto 0}.cabezera{width:100%}.cabezera .titulos{width:65%;padding:8px;border-right:1px solid silver}.cabezera .datos{text-align:center;background-color:#f5f5f5;padding:8px}.datos_cliente{width:100%;border:1px solid silver}.datos_cliente .cliente{text-align:left;padding:8px;border-right:1px solid silver}.datos_cliente .factura{text-align:center;padding:8px}.items{width:100%;border-right:1px solid silver;border-left:1px solid silver}.items .head{font-weight:700}.items .head td{padding:5px;background-color:silver;text-align:right;border-bottom:1px solid silver}.items .item td{font-weight:lighter;padding:0 3px 1px 1px;text-align:right}.subtotales td{padding:5px;border-top:1px solid silver}.total td{border-top:1px solid silver;padding:5px}.datos_graficos{width:100%;border:1px solid #000}.datos_graficos .grafica{width:65%;padding:4px}.datos_graficos .fiscales{padding:4px;border-left:1px solid silver}</style>
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
        </html>';
        
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4','portrait');
        $dompdf->render();
        $dompdf->stream($df['fecha_factura']."_".$df['nro_factura']); 
    }

    
}