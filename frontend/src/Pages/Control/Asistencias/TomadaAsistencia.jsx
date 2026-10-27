import { Button, Stack, TextField } from '@mui/material'
import React from 'react'
import Tablas from "../../../Components/Tablas"
import { useAsistencia } from './AsistenciasProvider'
const TomadaAsistencia = () => {
  const {fechaActual,cargando,setFechaActual,listaAsistencia} = useAsistencia()
  const columns = [
    {
        field:"doc_alumno",
        title:"Doc.",
        isNumber:true
    },
    {
        field:"apellido_alumno",
        title:"Apellido",
      },
    {
      field:"nombre_alumno",
      title:"Nombre",
    },
]

const Acciones = ()=>(
  <Stack>
    <p>P</p>
  </Stack>
)

const Search = (<Stack spacing={1} justifyContent="flex-end" direction="row">
  <TextField type="date" value={fechaActual} onChange={e=> setFechaActual(e.target.value)} />
  <Button variant="outlined">Filtrar</Button>
</Stack>)

  return (
    <Tablas
      search={Search}
      nombretabla="Asistencias tomadas"
      columnas={columns}
      filas={listaAsistencia}
      Acciones={Acciones}
      cargando={cargando}
      showOptions
    />
    
  )
}

export default TomadaAsistencia
