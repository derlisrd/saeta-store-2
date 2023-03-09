import { useTheme } from "../../Contexts/TemaProvider"
import { Icon, IconButton } from "@mui/material"

export default function ChangeThemeMenu  () {

    const {changeTheme,tema} = useTheme();

  return (
    <IconButton onClick={changeTheme}>
          <Icon color={tema.mode==='dark'? 'inherit' : 'warning'}>{tema.mode==='dark'? 'dark_mode' : 'light_mode'}</Icon>
      </IconButton>
  )
}
