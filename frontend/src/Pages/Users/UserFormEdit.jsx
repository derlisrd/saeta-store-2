import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormLabel, Grid, InputLabel, LinearProgress, MenuItem, Select, TextField, Zoom } from '@mui/material'
import {useEffect, useState} from 'react'
import { useUsers } from './UsersProvider'

const UserFormEdit = () => {
    const {dialogs,setDialogs,lang,cargas,existUser,lista,editUser,formulario} = useUsers()
    const initialForm = {
        nombre_user:"",
        username_user:"",
        email_user:"",
        rol_user:"",
    }
    const [errors,setErrors] = useState({
        error:false,
        mensaje:null,id:null
    })
    const [form,setForm] = useState(initialForm)


    const enviarForm = async(e)=>{
        e.preventDefault();
        let res = await existUser(form);
        if(res>1){
            setErrors({error:true,mensaje:lang.ya_existe_usuario,id:"user"})
            return false;
        }
        if(form.rol_user===''){
            setErrors({error:true,mensaje:lang.select_rol,id:"rol"})
            return false;
        }
        setErrors({error:false,mensaje:null,id:null})

        editUser(form);
        cerrar()
    }

    const change = e=>{
        const {value,name} = e.target;
        setForm({...form,[name]:value});
    }
    const cerrar = ()=> {setDialogs({...dialogs,edit:false}); setForm(initialForm) } 
    
    useEffect(() => {
      setForm(formulario)
    }, [formulario])

  return (
      <Dialog fullWidth open={dialogs.edit} onClose={cerrar} TransitionComponent={Zoom}>
        <form onSubmit={enviarForm}>
      <DialogTitle>{lang.edit_usuario}</DialogTitle>
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
                    <FormLabel>
                        <InputLabel>
                            {lang.rol_user}
                        </InputLabel>
                        <Select error={errors.id==="rol"} value={form.rol_user} label={lang.rol_user} fullWidth name="rol_user" required onChange={change}>
                            <MenuItem value="" disabled>{lang.select_rol}</MenuItem>
                            {lista.rols.map((e,i)=>(
                                <MenuItem key={i} value={e.id_users_rol}>{e.roluser_permiso}</MenuItem>
                            ))}
                        </Select>
                    </FormLabel>
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

export default UserFormEdit
