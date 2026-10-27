import {Alert, DialogContent,Grid,LinearProgress,TextField,Dialog,DialogTitle,Zoom,DialogActions,Button} from "@mui/material";
import { useState } from "react";
import { APICALLER } from "../../../Services/api";
import { useEmpleados } from "../EmpleadosProvider";
import SelectRol from "../SelectRol";
import SelectUser from "../SelectUser";

function Add() {
    const { dialogs, llaveDialog,getLista,token_user} = useEmpleados();
    const [loading,setLoading] = useState(false)
    const initialError = {active:false,message:'',code:0}
    const [error,setError] = useState(initialError)
    const initialFormInsert = {user_id:'0',id_rol:'0'}
    const [formInsert,setFormInsert] = useState(initialFormInsert)
    const close = () => {setError(initialError); setFormInsert(initialFormInsert); llaveDialog("add", false)}

    const change = e=>{ const {value,name} = e.target; setFormInsert({...formInsert,[name]:value}) }

    const enviar = async(e)=>{ 
        e.preventDefault()
        let form = new FormData(e.target)
        let datas =  Object.fromEntries(form)
        if(datas.doc_empleado === ''){
            setError({active:true,message:'Ingrese el documento',code:1})
            document.getElementById('doc_empleado').focus()
            return false;
        }
        
        if(datas.nombre_empleado === '' || datas.apellido_empleado === ''){
            setError({active:true,message:'Ingrese nombre y apellido',code:2})
            return false;
        }
        if(formInsert.id_rol==='0'){
            setError({active:true,message:'Seleccione rol',code:3})
            return false;
        }
        setLoading(true)
        let check = await APICALLER.get({table:'empleados',where:`doc_empleado,=,'${datas.doc_empleado}'`})
        if(check.response && check.found>0){
            setError({active:true,message:'Ya existe un empleado con ese doc.',code:1})
            setLoading(false)
            document.getElementById('doc_empleado').focus()
            return false;
        }
        setError(initialError)

        let res = await APICALLER.insert({table:'empleados',data:datas,token:token_user})
        if(res.response){
            close()
            getLista()
        }else{ console.log(res);}
        setLoading(false)
    }
  

  return (
    <Dialog open={dialogs.add} TransitionComponent={Zoom} onClose={close} fullWidth>
      <form onSubmit={enviar}>
        <DialogTitle>Agregar</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                    {error.active && <Alert severity="error">{error.message}</Alert> }
                </Grid>
                <Grid item xs={12} >
                    <TextField id="doc_empleado" error={error.code===1} autoFocus name="doc_empleado" required autoComplete="off" fullWidth label="Documento" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="nombre_empleado" required autoComplete="off" label="Nombres" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="apellido_empleado" required autoComplete="off" label="Apellidos" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="telefono_empleado" label="teléfono" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="salario_empleado" required label="Salario" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SelectRol name='id_rol' error={error} value={formInsert.id_rol} onChange={change}  />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SelectUser name='user_id' value={formInsert.user_id} onChange={change}  />
                </Grid>
                
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={close}>Cerrar</Button>
            <Button type="submit" variant="contained">Registrar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default Add;
