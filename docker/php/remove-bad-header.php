<?php
/**
 * El backend ejecuta header('charset=utf-8'), que PHP envía como un header
 * inválido ("charset=utf-8: "). Node (proxy de Vite) lo rechaza con
 * "Invalid header token".
 *
 * header_remove('charset=utf-8') no lo elimina porque el nombre del header
 * no tiene el formato "Nombre: valor". Por eso filtramos la lista completa
 * justo antes de enviar los headers y re-agregamos los válidos.
 *
 * Este archivo vive solo en la imagen Docker; no modifica el backend.
 */
header_register_callback(static function (): void {
    $headers = headers_list();
    header_remove();

    foreach ($headers as $header) {
        if (stripos($header, 'charset=utf-8') === 0) {
            continue;
        }
        header($header, false);
    }
});
