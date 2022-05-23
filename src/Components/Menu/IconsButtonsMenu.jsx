import { Icon, IconButton } from "@mui/material"
import { useMenu } from "../../Contexts/MenuProvider";


const IconsButtonsMenu = () => {
const {changeStateMenu,activeMenu,activeBigMenu,changeStateBigMenu} = useMenu();
  return (
    <>
    <IconButton sx={{ display: {md:'inline-block',lg:'none' } }} onClick={()=>{changeStateMenu(!activeMenu)}}>
    <Icon> {activeMenu ? "keyboard_double_arrow_left": "keyboard_double_arrow_right"}</Icon>
    </IconButton>
    <IconButton sx={{ display: { xs: 'none',lg:"block" } }} onClick={()=>{changeStateBigMenu(!activeBigMenu)}}>
       <Icon> {activeBigMenu ? "keyboard_double_arrow_left": "keyboard_double_arrow_right"}</Icon>
    </IconButton>
    </>
  )
}

export default IconsButtonsMenu
