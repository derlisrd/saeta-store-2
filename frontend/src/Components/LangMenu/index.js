
//this file depend of context language

import { Icon, IconButton, List, ListItem, ListItemText, Menu } from "@mui/material";
import { useState } from "react";
import { useLang } from "../../Contexts/LangProvider";

export default function ChangeLangMenu (){

    const {changeLang }= useLang();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (e) => {setAnchorEl(e.currentTarget);};
    const handleClose = () => {setAnchorEl(null);}

    const cambiar = (lang)=>{
        handleClose()
        changeLang(lang);
      }

    const codes = [{
        CODE:"es",
        LANG:"Español",
        flag:"",
    },
    {
        CODE:"en",
        LANG:"English",
        flag:"",
    }];



    return(<>
        <IconButton onClick={handleClick}>
            <Icon color="primary">language</Icon>
        </IconButton>
        <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <List>
            {
                codes.map((e,i)=>(
                <ListItem button key={i}>
                    <ListItemText onClick={()=>{cambiar(e.CODE)}} secondary={e.LANG} />
                </ListItem>
                ))
            }
        </List>
        </Menu>
        </>
    )
}