import { Box, Grid, Link, Typography } from '@mui/material'
import React from 'react'

const Backup = () => {
  return (
    <Box>
     <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='button'>Hacer una copia de seguridad diario es importante para mantener los datos seguros</Typography>
        </Grid>
        <Grid item xs={12}>
          
          <Link href="http://localhost:8000/url_copia_/?token=12334">Descargar copia de seguridad</Link>
            
        </Grid>
     </Grid>
    </Box>
  )
}

export default Backup
