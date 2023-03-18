import { Drawer } from "@mui/material";
import { env } from "../../App/Config/config";
import MenuList from "./MenuList";
import { useMenu } from "./MenuProvider";

function DrawerMobile() {
    const {DRAWER_WIDTH} = env
    const {mobileOpen,setMobileOpen} = useMenu()
    const handleDrawerToggle = ()=>{ setMobileOpen(!mobileOpen) }
  
    return ( <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { bosmizing: 'border-box', width:DRAWER_WIDTH },
        }}
      >
        <MenuList isMobile={true} />
      </Drawer> );
}

export default DrawerMobile;