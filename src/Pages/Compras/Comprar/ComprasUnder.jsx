import { Box, Grid, Icon } from '@mui/material';
import ButtonCustom from '../../../Components/MuiCustom/ButtonCustom';
import { useCompras } from '../ComprasProvider';
import useGoto from '../../../Hooks/useGoto';
const ComprasUnder = () => {

    const {lang,dialogs,setDialogs} = useCompras()
    const go = useGoto();
    const abrir = ()=>{ setDialogs({...dialogs,main:true})}

  return (
    <Box p={2} boxShadow={4} borderRadius={4} minHeight="80vh" m={1} bgcolor="background.paper">
    <Grid container spacing={2}>
    <Grid item >
      <ButtonCustom
        startIcon={<Icon>storefront</Icon>}
        variant="contained"
        onClick={abrir}
      >
        {lang.hacer_compras}
      </ButtonCustom>
    </Grid>
    <Grid item  >
      <ButtonCustom
      startIcon={<Icon>receipt_long</Icon>}
        variant="outlined"
        onClick={()=> go.to('listascompras')}
      >
        {lang.lista_compras}
      </ButtonCustom>
    </Grid>
    </Grid>
    </Box>
  )
}

export default ComprasUnder
