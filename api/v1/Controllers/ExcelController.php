<?php

namespace ExcelController;

use Models\Models;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;


class ExcelController {
    public static function generateReport($dateone,$datetwo){
        
        $documento = new Spreadsheet();
        $documento
        ->getProperties()
        ->setCreator("Saeta")
        ->setLastModifiedBy('Saeta')
        ->setTitle('Facturas')
        ->setDescription('Reporte de facturas');
        
        $hojaDeReportesdeFacturas = $documento->getActiveSheet();
        $hojaDeReportesdeFacturas->setTitle("Reporte_Facturas");

        # Encabezado de los productos
        $encabezado = ['RUC', 'DENOMINACION DEL CLIENTE','NUMERO DE FACTURA','FECHA','MONTO DE VENTA 10%','MONTO DE VENTA 5%','MONTO DE VENTA EXENTA','MONTO TOTAL','CONDICION DE VENTA'];
        # El último argumento es por defecto A1
        $hojaDeReportesdeFacturas->fromArray($encabezado, null, 'A1');

        $numeroDeFila = 2;

        $consulta = "select nro_factura,fecha_factura,monto_total_factura,tipo_factura,nombre_cliente,ruc_cliente,iva_factura,nro_datos_factura,iva_10,iva_5,iva_exenta 
        from facturas 
        INNER JOIN clientes ON facturas.id_cliente_factura=clientes.id_cliente
        INNER JOIN cajas ON cajas.id_caja=facturas.id_caja_factura
        INNER JOIN empresa_facturas ON cajas.id_caja=empresa_facturas.id_caja_empresa
        where tipo_factura = 1 or tipo_factura = 2 and fecha_factura between '$dateone' and '$datetwo'";
        $factura = Models::GET_INTERNO($consulta);

        
        $numeroDeFila = 2;
        foreach ($factura as $f) {
            $numero_factura = $f['nro_datos_factura'].'-'.sprintf("%07d", $f['nro_factura']);
            $fecha_factura = $f['fecha_factura'];
            $monto_total =  $f['monto_total_factura'];
            $iva_10=$f['iva_10'];
            $iva_5 = $f['iva_5'];
            $iva_exenta= $f['iva_exenta'];
            //$ivatotal = $f['iva_factura'];
            $condicion_venta = $f['tipo_factura'] == '1' ? 'CONTADO' : 'CREDITO';
            $nombre = $f['nombre_cliente'];
            $ruc = $f['ruc_cliente'];
            $hojaDeReportesdeFacturas->setCellValue("A$numeroDeFila", $ruc);
            $hojaDeReportesdeFacturas->setCellValue("B$numeroDeFila", $nombre);
            $hojaDeReportesdeFacturas->setCellValue("C$numeroDeFila", $numero_factura);
            $hojaDeReportesdeFacturas->setCellValue("D$numeroDeFila", $fecha_factura);
            $hojaDeReportesdeFacturas->setCellValue("E$numeroDeFila", $iva_10);
            $hojaDeReportesdeFacturas->setCellValue("F$numeroDeFila", $iva_5);
            $hojaDeReportesdeFacturas->setCellValue("G$numeroDeFila", $iva_exenta);
            $hojaDeReportesdeFacturas->setCellValue("H$numeroDeFila", $monto_total);
            $hojaDeReportesdeFacturas->setCellValue("I$numeroDeFila", $condicion_venta); 
            $numeroDeFila ++;
        }
        
    
        

        $fileName="Reporte_".$dateone."_".$datetwo.".xlsx";
        # Crear un "escritor"
        $writer = new Xlsx($documento);
        # Le pasamos la ruta de guardado
        
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment; filename="'. urlencode($fileName).'"');
        $writer->save('php://output');
    }
}