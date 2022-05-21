import { useTheme } from "../../Contexts/TemaProvider"
import { Icon, IconButton } from "@mui/material"

export default function ChangeThemeMenu  () {

    const {changeTheme,themeMode} = useTheme();

  return (
    <IconButton onClick={changeTheme}>
          <Icon color={themeMode==='dark'? 'inherit' : 'warning'}>{themeMode==='dark'? 'dark_mode' : 'light_mode'}</Icon>
      </IconButton>
  )
}


