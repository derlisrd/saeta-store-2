import React from 'react'
import CuotasProvider from './CuotasProvider'
import FormCuotas from './FormCuotas'
import ListaCuotas from './ListaCuotas'

const Cuotas = () => {
  return (
    <CuotasProvider>
      <FormCuotas />
      <ListaCuotas />
    </CuotasProvider>
  )
}

export default Cuotas
