-- El dump inicial (backend/novedades.txt) trae configurado = 0, lo que hace
-- que el frontend muestre la pantalla de instalación. Como el dump ya incluye
-- la empresa y el usuario admin, marcamos el sistema como configurado.
UPDATE empresas SET configurado = 1 WHERE id_empresa = 1;
