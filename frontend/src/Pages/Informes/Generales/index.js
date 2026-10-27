import React from 'react'
import InformesGenerales from './InformesGenerales'
import InformesProvider from './InformesProvider'

const Informes = () => {
  return (
    <InformesProvider>
      <InformesGenerales />
    </InformesProvider>
  )
}

export default Informes
