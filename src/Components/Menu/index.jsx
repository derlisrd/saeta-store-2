import { AppBar, Toolbar, SwipeableDrawer,Box,Drawer} from "@mui/material"
import { useMenu } from "../../Contexts/MenuProvider"
import { useGlobalStyles } from "../../Styles/GlobalStyles";
import IconsButtonsMenu from "./IconsButtonsMenu";
import MenuList from "./MenuList";
import UserMenu from "./UserMenu";


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
            <UserMenu />
        </div>
      </Toolbar>
    </AppBar>
    </Box>
      <Drawer
        sx={{ display: { xs: 'none',lg:"block" } }}
        variant="permanent"
        anchor={sideMenu}
        open={activeBigMenu}
        onClose={()=>{changeStateBigMenu(false)}}
      >
        <MenuList />
      </Drawer>

    <SwipeableDrawer
        sx={{ display: { md: 'block',lg:"none" },transform:"all .3s" }}
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
