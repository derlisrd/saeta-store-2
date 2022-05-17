import { Box, Grid, TextField,Button,FormControlLabel,Checkbox,Icon,InputAdornment,Alert, IconButton } from "@mui/material";
import { useState,useEffect,useCallback,useRef } from "react";
import { useLogin } from "../../Contexts/LoginProvider";
import { useNavigate } from "react-router-dom";
import { useGlobalStyles } from "../../Styles/GlobalStyles";
import LoadingBackDrop from "../../Components/UI/LoadingBackDrop";


const LoginForm = () => {
  const navigate = useNavigate()
  const styles = useGlobalStyles();
  const { logIn ,load,userData} = useLogin();
  const {login} = userData;
  const [recordar,setRecordar]= useState(false);
  const inputPasswordRef = useRef(null)
  const [typeInput,setTypeInput] = useState(true);
  const changeInputType = ()=> {setTypeInput(!typeInput);inputPasswordRef.current.focus();}
  const initialForm = {username_user: "", password_user: ""}
  const [form,setForm] = useState(initialForm);

  const change = e=>{
      const {value,name} = e.target;
      setForm({...form,[name]:value});
  }

  const enviar = e => { e.preventDefault(); logIn(form,recordar);}

  const verificar = useCallback(()=>{
    if(login) navigate("/dashboard")
  },[login,navigate])


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

  return (

    <div className={styles.centerDivLogin}>
    <form onSubmit={enviar} >
      <Box boxShadow={3} className={styles.formularioLogin} borderRadius={5} maxWidth={360}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <h2>Ingresar</h2>
        </Grid>
        <Grid item xs={12}>
            {load.active && <Alert variant="outlined" icon={false} severity="error">
                {load.msj}
            </Alert>}
        </Grid>
          <Grid item xs={12}>
            <TextField disabled={load.login} fullWidth InputProps={{  startAdornment: (
                    <InputAdornment position="start">
                      <Icon color="disabled">perm_identity</Icon>
                    </InputAdornment>
                  ),}}  autoFocus required name="username_user" label="Usuario" value={form.username_user} onChange={change}  />
          </Grid>
          <Grid item xs={12}>
            <TextField inputRef={inputPasswordRef} fullWidth disabled={load.login} required type={typeInput? "password" : "text"} label="Contraseña" name="password_user" value={form.password_user} onChange={change}  
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon color="disabled">lock</Icon>
                  </InputAdornment>
                ),endAdornment:(
                  <InputAdornment position="end">
                    <IconButton onClick={changeInputType}><Icon>{typeInput ? `visibility_off` : `visibility`}</Icon></IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
          <FormControlLabel disabled={load.login} control={<Checkbox checked={recordar} onChange={e=> setRecordar(e.target.checked)} />} label="Recordarme" />
          </Grid>
        <Grid item xs={12}>
            <Button size="large" disabled={load.login} fullWidth type="submit" variant="contained" color="primary" >
                { load.login ? "Cargando..." : "Ingresar"}
            </Button>
        </Grid>
        </Grid>
      </Box>
    </form>
    </div>
  );
};

export default LoginForm;
