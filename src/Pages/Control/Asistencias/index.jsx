import React from 'react'
import AsistenciasProvider from './AsistenciasProvider'
import AsistenciasTabs from './AsistenciasTabs'


const Asistencias = () => {
  return (
    <AsistenciasProvider>
      <AsistenciasTabs />
    </AsistenciasProvider>
  )
}

export default Asistencias
