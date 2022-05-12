import { Grid, Icon } from '@mui/material';
import React from 'react'
import { CustomButton} from "../../../Componentes/Customs/muiCustom";
import ListaAguarda from './ListaAguarda';
import { useVentas } from './VentasProvider';

const VentasMainUnder = () => {
    const {dialogs,setDialogs,Funciones} = useVentas();

    const abrir = ()=>{ setDialogs({...dialogs,main:true})}

  return (
    <Grid container spacing={2}>
      <Grid item >
        <CustomButton
          startIcon={<Icon>storefront</Icon>}
          variant="outlined"
          size="large"
          color="primary"
          onClick={abrir}
        >
          Hacer venta
        </CustomButton>
      </Grid>
      <Grid item  >
        <CustomButton
        startIcon={<Icon>receipt_long</Icon>}
          variant="outlined"
          size="large"
          color="primary"
          onClick={()=> Funciones.goto('facturas')}
        >
          Lista de facturas
        </CustomButton>
      </Grid>
      <Grid item xs={12}>
            <ListaAguarda outside />
      </Grid>
    </Grid>
  );
};

export default VentasMainUnder
