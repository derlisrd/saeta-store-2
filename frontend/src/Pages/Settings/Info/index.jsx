import { Alert, Box, Grid, Icon, Typography,Link } from '@mui/material'

const Info = () => {
  return (
    <Box p={2} boxShadow={4} borderRadius={4} m={1} bgcolor="background.paper">
      <Grid container spacing={3}>
      <Grid item xs={12}>
        <Alert icon={false}>
          <Typography variant='h6'>
            Sistema de ventas, facturación e inventario. <Link underline="hover" href="https://wa.me/595983202090" rel="noreferrer" target="_blank"> Contacto: 0983 202090</Link>
          </Typography>
        </Alert>
      </Grid>
        <Grid item xs={12}>
          <Alert variant='outlined' severity='info' icon={<Icon>done</Icon>}>
            <Typography variant='subtitle2'>Sistema desarrollado por Derlis Ruiz Diaz.</Typography>
          </Alert>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Info
