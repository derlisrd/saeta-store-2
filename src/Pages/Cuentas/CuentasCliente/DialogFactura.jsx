import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material'
import { useCuentasCliente } from './CuentasClienteProvider'
import { useCallback, useEffect, useState } from 'react'


const DialogFactura = () => {

    const {dialogs,setDialogs,formFactura} = useCuentasCliente()
    const [form,setForm] = useState({
        factura:''
    })
    

    const close = ()=>{
        setDialogs({...dialogs,factura:false})
    }

    const getFactura = useCallback(()=>{
        if(dialogs.factura){
            setForm(formFactura)
        }
    },[formFactura,dialogs])

    useEffect(() => {
        let isActive = true;
        const ca = new AbortController();
        if(isActive){getFactura();}
        return ()=> {isActive = false;ca.abort();}
      }, [getFactura]);

  return (
    <Dialog open={dialogs.factura} onClose={close} >
      <DialogTitle> {form.factura} </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
            <Grid item >

            </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogFactura
