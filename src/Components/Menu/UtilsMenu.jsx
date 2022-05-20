import {  Stack } from "@mui/material"
import LangMenu from "../LangMenu"
import ChangeThemeMenu from "../ThemeMenu/ChangeThemeMenu"



const UtilsMenu = () => {

  return (
    <Stack direction="row">
      <LangMenu />
      <ChangeThemeMenu />      
    </Stack>
  )
}

export default UtilsMenu
