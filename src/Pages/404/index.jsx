import { Stack, Typography,Icon,Fab} from '@mui/material'

const ErrorPage = () => {
  return (
    <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" >
        <Icon color="warning" sx={{ fontSize:"8rem" }} >power_off</Icon>
        <Typography variant="body1" >A donde quieres llegar, porque no vuelves a casa?</Typography>
        <Fab variant="extended" onClick={()=>{}} >
          <Icon>home</Icon>
          VOLVER A CASA
        </Fab>
    </Stack>
  )
}

export default ErrorPage
