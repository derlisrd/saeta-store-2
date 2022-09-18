import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress } from '@mui/material'
import {useState,useEffect,useCallback} from 'react'
import { useLang } from '../../../Contexts/LangProvider'
import { APICALLER } from '../../../Services/api'
import { useCajas } from './CajasProvider'

const DialogMontos = () => {
    
    const {dialogs,setDialogs,idCaja} = useCajas()
    const [loading,setLoading] = useState(true)
    const [lista,setLista] = useState([])
    const {lang} = useLang()
    const cerrar = ()=>{
        setDialogs({...dialogs,montos:false})
    }

    const getDatas = useCallback(async()=>{
        if(dialogs.montos){
            let res = await APICALLER.get({
                table:"cajas_monedas",
                include:"monedas",
                on:"id_moneda_caja_moneda,id_moneda",
                fields:"nombre_moneda,monto_caja_moneda",
                where:`id_caja_moneda,=,${idCaja}`
            })
            res.response==="ok" ? setLista(res.results) : console.log(res);
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
            <Grid container>
                <Grid item xs={12}>
                    {
                        loading && <LinearProgress />
                    }
                </Grid>
                {
                    lista.map((e,i)=>(
                    <Grid item xs={6} key={i}>                    
                      <b>{lang.monto}:</b> {e.monto_caja_moneda} {e.nombre_moneda}
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
