import React from 'react'
import AlumnosProvider from './AlumnosProvider'
import FormAlumnos from './FormAlumnos'
import ListaAlumnos from './ListaAlumnos'

const Alumnos = () => {
  return (
    <AlumnosProvider>
      <FormAlumnos />
      <ListaAlumnos />
    </AlumnosProvider>
  )
}

export default Alumnos
