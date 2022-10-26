
import { Box, Typography } from "@mui/material";
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
      margin:"20px 15px 0 15px",
      /* padding:theme.spacing(1), */
      minHeight:`calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
      padding:"30px 5px 10px 5px ",
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
      <Box className={activeBigMenu ? style.MainPaperExtended : classes.MainPaper}  >
        {children}
        <Box p={1} m={1}>
          <Typography component="div" sx={{ position:"fixed", bottom:10, right:15, opacity:"0.2" }} variant="subtitle2">Desarrollado por el equipo de 9 tres cuarto</Typography>
        </Box>
      </Box>
    </>
  )
}

export default MainPage
