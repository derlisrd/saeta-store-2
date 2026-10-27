import { Button, Grid, LinearProgress, TextField } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { useLogin } from "../../Contexts/LoginProvider"
import { APICALLER } from "../../Services/api"
import { useWeb } from "./WebProvider"


const DatosColor = () => {
  const {lang,datos,setearDatos} = useWeb()
  const {userData} = useLogin()
  const {token_user} = userData

  const formInitial = {
    color_primary:""
  }
  const [loading,setLoading] = useState(false)
  const [form,setForm] = useState(formInitial)
  
  const onChange = e=>{
    const {value,name} = e.target
    setForm({...form,[name]:value})
  }

  const setDataForm = useCallback(async()=>{
    setForm({
      color_primary:datos.color_primary
    })
  },[datos])

  const submit = async(e)=>{
    e.preventDefault();
    setLoading(true)
    let res = await Promise.all([
      APICALLER.update({table:'options',data:{'option_value':form.color_primary},token:token_user,id:10})
    ]
    )
    if(res[0].response){
      let nuevos = {...datos}
      nuevos.color_primary = form.color_primary
      setearDatos(nuevos)
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
      <Grid item xs={12} md={6}>
        <TextField fullWidth autoComplete="off" type="color"  value={form.color_primary} name='color_primary' onChange={onChange} helperText="Elije el color principal" label={lang.color}  
        />
      </Grid>
      <Grid item xs={12} md={6}>
        
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" variant="outlined" size="large">{lang.guardar}</Button>
      </Grid>
    </Grid>
    </form>
  )
}

export default DatosColor
