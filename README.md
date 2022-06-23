# NOVEDADES
```
ALTER TABLE `cajas` CHANGE `estado_caja` `estado_caja` ENUM("close","open") NOT NULL DEFAULT 'open' COMMENT '0=cerrado 1=abierto';
ALTER TABLE `categorias` ADD `tipo_categoria` TINYINT(1) NOT NULL DEFAULT '1' COMMENT '1=artic 2=serv' AFTER `publicado_categoria`;
alter table users_permisos RENAME to users_rols;
ALTER TABLE `users_rols` CHANGE `id_users_permiso` `id_users_rol` INT(11) NOT NULL AUTO_INCREMENT;
UPDATE `cajas_registros` SET `descripcion_registro` = 'Cobro de ventas crédito o cuotas' WHERE `cajas_registros`.`id_cajas_registro` = 2; 
ALTER TABLE `empresa_facturas` ADD `autoimpresor` TINYINT(1) NOT NULL COMMENT '0=no 1=si' AFTER `last_nro_factura`;
ALTER TABLE `empresa_facturas` ADD `fecha_empresa_factura` DATE NULL DEFAULT NULL COMMENT 'fecha de factura' AFTER `autoimpresor`, ADD `obs_empresa_factura` TEXT NOT NULL COMMENT 'observaciones' AFTER `fecha_empresa_factura`;
```


