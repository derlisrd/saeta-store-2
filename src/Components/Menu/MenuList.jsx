import {Collapse,IconButton,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Stack,Toolbar,Typography,Icon} from "@mui/material";
import { Link,useLocation } from "react-router-dom";

import { Fragment,useState } from "react";
import styles from './styles.module.css'
import { useMenu } from "./MenuProvider";
import SimpleBar from "simplebar-react";
import { listaMenu } from "../../Utils/listaMenu";
import { useLogin } from "../../Contexts/LoginProvider";
import { useLang } from "../../Contexts/LangProvider";


function MenuList({isMobile}) {
  const {userData} = useLogin()
  const {lang}= useLang()
  const {permisos} = userData;

  let location = useLocation();
  const pathname =  (location.pathname) //.substring(6);

  const [lista,setLista] = useState(listaMenu);

  const {setMobileOpen} = useMenu()

  const closeMobileMenu = ()=> setMobileOpen(false);

  const openCollapseMenu = (sw,id)=>{
    let array = [...lista];
    let index = array.findIndex((e)=> e.id===id)
    array[index].open = !sw;
    setLista(array);
  }

  const SELECTED = {"&.Mui-selected":{borderRadius:'0 18px 18px 0', margin:'0 2px',borderLeftStyle:'solid',borderLeftWidth:'4px',borderLeftColor:'primary.main', 
  "div":{color:'primary.main'},'span':{fontWeight:'bold',color:'primary.main'}}  }

  return (<SimpleBar forceVisible="y" autoHide={true} style={{ maxHeight: "100vh" }}>
    <Toolbar >
      <Stack direction='row' alignItems='center' justifyContent='space-between' width='100%'>
        {isMobile && <IconButton onClick={closeMobileMenu} ><Icon>menu_open</Icon></IconButton>}
        <Typography align="center" variant="subtitle1">SISTEMA</Typography>
        </Stack>
      </Toolbar>
      <List >

        {lista.map((e, i) => (
          <Fragment key={i}>
            {e.sub ? (
              <Fragment>
              <ListItem disablePadding >
                <ListItemButton  onClick={()=>openCollapseMenu(e.open,e.id)} className={styles.listmenu}>
                  <ListItemIcon className={styles.iconmenu}>
                  <Icon sx={{ color:e.color}} >{e.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText className={styles.textmenu}  primary={lang[e.title]} />
                  <Icon>{e.open ? `expand_less` : `expand_more`}</Icon>
                    
                </ListItemButton>
              </ListItem>
                <Collapse in={e.open} timeout="auto" unmountOnExit>
                  <List component="div" className={styles.submenu} disablePadding >
                    {
                      
                      e.submenu.map((elem,indexsub)=>(
                        (permisos.some(p => parseInt(p.id_permiso_permiso)===parseInt(elem.id)) || elem.private===false ) &&
                        <ListItem disablePadding key={indexsub}>
                          <ListItemButton selected={pathname === elem.url} sx={SELECTED}  onClick={closeMobileMenu} component={Link} to={ elem.url} className={styles.listmenu}>
                            <ListItemIcon className={styles.iconmenu}>
                            <Icon>{elem.icon}</Icon>
                            </ListItemIcon>
                            <ListItemText className={styles.textmenu}  primary={lang[elem.title]} />
                          </ListItemButton>
                        </ListItem>
                      ))
                    }
                  </List>
                </Collapse>
              </Fragment>
            ) : (
              <ListItem disablePadding>
                <ListItemButton selected={pathname === e.url}  
                  sx={SELECTED}
                onClick={closeMobileMenu} className={styles.listmenu}  component={Link} to={e.url}>
                  <ListItemIcon className={styles.iconmenu}>
                    <Icon sx={{ color:e.color}} >{e.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText className={styles.textmenu} primary={lang[e.title]} />
                </ListItemButton>
              </ListItem>
            )}
          </Fragment>
        ))}

      </List>
      </SimpleBar>
  );
}

export default MenuList;
