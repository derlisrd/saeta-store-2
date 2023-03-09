import {  Stack, Typography } from "@mui/material"
import LangMenu from "../LangMenu"
import ChangeThemeMenu from "../ThemeMenu/ChangeThemeMenu"
import UserMenu from "../UserMenu"
//import { useDatosEmpresa } from "../../Contexts/DatosEmpresaProvider";
import Notifications from "../Notifications";
import { useLogin } from "../../Contexts/LoginProvider";


const UtilsMenu = () => {
  //const {EMPRESA} = useDatosEmpresa()
  const {dataEmpresa} = useLogin()
  return (
    <Stack direction="row"  alignItems="center">
      <Typography sx={{ display:{xs:"none",md:"inherit"} }} variant="button"> {dataEmpresa.nombre_empresa ?? ''}</Typography>
      <LangMenu />
      <ChangeThemeMenu />
      <Notifications />  
      <UserMenu />    
    </Stack>
  )
}

export default UtilsMenu
