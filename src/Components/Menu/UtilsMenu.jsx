import {  Stack, Typography } from "@mui/material"
import LangMenu from "../LangMenu"
import ChangeThemeMenu from "../ThemeMenu/ChangeThemeMenu"
import UserMenu from "../UserMenu"
import { useDatosEmpresa } from "../../Contexts/DatosEmpresaProvider";


const UtilsMenu = () => {
  const {EMPRESA} = useDatosEmpresa()
  return (
    <Stack direction="row"  alignItems="center">
      <Typography sx={{ display:{xs:"none",md:"inherit"} }} variant="button"> {EMPRESA.nombre_empresa ?? ''}</Typography>
      <LangMenu />
      <ChangeThemeMenu />  
      <UserMenu />    
    </Stack>
  )
}

export default UtilsMenu
