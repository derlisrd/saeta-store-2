import { Box, Grid, Link, Typography } from '@mui/material'
import { APIURL } from '../../App/Config/config'
import { useLogin } from '../../Contexts/LoginProvider'
import { DescifrarTexto } from '../../Services/api'

const Backup = () => {
  const {userData} = useLogin()
  const token = DescifrarTexto(userData.token_user);
  const url = APIURL+'backup?token='+token

  return (
    <Box p={3} boxShadow={4} borderRadius={4} m={1} bgcolor="background.paper">
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
