import SimpleBar from 'simplebar-react';
import { Box } from "@mui/material";
import Menu from "../Components/Menu"
import { useMenu } from "../Contexts/MenuProvider";
import { useGlobalStyles } from "../Styles/GlobalStyles"
import {  makeStyles} from '@mui/styles'
import { useTheme } from "../Contexts/TemaProvider";
import 'simplebar-react/dist/simplebar.min.css';

const MainPage = ({children}) => {
  const {activeBigMenu} = useMenu()
  const {drawerWidth} = useTheme()
  const classes = useGlobalStyles();
  const useStyles = makeStyles((theme)=>({
    MainPaperExtended:{ // menu abierto en modo wide ejej
      margin:"20px 10px 0 10px",
      /* padding:theme.spacing(1), */
      minHeight:`calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
      padding:"30px 0px 10px 0px ",
      marginTop:theme.mixins.toolbar.minHeight,
      [theme.breakpoints.up("lg")]: {
        marginRight:drawerWidth+20,
        transform: `translateX(${(drawerWidth)}px)`,
        transition: "all .3s ease"
      },
  },
  }))
  const style = useStyles();
  return (
    <SimpleBar style={{ maxHeight: "100vh" }}>
      <Menu />
      <Box className={activeBigMenu ? style.MainPaperExtended : classes.MainPaper}  >
        {children}
      </Box>
    </SimpleBar>
  )
}

export default MainPage
