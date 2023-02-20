import { Button, Grid, Icon, LinearProgress, TextField } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { useLogin } from "../../Contexts/LoginProvider"
import { APICALLER } from "../../Services/api"
import { useWeb } from "./WebProvider"


const DatosWeb = () => {
  const {lang,datos,setearDatos} = useWeb()
  const {userData} = useLogin()
  const {token_user} = userData

  const WIDTH = 200

  const formInitial = {
    site_name:'',
    site_title:'',
    site_description:'',
    logo_url:'',
    moneda:''
  }
  const [newImage,setNewImage] = useState(null)
  const [loading,setLoading] = useState(false)
  const [loadindImg,setLoadindImg] = useState(false)
  const [form,setForm] = useState(formInitial)
  
  const onChange = e=>{
    const {value,name} = e.target
    setForm({...form,[name]:value})
  }

  const setDataForm = useCallback(async()=>{
    setForm({site_name:datos.site_name,site_description:datos.site_description,site_title:datos.site_title,logo_url:datos.logo_url,moneda:datos.moneda})
  },[datos])

  const submit = async(e)=>{
    e.preventDefault();
    setLoading(true)
    let res = await Promise.all([
      APICALLER.update({table:'options',data:{'option_value':form.site_name},token:token_user,id:1}),
      APICALLER.update({table:'options',data:{'option_value':form.site_title},token:token_user,id:2}),
      APICALLER.update({table:'options',data:{'option_value':form.site_description},token:token_user,id:3}),
      APICALLER.update({table:'options',data:{'option_value':form.moneda},token:token_user,id:9})
    ]
    )
    if(res[0].response){
      let nuevos = {...datos}
      nuevos.site_description = form.site_description;
      nuevos.moneda = form.moneda;
      nuevos.site_name = form.site_name;
      nuevos.site_title = form.site_title;
      nuevos.logo_url = form.logo_url;
      setearDatos(nuevos)
    }else{
      console.log(res)
    }
    setLoading(false)
  }



  const urlToFile = (url,name) =>{
    let arr = url.split(",");
    let mime = arr[0].match(/:(.*?);/)[1]
    let data = arr[1]
    let dataStr = atob(data)
    let n = dataStr.length;
    let dataArr = new Uint8Array(n)
    while(n--){
      dataArr[n] = dataStr.charCodeAt(n)
    }
    let file = new File([dataArr],name,{type:mime})
    return file
  }

  const changeImage = async(e)=>{
    let file = (e.target.files[0])
       setLoadindImg(true)

      let reader = new FileReader()

      reader.readAsDataURL(file)

      reader.onload = (ev)=>{
        let ima_url = ev.target.result
        let image = document.createElement('img')
        image.src= ima_url
        setNewImage(ima_url)
        image.onload = async() =>{
          let time = new Date()
          let name = time.getTime();
          let canvas = document.createElement('canvas')
          let radio = WIDTH / image.width
          canvas.width = WIDTH;
          canvas.height = image.height * radio
          let context = canvas.getContext('2d')
          context.drawImage(image,0,0,canvas.width,canvas.height);
          let new_url_image = canvas.toDataURL('image/jpeg',90);
          let new_file =  urlToFile(new_url_image,`${name}.jpg`) 
          let res = await APICALLER.uploadJustOneImage({file:new_file, token:userData.token_user})
          if(res.response){
            let nuevo = {...datos}
            APICALLER.update({table:'options',data:{'option_value':form.logo_url},token:token_user,id:12})
            nuevo.logo_url = res.results.url
            setearDatos(nuevo)
          }
        }
      }

      setLoadindImg(false)
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
        <TextField fullWidth autoComplete="off" autoFocus value={form.site_name} name='site_name' onChange={onChange} label={lang.site_name}  />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField fullWidth autoComplete="off" value={form.site_title} name='site_title' onChange={onChange} label={lang.site_title}  />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField fullWidth autoComplete="off"  value={form.moneda} name='moneda' onChange={onChange} label={lang.moneda} helperText={lang.moneda_que_muestra}  />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth autoComplete="off"  value={form.site_description} name='site_description' onChange={onChange} label={lang.site_description}  />
      </Grid>
      <Grid item xs={12}>
        <img src={newImage ?? datos.logo_url} alt="logo" width={WIDTH} />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth autoComplete="off" disabled value={form.logo_url} name='logo_url' onChange={onChange} label={lang.logo_url}  />

        <label htmlFor="btn_upload">
            <input
              name="btn_upload"
              id="btn_upload"
              style={{ display: "none"}}
              type="file"
              onChange={changeImage}
              accept="image/jpeg, image/png"
            />
            
            <Button startIcon={<Icon>file_upload</Icon>} disabled={loadindImg} sx={{ mt:1 }}  variant="outlined" component="span">
              { !loadindImg ? lang.subir_logo : lang.cargando}
            </Button>
            
          </label>

      </Grid>
      
      <Grid item xs={12}>
        <Button type="submit" variant="outlined" size="large">{lang.guardar}</Button>
      </Grid>
    </Grid>
    </form>
  )
}

export default DatosWeb
