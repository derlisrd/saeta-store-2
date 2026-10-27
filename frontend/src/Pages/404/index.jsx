import { Stack, Typography,Icon,Fab} from '@mui/material'
import useGoto from '../../Hooks/useGoto';
import { useLang } from '../../Contexts/LangProvider';
const ErrorPage = () => {
  const {lang} = useLang()
  const navigate = useGoto()
  return (
    <Stack direction="column" spacing={2} sx={{ minHeight:"100vh"}} justifyContent="center" alignItems="center" >
        <Icon color="primary" sx={{ fontSize:"8rem" }} >warning_amber</Icon>
        <Typography variant="h1" >{lang.Error_404}</Typography>
        <Typography variant="body1" >{lang.q_volver_casa}</Typography>
        <Fab variant="extended" onClick={()=>{navigate.to("")}} >
          <Icon>home</Icon>
          {lang.volver_a_casa}
        </Fab>
    </Stack>
  )
}

export default ErrorPage
