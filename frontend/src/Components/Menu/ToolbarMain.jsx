
import {Icon, IconButton, Toolbar, Stack, Box, Typography } from "@mui/material";
import { env } from "../../App/Config/config";
import { useLogin } from "../../Contexts/LoginProvider";

import { useMenu } from "./MenuProvider";

import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";


const Icono = ()=>( <Icon>menu</Icon>)

function ToolbarMain() {
  const {dataEmpresa} = useLogin()
  const {DRAWER_WIDTH} = env
  const {mobileOpen,setMobileOpen,setIsOpenMenu,isOpenMenu} = useMenu()
  const handleDrawerToggle = ()=>{ setMobileOpen(!mobileOpen) }
  const DesktopMenu = ()=>{ setIsOpenMenu(!isOpenMenu)}

  let margin_left = isOpenMenu ? `${DRAWER_WIDTH}px` : '0';


    

  return (

      
      <Toolbar
      component="header"
      sx={{ position:'fixed', display: "flex", width:'100%', zIndex:1100,  
      backdropFilter:'blur(5px)',  alignItems: "center",padding:'0 !important'}}
      >
        <Box display='flex' justifyContent='space-between' width='100%' alignItems="center" >
          <Box>
              <IconButton onClick={handleDrawerToggle} sx={{ minWidth:'50px', display:{xs:'block',md:'none'} }}>
              <Icono />
            </IconButton>
            <IconButton onClick={DesktopMenu} sx={{  minWidth:'50px', marginLeft: margin_left, display:{xs:'none', md:'block',transition:'all 0.2s'} }}>
              <Icono />
            </IconButton>
          </Box>
          <Stack direction='row' alignItems="center" spacing={1} marginRight={1} >
            <Typography sx={{ display:{xs:"none",md:"inherit"} }} variant="button"> {dataEmpresa.nombre_empresa ?? ''}</Typography>
            <ThemeToggle />
            <UserMenu />
          </Stack>
        </Box>
    </Toolbar>

  );
}

export default ToolbarMain;
