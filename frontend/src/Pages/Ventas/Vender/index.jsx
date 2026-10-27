import React from 'react'
import DialogAyuda from './DialogAyuda'
import DialogBuscarCliente from './DialogBuscarCliente'
import DialogBuscarProducto from './DialogBuscarProducto'
import DialogCambioCliente from './DialogCambioCliente'
import DialogCambioPrecio from './DialogCambioPrecio'
import DialogFinalizar from './DialogFinalizar'
import DialogImagen from './DialogImagen'
import DialogImprimir from './DialogImprimir'
import DialogNota from './DialogNota'
import DialogRegistrarProducto from './DialogRegistrarProducto'
import DialogRegistroCliente from './DialogRegistroCliente'
import ImprimirNotaPedido from './Impresiones/ImprimirNotaPedido'
import ImprimirPresupuesto from './Impresiones/ImprimirPresupuesto'
import VentasMain from './VentasMain'
import VentasMainUnder from './VentasMainUnder'
import VentasProvider from './VentasProvider'

const Ventas = () => {
  return (
    <VentasProvider>
        <DialogRegistrarProducto />
        <DialogCambioPrecio />
        <DialogImagen />
        <DialogFinalizar />
        <DialogRegistroCliente />
        <DialogBuscarCliente />
        <DialogBuscarProducto />
        <ImprimirNotaPedido />
        <ImprimirPresupuesto />
        <DialogAyuda />
        <DialogCambioCliente />
        <DialogImprimir />
        <DialogNota />
        <VentasMain />
        <VentasMainUnder />
    </VentasProvider>
  )
}

export default Ventas