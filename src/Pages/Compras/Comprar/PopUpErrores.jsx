import { Alert, Snackbar, Stack } from '@mui/material'
import React from 'react'
import { useCompras } from '../ComprasProvider'

const PopUpErrores = () => {
    const {errores,setErrores} = useCompras()
  


    const close = () =>{
        setErrores({...errores,active:false,color:"error",mensaje:"Ingrese"})
    }

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
        open={errores.active}
        onClose={close}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
          <Alert onClose={close} severity={errores.color} sx={{ width: '100%' }}>
            {errores.msj}
          </Alert>
        </Snackbar>
      </Stack>
  )
}

export default PopUpErrores
