import { Button, Grid, LinearProgress, TextField } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { useWeb } from "./WebProvider"


const DatosWeb = () => {
  const {lang,datos} = useWeb()



  const formInitial = {
    site_name:'',
    site_title:'',
    site_description:'',
    logo_url:''
  }
  const [loading,setLoading] = useState(true)
  const [form,setForm] = useState(formInitial)
  
  const onChange = e=>{
    const {value,name} = e.target
    setForm({...form,[name]:value})
  }

  const setDataForm = useCallback(async()=>{
    setForm({site_name:datos.site_name,site_description:datos.site_description,site_title:datos.site_title,logo_url:datos.logo_url})
  },[datos])

  const submit = e=>{
    e.preventDefault();
    console.log(form);
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
        <TextField fullWidth autoComplete="off" autoFocus value={form.site_name} name='site_name' onChange={onChange} label={lang.site_name}  />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth autoComplete="off" value={form.site_title} name='site_title' onChange={onChange} label={lang.site_title}  />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth autoComplete="off" value={form.site_description} name='site_description' onChange={onChange} label={lang.site_description}  />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth autoComplete="off" disabled value={form.logo_url} name='logo_url' onChange={onChange} label={lang.logo_url}  />
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" variant="outlined" size="large">{lang.guardar}</Button>
      </Grid>
    </Grid>
    </form>
  )
}

export default DatosWeb
