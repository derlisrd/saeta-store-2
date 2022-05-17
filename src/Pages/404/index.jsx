import { Stack, Typography,Icon,Fab} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import {BASEURL} from '../../Utils/config';
const ErrorPage = () => {

  const navigate = useNavigate()
  return (
    <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" >
        <Icon color="warning" sx={{ fontSize:"8rem" }} >power_off</Icon>
        <Typography variant="body1" >A donde quieres llegar, porque no vuelves a casa?</Typography>
        <Fab variant="extended" onClick={()=>{navigate(BASEURL)}} >
          <Icon>home</Icon>
          VOLVER A CASA
        </Fab>
    </Stack>
  )
}

export default ErrorPage
