<?php
namespace PDFController;

use Dompdf\Dompdf;

class PDFController {

    public function factura($array){
        $name = $array['name'];
        $dompdf = new Dompdf();
        $html= '<style>
        * {
            font-family: monospace;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
    
        .w-100{
            width: 100%;
        }
    
    
        .container {
            width: 205mm;
            margin: 2mm auto 0 auto;
        }
    
        .cabezera {
            border-top: 1px solid silver;
            border-right: 1px solid silver;
            border-left: 1px solid silver;
            width: 100%;
        }
    
        .cabezera .titulos {
            width: 65%;
            text-align: center;
            background-color: #f5f5f5;
            padding: 8px;
            border-right: 1px solid silver;
        }
    
        .cabezera .datos {
            text-align: center;
            background-color: #f5f5f5;
            padding: 8px;
    
        }
    
        .datos_cliente {
            width: 100%;
            border: 1px solid silver;
    
        }
    
        .datos_cliente .cliente {
            text-align: left;
            padding: 8px;
            border-right: 1px solid silver;
        }
    
        .datos_cliente .factura {
            text-align: center;
            padding: 8px;
        }
    
        .items {
            width: 100%;
            border-right: 1px solid silver;
            border-left: 1px solid silver;
        }
        .items .head{
            font-weight: bold;
        }
        .items .head td{
            padding:5px;
            background-color: #c0c0c0;
            text-align: center;
        }
        .items .item{
            font-weight: lighter;
        }
        .subtotales{
            background-color: #f5f5f5;
        }
        .subtotales td{
            padding: 5px;
            border-top: 1px solid silver;
        }
        .total td{
            border-top: 1px solid silver;
            padding:5px;
    
        }
        .datos_graficos {
            width: 100%;
            border: 1px solid silver;
        }
        .datos_graficos .grafica{
            width: 65%;
            padding: 8px;
        }
        .datos_graficos .fiscales{
            padding: 8px;
            border-left: 1px solid silver;
        }
    </style>
    <div class="container">
        <table class="cabezera">
            <tr>
                <td class="titulos">
                    <h2>TITULO DEL NEGOCIO</h2>
                    <h4>Si existe algun propietario </h4>
                    <h4>ACTIVIDADES DE FOTOGRAFIA Y PORTALES WEB Tel:0983202090 - CALLE JOEL EULOGIO ESTIGARRIBIA</h4>
                </td>
                <td class="datos">
                    <h3>TIMBRADO NRO: 15674140</h3>
                    <h4>RUC: 4937724-8</h4>
                    <h4>Inicio vigencia: 2022-06-06</h4>
                    <h4>Fin vigencia: 2023-06-30</h4>
                    <h3>FACTURA NRO: 001-002 6</h3>
                </td>
            </tr>
        </table>
    
        <table class="datos_cliente">
            <tr>
                <td class="cliente">
                    <h4>Fecha emisión: 10-12-2003</h4>
                    <h4>NOMBRE O RAZON SOCIAL: derlis ruizdiaz</h4>
                    <h4>RUC O CI: 4092737-9</h4>
                    <h4>DIRECCION: ENRIQUE SEGOVIANO</h4>
                </td>
                <td class="factura">
                    <h3>Cond. de venta: contado</h3>
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
    
            <tr class="item">
                <td>1</td>
                <td>WHEY</td>
                <td>0</td>
                <td>55.000</td>
                <td>0</td>
                <td>55.000</td>
            </tr>
            <tr class="item">
                <td>1</td>
                <td>WHEY</td>
                <td>55.000</td>
                <td>0</td>
                <td>55.000</td>
                <td>0</td>
            </tr>
            <tr class="item">
                <td>4</td>
                <td>CRETINA</td>
                <td>55.000</td>
                <td>0</td>
                <td>0</td>
                <td>55.000</td>
            </tr>
            <tr class="subtotales">
                <td colspan="3">
                    SUBTOTAL:
                </td>
                <td> 0 </td>
                <td> 0 </td>
                <td> 0 </td>
            </tr>
            <tr class="total">
                <td colspan="5">
                    TOTAL: NOVENCIENTOS CUARENTA Y CUATRO MIL
                </td>
                <td> 30000000 </td>
            </tr>
        </table>
    
        <table class="datos_graficos">
            <tr>
                <td class="grafica" valign="top">
                    AUTOIMPRESOR FECHA POR ORDEN TAL Y CUAL
                </td>
                <td class="fiscales">
                    ORIGINAL: CLIENTE
                    DUPLICADO: ARCHIVO TRIBUTARIO
                    TRIPLICADO: CONTABILIDAD NO VALIDO PARA CREDITO FISCAL
                </td>
            </tr>
        </table>
    </div>'; //Insira o seu HTML dentro desta variável
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4','portrait');
        $dompdf->render();
        $dompdf->stream($name);
    }
}