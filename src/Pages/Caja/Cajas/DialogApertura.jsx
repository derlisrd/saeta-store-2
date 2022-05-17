import { Alert, AlertTitle, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputAdornment, LinearProgress, TextField} from '@mui/material';
import React,{useEffect,useCallback} from 'react'
import { useCajas } from './CajasProvider';
import NumberFormatCustom from "../../../Components/thirty/NumberFormatCustom";

const DialogApertura = () => {

    const {dialogs,setDialogs,formAbrir, setFormAbrir, Funciones,aperturaCaja,errors,setErrors,cargas,dialogQuery, lista,dialogID} = useCajas();


    const onChange = (e) => {
        const { value, name } = e.target;
        setFormAbrir({ ...formAbrir, [name]: value });
      };
    

    

    const verificar = ()=>{
        const f = {...formAbrir}
        delete f.nombre_caja;
        delete f.nombre_user;
        delete f.nombre_moneda;
        delete f.abreviatura_moneda;
        f.ult_mov_caja = Funciones.getFechaHorarioString();
        f.estado_caja="1";
        f.fecha_apertura = Funciones.getFechaHorarioString()
        if(parseFloat(f.monto_inicial)<0){
            setErrors({...errors,abrir:true,abrirMensaje:"El monto inicial no puede ser negativo"});
            return false;
          }
        setErrors({...errors,abrir:false,abrirMensaje:""});
        aperturaCaja(f);
    }

    const cerrar = ()=>{ setDialogs({...dialogs,abrir:false});  }


    const getDatas = useCallback(()=>{
      if(dialogQuery==='open'){
        let listaCajas = [...lista];
        let index = listaCajas.findIndex(e=> e.id_caja === dialogID);
        if(listaCajas[index]){
          let f = listaCajas[index];
          f.monto_inicial = f.monto_caja; 
          setFormAbrir(f);
        }
      }
    },[dialogQuery,lista,dialogID,setFormAbrir]);


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
          <DialogTitle>Hacer apertura</DialogTitle>
          <DialogContent dividers>
            {
              cargas.lista ? <CircularProgress /> :
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
                    NOMBRE: <AlertTitle>{formAbrir?.nombre_caja}</AlertTitle>
                </Alert>
              </Grid>
              <Grid item xs={12}>
                <Alert severity="info" icon={false}>
                    Monto de último cierre valor en efectivo : <AlertTitle>{Funciones.numberSeparator(formAbrir?.monto_cierre)} {formAbrir?.nombre_moneda}</AlertTitle>
                </Alert>
              </Grid>
           
                <Grid item xs={12}>
                  <Alert severity="info" icon={false}>
                    PRESIONE EN ABRIR PARA PROCEDER
                  </Alert>
                </Grid>
              
              <Grid item xs={12}>
              <TextField
              fullWidth
              autoFocus
              name="monto_inicial"
              value={formAbrir?.monto_inicial}
              onChange={onChange}
              label="Monto inicial en caja"
              InputProps={{
                inputComponent: NumberFormatCustom,
                inputProps: { min: 0 },
                startAdornment: (
                    <InputAdornment position="start">
                      {formAbrir?.abreviatura_moneda}
                    </InputAdornment>
                  ),
              }}
              helperText="Ingrese el monto actual existente en caja"
            />
              </Grid>
              
            </Grid>
            }
            
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={verificar}>Abrir caja</Button>
            <Button variant="outlined" onClick={cerrar}>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      );
}

export default DialogApertura
