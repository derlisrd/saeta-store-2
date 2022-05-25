import React from 'react'
import { useFacturas } from './FacturasProvider'
import ImpresionFactura from './ImpresionFactura';
import ImpresionRecibo from './ImpresionRecibo';

const Impresion = () => {

    const {dialogs} = useFacturas();


    if(dialogs.imprimirFactura){
        return <ImpresionFactura />
    }

    if(dialogs.imprimirRecibo){
        return <ImpresionRecibo />
    }

  return (
    <>
      
    </>
  )
}

export default Impresion
