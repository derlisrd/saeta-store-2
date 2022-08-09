import {  Grid } from '@mui/material'
import React from 'react'
import ButtonCustom from '../../../Components/MuiCustom/ButtonCustom'
import { useCompras } from '../ComprasProvider'
import Botones from './Botones'
import InputCantidad from './InputCantidad'
import InputCodigoProducto from './InputCodigProducto'


const InsertarCodigoProducto = () => {
  const {lang} = useCompras()
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12} >
          <InputCodigoProducto />
      </Grid>
      <Grid item xs={12} sm={12} >
          <InputCantidad />
      </Grid>
      <Grid item xs={12} sm={12} >
        <ButtonCustom variant="contained" fullWidth>{lang.agregar} </ButtonCustom>
      </Grid>
      <Grid item xs={12} sm={12} >
        <Botones />
      </Grid>
    </Grid>
  )
}

export default InsertarCodigoProducto
