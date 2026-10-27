import { Alert, AlertTitle, TableCell, TableRow } from "@mui/material";


const VentasTableVacio = ({colSpan,classes}) => {
  return (
    <TableRow className={classes.tablelist} hover>
      <TableCell colSpan={colSpan} align="center">
        <Alert severity="warning" variant="outlined" icon={false}>
          <AlertTitle>FACTURA VACÍA</AlertTitle>
        </Alert>
      </TableCell>
    </TableRow>
  );
};

export default VentasTableVacio;
