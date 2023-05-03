import { makeStyles } from "@mui/styles";

export const StylesTablaFacturaReponsive = makeStyles((theme) => ({
  tableContainer: {
    position: "relative",
    overflowX: "unset",
    marginBottom:'20px',
    padding: "2px",
    marginTop:'15px',
    transition:'all 0.1s linear',
    textAlign:'center'
  },
  tableheader: {
    [theme.breakpoints.down("md")]: {
      display: "none !important",
    },
    textAlign:'center'
  },
  tablecell: {
    position: "sticky",
    zIndex: 1,
    transition:'all 0.2s linear',
    textAlign:'center',
    padding: '5px',
    backgroundColor:theme.palette.background.default
  },
  tablelist: {
    [theme.breakpoints.down("md")]: {
      display: "flex !important",
      flexDirection: "column",
      border: "1px solid silver",
      margin: "0 0 10px 0",
      
    },
    borderRadius:"8px"
  },
  tableitem: {
    [theme.breakpoints.down("md")]: {
      display: "flex !important",
      justifyContent: "space-between",
      padding:'8px'
    },
    padding:'2px',
    textAlign:'center'
  },
  columname: {
    display: "none",
    textTransform: "uppercase",
    [theme.breakpoints.down("md")]: {
      display: "block",
    }
    
  },
  
}));
