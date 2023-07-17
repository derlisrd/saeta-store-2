import { Box, Grid, TextField,FormControlLabel,InputAdornment,Alert, IconButton, Stack, Typography, Switch, Button, Zoom,Icon} from "@mui/material";
import { useState,useEffect,useCallback } from "react";
import { useLogin } from "../../Contexts/LoginProvider";
import { useNavigate } from "react-router-dom";
import LoadingBackDrop from "../../Components/UI/LoadingBackDrop";
import { useLang } from "../../Contexts/LangProvider";
import {env} from '../../App/Config/config'
import { useConfiguracion } from "../../Contexts/ConfiguracionProvider";
import ConfigIniciales from "../ConfigIniciales";
import { LoadingButton } from "@mui/lab";

const LoginForm = () => {
  const {lang}= useLang();
  const {configurado} = useConfiguracion()
  const navigate = useNavigate()

  const { logIn ,load,userData} = useLogin();
  const {login} = userData;
  const [recordar,setRecordar] = useState(false);

  const [typeInput,setTypeInput] = useState(true);
  const changeInputType = ()=> {
    setTypeInput(!typeInput)
    let input = document.getElementById('password_user')
    let tipo = (input.type);
    input.type = tipo==='text'? 'password' : 'text'
    input.focus();
    var val = input.value;
    input.value = '';
    input.value = val;
  }


  

    const trySignIn = e=>{
      e.preventDefault();
      const data = new FormData(e.target)
      logIn(Object.fromEntries(data.entries()),recordar);
    }

  const verificar = useCallback(()=>{
    if(login){
      navigate(env.BASEURL+"/dashboard")
    }
    if(load.code===404){
      document.getElementById('username_user').focus();
    } 
    if(load.code===401){
      document.getElementById('password_user').focus();
    } 
    
  },[login,navigate,load])


  useEffect(() => {
    const ca = new AbortController(); let isActive = true;
    if (isActive) {
      verificar();
    }
    return () => {isActive = false;ca.abort();};
  }, [verificar]);

  if(login){
    return <LoadingBackDrop />
  }

  if(configurado === 0){
    return <ConfigIniciales />
  }

  return (


    <form onSubmit={trySignIn}>
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box maxWidth={360} borderRadius={5}  p={5}
        boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        sx={{ backdropFilter:'blur(6px) saturate(180%)',bgcolor:'background.paper',border:'1.5px solid rgba(209, 213, 219, 0.3)' }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack justifyContent="center" alignItems="center" spacing={2}>
                <Icon color="primary" >rocket_launch</Icon>
              <Typography variant="h5">{lang.ingresar}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
           {load.active &&  <Zoom in={load.active}>
              <Alert severity="error" >{load.msj}</Alert>
            </Zoom>
            }
          </Grid>
          <Grid item xs={12}>
            <TextField required error={load.code===404} InputProps={{  startAdornment: (
                    <InputAdornment position="start">
                      <Icon>person</Icon>
                    </InputAdornment>
                  ),}}  disabled={load.login} name="username_user" id="username_user" autoFocus label={lang.usuario} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField required error={load.code===401} disabled={load.login} name="password_user" id="password_user" type="password" label={lang.contrasena}  fullWidth 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon>lock</Icon>
                  </InputAdornment>
                ),endAdornment:(
                  <InputAdornment position="end">
                    <IconButton onClick={changeInputType}><Icon>{typeInput ? `visibility` : `visibility_off`}</Icon></IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {
              load.login ?
              <LoadingButton
              loading fullWidth size="large"
              loadingPosition="start"
              variant="contained"
            >
              Cargando...
            </LoadingButton> :
            
            <Button size="large" type="submit" disabled={load.login} fullWidth variant="contained">
              Entrar
            </Button>
            }
          </Grid>
          <Grid item xs={12}>
          <FormControlLabel disabled={load.login} control={<Switch checked={recordar} onChange={e=> setRecordar(e.target.checked)} />} label={lang.recordar} />
          </Grid>
        </Grid>
      </Box>
    </Box>
    </form>

  );
};

export default LoginForm;
