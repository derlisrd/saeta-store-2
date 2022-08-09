import { Icon, IconButton, InputAdornment } from '@mui/material'
import React from 'react'
import TextFieldCustom from '../../../Components/MuiCustom/TextFieldCustom'
import { useCompras } from '../ComprasProvider'

const InputCodigoProducto = () => {
  const {lang} = useCompras()

  return (
    <TextFieldCustom 
    onKeyPress={()=>{}}
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
  )
}

export default InputCodigoProducto
