import { Collapse, Icon, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import SimpleBar from 'simplebar-react';
import { useMenu } from "../../Contexts/MenuProvider"
import { Link,useLocation } from "react-router-dom";
import { listaMenu } from "../../Utils/listaMenu";
import { useGlobalStyles } from "../../Styles/GlobalStyles";
import { Fragment, useState } from "react";
import { useLogin } from "../../Contexts/LoginProvider";
import {useLang} from "../../Contexts/LangProvider"
const Lists = () => {
  const {changeStateMenu} = useMenu();
  const [lista,setLista] = useState(listaMenu);
  const {userData} = useLogin()
  const {lang}= useLang()
  const {permisos} = userData;

  const switchOpen = (sw,id)=>{
    let array = [...lista];
    let index = array.findIndex((e)=> e.id===id)
    array[index].open = !sw;
    setLista(array);
  }
  const l = useLocation();  
  const goTo = ()=>{changeStateMenu(false);}
  const style = useGlobalStyles();
  return(
    <SimpleBar style={{ maxHeight: "100vh" }}>
    <List component="nav">
      {
        listaMenu.map((e,index)=>(
          <Fragment key={index}>
          {e.submenu ?
          (permisos.some(p => parseInt(p.id_permiso_permiso)===parseInt(e.id)) || e.private===false) &&
          <>
            <ListItem button onClick={()=>switchOpen(e.open,e.id)} key={index}  >
              <ListItemIcon>
                <Icon color="inherit">{e.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={lang[e.title]}  />
              <Icon color="inherit" >{ e.open ? `expand_more` : `chevron_right` }</Icon>
            </ListItem>
            <Collapse in={e.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding className={style.submenu} >
                {
                  e.submenu.map((elem,i)=>(
                    (permisos.some(p => parseInt(p.id_permiso_permiso)===parseInt(elem.id)) || elem.private===false ) &&
                    <ListItem
                        key={i}
                        selected={l.pathname === elem.url}
                        button 
                        component={Link}
                        to={elem.url}
                        onClick={goTo}
                      >
                        <ListItemIcon>
                          <Icon color={elem.url===l.pathname ? "primary" : "inherit"}>{elem.icon}</Icon>
                        </ListItemIcon>
                        <ListItemText primary={lang[elem.title]} className={elem.url===l.pathname ? style.selected : null } />
                      </ListItem>
                  ))
                }
              </List>
            </Collapse>
          </> :
          <>
          {
            (permisos.some(p => parseInt(p.id_permiso_permiso)===parseInt(e.id)) || e.private===false) &&
            <ListItem
            selected={l.pathname === e.url}
            button
            component={Link}
            to={e.url}
            onClick={goTo}
            >
            <ListItemIcon>
              <Icon color={e.url===l.pathname ? "primary" : "inherit"}>{e.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={lang[e.title]} className={e.url===l.pathname ? style.selected : null } />
          </ListItem>
          }
          </> }
        </Fragment>
        )
        )
      }
    </List>
    </SimpleBar>
  )
}
    



export default Lists
