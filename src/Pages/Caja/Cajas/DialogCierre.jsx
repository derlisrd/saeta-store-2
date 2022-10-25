import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, LinearProgress, TextField, Typography } from '@mui/material'
import React, { Fragment, useCallback, useEffect,useState } from 'react'
import { APICALLER } from '../../../Services/api';
import { useCajas } from './CajasProvider';
import NumberFormatCustom from "../../../Components/thirty/NumberFormatCustom";

const DialogCierre = () => {
    const {dialogs,setDialogs,lang,datosCajaCierre,funciones,setValoresCierre} = useCajas();
    const [loading,setLoading] = useState(true)
    const [inputsMonedas,setInputMonedas] = useState([])
    const cerrar = ()=>{ setDialogs({...dialogs,cierre:false});}


    const confirmarCierre = ()=>{
        setValoresCierre(inputsMonedas);
        //console.log(inputsMonedas)
        setDialogs({ ...dialogs, cierre: false, resumenfinal: true });
    }

    const change = (elem,index) =>{
        let newinputmonedas = [...inputsMonedas]
        const {value} = elem.target
        newinputmonedas[index].cantidad = value;
        setInputMonedas(newinputmonedas);
    }
    const changeCheck = (e,id)=>{
        let newinputsmonedas = [...inputsMonedas];
        let index = inputsMonedas.findIndex(e=> e.id = id)
        newinputsmonedas[index].cerrar_no_efectivo = e.target.checked;
        setInputMonedas(newinputsmonedas)
    }
    

const getLista = useCallback(async() => {
    if(dialogs.cierre){
        setLoading(true)
        let id = datosCajaCierre.id_caja;
        let res = await Promise.all([
            APICALLER.get({table:"cajas_monedas",include:"monedas",on:"id_moneda_caja_moneda,id_moneda",where:`id_caja_moneda,=,${id}`,
            fields:`abreviatura_moneda,nombre_moneda,monto_no_efectivo,id_caja_moneda,id_cajas_moneda,monto_caja_moneda,id_moneda_caja_moneda,monto_inicial_caja`
        })
            //APICALLER.get({table:"cajas_monedas",include:"monedas",on:"id_moneda_caja_moneda,id_moneda",where:`id_caja_moneda,=,${id}`}),
        ])
        let resp = res[0];
        let newresult = [];
        if(resp.response){

            resp.results.forEach(elem => {
                newresult.push({
                    ...elem,
                    cantidad:0,
                    monto_caja_moneda: parseFloat(elem.monto_caja_moneda),
                    monto_no_efectivo:parseFloat(elem.monto_no_efectivo),
                    monto_inicial_caja:parseFloat(elem.monto_inicial_caja),
                    cerrar_no_efectivo: false,
                    id:elem.id_cajas_moneda
                })    
            });
            setInputMonedas(newresult)
        }
        setLoading(false)
    }
},[datosCajaCierre,dialogs]) 





useEffect(() => {
    const ca = new AbortController(); let isActive = true;
    if (isActive) {getLista();} return () => {isActive = false; ca.abort();};
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
                !loading && 
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
                                Monto inicial: {funciones.numberFormat(e.monto_inicial_caja)} {e.abreviatura_moneda}
                            </Typography>
                            <Typography variant="body1">
                                No efectivo: {funciones.numberFormat(e.monto_no_efectivo)} {e.abreviatura_moneda}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <FormControlLabel control={<Checkbox onChange={(el)=>{changeCheck(el,e.id)}} />} label="Cerrar no efectivo" />
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
