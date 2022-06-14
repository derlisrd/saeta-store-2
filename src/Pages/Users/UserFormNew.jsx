import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormLabel, Grid, InputLabel, LinearProgress, MenuItem, Select, TextField, Zoom } from '@mui/material'
import {useState} from 'react'
import { useUsers } from './UsersProvider'

const UserFormNew = () => {
    const {dialogs,setDialogs,lang,cargas,existUser,lista,newUser} = useUsers()
    const initialForm = {
        nombre_user:"",
        username_user:"",
        password_user:"",
        password_user2:"",
        email_user:"",
        rol_user:""
    }
    const [errors,setErrors] = useState({
        error:false,
        mensaje:null,id:null
    })
    const [form,setForm] = useState(initialForm)


    const enviarForm = async(e)=>{
        e.preventDefault();
        let res = await existUser(form);
        if(res>0){
            setErrors({error:true,mensaje:lang.ya_existe_usuario,id:"user"})
            return false;
        }
        if(form.password_user!==form.password_user2){
            setErrors({error:true,mensaje:lang.password_no_iguales,id:"pass"})
            return false;
        }
        if(form.rol_user===''){
            setErrors({error:true,mensaje:lang.select_rol,id:"rol"})
            return false;
        }
        setErrors({error:false,mensaje:null,id:null})

        delete form.password_user2;

        newUser(form);
        cerrar()
    }

    const change = e=>{
        const {value,name} = e.target;
        setForm({...form,[name]:value});
    }
    const cerrar = ()=> {setDialogs({...dialogs,new:false}); setForm(initialForm) } 
  return (
      <Dialog fullWidth open={dialogs.new} onClose={cerrar} TransitionComponent={Zoom}>
        <form onSubmit={enviarForm}>
      <DialogTitle>{lang.nuevo_usuario}</DialogTitle>
      <DialogContent dividers>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {cargas.guardar && <LinearProgress />}
                    {errors.error && <Alert variant='outlined' severity={"error"}>{errors.mensaje}</Alert>}
                </Grid>
                <Grid item xs={12}>
                    <TextField autoFocus autoComplete='off' fullWidth name="nombre_user" required label={lang.nombre} value={form.nombre_user} onChange={change} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth autoComplete='off' error={errors.id==='user'} name="username_user" required label={lang.usuario_logueo} value={form.username_user} onChange={change} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth autoComplete='off' error={errors.id==='user'} name="email_user" type="email" required label={lang.email} value={form.email_user} onChange={change} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth name="password_user" error={errors.id==='pass'} type="password" required label={lang.contrasena} value={form.password_user} onChange={change} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth name="password_user2" error={errors.id==='pass'} type="password" required label={lang.repetir_contrasena} value={form.password_user2} onChange={change} />
                </Grid>
                <Grid item xs={12}>
                    <FormLabel>
                        <InputLabel>
                            {lang.rol_user}
                        </InputLabel></FormLabel>
                        <Select error={errors.id==="rol"} value={form.rol_user} label={lang.rol_user} fullWidth name="rol_user" required onChange={change}>
                            <MenuItem value="" disabled>{lang.select_rol}</MenuItem>
                            {lista.rols.map((e,i)=>(
                                <MenuItem key={i} value={e.id_users_rol}>{e.roluser_permiso}</MenuItem>
                            ))}
                        </Select>
                    
                </Grid>
            </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' size='large' type='submit'>{lang.guardar}</Button>
        <Button variant='contained' size='large' onClick={cerrar}>{lang.cerrar}</Button>
      </DialogActions>
    </form>
    </Dialog>
  )
}

export default UserFormNew
