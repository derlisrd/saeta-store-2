<?php

namespace PDFController;
use Dompdf\Dompdf;

class PDFController {

    public function factura($array){
        $name = $array['name'];
        $dompdf = new Dompdf();
        $html= 'conteudo HTML '; //Insira o seu HTML dentro desta variável
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4','portrait');
        $dompdf->render();
        $dompdf->stream($name);
    }
}