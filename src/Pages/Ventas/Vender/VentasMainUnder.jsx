import { Grid, Icon } from '@mui/material';
import React from 'react'
import ButtonCustom from "../../../Components/MuiCustom/ButtonCustom";
import useGoto from '../../../Hooks/useGoto';
import ListaAguarda from './ListaAguarda';
import { useVentas } from './VentasProvider';

const VentasMainUnder = () => {
    const {dialogs,setDialogs} = useVentas();
    const go = useGoto();
    const abrir = ()=>{ setDialogs({...dialogs,main:true})}

  return (
    <Grid container spacing={2}>
      <Grid item >
        <ButtonCustom
          startIcon={<Icon>storefront</Icon>}
          variant="outlined"
          color="primary"
          onClick={abrir}
        >
          Hacer venta
        </ButtonCustom>
      </Grid>
      <Grid item  >
        <ButtonCustom
        startIcon={<Icon>receipt_long</Icon>}
          variant="outlined"
          color="primary"
          onClick={()=> go.to('facturas')}
        >
          Lista de facturas
        </ButtonCustom>
      </Grid>
      <Grid item xs={12}>
            <ListaAguarda outside />
      </Grid>
    </Grid>
  );
};

export default VentasMainUnder
