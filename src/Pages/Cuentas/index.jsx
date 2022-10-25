import React from 'react'
import CuentasMain from './CuentasMain'
import CuentasProvider from './CuentasProvider'

const Cuentas = () => {
  return (
    <CuentasProvider>
        <CuentasMain />
    </CuentasProvider>
  )
}

export default Cuentas
