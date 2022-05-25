import { Icon, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {useLang} from "../../Contexts/LangProvider";
import { useLogin } from "../../Contexts/LoginProvider";
import {env} from '../../Utils/config'

export default function UserMenu(){
    const {logOut}= useLogin()
    const [anchorEl, setAnchorEl] = useState(null);
    const {lang} = useLang();
    const handleClick = e => {setAnchorEl(e.currentTarget);};
    const handleClose = () => {setAnchorEl(null)}
    const navigate = useNavigate();
    const cerrarSesion = async()=>{
      let q = await swal({text: lang.q_desea_cerrar_sesion,icon: "warning",buttons: [lang.cancelar, lang.ok]})
        if(q){
            logOut();
        }
    }
  return (
    <>
        <IconButton onClick={handleClick}><Icon color="inherit" >more_vert</Icon></IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <List>
            <ListItem button onClick={()=>{handleClose(); navigate(env.BASEURL+'/cajas') }}>
                <ListItemIcon><Icon>point_of_sale</Icon></ListItemIcon>
                <ListItemText primary="Arqueo" />
            </ListItem>
            <ListItem button onClick={cerrarSesion}>
                <ListItemIcon><Icon>logout</Icon></ListItemIcon>
                <ListItemText primary={lang.cerrar} />
            </ListItem>
            
        </List>
      </Menu>
    </>
  )
}
