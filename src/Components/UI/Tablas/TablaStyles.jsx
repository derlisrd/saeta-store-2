import {  makeStyles} from '@mui/styles';

export const useTablaStyles = makeStyles((theme)=>({
    boxContainer:{
        backgroundColor: theme.palette.background.paper,
        marginBottom:20,
    },
    arrow:{
        fontSize:"18px",
        cursor: "pointer",
        padding:"0 3px"
    },
    tcontainer:{
        overflowX: "initial !important",
        position: "relative",
        
    },
    table:{
        borderCollapse:"inherit",
    },
    thead:{
        position: "sticky",
        top:theme.mixins.toolbar.minHeight + 6,
        textTransform:"uppercase",
        zIndex:1051,
        [theme.breakpoints.down("md")]: {
            display: "none !important",
          },
    },
    trtitles:{
        backgroundColor: theme.palette.action.hover,
        "& th ":{
            border:"none"
        },
        "& :nth-child(1)": {
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
        },
        " & :last-child":{
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8
        },
        
    },
    tbody:{
        
    },
    tableRow: {
        [theme.breakpoints.down("md")]: {
          display: "flex !important",
          flexDirection: "column",
          marginBottom: theme.spacing(2),
          border:"3px solid "+theme.palette.action.hover,
          borderRadius:8,
          " & :last-child":{
            border:"none"
        }
        }
      }, 
    tableCell:{
        [theme.breakpoints.down("md")]: {
            display: "flex !important",
            justifyContent: "space-between",
          },
    },
    columntitleSpan:{
        display: "none",
        textTransform: "uppercase",
        [theme.breakpoints.down("md")]: {
            display: "block",
            fontWeight:"bold"
          },
    }
}))