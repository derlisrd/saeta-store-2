<?php

namespace ExcelController;

use Models\Models;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;


class ExcelController {
    public static function generateReport(){
        
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

        $consulta = "select * from facturas where tipo_factura = 1 or tipo_factura = 2";
        $factura = Models::GET_INTERNO($consulta);

        
        
        foreach ($factura as $f) {
            $numero_factura = $f['nro_factura'];
            $fecha_factura = $f['fecha_factura'];
            $monto_total = $f['monto_total_factura'];
            $condicion_venta = $f['tipo_factura'] == '1' ? 'CONTADO' : 'CREDITO';
        }
        

        return false;
        $hojaDeReportesdeFacturas->setCellValueByColumnAndRow(1, $numeroDeFila, "ruc");
        $hojaDeReportesdeFacturas->setCellValueByColumnAndRow(2, $numeroDeFila, "nombre cliente");
        $hojaDeReportesdeFacturas->setCellValueByColumnAndRow(3, $numeroDeFila, " nuemro factura");
        $hojaDeReportesdeFacturas->setCellValueByColumnAndRow(4, $numeroDeFila, "fecha de factura");
        $hojaDeReportesdeFacturas->setCellValueByColumnAndRow(5, $numeroDeFila, "fecha de factura");
        $hojaDeReportesdeFacturas->setCellValueByColumnAndRow(6, $numeroDeFila, "fecha de factura");
        $hojaDeReportesdeFacturas->setCellValueByColumnAndRow(7, $numeroDeFila, "fecha de factura");
        $hojaDeReportesdeFacturas->setCellValueByColumnAndRow(8, $numeroDeFila, "fecha de factura");


        $fileName="Descarga_excel.xlsx";
        # Crear un "escritor"
        $writer = new Xlsx($documento);
        # Le pasamos la ruta de guardado
        
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment; filename="'. urlencode($fileName).'"');
        $writer->save('php://output');
    }
}