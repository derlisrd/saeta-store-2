import { Grid,Zoom } from '@mui/material'
import React from 'react'
import ButtonCustom from '../../../Components/MuiCustom/ButtonCustom'
import { useCompras } from '../ComprasProvider'

const Botones = () => {


  const {setDialogs,dialogs,compras,lang} = useCompras()



  const abrir = ()=>{ setDialogs({...dialogs,finalizar:true})}

  return (
    <Zoom in={compras.items.length > 0}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <ButtonCustom variant="contained" color="success" onClick={abrir} fullWidth>{lang.finalizar} </ButtonCustom>
      </Grid>
      <Grid item xs={12} sm={6}>
        <ButtonCustom variant="outlined"  fullWidth>{lang.cancelar} </ButtonCustom>
      </Grid>
    </Grid>
    </Zoom>
  )
}

export default Botones
