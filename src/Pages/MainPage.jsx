
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
    MainPaperExtended:{ // menu abierto en modo wide ejej
      margin:"15px 15px 0 15px",
      /* padding:theme.spacing(1), */
      minHeight:`calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
      paddingTop:"40px",
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
    <>
    <Menu />
      <Box className={activeBigMenu ? style.MainPaperExtended : classes.MainPaper} paddingY={1} paddingX={0}>
        {children}
      </Box>
    </>
  )
}

export default MainPage
