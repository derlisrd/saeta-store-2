import { Drawer } from "@mui/material";
import { env } from "../../App/Config/config";
import MenuList from "./MenuList";
import { useMenu } from "./MenuProvider";

function DrawerDesktop() {
  const { DRAWER_WIDTH } = env;
  const {isOpenMenu,setIsOpenMenu} = useMenu()

  const changeMenu = ()=> setIsOpenMenu(!isOpenMenu)

  return (
    <Drawer
      variant="persistent"
      open={isOpenMenu}
      onClose={changeMenu}
      sx={{
        display: { xs: "none", md: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: DRAWER_WIDTH,
          borderRight: "1px dashed rgba(145, 158, 171, 0.24)",
        },
      }}
      
    >
      <MenuList />
    </Drawer>
  );
}

export default DrawerDesktop;
