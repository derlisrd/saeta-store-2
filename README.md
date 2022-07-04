# NOVEDADES
```

ALTER TABLE `cajas_movimientos` CHANGE `id_moneda_movimiento` `id_moneda_movimiento` INT(11) NOT NULL DEFAULT '0' COMMENT 'rel:id_moneda';

ALTER TABLE `cajas` CHANGE `estado_caja` `estado_caja` ENUM("close","open") NOT NULL DEFAULT 'open' COMMENT '0=cerrado 1=abierto';
ALTER TABLE `categorias` ADD `tipo_categoria` TINYINT(1) NOT NULL DEFAULT '1' COMMENT '1=artic 2=serv' AFTER `publicado_categoria`;

alter table users_permisos RENAME to users_rols;
ALTER TABLE `users_rols` CHANGE `id_users_permiso` `id_users_rol` INT(11) NOT NULL AUTO_INCREMENT;
UPDATE `cajas_registros` SET `descripcion_registro` = 'Cobro de ventas crédito o cuotas' WHERE `cajas_registros`.`id_cajas_registro` = 2; 
ALTER TABLE `empresa_facturas` ADD `autoimpresor` TINYINT(1) NOT NULL COMMENT '0=no 1=si' AFTER `last_nro_factura`;
ALTER TABLE `empresa_facturas` ADD `fecha_empresa_factura` DATE NULL DEFAULT NULL COMMENT 'fecha de factura' AFTER `autoimpresor`, ADD `obs_empresa_factura` TEXT NOT NULL COMMENT 'observaciones' AFTER `fecha_empresa_factura`;

DROP TABLE IF EXISTS `cajas_monedas`;
CREATE TABLE `cajas_monedas` (
  `id_cajas_moneda`  int(11) PRIMARY KEY  NOT NULL AUTO_INCREMENT,
  `id_moneda_caja_moneda` int(11) NOT NULL COMMENT 'rel: id_moneda',
  `id_caja_moneda` int(11) NOT NULL COMMENT 'rel: id_caja',
  `monto_caja_moneda` float NOT NULL,
  `monto_inicial_caja` float NOT NULL,
  `monto_cierre_caja` float  NULL
) ;

DROP TABLE IF EXISTS `cajas`;
CREATE TABLE IF NOT EXISTS `cajas` (
  `id_caja` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_caja` varchar(50) NOT NULL,
  `fecha_apertura` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_cierre` datetime DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tipo_caja` int(1) NOT NULL DEFAULT '1' COMMENT '1 efe 2 noefectivo',
  `estado_caja` enum('close','open') NOT NULL DEFAULT 'open' COMMENT '0=cerrado 1=abierto',
  `ult_mov_caja` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_caja`)
);

DROP TABLE IF EXISTS `productos`;
CREATE TABLE IF NOT EXISTS `productos` (
  `id_producto` int(11) NOT NULL AUTO_INCREMENT,
  `id_marca_producto` int(5) NOT NULL,
  `id_categoria_producto` int(5) NOT NULL DEFAULT '1',
  `id_impuesto_producto` int(11) NOT NULL COMMENT 'id_impuesto',
  `id_proveedor_producto` int(11) NOT NULL COMMENT 'con id_proveedor',
  `id_unidad_medida_producto` int(11) NOT NULL COMMENT 'id_unidad de medida',
  `codigo_producto` varchar(255) NOT NULL UNIQUE,
  `nombre_producto` varchar(50) NOT NULL,
  `descripcion_producto` text,
  `costo_producto` float NOT NULL,
  `porcentaje_comision` float NOT NULL DEFAULT '0' COMMENT 'comsion',
  `precio_producto` float DEFAULT '0',
  `preciom_producto` float NOT NULL DEFAULT '0' COMMENT 'precio p/ mayoristas',
  `minimo_producto` float NOT NULL DEFAULT '0' COMMENT 'stock minimo',
  `notificar_producto` int(1) NOT NULL DEFAULT '0' COMMENT '0=no 1=si',
  `tipo_producto` int(1) NOT NULL DEFAULT '1' COMMENT '1=fisico 2=servicio',
  `disponible_producto` int(1) NOT NULL DEFAULT '1' COMMENT '0=no 1=si',
  PRIMARY KEY (`id_producto`)
);
```


