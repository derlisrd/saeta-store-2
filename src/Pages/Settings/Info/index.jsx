import { Alert, Box, Grid, Icon, Typography,Link } from '@mui/material'
import React from 'react'

const Info = () => {
  return (
    <Box>
      <h2>INFORMACION Y AYUDA <Icon color='primary'>help</Icon></h2>
      <Grid container>

      <Grid item xs={12}>
        <Alert icon={false}>
          <Typography variant='h6'>
            Sistema de ventas, facturación e inventario. <Link underline="hover" href="https://wa.me/595983202090" rel="noreferrer" target="_blank"> CONTACTO: 0983 202090</Link>
          </Typography>
        </Alert>
      </Grid>
        <Grid item xs={12}>
          <Alert variant='outlined' severity='info' icon={<Icon>done</Icon>}>
            <Typography variant='overline'>Sistema desarrollado por Derlis Ruiz Diaz.</Typography>
          </Alert>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Info
