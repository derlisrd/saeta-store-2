import SimpleBar from 'simplebar-react';
import { Box } from "@mui/material";
//import Menu from "../Components/Menu"
/* import { useMenu } from "../Contexts/MenuProvider"; */
/* import { useGlobalStyles } from "../Styles/GlobalStyles"
import {  makeStyles} from '@mui/styles'
import { useTheme } from "../Contexts/TemaProvider"; */
import 'simplebar-react/dist/simplebar.min.css';
import { useLogin } from '../Contexts/LoginProvider';
import { Navigate } from 'react-router-dom';
import { useMenu } from '../Components/Menu/MenuProvider';
import { env } from '../App/Config/config';
import ToolbarMain from '../Components/Menu/ToolbarMain';
import DrawerMainMenu from '../Components/Menu';

const MainPage = ({children}) => {
  //const {activeBigMenu} = useMenu()

  const {DRAWER_WIDTH} = env
  const {isOpenMenu} = useMenu()
  const {userData} = useLogin()

  let margin_left = isOpenMenu ? `${DRAWER_WIDTH}px` : '0';
  let width_main = isOpenMenu ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%';

  let stylesMain = {px:2, mb:'70px',mt:'65px', ml:{ md: margin_left}, width: { md: width_main},bgcolor:'background.paper',minHeight:"calc(100vh - 80px)",transition:'all 0.2s' }

  if(!userData.login){
    return <Navigate to="/" />
  }

  return (
    <SimpleBar style={{ maxHeight: "100vh" }}>
      <DrawerMainMenu />
      <ToolbarMain />
        <Box component="main" 
            sx={stylesMain} >
          {children}
        </Box>
    </SimpleBar>
  )
}

export default MainPage
