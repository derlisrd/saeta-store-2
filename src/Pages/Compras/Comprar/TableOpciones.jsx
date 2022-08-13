import { Icon, IconButton, Stack, Tooltip } from '@mui/material'
import React from 'react'

const TableOpciones = ({index}) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      
      <IconButton color='success' onClick={()=>{console.log(index)}} size="large">
        <Tooltip placement="top" title="Imagen" arrow>
        <Icon>image</Icon>
        </Tooltip>
      </IconButton>

      <IconButton color='warning' onClick={()=>{console.log(index)}} size="large">
      <Tooltip placement="top" title="Cambiar precio" arrow>
        <Icon>request_quote</Icon>
        </Tooltip>
      </IconButton>
      
      <IconButton color='error' onClick={()=>{console.log(index)}} size="large">
      <Tooltip placement="top" title="Borrar item" arrow>
        <Icon>delete</Icon>
        </Tooltip>
      </IconButton>
      
    </Stack>
  )
}

export default TableOpciones
