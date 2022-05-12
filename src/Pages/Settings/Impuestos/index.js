import React from 'react'
import ImpuestosLista from './ImpuestosLista'
import ImpuestoProvider from './ImpuestosProvider'

const Impuestos = () => {
  return (
    <ImpuestoProvider>
      <ImpuestosLista />
    </ImpuestoProvider>
  )
}

export default Impuestos
