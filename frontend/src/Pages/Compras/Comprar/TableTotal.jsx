import { Alert, TableCell, TableRow, Typography } from "@mui/material";
import { useCompras } from "../ComprasProvider";

function TableTotal({colSpan,total}) {
    const {lang,funciones} = useCompras()
  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center">
        <Alert severity="info" variant="outlined" icon={false}>
          <Typography variant="button">{lang.total} : {funciones.numberFormat(total)}</Typography>
        </Alert>
      </TableCell>
    </TableRow>
  );
}
export default TableTotal;
