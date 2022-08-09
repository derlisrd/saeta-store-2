import React from 'react'
import TextFieldCustom from '../../../Components/MuiCustom/TextFieldCustom'
import { useCompras } from '../ComprasProvider'

const InputCantidad = () => {

  const {lang,inputCantidad} = useCompras()

  return (

        <TextFieldCustom
          onKeyPress={()=>{}}
          inputRef={inputCantidad}
          type="number"
          name="cantidad"
          label={lang.cantidad}
          defaultValue="1"
        />
        )
}

export default InputCantidad
