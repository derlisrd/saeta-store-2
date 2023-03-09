import { Box, Grid, Icon, Typography } from '@mui/material';
import React from 'react'
import ButtonCustom from "../../../Components/MuiCustom/ButtonCustom";
import useGoto from '../../../Hooks/useGoto';
import ListaAguarda from './ListaAguarda';
import { useVentas } from './VentasProvider';

const VentasMainUnder = () => {
    const {dialogs,setDialogs,lang} = useVentas();
    const go = useGoto();
    const abrir = ()=>{ setDialogs({...dialogs,main:true})}

  return (
    <Box p={2} boxShadow={4} borderRadius={4} minHeight="80vh" m={1} bgcolor="background.paper">
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h6'>Ventas</Typography>
      </Grid>
      <Grid item >
        <ButtonCustom
          startIcon={<Icon>storefront</Icon>}
          variant="outlined"
          onClick={abrir}
        >
          {lang.hacer_venta}
        </ButtonCustom>
      </Grid>
      <Grid item  >
        <ButtonCustom
        startIcon={<Icon>receipt_long</Icon>}
          variant="outlined"
          onClick={()=> go.to('facturas')}
        >
          {lang.listas_facturas}
        </ButtonCustom>
      </Grid>
      <Grid item xs={12}>
            <ListaAguarda outside />
      </Grid>
    </Grid>
    </Box>
  );
};

export default VentasMainUnder
