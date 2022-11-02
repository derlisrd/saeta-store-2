import {Divider,Button, Icon, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, Stack, Avatar } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useDatosEmpresa } from "../../Contexts/DatosEmpresaProvider";
import {useLang} from "../../Contexts/LangProvider";
import { useLogin } from "../../Contexts/LoginProvider";
import {env} from '../../Utils/config'
import Man from '../../Assets/img/man.svg'
export default function UserMenu(){
    const {logOut,userData}= useLogin()
    const {EMPRESA} = useDatosEmpresa()
    const {nombre_user} = userData
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
      </Menu>
    </>
  );
}
