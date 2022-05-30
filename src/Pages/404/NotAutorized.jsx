import { Stack, Typography,Icon,Fab} from '@mui/material'
import { useLang } from '../../Contexts/LangProvider';
const NotAutorized = () => {
  const {lang} = useLang()
  return (
    <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" >
        <Icon color="warning" sx={{ fontSize:"8rem" }} >warning</Icon>
        <Typography variant="body1" >{lang.no_autorizado}</Typography>
        <Stack direction="row" spacing={2}>
        <Fab variant="extended" onClick={()=>{}} >
          <Icon>home</Icon>
          {lang.volver_a_casa}
        </Fab>
        <Fab variant="extended" onClick={()=>{}} >
          <Icon>logout</Icon>
          {lang.salir}
        </Fab>
        </Stack>
    </Stack>
  )
}

export default NotAutorized
