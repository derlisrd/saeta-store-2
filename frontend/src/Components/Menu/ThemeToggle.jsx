
import { IconButton,Icon } from "@mui/material";
import { useTheme } from "../../Contexts/TemaProvider";


function ThemeToggle() {
    const {changeTheme,tema } = useTheme()
    
    const icono = tema.mode === 'light' ?  'dark_mode' : 'tungsten'

    return (<IconButton onClick={changeTheme} ><Icon >{icono}</Icon></IconButton>  );
}

export default ThemeToggle;