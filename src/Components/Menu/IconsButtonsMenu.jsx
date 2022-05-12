import { Icon, IconButton } from "@mui/material"
import { useMenu } from "../../Contexts/MenuProvider";


const IconsButtonsMenu = () => {
const {changeStateMenu,activeMenu,activeBigMenu,changeStateBigMenu} = useMenu();
  return (
    <>
    <IconButton sx={{ display: {md:'inline-block',lg:'none' } }} onClick={()=>{changeStateMenu(!activeMenu)}}>
      <Icon>menu</Icon>
    </IconButton>
    <IconButton sx={{ display: { xs: 'none',lg:"block" } }} onClick={()=>{changeStateBigMenu(!activeBigMenu)}}>
       <Icon>menu</Icon>
    </IconButton>
    </>
  )
}

export default IconsButtonsMenu
