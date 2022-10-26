import { AppBar, Toolbar, SwipeableDrawer,Box,Drawer} from "@mui/material"
import { useMenu } from "../../Contexts/MenuProvider"
import { useGlobalStyles } from "../../Styles/GlobalStyles";
import IconsButtonsMenu from "./IconsButtonsMenu";
import MenuList from "./MenuList";
import UtilsMenu from "./UtilsMenu";


const Menu = () => {
    const {changeStateMenu,sideMenu,activeMenu,activeBigMenu,changeStateBigMenu} = useMenu();

    const styles = useGlobalStyles();

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="fixed" color="inherit" >
      <Toolbar  >
        <div className={styles.toolbar}>
            <IconsButtonsMenu />
            <UtilsMenu />
        </div>
      </Toolbar>
    </AppBar>
    </Box>
      <Drawer
        sx={{ display: { xs: 'none',lg:"inherit" } }}
        variant="permanent"
        anchor={sideMenu}
        open={activeBigMenu}
        onClose={()=>{changeStateBigMenu(false)}}
      >
        <MenuList />
      </Drawer>

    <SwipeableDrawer
        sx={{ display: { md: 'flex',lg:"none" },transform:"all .3s" }}
        anchor={sideMenu}
        open={activeMenu}
        onClose={()=>{changeStateMenu(false)}}
        onOpen={()=>{changeStateMenu(true)}}
    >
        <MenuList />
    </SwipeableDrawer>   
    </>
  )
}

export default Menu
