import { Icon, IconButton, Stack, Tooltip } from '@mui/material'
import React from 'react'
import { useCompras } from '../ComprasProvider'

const TableOpciones = ({index}) => {

  const {setearCompras,lang,compras,inputCodigo} = useCompras()


  const destroy = i=>{
    let d = {...compras}
    d.items.splice(index, 1);
    setearCompras(d)
    inputCodigo.current.focus()
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
