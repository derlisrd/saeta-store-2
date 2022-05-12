import { Icon, IconButton, Stack } from "@mui/material"
import { useTheme } from "../../Contexts/TemaProvider"


const UserMenu = () => {

    const {changeTheme} = useTheme();

  return (
    <Stack direction="row">
      <IconButton onClick={changeTheme}>
          <Icon>light_mode</Icon>
      </IconButton>
      <IconButton onClick={changeTheme}>
          <Icon>light_mode</Icon>
      </IconButton>
    </Stack>
  )
}

export default UserMenu
