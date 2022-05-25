import React from 'react'
import RegistroDialog from './RegistroDialog'
import RegistroMovimientosLista from './RegistroMovimientosLista'

import RegistroMovimientosProvider from './RegistroMovimientosProvider'

const RegistroMovimientos = () => {
  return (
    <RegistroMovimientosProvider>
      <RegistroMovimientosLista />
      <RegistroDialog />
    </RegistroMovimientosProvider>
  )
}

export default RegistroMovimientos