import { Box, Divider, Toolbar, Typography,  } from "@mui/material"
import {  makeStyles} from '@mui/styles'
import { useMenu } from "../../Contexts/MenuProvider";
import { useTheme } from "../../Contexts/TemaProvider";
import IconsButtonsMenu from "./IconsButtonsMenu";
import Lists from "./Lists";


const MenuList = () => {
  const {drawerWidth} = useTheme();
  const {activeBigMenu} = useMenu()
  const classes = makeStyles((theme)=>({
    menu:{
      minWidth: drawerWidth, minHeight:"100%",
      [theme.breakpoints.up("lg")]: {
        marginLeft: activeBigMenu ? 0 : (-drawerWidth),
      },
      transition:"all .3s"
    }
    
  }))
  const style = classes();
  return (
    <Box className={style.menu}>
      <Toolbar>
         <IconsButtonsMenu /> <Typography variant="h6">Sistema</Typography>
      </Toolbar>
      <Divider />
      <Lists />
    </Box>
  )
}

export default MenuList
