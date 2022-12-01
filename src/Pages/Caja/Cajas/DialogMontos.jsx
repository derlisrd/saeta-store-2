import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress } from '@mui/material'
import {useState,useEffect,useCallback} from 'react'
import { useLang } from '../../../Contexts/LangProvider'
import { APICALLER } from '../../../Services/api'
import { useCajas } from './CajasProvider'

const DialogMontos = () => {
    
    const {dialogs,setDialogs,idCaja,funciones} = useCajas()
    const [loading,setLoading] = useState(true)
    const [lista,setLista] = useState([])
    const {lang} = useLang()
    const cerrar = ()=>{
        setDialogs({...dialogs,montos:false})
    }

    const getDatas = useCallback(async()=>{
        if(dialogs.montos){
            setLoading(true)
            let res = await APICALLER.get({
                table:"cajas_monedas",
                include:"monedas",
                on:"id_moneda_caja_moneda,id_moneda",
                fields:"nombre_moneda,monto_caja_moneda,monto_no_efectivo",
                where:`id_caja_moneda,=,${idCaja}`
            })
            res.response ? setLista(res.results) : console.log(res);
            setLoading(false)
        }
    },[dialogs.montos,idCaja])

    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getDatas();}
        return () => {isActive = false; ca.abort();};
      }, [getDatas]);

  return (
    <Dialog fullWidth open={dialogs.montos} onClose={cerrar}>
        <DialogTitle>
            {lang.montos}
        </DialogTitle>
        <DialogContent dividers>
            <Grid container spacing={2}>
                    {
                        loading ? 
                <Grid item xs={12}>
                        <LinearProgress />
                </Grid>
                    :
                    lista.map((e,i)=>(
                    <Grid item xs={6} key={i}>
                        <Alert icon={false} variant="outlined">
                        <AlertTitle>{e.nombre_moneda}</AlertTitle>
                        <b>{lang.monto}:</b> {funciones.numberFormat(e.monto_caja_moneda)}
                        <br/>
                        <b>{lang.sin_efectivo}:</b> {funciones.numberFormat(e.monto_no_efectivo)}
                      </Alert>
                    </Grid>
                    ))
                }
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant='contained' onClick={cerrar}>
                {lang.cerrar}
            </Button>
        </DialogActions>
    </Dialog>
  )
}

export default DialogMontos
