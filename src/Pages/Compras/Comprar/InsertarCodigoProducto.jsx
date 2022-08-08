import { Button, Grid } from '@mui/material'
import React from 'react'
import ButtonCustom from '../../../Components/MuiCustom/ButtonCustom'
import BusquedaCodigoProducto from './BusquedaCodigoProducto'

const InsertarCodigoProducto = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={8} sm={8} md={8}>
          <BusquedaCodigoProducto />
      </Grid>
      <Grid item xs={4} sm={4} md={4}>
        <ButtonCustom variant="contained" fullWidth>Agregar </ButtonCustom>
      </Grid>
    </Grid>
  )
}

export default InsertarCodigoProducto
