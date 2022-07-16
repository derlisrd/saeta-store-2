import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, TextField, Typography } from '@mui/material'
import React, { Fragment, useCallback, useEffect,useState } from 'react'
import { APICALLER } from '../../../Services/api';
import { useCajas } from './CajasProvider';
import NumberFormatCustom from "../../../Components/thirty/NumberFormatCustom";

const DialogCierre = () => {
    const {dialogs,setDialogs,lang,datosCajaCierre,funciones} = useCajas();
    const [loading,setLoading] = useState(true)
    const [inputsMonedas,setInputMonedas] = useState([])
    const cerrar = ()=>{ setDialogs({...dialogs,cierre:false});}


    const confirmarCierre = ()=>{
        setDialogs({ ...dialogs, cierre: false, arqueoFinal: true });
    }

    const getLista = useCallback(async() => {
    if(dialogs.cierre){
        let id = datosCajaCierre.id_caja;
        let res = await Promise.all([
            APICALLER.get({table:"cajas_monedas",include:"monedas",on:"id_moneda_caja_moneda,id_moneda",where:`id_caja_moneda,=,${id}`})
            //APICALLER.get({table:"cajas_monedas",include:"monedas",on:"id_moneda_caja_moneda,id_moneda",where:`id_caja_moneda,=,${id}`}),
        ])
        let resp = res[0];
        let newresult = [];
        if(resp.response==="ok"){

            resp.results.forEach(elem => {
                newresult.push({
                    ...elem,cantidad:0
                })    
            });
            setInputMonedas(newresult)
        }
        setLoading(false)
    }
  },[datosCajaCierre,dialogs]) 

const change = (elem,index) =>{
    let newinputmonedas = [...inputsMonedas]
    const {value} = elem.target
    newinputmonedas[index].cantidad = value;
    setInputMonedas(newinputmonedas);
}

useEffect(() => {
    const ca = new AbortController(); let isActive = true;
    if (isActive) {getLista();}
    return () => {isActive = false; ca.abort();};
  }, [getLista]);


  return (
    <Dialog fullWidth open={dialogs.cierre} onClose={cerrar}>
        <DialogTitle>
            {lang.cierre_de_caja}
        </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {loading && <LinearProgress />}
            </Grid>

            {
                inputsMonedas.map((e,i)=>(
                    <Fragment key={i}>
                        <Grid item xs={12} sm={4} >
                            <TextField fullWidth autoComplete='off' onChange={(elem)=>{change(elem,i)}} name={e.id_moneda} autoFocus={i===0} helperText={e.nombre_moneda}  
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                    inputProps: { min: 0 },
                                  }} value={e.cantidad}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Typography variant="h6">
                                {funciones.numberFormat(e.cantidad)} {e.abreviatura_moneda}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Typography variant="body1">
                                No efectivo: {funciones.numberFormat(e.monto_no_efectivo)} {e.abreviatura_moneda}
                            </Typography>
                        </Grid>
                    </Fragment>
                ))
            }


        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained"  onClick={confirmarCierre}>{lang.confirmar_cierre}</Button>
        <Button variant="contained" onClick={cerrar}>{lang.cancelar}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogCierre