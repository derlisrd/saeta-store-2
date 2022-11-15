import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, InputAdornment, LinearProgress, TextField, Zoom } from '@mui/material';
import {useState,useRef} from 'react';
import { useLang } from '../../Contexts/LangProvider';
import { useLogin } from '../../Contexts/LoginProvider';
import { APICALLER } from '../../Services/api';
import { useAgenda } from './AgendaProvider';

function RegistraCliente() {

    const {dialogs,setDialogs} = useAgenda()
    const {lang} = useLang()
    const {userData} = useLogin();
    const {token_user} = userData;
    const ruc_cliente = useRef(null);
    const nombre_cliente = useRef(null);
    const initialForm = {
        ruc_cliente: "",
        nombre_cliente: "",
        direccion_cliente: "",
        telefono_cliente: "",
        email_cliente:""
      };
      const initialErros = {
        ruc_cliente:false,
        nombre_cliente:false,
        ruc_error: "",
        nombre_error:"",
      };
      const [formCliente, setFormCliente] = useState(initialForm);
      const [formError,setFormError] = useState(initialErros)
      const [cargando,setCargando] = useState(false);
    const cerrar = () =>{
        setDialogs({...dialogs,registrarCliente:false});
    }
    const cambiarValor = e => {
        const { name, value } = e.target; setFormCliente({ ...formCliente, [name]: value });
      };

    const VerificarRegistro = async() => {
        setFormError(initialErros)
    
        if(formCliente.ruc_cliente.length<3){
          setFormError({...formError, ruc_cliente:true,ruc_error:"Complete este dato"})
          ruc_cliente.current?.focus();
          return false
        }

        if(formCliente.nombre_cliente.length<4){
          setFormError({...formError, nombre_cliente:true,nombre_error:"El nombre debe tener al menos 5 letras"})
          nombre_cliente.current?.focus();
          return false
        }
    
        let ruc = ruc_cliente.current.value;
        setCargando(true);
        const res = await APICALLER.get({table:"clientes",fields:"id_cliente",where:`ruc_cliente,=,'${ruc}'`});
    
        if(res.found===0){

            const ins = await APICALLER.insert({table:"clientes",data:formCliente,token:token_user})
            if(ins.response){ 
               
              
            cerrar()

            }
        }
        else{
          
          setFormError({...formError, ruc_cliente:true,ruc_error:"Ese cliente ya esta registrado."})
          ruc_cliente.current.focus();
          
        }
        setCargando(false);
      };

    return (
        <form onSubmit={VerificarRegistro}>
        <Dialog  TransitionComponent={Zoom}
          open={dialogs.registrarCliente}
          onClose={cerrar}
          fullWidth
        >
          <DialogTitle>{lang.registrar_cliente}</DialogTitle>
          <DialogContent dividers>
            
              
            <Grid container spacing={2}>
            <Grid item xs={12}>
              {cargando && <LinearProgress /> }
            </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  required
                  inputRef={ruc_cliente}
                  onChange={cambiarValor}
                  label="Nro Documento"
                  autoFocus
                  fullWidth
                  name="ruc_cliente"
                  value={formCliente.ruc_cliente}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon color="disabled">description</Icon>
                      </InputAdornment>
                    ),
                  }}
                  error={formError.ruc_cliente}
                  helperText={formError.ruc_error}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  inputRef={nombre_cliente}
                  autoComplete="off"
                  label="Nombre o nombre de empresa"
                  fullWidth
                  name="nombre_cliente"
                  onChange={cambiarValor}
                  value={formCliente.nombre_cliente}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon color="disabled">person</Icon>
                      </InputAdornment>
                    ),
                  }}
                  error={formError.nombre_cliente}
                  helperText={formError.nombre_error}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Teléfono"
                  fullWidth
                  autoComplete="off"
                  onChange={cambiarValor}
                  name="telefono_cliente"
                  variant="outlined"
                  value={formCliente.telefono_cliente}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon color="disabled">phone</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Dirección"
                  fullWidth
                  autoComplete="off"
                  onChange={cambiarValor}
                  name="direccion_cliente"
                  variant="outlined"
                  value={formCliente.direccion_cliente}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon color="disabled">location_city</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  fullWidth
                  autoComplete="off"
                  onChange={cambiarValor}
                  name="email_cliente"
                  variant="outlined"
                  value={formCliente.email_cliente}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon color="disabled">alternate_email</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            
            
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained" size='large'
              onClick={() => {
                VerificarRegistro();
              }}
              type="submit"
            >
              {lang.registrar}
            </Button>
            <Button
              variant="contained" size='large'
              onClick={cerrar}
            >
              {lang.cancelar}
            </Button>
          </DialogActions>
        </Dialog>
      </form>
      )
}

export default RegistraCliente;