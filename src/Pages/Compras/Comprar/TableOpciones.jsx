import { Icon, IconButton, Stack, Tooltip } from '@mui/material'
import React from 'react'
import { useCompras } from '../ComprasProvider'

const TableOpciones = ({index}) => {

  const {setearCompras,lang,compras} = useCompras()


  const destroy = i=>{
    let d = {...compras}
    d.items.splice(index, 1);
    setearCompras(d)
  }

  return (
    <Stack direction="row" alignItems="center" spacing={1}>

      <IconButton color='error' onClick={()=>{destroy(index)}} size="large">
      <Tooltip placement="top" title={lang.borrar_item} arrow>
        <Icon>delete</Icon>
        </Tooltip>
      </IconButton>
      
    </Stack>
  )
}

export default TableOpciones
