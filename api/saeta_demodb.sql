-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 21-05-2022 a las 11:53:17
-- Versión del servidor: 10.2.36-MariaDB-cll-lve
-- Versión de PHP: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `saeta_demodb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agendas`
--

CREATE TABLE `agendas` (
  `id_agenda` int(11) NOT NULL,
  `descripcion_agenda` varchar(200) NOT NULL,
  `fecha_inicio_agenda` date NOT NULL,
  `fecha_fin_agenda` date NOT NULL,
  `horario_agenda` time NOT NULL,
  `color_agenda` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cajas`
--

CREATE TABLE `cajas` (
  `id_caja` int(11) NOT NULL,
  `id_moneda_caja` int(11) NOT NULL COMMENT 'con id_moneda',
  `nombre_caja` varchar(50) NOT NULL,
  `monto_inicial` int(11) NOT NULL COMMENT 'ultima apertura',
  `monto_cierre` float NOT NULL COMMENT 'ultimo cierre',
  `monto_caja` float NOT NULL COMMENT 'monto actual en caja',
  `fecha_apertura` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_cierre` datetime DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `tipo_caja` int(1) NOT NULL DEFAULT 1 COMMENT '1 efe 2 noefectivo',
  `estado_caja` tinyint(4) NOT NULL COMMENT '0=cerrado 1=abierto',
  `ult_mov_caja` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cajas_arqueos`
--

CREATE TABLE `cajas_arqueos` (
  `id_cajas_arqueo` int(11) NOT NULL,
  `id_caja_arqueo` int(11) NOT NULL COMMENT 'con id_caja',
  `id_user_arqueo` int(11) NOT NULL COMMENT 'id_user',
  `monto_arqueo` float NOT NULL,
  `tipo_arqueo` int(1) NOT NULL COMMENT '0=cierre 1=aper',
  `fecha_arqueo` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'fecha de movimiento'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cajas_movimientos`
--

CREATE TABLE `cajas_movimientos` (
  `id_cajas_movimiento` int(11) NOT NULL,
  `id_caja_movimiento` int(11) NOT NULL COMMENT 'con id_caja de caja',
  `id_user_movimiento` int(11) NOT NULL COMMENT 'con id_user',
  `id_tipo_registro` int(11) NOT NULL COMMENT 'con id_cajas_registro',
  `monto_movimiento` int(11) NOT NULL COMMENT 'valor ingreso/egreso',
  `monto_sin_efectivo` int(11) NOT NULL DEFAULT 0 COMMENT 'ventas sin efectivo',
  `detalles_movimiento` varchar(100) DEFAULT NULL COMMENT 'motivo y detalles del registro',
  `fecha_movimiento` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cajas_registros`
--

CREATE TABLE `cajas_registros` (
  `id_cajas_registro` int(11) NOT NULL,
  `descripcion_registro` varchar(150) NOT NULL,
  `tipo_registro` int(1) NOT NULL COMMENT '0=egreso 1=ingreso 2=apertura 3=cierre 4=neutro',
  `show_registro` int(1) NOT NULL COMMENT '0=no 1=si'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cajas_registros`
--

INSERT INTO `cajas_registros` (`id_cajas_registro`, `descripcion_registro`, `tipo_registro`, `show_registro`) VALUES
(1, 'Ventas al contado', 1, 0),
(2, 'Cobro de ventas crédito', 1, 0),
(3, 'Apertura de caja', 2, 0),
(4, 'Depósito en caja', 1, 1),
(5, 'Retiros de caja', 0, 1),
(6, 'Compras al contado', 0, 1),
(7, 'Pagos compras a crédito', 0, 0),
(8, 'Otros pagos', 0, 1),
(9, 'Cierre de caja', 3, 0),
(10, 'Compras Personales', 0, 1),
(11, 'Combustible', 0, 1),
(12, 'Viáticos', 0, 1),
(13, 'Compra de equipos informáticos', 0, 1),
(14, 'Informe', 4, 0),
(15, 'Compra de muebles', 0, 1),
(16, 'Transferencias', 4, 0),
(17, 'Descuentos', 0, 1),
(18, 'TIGO MONEY', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cajas_users`
--

CREATE TABLE `cajas_users` (
  `id_cajas_user` int(11) NOT NULL,
  `id_user_caja` int(11) NOT NULL COMMENT 'id_user',
  `id_caja_caja` int(11) NOT NULL COMMENT 'id_caja'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL,
  `id_padre_categoria` int(11) NOT NULL DEFAULT 0,
  `nombre_categoria` varchar(30) NOT NULL,
  `imagen_categoria` text DEFAULT NULL,
  `publicado_categoria` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `id_padre_categoria`, `nombre_categoria`, `imagen_categoria`, `publicado_categoria`) VALUES
(1, 0, 'SIN CATEGORIA', NULL, 1),
(2, 0, 'SERVICIOS', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `ruc_cliente` varchar(20) DEFAULT NULL,
  `nombre_cliente` varchar(150) NOT NULL,
  `telefono_cliente` varchar(150) NOT NULL,
  `email_cliente` varchar(50) DEFAULT NULL,
  `direccion_cliente` text DEFAULT NULL,
  `tipo_cliente` int(11) NOT NULL DEFAULT 3 COMMENT '1 mayorista 2 minorista 3 casual'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `ruc_cliente`, `nombre_cliente`, `telefono_cliente`, `email_cliente`, `direccion_cliente`, `tipo_cliente`) VALUES
(1, 'x', 'SIN NOMBRE', '0', '0', '0', 3),
(2, '4937724', 'DERLIS RUIZ DIAZ', '0983202090', 'derlisruizdiaz@hotmail.com', 'san jose', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `id_compra` int(11) NOT NULL,
  `id_proveedor_compra` int(11) NOT NULL COMMENT 'con id_proveedor',
  `tipo_factura_compra` int(1) NOT NULL COMMENT '1=contado 2=credito',
  `fecha_pago_compra` datetime NOT NULL DEFAULT current_timestamp(),
  `nro_factura_compra` varchar(100) NOT NULL,
  `fecha_compra` datetime NOT NULL DEFAULT current_timestamp(),
  `total_factura_compra` float NOT NULL,
  `estado_compra` int(1) NOT NULL COMMENT '1=pagado 2=nopagado'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras_items`
--

CREATE TABLE `compras_items` (
  `id_compras_item` int(11) NOT NULL,
  `id_item_compra` int(11) NOT NULL COMMENT 'con id_compra',
  `id_producto_compra` int(11) NOT NULL COMMENT 'con id_producto',
  `precio_compra` float NOT NULL,
  `precio_venta` float NOT NULL,
  `preciom_venta` float NOT NULL COMMENT 'mayorista',
  `cantidad_compra` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `depositos`
--

CREATE TABLE `depositos` (
  `id_deposito` int(11) NOT NULL,
  `nombre_deposito` varchar(50) NOT NULL,
  `tipo_deposito` int(1) NOT NULL DEFAULT 1 COMMENT '0=serv 1=fis'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id_empleado` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL COMMENT 'id_empleados_rol',
  `nombre_empleado` varchar(200) NOT NULL,
  `apellido_empleado` varchar(80) NOT NULL,
  `telefono_empleado` varchar(25) DEFAULT NULL,
  `doc_empleado` varchar(20) NOT NULL,
  `salario_empleado` int(11) NOT NULL,
  `tipo_salario` int(1) NOT NULL COMMENT '1=jornal 2=comision'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados_rols`
--

CREATE TABLE `empleados_rols` (
  `id_empleados_rol` int(11) NOT NULL,
  `descripcion_rol` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `empleados_rols`
--

INSERT INTO `empleados_rols` (`id_empleados_rol`, `descripcion_rol`) VALUES
(1, 'Gerente'),
(2, 'Vendedor'),
(3, 'Recepción');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

CREATE TABLE `empresas` (
  `id_empresa` int(11) NOT NULL,
  `nombre_empresa` varchar(100) NOT NULL,
  `propietario_empresa` varchar(100) DEFAULT NULL,
  `ruc_empresa` varchar(50) NOT NULL,
  `direccion_empresa` varchar(150) NOT NULL,
  `telefono_empresa` varchar(150) NOT NULL,
  `impuesto_empresa` varchar(25) NOT NULL COMMENT 'nombre de impuesto',
  `categoria_empresa` varchar(200) NOT NULL,
  `dimension_ticket` int(11) NOT NULL,
  `licencia` date NOT NULL,
  `tipo_nota` int(1) NOT NULL COMMENT '0=ticket 1=nota'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empresas`
--

INSERT INTO `empresas` (`id_empresa`, `nombre_empresa`, `propietario_empresa`, `ruc_empresa`, `direccion_empresa`, `telefono_empresa`, `impuesto_empresa`, `categoria_empresa`, `dimension_ticket`, `licencia`, `tipo_nota`) VALUES
(1, 'DERLIS RUIZ DIAZ', 'Derlis Ruiz Diaz', '4937724-8', 'Calle Joel Eulogio Estigarribia', '0983202090', 'IVA', 'Fotografía e informática', 80, '2022-12-01', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa_facturas`
--

CREATE TABLE `empresa_facturas` (
  `id_empresa_factura` int(11) NOT NULL,
  `id_empresa_empresa` int(11) NOT NULL COMMENT 'id_empresa de empresas',
  `id_caja_empresa` int(11) NOT NULL COMMENT 'con id_caja',
  `timbrado_factura` varchar(100) NOT NULL,
  `inicio_timbrado` date NOT NULL,
  `fin_timbrado` date NOT NULL,
  `nro_datos_factura` varchar(20) NOT NULL COMMENT 'ej: 001-003',
  `nro_inicio_factura` int(11) NOT NULL,
  `nro_fin_factura` int(11) NOT NULL,
  `last_nro_factura` int(11) NOT NULL COMMENT 'ultimo nro sacado'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa_recibos`
--

CREATE TABLE `empresa_recibos` (
  `id_empresa_recibo` int(11) NOT NULL,
  `last_nro_recibo` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empresa_recibos`
--

INSERT INTO `empresa_recibos` (`id_empresa_recibo`, `last_nro_recibo`) VALUES
(1, 28);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

CREATE TABLE `facturas` (
  `id_factura` int(11) NOT NULL,
  `id_cliente_factura` int(11) NOT NULL,
  `id_user_factura` int(11) NOT NULL COMMENT 'id de user responsable',
  `id_caja_factura` int(11) NOT NULL,
  `id_forma_pago_factura` int(11) NOT NULL,
  `id_moneda_factura` int(11) NOT NULL DEFAULT 1 COMMENT 'moneda pagada',
  `id_empleado_factura` int(11) NOT NULL,
  `nro_factura` varchar(255) NOT NULL COMMENT 'nro factura o recibo',
  `fecha_factura` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_cobro_factura` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'si es a crédito',
  `tipo_factura` int(1) NOT NULL DEFAULT 1 COMMENT '0=recibo 1=contado 2=credito',
  `recibido_factura` float NOT NULL COMMENT 'monto que recibe',
  `monto_total_factura` float NOT NULL,
  `descuento_factura` float NOT NULL DEFAULT 0,
  `valor_moneda_factura` int(11) NOT NULL,
  `estado_factura` int(1) DEFAULT 1 COMMENT '0 anulado 1 pagado 2 nopagado',
  `iva_factura` float NOT NULL COMMENT 'iva total',
  `retencion_iva_factura` float NOT NULL COMMENT 'retencion de iva',
  `orden_compra` varchar(100) NOT NULL,
  `obs_factura` text NOT NULL COMMENT 'info de pago'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas_formas_pagos`
--

CREATE TABLE `facturas_formas_pagos` (
  `id_facturas_formas_pago` int(11) NOT NULL,
  `descripcion_forma_pago` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `facturas_formas_pagos`
--

INSERT INTO `facturas_formas_pagos` (`id_facturas_formas_pago`, `descripcion_forma_pago`) VALUES
(1, 'Efectivo'),
(2, 'Cheque'),
(3, 'Tarjeta Crédito'),
(4, 'Tarjeta Débito'),
(5, 'Transferencia Bancaria'),
(6, 'Giros'),
(7, 'Otros');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas_items`
--

CREATE TABLE `facturas_items` (
  `id_facturas_item` int(11) NOT NULL,
  `id_items_factura` int(11) NOT NULL COMMENT 'id_factura',
  `id_impuesto_factura` int(11) NOT NULL COMMENT 'id_impuesto',
  `id_producto_factura` int(11) NOT NULL COMMENT 'id_producto',
  `porcentaje_comision_factura` float NOT NULL,
  `cantidad_producto` float NOT NULL,
  `precio_producto_factura` int(11) NOT NULL COMMENT 'precio vendido',
  `entregado_item` int(1) NOT NULL DEFAULT 0 COMMENT '0=no 1=si 2=servicio'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `impuestos`
--

CREATE TABLE `impuestos` (
  `id_impuesto` int(11) NOT NULL,
  `nombre_impuesto` varchar(25) NOT NULL,
  `porcentaje_impuesto` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `impuestos`
--

INSERT INTO `impuestos` (`id_impuesto`, `nombre_impuesto`, `porcentaje_impuesto`) VALUES
(1, 'Exentas', 0),
(2, '10 %', 10),
(3, '5 %', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas`
--

CREATE TABLE `marcas` (
  `id_marca` int(11) NOT NULL,
  `nombre_marca` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `marcas`
--

INSERT INTO `marcas` (`id_marca`, `nombre_marca`) VALUES
(1, 'SIN MARCA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `monedas`
--

CREATE TABLE `monedas` (
  `id_moneda` int(11) NOT NULL,
  `abreviatura_moneda` varchar(10) NOT NULL,
  `nombre_moneda` varchar(50) NOT NULL COMMENT 'debe estar en plural',
  `valor_moneda` int(11) NOT NULL COMMENT 'con respecto a la moneda activa',
  `activo_moneda` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `monedas`
--

INSERT INTO `monedas` (`id_moneda`, `abreviatura_moneda`, `nombre_moneda`, `valor_moneda`, `activo_moneda`) VALUES
(1, 'Gs.', 'Guaraníes', 1, 1),
(2, 'Rs', 'Reales', 1200, 0),
(3, 'Uss', 'Dólares', 7000, 0),
(4, 'Ps.Ar', 'Pesos', 25, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `monedas_registros`
--

CREATE TABLE `monedas_registros` (
  `id_monedas_registro` int(11) NOT NULL,
  `id_moneda_registro` int(11) NOT NULL COMMENT 'con id_moneda',
  `valor_moneda_registro` int(11) NOT NULL,
  `descripcion_registro_moneda` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `monedas_registros`
--

INSERT INTO `monedas_registros` (`id_monedas_registro`, `id_moneda_registro`, `valor_moneda_registro`, `descripcion_registro_moneda`) VALUES
(1, 1, 100000, '100.000'),
(2, 1, 50000, '50.000'),
(3, 1, 20000, '20.000'),
(4, 1, 10000, '10.000'),
(5, 1, 5000, '5.000'),
(6, 1, 2000, '2.000'),
(7, 1, 1000, '1.000'),
(8, 1, 500, '500'),
(9, 1, 100, '100');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas_items`
--

CREATE TABLE `notas_items` (
  `id_notas_item` int(11) NOT NULL,
  `id_notas_pedido_item` int(11) NOT NULL COMMENT 'id_notas_pedidos',
  `id_producto_item` int(11) NOT NULL COMMENT 'id_producto',
  `precio_guardado` float NOT NULL,
  `cantidad_item` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notas_pedidos`
--

CREATE TABLE `notas_pedidos` (
  `id_notas_pedido` int(11) NOT NULL,
  `id_cliente_pedido` int(11) NOT NULL,
  `id_deposito_pedido` int(11) NOT NULL,
  `id_empleado_pedido` int(11) NOT NULL,
  `fecha_pedido` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `id_producto_pedido` int(11) NOT NULL COMMENT 'id_producto',
  `id_usuario_pedido` int(11) NOT NULL,
  `cantidad_pedido` float NOT NULL,
  `obs_pedido` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `id_permiso` int(11) NOT NULL,
  `clave_permiso` varchar(25) NOT NULL,
  `descripcion_permiso` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `permisos`
--

INSERT INTO `permisos` (`id_permiso`, `clave_permiso`, `descripcion_permiso`) VALUES
(1, 'Ventas', 'Ventas: Hacer ventas'),
(2, 'VentasNotas', 'Ventas: Generar notas'),
(3, 'VentasPresupuesto', 'Ventas: Hacer presupuesto'),
(4, 'Facturas', 'Facturas: Ver facturas'),
(5, 'Facturas', 'Facturas: Imprimir facturas'),
(6, 'Notas', 'Notas: Ver notas'),
(7, 'NotasCrud', 'Notas: Editar, procesar, eliminar notas'),
(8, 'Productos', 'Productos: Ver lista de productos'),
(9, 'ProductosCrud', 'Productos: Registrar, editar, eliminar producto'),
(10, 'ProductosCategorias', 'Productos Categorías: Ver categorías'),
(11, 'ProductosCategoriasCrud', 'Productos Categorías: Registrar, editar, eliminar categorías'),
(12, 'ProductosMarcas', 'Productos Marcas: Ver marcas'),
(13, 'ProductosMarcasCrud', 'Productos Marcas: Registrar, editar, eliminar marcas'),
(14, 'Productos_Proveedores', 'Productos Proveedores: Ver lista de proveedores'),
(15, 'Productos_Proveedores', 'Productos Proveedores: Registrar, editar, eliminar proveedor'),
(16, 'Entregas', 'Entregas: Ver entregas'),
(17, 'Entregas', 'Entregas: procesar entregas'),
(18, 'Productos_Apartados', 'Productos Apartados: Ver lista de productos apartados'),
(19, 'Productos_Apartados', 'Productos Apartados: Registrar, editar, eliminar productos apartados'),
(20, 'Compras', 'Compras: Ver compras'),
(21, 'Compras', 'Compras: Registrar y procesar compras'),
(22, 'Cajas', 'Cajas: Ver lista de cajas.'),
(23, 'Cajas', 'Cajas: Habilitar, registrar, abrir, cerrar y editar caja.'),
(24, 'Cajas', 'Cajas: Ver movimientos de cajas.'),
(25, 'Cajas', 'Cajas: Registrar movimiento de cajas.'),
(26, 'Cajas', 'Cajas: Ver lista de tipos registros'),
(27, 'Cajas', 'Cajas: Registrar, editar, borrar lista de movimientos de caja.'),
(28, 'Clientes', 'Clientes: Ver lista de clientes.'),
(29, 'Clientes', 'Clientes: Registrar, editar, eliminar clientes.'),
(30, 'Monedas', 'Monedas: Ver lista de monedas.'),
(31, 'Monedas', 'Monedas: Registrar, editar, eliminar monedas.'),
(32, 'Medidas', 'Medidas: Ver lista de unidades de medidas.'),
(33, 'Medidas', 'Medidas: Registrar, editar, eliminar unidades de medidas.'),
(34, 'Usuarios', 'Usuarios: Ver lista de usuarios'),
(35, 'Usuarios', 'Usuarios: Registrar, editar, eliminar usuario.'),
(36, 'Empresa', 'Empresa: Ver datos de empresa'),
(37, 'Empresa', 'Empresa: Editar datos de empresa.'),
(38, 'Facturas', 'Facturas: Registrar talonario de facturas.'),
(39, 'Productos_Depositos', 'Productos Depósitos: Ver lista de depósitos.'),
(40, 'Productos_Depositos', 'Productos Depósitos: Registrar, editar, eliminar deposito.'),
(41, 'Empleados', 'Empleados: Ver lista de empleados'),
(42, 'Empleados', 'Empleados: Registrar, editar, eliminar empleado.'),
(43, 'Productos_Inventario', 'Productos Inventario: Corrección de inventario'),
(44, 'Informes', 'Informes: Ver informes gráficos'),
(45, 'Impuestos', 'Impuestos: Ver lista de impuestos.'),
(46, 'Impuestos', 'Impuestos: Registrar, editar, eliminar lista de impuestos.'),
(47, 'Cuentas', 'Cuentas: Ver lista de cuentas.'),
(48, 'Cuentas', 'Cuentas: Procesar pago de cuentas'),
(49, 'Turnos', 'Turnos: Ver lista de turnos'),
(50, 'Turnos', 'Turnos: Registrar, editar, eliminar turnos.'),
(51, 'Agenda', 'Agenda: Ver agenda.'),
(52, 'Agenda', 'Agenda: Registrar, editar, eliminar agenda.'),
(53, 'Ventas', 'Ventas: Ver menú de ventas'),
(54, 'Productos', 'Productos: Ver menú de productos'),
(55, 'Cajas', 'Cajas: Ver menú de cajas y arqueos'),
(56, 'Mantenimiento', 'Mantenimiento: Ver menú de mantenimiento'),
(57, 'Ajustes', 'Ajustes: Ver menú de ajustes generales'),
(58, 'Agenda', 'Agenda: Ver menú de agenda, turnos y calendarios'),
(59, 'Inicio', 'Inicio: Ver escritorio principal'),
(60, 'ProductosTransferencias', 'Productos: Ver transferencias de productos'),
(61, 'ProductosTransferencias', 'Productos: Registrar, editar, borrar transferencias de productos'),
(71, 'VentasDescuentos', 'Ventas: Hacer descuentos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos_users`
--

CREATE TABLE `permisos_users` (
  `id_permisos_user` int(11) NOT NULL,
  `id_user_permiso` int(11) NOT NULL COMMENT 'con id_user',
  `id_permiso_permiso` int(11) NOT NULL COMMENT 'con id permiso'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `permisos_users`
--

INSERT INTO `permisos_users` (`id_permisos_user`, `id_user_permiso`, `id_permiso_permiso`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 7),
(8, 1, 8),
(9, 1, 9),
(10, 1, 10),
(11, 1, 11),
(12, 1, 12),
(13, 1, 13),
(14, 1, 14),
(15, 1, 15),
(16, 1, 16),
(17, 1, 17),
(18, 1, 18),
(19, 1, 19),
(20, 1, 20),
(21, 1, 21),
(22, 1, 22),
(23, 1, 23),
(24, 1, 24),
(25, 1, 25),
(26, 1, 26),
(27, 1, 27),
(28, 1, 28),
(29, 1, 29),
(30, 1, 30),
(31, 1, 31),
(32, 1, 32),
(33, 1, 33),
(34, 1, 34),
(35, 1, 35),
(36, 1, 36),
(37, 1, 37),
(38, 1, 38),
(39, 1, 39),
(40, 1, 40),
(41, 1, 41),
(42, 1, 42),
(43, 1, 43),
(44, 1, 44),
(45, 1, 45),
(46, 1, 46),
(47, 1, 47),
(48, 1, 48),
(49, 1, 49),
(50, 1, 50),
(53, 1, 53),
(54, 1, 54),
(55, 1, 55),
(56, 1, 56),
(57, 1, 57),
(59, 1, 59),
(60, 1, 60),
(61, 1, 61),
(71, 1, 71);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `id_marca_producto` int(5) NOT NULL,
  `id_categoria_producto` int(5) NOT NULL DEFAULT 1,
  `id_impuesto_producto` int(11) NOT NULL COMMENT 'id_impuesto',
  `id_proveedor_producto` int(11) NOT NULL COMMENT 'con id_proveedor',
  `id_unidad_medida_producto` int(11) NOT NULL COMMENT 'id_unidad de medida',
  `codigo_producto` varchar(200) NOT NULL,
  `nombre_producto` varchar(50) NOT NULL,
  `descripcion_producto` text DEFAULT NULL,
  `costo_producto` float NOT NULL,
  `porcentaje_comision` float NOT NULL DEFAULT 0 COMMENT 'comsion',
  `precio_producto` float DEFAULT 0,
  `preciom_producto` float NOT NULL DEFAULT 0 COMMENT 'precio p/ mayoristas',
  `minimo_producto` float NOT NULL DEFAULT 0 COMMENT 'stock minimo',
  `notificar_producto` int(1) NOT NULL DEFAULT 0 COMMENT '0=no 1=si',
  `tipo_producto` int(1) NOT NULL DEFAULT 1 COMMENT '1=fisico 2=servicio',
  `disponible_producto` int(1) NOT NULL DEFAULT 1 COMMENT '0=no 1=si'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_apartados`
--

CREATE TABLE `productos_apartados` (
  `id_productos_apartado` int(11) NOT NULL,
  `id_producto_apartado` int(11) NOT NULL COMMENT 'con id_producto',
  `id_deposito_apartado` int(11) NOT NULL COMMENT 'id_deposito',
  `id_deposito_producto_apartado` int(11) NOT NULL COMMENT 'id_productos_apartado',
  `id_cliente_apartado` int(11) NOT NULL COMMENT 'con id_cliente',
  `id_user_apartado` int(11) NOT NULL COMMENT 'id_user',
  `cantidad_apartado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_depositos`
--

CREATE TABLE `productos_depositos` (
  `id_productos_deposito` int(11) NOT NULL,
  `id_producto_deposito` int(11) NOT NULL COMMENT 'id_producto',
  `id_deposito_deposito` int(11) NOT NULL COMMENT 'id_deposito',
  `stock_producto_deposito` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_images`
--

CREATE TABLE `productos_images` (
  `id_productos_image` int(11) NOT NULL,
  `id_image_producto` int(11) NOT NULL COMMENT 'se relaciona con id_producto de productos',
  `image_name` text NOT NULL,
  `portada_imagen_producto` int(1) NOT NULL COMMENT '0=no 1=si',
  `url_imagen` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_vendidos`
--

CREATE TABLE `productos_vendidos` (
  `id_productos_vendido` int(11) NOT NULL,
  `id_producto_vendido` int(11) NOT NULL COMMENT 'con id_producto',
  `id_factura_vendido` int(11) NOT NULL COMMENT 'con id_factura',
  `id_cliente_vendido` int(11) NOT NULL COMMENT 'con id_cliente',
  `precio_vendido` int(11) NOT NULL,
  `cantidad_vendido` int(11) NOT NULL,
  `fecha_vendido` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedors`
--

CREATE TABLE `proveedors` (
  `id_proveedor` int(11) NOT NULL,
  `ruc_proveedor` varchar(20) DEFAULT NULL,
  `nombre_proveedor` varchar(100) NOT NULL,
  `telefono_proveedor` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proveedors`
--

INSERT INTO `proveedors` (`id_proveedor`, `ruc_proveedor`, `nombre_proveedor`, `telefono_proveedor`) VALUES
(1, '0', 'SIN PROVEEDOR', '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registros`
--

CREATE TABLE `registros` (
  `id_registro` int(11) NOT NULL,
  `detalles_registro` text NOT NULL,
  `fecha_registro` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turnos`
--

CREATE TABLE `turnos` (
  `id_turno` int(11) NOT NULL,
  `id_cliente_turno` int(11) NOT NULL COMMENT 'id_cliente',
  `id_empleado_turno` int(11) NOT NULL,
  `fecha_tomada` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_turno` date NOT NULL COMMENT 'fecha p turno',
  `horario_turno` time NOT NULL COMMENT 'horario de turno',
  `estado_turno` int(1) NOT NULL COMMENT '0=no 1=espera 2=fin'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turnos_servicios`
--

CREATE TABLE `turnos_servicios` (
  `id_turnos_servicio` int(11) NOT NULL,
  `id_turno_servicio` int(11) NOT NULL COMMENT 'id_turno',
  `id_servicio_turno` int(11) NOT NULL COMMENT 'id_producto serv'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidad_medidas`
--

CREATE TABLE `unidad_medidas` (
  `id_unidad_medida` int(11) NOT NULL,
  `descripcion_medida` varchar(100) NOT NULL,
  `simbolo_medida` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `unidad_medidas`
--

INSERT INTO `unidad_medidas` (`id_unidad_medida`, `descripcion_medida`, `simbolo_medida`) VALUES
(1, 'Unidades', 'U'),
(2, 'Sin medida', 'sm'),
(3, 'Litros', 'Lt'),
(4, 'Kilos', 'Kg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `nombre_user` text NOT NULL,
  `username_user` varchar(30) NOT NULL,
  `password_user` varchar(200) NOT NULL,
  `email_user` varchar(100) NOT NULL,
  `rol_user` int(1) DEFAULT 2 COMMENT '1 2 3 4 5',
  `estado_user` int(1) DEFAULT 1 COMMENT '0 inactivo, 1 activo',
  `fecha_creacion_user` datetime DEFAULT current_timestamp(),
  `try_user` int(1) NOT NULL DEFAULT 0,
  `last_login_user` datetime DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `nombre_user`, `username_user`, `password_user`, `email_user`, `rol_user`, `estado_user`, `fecha_creacion_user`, `try_user`, `last_login_user`) VALUES
(1, 'Administrador', 'admin', '$2y$10$GVT9UAM52bxwmmNp8O4Y8uxWGpx.WJCzBe2xSow5iGoRqHCK9SPEG', 'derlisruizdiaz@hotmail.com', 1, 1, '2021-06-06 15:05:53', 0, '2022-04-11 20:58:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_permisos`
--

CREATE TABLE `users_permisos` (
  `id_users_permiso` int(11) NOT NULL,
  `roluser_permiso` varchar(20) NOT NULL,
  `prioridad_permiso` int(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users_permisos`
--

INSERT INTO `users_permisos` (`id_users_permiso`, `roluser_permiso`, `prioridad_permiso`) VALUES
(1, 'Admin', 1),
(2, 'Vendedor', 2),
(3, 'Cajero', 2),
(4, 'Entregador', 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `agendas`
--
ALTER TABLE `agendas`
  ADD PRIMARY KEY (`id_agenda`);

--
-- Indices de la tabla `cajas`
--
ALTER TABLE `cajas`
  ADD PRIMARY KEY (`id_caja`);

--
-- Indices de la tabla `cajas_arqueos`
--
ALTER TABLE `cajas_arqueos`
  ADD PRIMARY KEY (`id_cajas_arqueo`);

--
-- Indices de la tabla `cajas_movimientos`
--
ALTER TABLE `cajas_movimientos`
  ADD PRIMARY KEY (`id_cajas_movimiento`);

--
-- Indices de la tabla `cajas_registros`
--
ALTER TABLE `cajas_registros`
  ADD PRIMARY KEY (`id_cajas_registro`);

--
-- Indices de la tabla `cajas_users`
--
ALTER TABLE `cajas_users`
  ADD PRIMARY KEY (`id_cajas_user`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id_compra`);

--
-- Indices de la tabla `compras_items`
--
ALTER TABLE `compras_items`
  ADD PRIMARY KEY (`id_compras_item`);

--
-- Indices de la tabla `depositos`
--
ALTER TABLE `depositos`
  ADD PRIMARY KEY (`id_deposito`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id_empleado`);

--
-- Indices de la tabla `empleados_rols`
--
ALTER TABLE `empleados_rols`
  ADD PRIMARY KEY (`id_empleados_rol`);

--
-- Indices de la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`id_empresa`);

--
-- Indices de la tabla `empresa_facturas`
--
ALTER TABLE `empresa_facturas`
  ADD PRIMARY KEY (`id_empresa_factura`);

--
-- Indices de la tabla `empresa_recibos`
--
ALTER TABLE `empresa_recibos`
  ADD PRIMARY KEY (`id_empresa_recibo`);

--
-- Indices de la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`id_factura`);

--
-- Indices de la tabla `facturas_formas_pagos`
--
ALTER TABLE `facturas_formas_pagos`
  ADD PRIMARY KEY (`id_facturas_formas_pago`);

--
-- Indices de la tabla `facturas_items`
--
ALTER TABLE `facturas_items`
  ADD PRIMARY KEY (`id_facturas_item`);

--
-- Indices de la tabla `impuestos`
--
ALTER TABLE `impuestos`
  ADD PRIMARY KEY (`id_impuesto`);

--
-- Indices de la tabla `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`id_marca`);

--
-- Indices de la tabla `monedas`
--
ALTER TABLE `monedas`
  ADD PRIMARY KEY (`id_moneda`);

--
-- Indices de la tabla `monedas_registros`
--
ALTER TABLE `monedas_registros`
  ADD PRIMARY KEY (`id_monedas_registro`);

--
-- Indices de la tabla `notas_items`
--
ALTER TABLE `notas_items`
  ADD PRIMARY KEY (`id_notas_item`);

--
-- Indices de la tabla `notas_pedidos`
--
ALTER TABLE `notas_pedidos`
  ADD PRIMARY KEY (`id_notas_pedido`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`id_permiso`);

--
-- Indices de la tabla `permisos_users`
--
ALTER TABLE `permisos_users`
  ADD PRIMARY KEY (`id_permisos_user`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `productos_apartados`
--
ALTER TABLE `productos_apartados`
  ADD PRIMARY KEY (`id_productos_apartado`);

--
-- Indices de la tabla `productos_depositos`
--
ALTER TABLE `productos_depositos`
  ADD PRIMARY KEY (`id_productos_deposito`);

--
-- Indices de la tabla `productos_images`
--
ALTER TABLE `productos_images`
  ADD PRIMARY KEY (`id_productos_image`);

--
-- Indices de la tabla `productos_vendidos`
--
ALTER TABLE `productos_vendidos`
  ADD PRIMARY KEY (`id_productos_vendido`);

--
-- Indices de la tabla `proveedors`
--
ALTER TABLE `proveedors`
  ADD PRIMARY KEY (`id_proveedor`);

--
-- Indices de la tabla `registros`
--
ALTER TABLE `registros`
  ADD PRIMARY KEY (`id_registro`);

--
-- Indices de la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD PRIMARY KEY (`id_turno`);

--
-- Indices de la tabla `turnos_servicios`
--
ALTER TABLE `turnos_servicios`
  ADD PRIMARY KEY (`id_turnos_servicio`);

--
-- Indices de la tabla `unidad_medidas`
--
ALTER TABLE `unidad_medidas`
  ADD PRIMARY KEY (`id_unidad_medida`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- Indices de la tabla `users_permisos`
--
ALTER TABLE `users_permisos`
  ADD PRIMARY KEY (`id_users_permiso`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `agendas`
--
ALTER TABLE `agendas`
  MODIFY `id_agenda` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cajas`
--
ALTER TABLE `cajas`
  MODIFY `id_caja` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cajas_arqueos`
--
ALTER TABLE `cajas_arqueos`
  MODIFY `id_cajas_arqueo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cajas_movimientos`
--
ALTER TABLE `cajas_movimientos`
  MODIFY `id_cajas_movimiento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cajas_registros`
--
ALTER TABLE `cajas_registros`
  MODIFY `id_cajas_registro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `cajas_users`
--
ALTER TABLE `cajas_users`
  MODIFY `id_cajas_user` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id_compra` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `compras_items`
--
ALTER TABLE `compras_items`
  MODIFY `id_compras_item` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `depositos`
--
ALTER TABLE `depositos`
  MODIFY `id_deposito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleados_rols`
--
ALTER TABLE `empleados_rols`
  MODIFY `id_empleados_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `empresas`
--
ALTER TABLE `empresas`
  MODIFY `id_empresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `empresa_facturas`
--
ALTER TABLE `empresa_facturas`
  MODIFY `id_empresa_factura` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empresa_recibos`
--
ALTER TABLE `empresa_recibos`
  MODIFY `id_empresa_recibo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `facturas`
--
ALTER TABLE `facturas`
  MODIFY `id_factura` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `facturas_formas_pagos`
--
ALTER TABLE `facturas_formas_pagos`
  MODIFY `id_facturas_formas_pago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `facturas_items`
--
ALTER TABLE `facturas_items`
  MODIFY `id_facturas_item` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `impuestos`
--
ALTER TABLE `impuestos`
  MODIFY `id_impuesto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
  MODIFY `id_marca` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `monedas`
--
ALTER TABLE `monedas`
  MODIFY `id_moneda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `monedas_registros`
--
ALTER TABLE `monedas_registros`
  MODIFY `id_monedas_registro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `notas_items`
--
ALTER TABLE `notas_items`
  MODIFY `id_notas_item` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `notas_pedidos`
--
ALTER TABLE `notas_pedidos`
  MODIFY `id_notas_pedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos`
  MODIFY `id_permiso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT de la tabla `permisos_users`
--
ALTER TABLE `permisos_users`
  MODIFY `id_permisos_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos_apartados`
--
ALTER TABLE `productos_apartados`
  MODIFY `id_productos_apartado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos_depositos`
--
ALTER TABLE `productos_depositos`
  MODIFY `id_productos_deposito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos_images`
--
ALTER TABLE `productos_images`
  MODIFY `id_productos_image` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos_vendidos`
--
ALTER TABLE `productos_vendidos`
  MODIFY `id_productos_vendido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proveedors`
--
ALTER TABLE `proveedors`
  MODIFY `id_proveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `registros`
--
ALTER TABLE `registros`
  MODIFY `id_registro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `turnos`
--
ALTER TABLE `turnos`
  MODIFY `id_turno` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `turnos_servicios`
--
ALTER TABLE `turnos_servicios`
  MODIFY `id_turnos_servicio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `unidad_medidas`
--
ALTER TABLE `unidad_medidas`
  MODIFY `id_unidad_medida` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `users_permisos`
--
ALTER TABLE `users_permisos`
  MODIFY `id_users_permiso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
