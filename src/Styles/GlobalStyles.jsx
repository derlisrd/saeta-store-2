import {  makeStyles} from '@mui/styles'

export const useGlobalStyles = makeStyles((theme)=>({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        backdropFilter:"blur(2px)",
      },
    MainPaper:{
        margin:"15px 15px 0 15px",
        padding:"30px 5px 10px 5px ",
        minHeight:'100vh',
        marginTop:theme.mixins.toolbar.minHeight,
        transition:"all .3s",
        marginBottom:theme.mixins.toolbar.minHeight,
    },
    centerDivLogin:{
        minHeight:`calc(100vh - 20px)`,
        justifyContent:"center",
        alignItems:"center",
        display:"flex",
        flexDirection:"column",
        margin: "5px 10px"
      },
    formularioLogin:{
        padding: 20,
        margin:"5px auto",
        border: "1px solid whitesmoke",
        borderRadius: 10,
        /* background:theme.palette.background.blueSky */
    },
    toolbar:{
        display:"flex",
        flexWrap:'wrap',
        flexDirection:"row",
        justifyContent:"space-between",
        width: "100%",
    },
    selected: {
        "& span":{
          color: theme.palette.primary.main,
        }
      },
    submenu:{
      paddingLeft: theme.spacing(2)+" !important",
    }
}))