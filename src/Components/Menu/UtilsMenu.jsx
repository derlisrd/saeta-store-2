import {  Stack } from "@mui/material"
import LangMenu from "../LangMenu"
import ChangeThemeMenu from "../ThemeMenu/ChangeThemeMenu"
import UserMenu from "../UserMenu"



const UtilsMenu = () => {

  return (
    <Stack direction="row">
      <LangMenu />
      <ChangeThemeMenu />  
      <UserMenu />    
    </Stack>
  )
}

export default UtilsMenu
