import { Alert, Box, Button, Grid, LinearProgress, TextField, Typography } from '@mui/material'
import {useState} from 'react'
import LoadingBackDrop from '../../Components/UI/LoadingBackDrop'
import { useConfiguracion } from '../../Contexts/ConfiguracionProvider'
import { useLogin } from '../../Contexts/LoginProvider'
import { APICALLER } from '../../Services/api'

const ConfigIniciales = () => {

    const {loadindConfiguracion} = useConfiguracion()

    const [loading,setLoading] = useState(false)
    const {logIn} = useLogin()
    const [loadingGeneral,setLoadingGeneral] = useState(false)
    const [errors,setErrors] = useState({
        active:false,
        msg:'',
        code:0
    })
    const [userForm,setUserForm] = useState({
        username_user:'',
        password_user:'',
        nombre_user:'',
        email_user:'',
        password_repeat:''
    })
    const [form,setForm] = useState({
        nombre_empresa:'',
        propietario_empresa:'',
        ruc_empresa:'',
        direccion_empresa:'',
        telefono_empresa:'',
        categoria_empresa:'',
        configurado:'1'
    })
    const changeUser = e =>{
        const {name,value} = e.target
        setUserForm({...userForm,[name]:value})
    }
    const change = e =>{
        const {name,value} = e.target
        setForm({...form,[name]:value})
    }
    const validate = async(e)=>{
        e.preventDefault()
        
        if(userForm.password_user !== userForm.password_repeat){
            setErrors({active:true,msg:'Las contraseñas no coinciden',code:3})
            return false;
        }
        setErrors({active:false,msg:''})
        setLoading(true)
        let user = {...userForm}
        delete user.password_repeat
        let res = await APICALLER.register({datos:user})
        if(res.response){
            setLoadingGeneral(true)
            let log = await APICALLER.login({username_user:userForm.username_user,password_user: userForm.password_user})
            let token_user = log.results[0].token_user;
            let update = await APICALLER.update({table:'empresas',data:form,id:1,token:token_user,token_encriptado:false})
            if(!update.response){
                console.log(update)
            }
            logIn({username_user:userForm.username_user,password_user: userForm.password_user});
            
        }else{
            if(res.error_code === 2 ){
                setErrors({active:true,msg:res.message,code:2})
            }
        }
        setLoading(false)
    }

    if(loadingGeneral || loadindConfiguracion){
        return <LoadingBackDrop />
    }

  return (
    <form onSubmit={validate}>
    <Box p={4} m={4}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography variant='button'>Por favor complete los datos necesarios para hacer la instalacion del sistema</Typography>
        </Grid>
        <Grid item xs={12}>
            {loading && <LinearProgress />}
            {errors.active && <Alert icon={false} severity="error">{errors.msg}</Alert>}
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField required label="Nombre de la empresa" name="nombre_empresa" onChange={change} value={form.nombre_empresa} fullWidth autoFocus />
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField label="Nombre de propietario" name="propietario_empresa" onChange={change} value={form.propietario_empresa} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField required label="Ruc o de la empresa" name="ruc_empresa" onChange={change} value={form.ruc_empresa} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField required label="Teléfono de la empresa" name="telefono_empresa" onChange={change} value={form.telefono_empresa} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField required label="Dirección de la empresa" name="direccion_empresa" onChange={change} value={form.direccion_empresa} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField label="Categoría de la empresa" name="categoria_empresa" onChange={change} value={form.categoria_empresa} fullWidth />
        </Grid>
        <Grid item xs={12}>
            <Typography variant='button'>Datos para usuario</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
            <TextField label="Nombre" required name="nombre_user" onChange={changeUser} value={userForm.nombre_user} fullWidth />
        </Grid>

        <Grid item xs={12} md={4}>
            <TextField label="Username" error={errors.code===2} required helperText="Solo puede contener letras y numeros sin espacios" name="username_user" onChange={changeUser} value={userForm.username_user} fullWidth />
        </Grid>
        <Grid item xs={12} md={4}>
            <TextField label="E-mail" error={errors.code===2} name="email_user" onChange={changeUser} value={userForm.email_user} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField required type="password" label="Contraseña" error={errors.code===3} name="password_user" onChange={changeUser} value={userForm.password_user} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
            <TextField required type="password" label="Repetir Contraseña" error={errors.code===3} name="password_repeat" onChange={changeUser} value={userForm.password_repeat} fullWidth />
        </Grid>

        <Grid item xs={12}>
            {loading && <LinearProgress />}
            {errors.active && <Alert icon={false} severity="error">{errors.msg}</Alert>}
        </Grid>
        <Grid item xs={12}>
            <Button variant='contained' type='submit' size='large' >Guardar Cambios</Button>
        </Grid>
      </Grid>
    </Box>
    </form>
  )
}

export default ConfigIniciales
