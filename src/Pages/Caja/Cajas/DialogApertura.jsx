import { Alert, AlertTitle, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputAdornment, LinearProgress, TextField} from '@mui/material';
import React,{useEffect,useCallback,useState, Fragment} from 'react'
import { useCajas } from './CajasProvider';
import NumberFormatCustom from "../../../Components/thirty/NumberFormatCustom";
import { APICALLER } from '../../../Services/api';

const DialogApertura = () => {

    const {dialogs,setDialogs,formAbrir, setFormAbrir, funciones,aperturaCaja,errors,setErrors,cargas,dialogQuery,lang, lista,dialogID} = useCajas();

    const [loading,setLoading] = useState(true)
    const [inputsMonedas,setInputsMonedas] = useState([])
    
    
    const change = (e,i) => {
        const { value } = e.target;
        let array = [...inputsMonedas];
        array[i].cantidad = parseFloat(value)
        setInputsMonedas(array);
      };
    



    const verificar = ()=>{
        setErrors({...errors,abrir:false,abrirMensaje:""});
        const f = {...formAbrir}
        aperturaCaja(f,inputsMonedas);
    }

    const cerrar = ()=>{ setDialogs({...dialogs,abrir:false});  }


    const getDatas = useCallback(async()=>{
      setLoading(false)
      if(dialogs.abrir){
        
        let id_caja;
        if(dialogQuery==='open'){
          let listaCajas = [...lista];
          let index = listaCajas.findIndex(e=> e.id_caja === dialogID);
          if(index>=0){
            let f = listaCajas[index];
            setFormAbrir(f);
            id_caja = f.id_caja;
          }
        } else { id_caja = formAbrir.id_caja }
        
        if(id_caja) {
          let get = await APICALLER.get({table:"cajas_monedas",
          fields:"monto_cierre_caja,nombre_moneda,abreviatura_moneda,id_cajas_moneda",
          include:"monedas",on:"id_moneda,id_moneda_caja_moneda",where:`id_caja_moneda,=,${id_caja}`}
          )
          let newresult = [];
          if(get.response) {
            get.results.forEach(e=>{
              newresult.push({...e,cantidad:e.monto_cierre_caja})
            })
            setInputsMonedas(newresult)
          } else{ console.log(get)}
        }
      }
      setLoading(false)
    },[dialogQuery,lista,dialogID,setFormAbrir,dialogs,formAbrir]);


    useEffect(() => {
      const ca = new AbortController(); let isActive = true;
      if (isActive) {
        getDatas();
      }
      return () => {
        isActive = false; ca.abort();
      };
    }, [getDatas]);

    return (
        <Dialog open={dialogs.abrir} onClose={cerrar} fullWidth>
          <DialogTitle>{lang.hacer_apertura}</DialogTitle>
          <DialogContent dividers>
            {
              loading ? <CircularProgress /> :
              <Grid container spacing={2}>
            <Grid item xs={12}>
              {
                errors.abrir && <Alert icon={false} severity="error">{errors.abrirMensaje}</Alert>
              }
              {
                cargas.abrir && <LinearProgress />
              }
              </Grid>
              
                <Grid item xs={12}>
                <Alert severity="warning" icon={false}>
                    {lang.nombre}: <AlertTitle>{formAbrir?.nombre_caja}</AlertTitle>
                </Alert>
              </Grid>
              
              
              {
                inputsMonedas.map((elem,index)=>(
                  <Fragment key={index}>
                  <Grid item xs={12}>
                    <Alert severity="info" variant='outlined' icon={false}>
                        {lang.long_ultimo_monto} : 
                        <AlertTitle>{funciones.numberSeparator(elem.monto_cierre_caja)} {elem.abreviatura_moneda} </AlertTitle>
                    </Alert>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth autoFocus={index===0} autoComplete="off" value={elem.cantidad}
                      onChange={(elem)=>{change(elem,index)}} name={elem.id_cajas_moneda}
                      label={elem.nombre_moneda}
                      InputProps={{
                        inputComponent: NumberFormatCustom,
                        inputProps: { min: 0 },
                        startAdornment: (
                            <InputAdornment position="start">
                              {formAbrir?.abreviatura_moneda}
                            </InputAdornment>
                          ),
                      }}
                    />
                </Grid>
              </Fragment>
                ))
              }
              
            </Grid>
            }
            
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={verificar}>{lang.abrir_caja}</Button>
            <Button variant="contained" onClick={cerrar}>{lang.cancelar}</Button>
          </DialogActions>
        </Dialog>
      );
}

export default DialogApertura
