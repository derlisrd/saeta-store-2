import { Button, Grid, LinearProgress, TextField } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { useLogin } from "../../Contexts/LoginProvider"
import { APICALLER } from "../../Services/api"
import { useWeb } from "./WebProvider"


const DatosRedes = () => {
  const {lang,datos,setearDatos} = useWeb()
  const {userData} = useLogin()
  const {token_user} = userData

  const formInitial = {
    facebook:'',
    instagram:''
  }
  const [loading,setLoading] = useState(false)
  const [form,setForm] = useState(formInitial)
  
  const onChange = e=>{
    const {value,name} = e.target
    setForm({...form,[name]:value})
  }

  const setDataForm = useCallback(async()=>{
    setForm({
      facebook:datos.facebook,
      instagram:datos.instagram
    })
  },[datos])

  const submit = async(e)=>{
    e.preventDefault();
    setLoading(true)
    let res = await Promise.all([
      APICALLER.update({table:'options',data:{'option_value':form.instagram},token:token_user,id:7}),
      APICALLER.update({table:'options',data:{'option_value':form.facebook},token:token_user,id:8}),
    ]
    )
    if(res[0].response){
      let datosnuevos = {...datos}
      datosnuevos.instagram = form.instagram;
      datosnuevos.facebook = form.facebook;
      setearDatos(datosnuevos)
    }else{
      console.log(res)
    }
    setLoading(false)
  }

  useEffect(()=>{
    let isActive = true;
        const ca = new AbortController()
        if(isActive){setDataForm();}
        return () => {isActive = false; ca.abort(); };
  },[setDataForm])


  return (
    <form onSubmit={submit}>
    <Grid container spacing={2}>
    <Grid item xs={12}>
      {loading && <LinearProgress />}
    </Grid>
      <Grid item xs={12}>
        <TextField fullWidth autoComplete="off"  value={form.facebook} name='facebook' onChange={onChange} helperText="Ej: nombreusuario" label={lang.facebook}  
        />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth autoComplete="off" value={form.instagram} name='instagram' onChange={onChange} helperText="Ej: nombreusuario" label={lang.instagram}  />
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" variant="outlined" size="large">{lang.guardar}</Button>
      </Grid>
    </Grid>
    </form>
  )
}

export default DatosRedes
