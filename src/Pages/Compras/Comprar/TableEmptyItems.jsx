import { Alert, AlertTitle, TableCell, TableRow } from "@mui/material";
import React from "react";

const TableEmptyItems = ({ colSpan, classes }) => {
  return (
    <TableRow className={classes.tablelist}>
      <TableCell colSpan={colSpan} align="center">
        <Alert severity="warning" variant="outlined" icon={false}>
          <AlertTitle>FACTURA VACÍA</AlertTitle>
        </Alert>
      </TableCell>
    </TableRow>
  );
};

export default TableEmptyItems;
