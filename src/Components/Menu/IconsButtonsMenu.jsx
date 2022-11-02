import { Icon, IconButton } from "@mui/material"
import { useMenu } from "../../Contexts/MenuProvider";


const IconsButtonsMenu = () => {
const {changeStateMenu,activeMenu,activeBigMenu,changeStateBigMenu} = useMenu();
  return (
    <>
    <IconButton sx={{ display: {md:'flex',lg:'none',justifyContent:'space-between' } }} onClick={()=>{changeStateMenu(!activeMenu)}}>
    <Icon color="primary"> {activeMenu ? "keyboard_double_arrow_left": "keyboard_double_arrow_right"}</Icon>
    </IconButton>
    <IconButton sx={{ display: { xs: 'none',lg:"flex",justifyContent:'space-between' } }} onClick={()=>{changeStateBigMenu(!activeBigMenu)}}>
       <Icon color="primary"> {activeBigMenu ? "keyboard_double_arrow_left": "keyboard_double_arrow_right"}</Icon>
    </IconButton>
    </>
  )
}

export default IconsButtonsMenu
