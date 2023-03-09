import { makeStyles } from "@mui/styles";

export const StylesTabla = makeStyles((theme) => ({
  tableContainer: {
    position: "relative",
    overflowX: "unset",
    marginBottom: 25,
    padding: "2px",
    transition:'all 0.1s linear',
  },
  tableheader: {
    [theme.breakpoints.down("md")]: {
      display: "none !important",
    },
  },
  tablecell: {
    position: "sticky",
    zIndex: 1,
    transition:'all 0.2s linear',
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
    },
  },
  columname: {
    display: "none",
    textTransform: "uppercase",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  
}));
