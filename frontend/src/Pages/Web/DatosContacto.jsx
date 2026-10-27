import { Button, Grid, LinearProgress, TextField } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { useLogin } from "../../Contexts/LoginProvider"
import { APICALLER } from "../../Services/api"
import { useWeb } from "./WebProvider"


const DatosContacto = () => {
  const {lang,datos,setearDatos} = useWeb()
  const {userData} = useLogin()
  const {token_user} = userData

  const formInitial = {
    tel:'',
    whatsapp:'',
    email:'',
    direccion:''
  }
  const [loading,setLoading] = useState(false)
  const [form,setForm] = useState(formInitial)
  
  const onChange = e=>{
    const {value,name} = e.target
    setForm({...form,[name]:value})
  }

  const setDataForm = useCallback(async()=>{
    setForm({
        tel:datos.tel,
        whatsapp:datos.whatsapp,
        email:datos.email,
        direccion:datos.direccion
    })
  },[datos])

  const submit = async(e)=>{
    e.preventDefault();
    setLoading(true)
    let res = await Promise.all([
      APICALLER.update({table:'options',data:{'option_value':form.tel},token:token_user,id:5}),
      APICALLER.update({table:'options',data:{'option_value':form.whatsapp},token:token_user,id:6}),
      APICALLER.update({table:'options',data:{'option_value':form.email},token:token_user,id:4}),
      APICALLER.update({table:'options',data:{'option_value':form.direccion},token:token_user,id:13}),
    ]
    )
    if(res[0].response){
      let nuevos = {...datos}
      nuevos.tel = form.tel;
      nuevos.whatsapp = form.whatsapp;
      nuevos.email = form.email;
      nuevos.direccion = form.direccion;
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
      <Grid item xs={12} md={4}>
        <TextField fullWidth autoComplete="off" autoFocus value={form.tel} name='tel' onChange={onChange} label={lang.tel}  />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField fullWidth autoComplete="off" value={form.whatsapp} name='whatsapp' onChange={onChange} label={lang.whatsapp}  />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField fullWidth autoComplete="off"  value={form.email} name='email' onChange={onChange} label={lang.email} helperText={lang.moneda_que_memail}  />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth autoComplete="off"  value={form.direccion} name='direccion' onChange={onChange} label={lang.direccion}  />
      </Grid>
      <Grid item xs={12}>
        <Button type="submit" variant="outlined" size="large">{lang.guardar}</Button>
      </Grid>
    </Grid>
    </form>
  )
}

export default DatosContacto
