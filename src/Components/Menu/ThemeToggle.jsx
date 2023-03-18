import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";
import { useTheme } from "../../Contexts/TemaProvider";


function ThemeToggle() {
    const {changeTheme,tema } = useTheme()
    
    const icono = tema.mode === 'light' ?  'icon-park-twotone:dark-mode' : 'ic:twotone-light-mode'

    return (<IconButton onClick={changeTheme} ><Icon icon={icono} height={24} /></IconButton>  );
}

export default ThemeToggle;