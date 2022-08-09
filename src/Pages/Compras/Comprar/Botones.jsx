import { Grid } from '@mui/material'
import React from 'react'
import ButtonCustom from '../../../Components/MuiCustom/ButtonCustom'
import { useCompras } from '../ComprasProvider'

const Botones = () => {


  const {setDialogs,dialogs} = useCompras()


  const abrir = ()=>{ setDialogs({...dialogs,finalizar:true})}

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <ButtonCustom variant="contained" color="success" onClick={abrir} fullWidth>Finalizar </ButtonCustom>
      </Grid>
      <Grid item xs={12} sm={6}>
        <ButtonCustom variant="outlined"  fullWidth>Cancelar </ButtonCustom>
      </Grid>
    </Grid>
  )
}

export default Botones
