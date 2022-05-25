import { Stack, Typography,Icon,Fab} from '@mui/material'
import useGoto from '../../Hooks/useGoto';
const ErrorPage = () => {

  const navigate = useGoto()
  return (
    <Stack direction="column" spacing={2} sx={{ minHeight:"100vh"}} justifyContent="center" alignItems="center" >
        <Icon color="warning" sx={{ fontSize:"8rem" }} >power_off</Icon>
        <Typography variant="body1" >A donde quieres llegar, porque no vuelves a casa?</Typography>
        <Fab variant="extended" onClick={()=>{navigate.to("")}} >
          <Icon>home</Icon>
          Volver a casa
        </Fab>
    </Stack>
  )
}

export default ErrorPage
