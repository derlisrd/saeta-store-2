import { Box, Grid, Link, Typography } from '@mui/material'
import React from 'react'
import { APIURL } from '../../App/Config/config'
import { useLogin } from '../../Contexts/LoginProvider'

const Backup = () => {
  const {userData} = useLogin()
  const url = APIURL+'backup?'+userData.token_user

  return (
    <Box>
     <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='button'>Hacer una copia de seguridad diario es importante para mantener los datos seguros</Typography>
        </Grid>
        <Grid item xs={12}>
          
          <Link href={url}>Descargar copia de seguridad</Link>
            
        </Grid>
     </Grid>
    </Box>
  )
}

export default Backup
