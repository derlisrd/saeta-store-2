import { Stack, Typography,Icon,Fab} from '@mui/material'

const NotAutorized = () => {

  return (
    <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" >
        <Icon color="warning" sx={{ fontSize:"8rem" }} >warning</Icon>
        <Typography variant="body1" >No deberías de estar aquí</Typography>
        <Stack direction="row" spacing={2}>
        <Fab variant="extended" onClick={()=>{}} >
          <Icon>home</Icon>
          VOLVER A CASA
        </Fab>
        <Fab variant="extended" onClick={()=>{}} >
          <Icon>logout</Icon>
          SALIR
        </Fab>
        </Stack>
    </Stack>
  )
}

export default NotAutorized
