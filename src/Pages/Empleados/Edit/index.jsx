import {DialogContent,Grid,LinearProgress,TextField,Alert} from "@mui/material";
import { useEffect, useState } from "react";
import ActionsCancelSave from "../../../../Components/Dialogo/ActionsCancelSave";
import DialogZoom from "../../../../Components/Dialogo/DialogZoom";
import useFocus from "../../../../Hooks/useFocus";
import useQuerys from "../../../../Hooks/useQuerys";
import { useAuth } from "../../../../Providers/AuthProvider";
import { APICALLER } from "../../../../Services/api";
import { useEmpleados } from "../EmpleadosProvider";


function Edit() {
    const { dialogs, llaveDialog,getLista,formSelect} = useEmpleados();
    const [loading,setLoading] = useState(false)
    const initialError = {active:false,message:'',code:0}
    const [error,setError] = useState(initialError)
    const {get} = useQuerys()
    const {userData} = useAuth()
    const {focusTo} = useFocus()    
    const [formEdit,setFormEdit] = useState({id_empleado:"",doc_empleado:"",telefono_empleado:"",nombre_empleado:"",tipo_empleado:""})


    const change = e=>{
        const {value,name} = e.target
        setFormEdit({...formEdit,[name]:value})
    }


    const close = () => { llaveDialog("edit", false); setError(initialError) }

    const enviar = async(e)=>{ 
        e.preventDefault()
        let datas = {...formEdit}
        if(datas.doc_empleado === ''){
            focusTo('doc_empleado')
            return false;
        }
        if(datas.nombre_empleado === ''){
            return false;
        }
        setLoading(true)
        let id = formSelect.id_empleado;
        let check = await get({table:'empleados',where:`doc_empleado,=,'${datas.doc_empleado}',and,id_empleado,<>,${id}`})
        if(check.response && check.found>0){
            setError({active:true,message:'Ya existe un empleado con ese doc.',code:1})
            focusTo('doc_empleado')
            setLoading(false)
            return false;
        }
        setError(initialError)
        let res = await APICALLER.update({table:'empleados',data:datas,id,token:userData.token_user})
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
    <DialogZoom open={dialogs.edit} title="Agregar" onClose={close} fullWidth>
      <form onSubmit={enviar}>
        <input type="hidden" name="id" value={formSelect.id_empleado} />
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {loading && <LinearProgress />}
                    {error.active && <Alert severity="error">{error.message}</Alert> }
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="doc_empleado" error={error.code===1} autoFocus name="doc_empleado" onChange={change} value={formEdit.doc_empleado} required autoComplete="off" fullWidth label="Documento" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="nombre_empleado" onChange={change} value={formEdit.nombre_empleado} required autoComplete="off" label="Nombre y Apellido" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth name="telefono_empleado" onChange={change} value={formEdit.telefono_empleado} label="Teléfono" />
                </Grid>
            </Grid>
        </DialogContent>
        <ActionsCancelSave close={close} />
      </form>
    </DialogZoom>
  );
}

export default Edit;
