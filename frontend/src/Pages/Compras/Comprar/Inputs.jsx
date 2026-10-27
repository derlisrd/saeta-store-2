import {  CircularProgress, Grid, Icon, IconButton, InputAdornment } from '@mui/material'
import React from 'react'
import ButtonCustom from '../../../Components/MuiCustom/ButtonCustom'
import TextFieldCustom from '../../../Components/MuiCustom/TextFieldCustom'
import { useCompras } from '../ComprasProvider'
import Botones from './Botones'
import Datos from './Datos'




const Inputs = () => {
  const {lang,inputCodigo,consultarSiExiste,cargas,setErrores,setDialogs,dialogs} = useCompras()

  
  const agregar = () => {
    let codigo = inputCodigo.current.value
    if(codigo && codigo!==""){
      consultarSiExiste(codigo);
    }
    else{
      setErrores({active:true,msj:"Ingrese el codigo",color:"error",id_error:2})
      inputCodigo.current.focus()
    }
    
  }

  const presionaEnterPaBuscar = (e)=>{ 
    let codigo = inputCodigo.current.value;
    if (e.key === `Enter` ){
      if(codigo && codigo!==""){
        consultarSiExiste(codigo);
      }
      else{
        setErrores({active:true,msj:"Ingrese el codigo",color:"error",id_error:2})
      }   
    }
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
        label={lang.codigo_del_producto}
        placeholder="Ctrl + b"
        helperText={lang.ingrese_codigo_pulse_enter}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={()=>{setDialogs({...dialogs,buscarProducto:true})}}>
                <Icon>search</Icon>
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {cargas.codigo && <CircularProgress size={24} />}
            </InputAdornment>
          ),
    }} />
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