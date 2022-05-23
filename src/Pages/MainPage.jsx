
import { Box } from "@mui/material";
import Menu from "../Components/Menu"
import { useMenu } from "../Contexts/MenuProvider";
import { useGlobalStyles } from "../Styles/GlobalStyles"
import {  makeStyles} from '@mui/styles'
import { useTheme } from "../Contexts/TemaProvider";


const MainPage = ({children}) => {
  const {activeBigMenu} = useMenu()
  const {drawerWidth} = useTheme()
  const classes = useGlobalStyles();
  const useStyles = makeStyles((theme)=>({
    MainPaperExtended:{
      margin:"0 15px",padding:theme.spacing(1),minHeight:'100vh',
      marginTop:theme.mixins.toolbar.minHeight+20,
      [theme.breakpoints.up("lg")]: {
        marginRight:drawerWidth,
        transform: `translateX(${(drawerWidth)}px)`,
        transition: "all .3s ease"
      },
  },
  }))
  const style = useStyles();
  return (
    <>
    <Menu />
      <Box className={activeBigMenu ? style.MainPaperExtended : classes.MainPaper}>
        {children}
      </Box>
    </>
  )
}

export default MainPage
