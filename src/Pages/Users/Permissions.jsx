import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Icon, LinearProgress, List, ListItem, Zoom } from '@mui/material'
import React, { useCallback, useEffect,useState } from 'react'
import { APICALLER } from '../../Services/api'
import { useUsers } from './UsersProvider'

const Permissions = () => {
    const {setDialogs,dialogs,lang,formulario,lista,token_user} = useUsers()

    const cerrar = ()=> {setDialogs({...dialogs,permissions:false}); }

    const [cargando,setCargando] = useState(true)
    const [listaPermisosUsuario,setListaPermisosUsuario] = useState([])


    const setPermisos = async(check,idPermiso,index) => {
      const id_user = formulario.id_user;
      setCargando(true)
      let array = [...listaPermisosUsuario]
      array[index].checked = !check;
      setListaPermisosUsuario(array)
      if(check===false){
        
        let data = {id_user_permiso:id_user,id_permiso_permiso:idPermiso}
        let res = await APICALLER.insert({table:`permisos_users`,data,token:token_user})
        !res.response && console.log(res)
      }
      else{
        let res = await APICALLER.delete({token:token_user,table:`permisos_users`,namecolumns:`id_user_permiso,id_permiso_permiso`,ids:`${id_user},${idPermiso}`})
        !res.response && console.log(res)
      }
      setCargando(false)
    };


    const getPermisos= useCallback(async()=>{
      let id_user = formulario.id_user;
      if(id_user!==null && dialogs.permissions){
        setCargando(true)
        let res = await APICALLER.get({table:`permisos_users`,where:`id_user_permiso,=,${id_user}`})
        if(res.response) {
            let result = res.results;
            let listinha = lista.permisos;
            let permisos = [...listinha];
            let array = [];
            permisos.forEach((element)=>{
                let exist = result.findIndex(item=> item.id_permiso_permiso===element.id_permiso)
                
                array.push({...permisos,                    
                    id_permiso:element.id_permiso,
                    checked: exist<0 ? false : true,
                    clave_permiso: element.clave_permiso,
                    descripcion_permiso: element.descripcion_permiso
                    })
            })
            
            setListaPermisosUsuario(array)
        }else{
            console.log(res)
        }
        setCargando(false)
      } 
  },[formulario,lista,dialogs])


    useEffect(()=>{
      const ca = new AbortController()
      let isActive = true;
  
      if(isActive){
        getPermisos();
      }
  
      return ()=>{
        isActive = false;
        ca.abort();
      }
    },[getPermisos])


  return (
    <Dialog open={dialogs.permissions} onClose={cerrar} fullWidth TransitionComponent={Zoom}>
      <DialogTitle>
          {lang.permisos} {formulario.nombre_user}
      </DialogTitle>
      <DialogContent dividers>
          {
             cargando && <LinearProgress />
          }
        <List>
          { listaPermisosUsuario.map((item,index) => (
            <ListItem key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={<Icon color="success" sx={{ fontSize:35 }}  >toggle_on</Icon>}
                    icon={<Icon>toggle_off</Icon>}
                    name={item.clave_permiso}
                    onChange={()=>{setPermisos(item.checked,item.id_permiso,index)}}
                    checked={item.checked}
                  />
                }
                label={item.descripcion_permiso}
              /> 
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" size="large" onClick={cerrar}>{lang.cerrar}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Permissions
