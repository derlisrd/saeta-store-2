import { Radio,Dialog, DialogContent, DialogTitle, FormControlLabel, FormLabel, Grid,  TextField, DialogActions, Button } from '@mui/material'
import React from 'react'
import swal from 'sweetalert'
import { APICALLER } from '../../../Api/ApiCaller'
import { useLogin } from '../../../Contextos/LoginProvider'
import { useRegistroMovimientos } from './RegistroMovimientosProvider'

const RegistroDialog = () => {
  const {token_user} = useLogin()
    const {dialogs,setDialogs,form,setForm,initialForm,getLista} = useRegistroMovimientos()

    const cerrar = ()=>{
        setDialogs({...dialogs,agregar:false});
        setForm(initialForm)
    }

    const enviarForm = async(e)=>{
      e.preventDefault();
      if(form.id_cajas_registro === ''){
        delete form.id_cajas_registro;
        let res = await APICALLER.insert({table:'cajas_registros',data:form,token:token_user});
        if(res.response === 'ok'){
          swal({icon:'success',timer:1500,text:'Agregado correctamente'});
        }else{ console.log(res)}
      }else{
        let res = await APICALLER.update({table:'cajas_registros',
        data:form,id:form.id_cajas_registro,token:token_user});
        if(res.response === 'ok'){
          swal({icon:'success',timer:1500,text:'Actualizado correctamente'});
        }else{ console.log(res)}
      }
      setForm(initialForm)
      setDialogs({...dialogs,agregar:false});
      getLista();
    }

    const onChange = e =>{
      const {name,value} = e.target;
      setForm({...form,[name]:value});
    }

  return (
    <Dialog onClose={cerrar} open={dialogs.agregar} fullWidth>
      <form onSubmit={enviarForm}>
      <DialogTitle>
        Editar o Registrar
      </DialogTitle>
      <DialogContent dividers>
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Descripcion"
              helperText='Ej: Salario de Juan'
              autoFocus
              name="descripcion_registro"
              value={form.descripcion_registro}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend">Tipo de registro</FormLabel>
                <FormControlLabel
                  value="0"
                  control={
                    <Radio
                      name="tipo_registro"
                      checked={form.tipo_registro === "0"}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                  label="SALIDA"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="1"
                  control={
                    <Radio
                      name="tipo_registro"
                      checked={form.tipo_producto === "1"}
                      onChange={onChange}
                      color="primary"
                    />
                  }
                  label="ENTRADA"
                  labelPlacement="end"
                />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" type="onsubmit" >Guardar</Button>
        <Button variant="outlined" onClick={cerrar}>Cancelar</Button>
      </DialogActions>
    </form>
    </Dialog>
  )
}

export default RegistroDialog
