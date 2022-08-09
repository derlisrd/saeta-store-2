import {  Grid, Icon, IconButton, InputAdornment } from '@mui/material'
import React from 'react'
import ButtonCustom from '../../../Components/MuiCustom/ButtonCustom'
import TextFieldCustom from '../../../Components/MuiCustom/TextFieldCustom'
import { useCompras } from '../ComprasProvider'
import Botones from './Botones'
import Datos from './Datos'




const Inputs = () => {
  const {lang,inputCantidad,inputCodigo,consultarCodigoProducto} = useCompras()

  
  const agregar = () => {
    let codigo = inputCodigo.current.value
    if(codigo){
      consultarCodigoProducto(codigo);
    }
    
  }

  const presionaEnterPaBuscar = (e)=>{
    if (e.key === `Enter`) consultarCodigoProducto(inputCodigo.current.value);  
  }


  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12} >
        <Datos />
      </Grid>
      <Grid item xs={12} sm={12} >
      <TextFieldCustom
        inputRef={inputCodigo}
        onKeyPress={presionaEnterPaBuscar}
        autoComplete="off"
        autoFocus
        name="codigo_producto"
        label="Código de Producto"
        placeholder="Ctrl + b"
        helperText={lang.ingrese_codigo_pulse_enter}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={()=>{}}>
                <Icon>search</Icon>
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
            
            </InputAdornment>
          ),
    }} />
      </Grid>
      <Grid item xs={12} sm={12} >
      <TextFieldCustom
          onKeyPress={()=>{}}
          inputRef={inputCantidad}
          type="number"
          fullWidth
          name="cantidad"
          label={lang.cantidad}
          defaultValue="1"
        />
      </Grid>
      <Grid item xs={12} sm={12} >
        <ButtonCustom variant="contained" onClick={agregar} fullWidth>{lang.agregar} </ButtonCustom>
      </Grid>
      <Grid item xs={12} sm={12} >
        <Botones />
      </Grid>
    </Grid>
  )
}

export default Inputs