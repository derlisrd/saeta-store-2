import {Divider,Button, Icon, IconButton, /* List, ListItem, ListItemIcon, ListItemText, */ Menu, Stack, Avatar, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useDatosEmpresa } from "../../Contexts/DatosEmpresaProvider";
import {useLang} from "../../Contexts/LangProvider";
import { useLogin } from "../../Contexts/LoginProvider";
import {env} from '../../Utils/config'
import Man from '../../App/Assets/man.svg'
import empresa from '../../App/Assets/empresa.svg'
import useGoto from '../../Hooks/useGoto'

export default function UserMenu(){
    const {logOut,userData}= useLogin()
    const nav = useGoto()
    const {EMPRESA} = useDatosEmpresa()
    const {nombre_user,email_user} = userData
    const [anchorEl, setAnchorEl] = useState(null);
    const {lang} = useLang();
    const handleClick = e => {setAnchorEl(e.currentTarget);};
    const handleClose = () => {setAnchorEl(null)}
    const navigate = useNavigate();
    const cerrarSesion = async()=>{
      let q = await swal({text: lang.q_desea_cerrar_sesion, title:lang.cerrar, icon: "info",buttons: [lang.cancelar, lang.ok]})
        if(q){
            logOut();
        }
    }
  return (
    <>
      <Divider orientation="vertical" flexItem sx={{ mx:1 }} />

      <Stack sx={{ display:{xs:'none',sm:'flex'} }} direction="row" justifyContent="center" alignItems="center" >
        <Button size="small" onClick={handleClick} endIcon={<Icon>expand_more</Icon>}  >
          <Avatar alt={nombre_user} src={Man} />
        </Button>
      </Stack>
      <Stack sx={{ display:{xs:'flex',sm:'none'} }} direction="row" justifyContent="center" alignItems="center" >
        <IconButton onClick={handleClick} >
          <Icon>expand_more</Icon>
        </IconButton>
      </Stack>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Stack direction="column" minWidth={300} p={2} m={1} spacing={1}>
          <Stack direction="row" spacing={1} m={1}>
            <IconButton onClick={()=>{ nav.to('profile') }}>
            <Avatar src={Man}  alt={nombre_user} />
            </IconButton>
            <Stack direction="column">
              <Typography variant="button">{nombre_user}</Typography>
              <Typography variant="caption">{email_user}</Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack direction="row" spacing={1} m={1}>
            <Avatar src={empresa}  alt={nombre_user} />
            <Stack direction="column">
              <Typography variant="button">{EMPRESA.nombre_empresa}</Typography>
            </Stack>
          </Stack>
          <Divider />
            <Button onClick={() => {navigate(env.BASEURL + "/cajas");}} startIcon={<Icon>point_of_sale</Icon>} fullWidth>{lang.arqueos}</Button>
          <Divider />
            <Button onClick={() => {navigate(env.BASEURL + "/settings");}} startIcon={<Icon>settings</Icon>} fullWidth> {lang.config_empresa}</Button>
          <Divider />
          <Button onClick={cerrarSesion} fullWidth variant="contained" >{lang.salir}</Button>
        </Stack>
      </Menu>
    </>
  );
}


/* 
<List sx={{ p:2 }}>
        <ListItem 
        button 
        onClick={() => {navigate(env.BASEURL + "/profile");}}
        >
            <ListItemIcon>
              <Avatar alt={nombre_user} src={Man} />
            </ListItemIcon>
            <ListItemText primary={nombre_user} />
          </ListItem>
          <Divider />
          <ListItem >
            <ListItemIcon>
              <Icon>add_business</Icon>
            </ListItemIcon>
            <ListItemText primary={EMPRESA.nombre_empresa} />
          </ListItem>
          <ListItem
            button 
            onClick={() => {navigate(env.BASEURL + "/settings");}}
          >
            <ListItemIcon>
              <Icon>settings</Icon>
            </ListItemIcon>
            <ListItemText primary={lang.config_empresa} />
          </ListItem>
          
          <ListItem
            button 
            onClick={() => {navigate(env.BASEURL + "/cajas");}}
          >
            <ListItemIcon>
              <Icon>point_of_sale</Icon>
            </ListItemIcon>
            <ListItemText primary={lang.arqueos} />
          </ListItem>
          <ListItem button onClick={cerrarSesion}>
            <ListItemIcon>
              <Icon>logout</Icon>
            </ListItemIcon>
            <ListItemText primary={lang.salir} />
          </ListItem>
        </List>

*/