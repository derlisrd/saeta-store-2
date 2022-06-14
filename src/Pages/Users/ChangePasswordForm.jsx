import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,LinearProgress,TextField, Zoom } from '@mui/material'
import { useState } from 'react'
import { useUsers } from './UsersProvider'

const ChangePasswordForm = () => {
    const {dialogs,setDialogs,lang,cargas,changePass} = useUsers()
    const initialForm = {
        password_old:"",
        password_user:"",
        password_user2:"",
    }
    const [errors,setErrors] = useState({
        error:false,
        mensaje:null,id:null
    })
    const [form,setForm] = useState(initialForm)

    const enviarForm = async(e)=>{
        e.preventDefault();
        if(form.password_user!==form.password_user2){
            setErrors({error:true,mensaje:lang.password_no_iguales,id:"pass"})
            return false;
        }
        setErrors({error:false,mensaje:null,id:null})
        changePass(form);
        cerrar()
    }

    const change = e=>{
        const {value,name} = e.target;
        setForm({...form,[name]:value});
    }
    const cerrar = ()=> {setDialogs({...dialogs,pass:false}); setForm(initialForm) } 
    


  return (
    <Dialog fullWidth open={dialogs.pass} onClose={cerrar} TransitionComponent={Zoom}>
        <form onSubmit={enviarForm}>
        <DialogTitle>{lang.cambiar_pass}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {cargas.guardar && <LinearProgress />}
                {errors.error && <Alert variant='outlined' severity={"error"}>{errors.mensaje}</Alert>}
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth autoFocus name="password_old" type="password" required label={lang.old_pass} value={form.password_old} onChange={change} />
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth name="password_user" error={errors.id==='pass'} type="password" required label={lang.contrasena} value={form.password_user} onChange={change} />
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth name="password_user2" error={errors.id==='pass'} type="password" required label={lang.repetir_contrasena} value={form.password_user2} onChange={change} />
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

export default ChangePasswordForm
