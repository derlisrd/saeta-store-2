import { Alert, AlertTitle, TableCell, TableRow } from "@mui/material";

function Vacio({colSpan,classes}){
    return (
        <TableRow className={classes.tablelist} hover>
          <TableCell colSpan={colSpan} align="center">
            <Alert severity="warning" variant="outlined" icon={false}>
              <AlertTitle>NOTA VACÍA</AlertTitle>
            </Alert>
          </TableCell>
        </TableRow>
      );
}

export default Vacio;