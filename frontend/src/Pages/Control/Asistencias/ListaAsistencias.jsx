import {  Button, Checkbox, Icon, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react'
import { Tablas } from '../../../Components';
import { useAsistencia } from './AsistenciasProvider'

const ListaAsistencias = () => {
    const {lista,cargando,asistencia,setAsistencia,fechaActual,GuardarAsistencia,tomado} = useAsistencia();
    const cambio = (e,fila)=>{
      let asis = [...asistencia]
      if(e.target.checked){
        asis.push({id_alumno_asistencia:fila.id_alumno,fecha_asistencia:fechaActual})
      }
      else{
        let index = asis.findIndex(e=> e.id_alumno_asistencia === fila.id_alumno);
        if(index>=0){
          asis.splice(index, 1);
        }
      }
      setAsistencia(asis);
    }
    const columns = [
        {
            field:"id_alumno",
            title:"#",
        },
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

    const Acciones = ({filaProps})=>(
        <Stack direction="row" spacing={1} justifyContent="center">
            <Tooltip title="Marcar asistencia">
            <Checkbox onChange={(e)=>{cambio(e,filaProps)}} checked={asistencia.some(e=> e.id_alumno_asistencia === filaProps.id_alumno)}  icon={<Icon color="primary">check_box_outline_blank</Icon>} checkedIcon={<Icon color="success">check_circle</Icon>}/>
            </Tooltip>
        </Stack>
    )

    const Search =(
    <Stack>
      <Stack>
        <Typography variant='h5'>Fecha: {fechaActual}</Typography>
      </Stack>
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Button size='large' onClick={GuardarAsistencia} variant='outlined'>Guardar</Button>
      </Stack>
    </Stack>)

  return (
    <>
    {
      tomado ? 
      <Stack spacing={2}>
        <Typography variant='button'>Asistencia</Typography>
        <Typography variant="caption">Lista de asistencia</Typography>
        <Typography variant='h4'>Fecha: {fechaActual}</Typography>
      </Stack>
      :
    <Tablas
        nombretabla={"Asistencia"}
        subtitle="Lista de asistencia"
        columnas={columns}
        filas={lista}
        cargando={cargando}
        Acciones={Acciones}
        search={Search}
        showOptions
    />
    }
    </>
  )
}

export default ListaAsistencias
