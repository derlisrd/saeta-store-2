import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material"
import { useState,useEffect,useCallback } from "react"
import LoadingLinear from "../../Components/UI/LoadingLinear"
import { useLang } from "../../Contexts/LangProvider"
import { useLogin } from "../../Contexts/LoginProvider"

const Profile = () => {

  const {userData} = useLogin()
  const{lang} = useLang()
  const [pass,setPass] = useState({
    actual:"",
    nuevo:"",
    nuevo2: ""
  })
  const [profile,setProfile] = useState({
    username_user:"",
    email_user:"",
    nombre_user: ""
  })

  const [isLoading,setIsLoading] = useState(true)

  const changePassword = e =>{
    const {name,value} = e.target
    setPass({...pass, [name]:value})  
  }

  const getData = useCallback(async () => { 
    setIsLoading(false)
    let u = {...userData}
    setProfile({
      username_user: u.username_user,
      email_user: u.email_user,
      nombre_user: u.nombre_user
    })
  },[userData])



  const cambiarPass = async()=>{
    let f = {...pass}
    if(f.nuevo !== f.nuevo2){
      return false
    }

    


  }




  useEffect(() => {
    let isActive = true; const ca = new AbortController();
    if (isActive) {
      getData();
    }
    return () => { isActive = false; ca.abort(); };
  }, [getData]);


  if(isLoading){
    return <LoadingLinear />
  }

  return (
    <Container>
      <Typography variant="h6"> {lang.perfil} </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box p={2} boxShadow={4} borderRadius={2}>
          <Typography variant="h6" sx={{ mb:3 }}> {lang.datos} </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField size="large" variant="standard" value={profile.nombre_user} label="Nombre" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField size="large" variant="standard" value={profile.email_user} label="Email" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" size="large" >{lang.guardar} </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box p={2} boxShadow={4} borderRadius={2}>
          <Typography variant="h6" sx={{ mb:3 }}> {lang.clave} </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField size="large" variant="standard" name="actual" value={pass.actual} onChange={changePassword}  label={lang.clave_actual} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField size="large" variant="standard" name="nuevo" value={pass.nuevo} onChange={changePassword} label={lang.clave_nueva} fullWidth helperText={lang.almenos8} />
              </Grid>
              <Grid item xs={12}>
                <TextField size="large" variant="standard" name="nuevo2" value={pass.nuevo2} onChange={changePassword} label={lang.repetir_clave_nueva} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" size="large" onClick={cambiarPass}  >{lang.guardar} </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

      </Grid>
    </Container>
  )
}

export default Profile
