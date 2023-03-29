import {Alert, DialogContent,Grid,LinearProgress,TextField,Dialog,DialogTitle,Zoom,DialogActions,Button} from "@mui/material";
import { useState,useEffect } from "react";
import { APICALLER } from "../../../Services/api";
import { useEmpleados } from "../EmpleadosProvider";
import SelectRol from "../SelectRol";
import SelectUser from "../SelectUser";


function Edit() {
    const { dialogs, llaveDialog,getLista,formSelect,token_user} = useEmpleados();
    const [loading,setLoading] = useState(false)
    const initialError = {active:false,message:'',code:0}
    const [error,setError] = useState(initialError)

    const [formEdit,setFormEdit] = useState({id_empleado:"",doc_empleado:"",telefono_empleado:"",apellido_empleado:'',nombre_empleado:"",salario_empleado:"",id_rol:'',user_id:''})


    const change = e=>{
        const {value,name} = e.target
        setFormEdit({...formEdit,[name]:value})
    }


    const close = () => { llaveDialog("edit", false); setError(initialError) }

    const enviar = async(e)=>{ 
        e.preventDefault()
        
        let datas = {...formEdit}
        
        if(datas.doc_empleado === ''){
            setError({active:true,message:'Ingrese el documento',code:1})
            document.getElementById('doc_empleado').focus()
            return false;
        }
        
        if(datas.nombre_empleado === '' || datas.apellido_empleado === ''){
            setError({active:true,message:'Ingrese nombre y apellido',code:2})
            return false;
        }
        if(datas.id_rol===''){
            setError({active:true,message:'Seleccione rol',code:3})
            return false;
        }


        setLoading(true)
        let id = formSelect.id_empleado;
        let check = await APICALLER.get({table:'empleados',where:`doc_empleado,=,'${datas.doc_empleado}',and,id_empleado,<>,${id}`})
        if(check.response && check.found>0){
            setError({active:true,message:'Ya existe un empleado con ese doc.',code:1})
            document.getElementById('doc_empleado').focus()
            setLoading(false)
            return false;
        }
        setError(initialError)
        let res = await APICALLER.update({table:'empleados',data:datas,id,token:token_user})
        if(res.response){
            close()
            getLista()
        }else{ }
        
        setLoading(false)
    }

    useEffect(()=>{
        setFormEdit(formSelect)
        //console.log('cambia form select');
    },[formSelect])
  

  return (
    <Dialog open={dialogs.edit} onClose={close} fullWidth TransitionComponent={Zoom}>
        <DialogTitle>Editar</DialogTitle>
      <form onSubmit={enviar}>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                    {error.active && <Alert severity="error">{error.message}</Alert> }
                </Grid>
                <Grid item xs={12} >
                    <TextField id="doc_empleado" error={error.code===1} value={formEdit.doc_empleado} onChange={change} autoFocus name="doc_empleado" required autoComplete="off" fullWidth label="Documento" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="nombre_empleado" value={formEdit.nombre_empleado} onChange={change} required autoComplete="off" label="Nombres" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="apellido_empleado" value={formEdit.apellido_empleado} onChange={change} required autoComplete="off" label="Apellidos" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="telefono_empleado" value={formEdit.telefono_empleado} onChange={change} label="teléfono" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="salario_empleado" value={formEdit.salario_empleado} onChange={change} required label="Salario" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SelectUser name='user_id' value={formEdit.user_id} onChange={change}  />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SelectRol name='id_rol' error={error} value={formEdit.id_rol} onChange={change}  />
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

export default Edit;
