import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, Icon, IconButton, InputAdornment, InputLabel, LinearProgress, MenuItem, Select, TextField } from '@mui/material'
import React,{useRef,useState} from 'react'
import { APICALLER } from '../../../Services/api';
import NumberFormatCustom from '../../../Components/thirty/NumberFormatCustom';
import { useProductosApartados } from './ProductosApartadosProvider'

const DialogApartar = () => {
  const {dialogs,setDialogs,apartar,setDatosCliente,datosCliente,setErrores,errores,listaDepositos} = useProductosApartados();
  
  const [cargando,setCargando] = useState(false)
  const cerrar = ()=> { setDialogs({...dialogs,apartar:false}); setErrores({error:false,mensaje:"",color:"success"})}

  const cantidadRef = useRef(null);
  const codigoRef = useRef(null);
  const DocRef = useRef(null);
  const [idDeposito,setIdDeposito] = useState("");

  const consultarCliente = async()=>{
    let doc = DocRef.current.value;
    if(doc===""){
      setErrores({...errores,error:true,color:"error",mensaje:"Ingrese el nro de documento."});
      DocRef.current.focus();
      return false;
    }
    setErrores({...errores,error:false});
    setCargando(true);
    let res = await APICALLER.get({table:"clientes",where:`ruc_cliente,=,'${doc}'`});
      if(res.response){
        if(res.found>0){
          setDatosCliente(res.results[0]);
          
        }
        else{
          setErrores({...errores,error:true,color:"error",mensaje:"No hay registros de ese documento.",id:"cliente"});
          DocRef.current.value="";
          DocRef.current.focus();
        }
      }
      else{
        console.log(res)
      }
    setCargando(false);
  }

  const enviar = ()=>{
    let cant = cantidadRef.current.value;

    let codigo = codigoRef.current.value;
    if(cant===""){
      setErrores({...errores,error:true,color:"error",mensaje:"Ingrese una cantidad valida",id:"cantidad"});
      cantidadRef.current.focus();
      return false;
    }
    if(codigo===""){
      setErrores({...errores,error:true,color:"error",mensaje:"Ingrese un codigo valido",id:"codigo"});
      codigoRef.current.focus();
      return false;
    }
    if(idDeposito===""){
      setErrores({...errores,error:true,color:"error",mensaje:"Seleccione depósito",id:"deposito"});
      return false;
    }
    apartar(codigo,cant,idDeposito);
  }

  return (
    <Dialog fullWidth open={dialogs.apartar} onClose={cerrar}>
      <DialogTitle>Apartar producto</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            {(cargando.apartar || cargando) && <LinearProgress />}
          </Grid>
          <Grid item xs={12} sm={6}>
            {errores.error && (
              <Alert severity={errores.color}>{errores.mensaje}</Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            {datosCliente.id_cliente!=="" && (
              <Alert icon={false} severity='info'> {datosCliente.nombre_cliente} - {datosCliente.ruc_cliente}</Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {
                      <IconButton
                        onClick={() =>setDialogs({ ...dialogs, buscarCliente: true })}
                      >
                        <Icon>search</Icon>
                      </IconButton>
                    }
                  </InputAdornment>
                ),
              }}
              inputRef={DocRef}
              fullWidth
              autoFocus
              label="Doc de cliente"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="outlined" onClick={consultarCliente} size="large">Consultar</Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              inputRef={codigoRef} error={errores.id==="notfound"}
              fullWidth label="Código de producto"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {
                      <IconButton onClick={() =>setDialogs({ ...dialogs, buscarProducto: true })}>
                        <Icon>search</Icon>
                      </IconButton>
                    }
                  </InputAdornment>
                ),
              }}
              
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              inputRef={cantidadRef} fullWidth label="Cantidad"
              error={errores.id==="cantidad"}
              InputProps={{
                inputComponent: NumberFormatCustom,
                inputProps: { min: 0 },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel variant="outlined">Depósito</InputLabel>
              <Select
                required error={errores.id==='deposito'}
                name="id_deposito"
                value={idDeposito}
                onChange={(e)=>{setIdDeposito(e.target.value)}}
                variant="outlined"
              >
                <MenuItem disabled value=''>Seleccione depósito</MenuItem>
                {listaDepositos.map((d) => (
                  <MenuItem key={d.id_deposito} value={d.id_deposito}>
                    {d.nombre_deposito}
                  </MenuItem>
                ))}
          </Select>      
        </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => {enviar();}}
        >
          Apartar
        </Button>
        <Button variant="outlined" onClick={cerrar}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogApartar
