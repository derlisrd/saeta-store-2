import { useTheme } from "../../Contexts/TemaProvider"
import { Icon, IconButton } from "@mui/material"

const ChangeThemeMenu = () => {

    const {changeTheme} = useTheme();

  return (
    <IconButton onClick={changeTheme}>
          <Icon>light_mode</Icon>
      </IconButton>
  )
}

export default ChangeThemeMenu
