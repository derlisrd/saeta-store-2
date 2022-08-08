import { Grid, Typography } from '@mui/material'
import React from 'react'
import InsertarCodigoProducto from './InsertarCodigoProducto'


const Comprar = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
          <Typography variant="h4">Compras </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
          <InsertarCodigoProducto />
      </Grid>
      <Grid item xs={12} sm={12} md={8}>

      </Grid>
    </Grid>
  )
}

export default Comprar
