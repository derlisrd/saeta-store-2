import {Table,TableContainer,TableHead,TableRow,TableCell,TableBody,Typography} from "@mui/material";
  import { StylesTabla } from "./StylesTabla";
  
import ComprasTablaItems from "./ComprasTablaItems";

const columnas = [
  {
    field: "codigo_producto",
    headerName: "Código",
  },
  {
    field: "cantidad_producto",
    headerName: "Cantidad",
  },
  {
    field: "nombre_producto",
    headerName: "Descripción",
  },
  {
    field:"precio_producto",
    headerName:"Precio",
  },
  {
    field:"subtotal",
    headerName:"Subtotal",
  },
]

const ComprasTabla = () => {

  
  const classes = StylesTabla()
  return (
    <>
        <TableContainer className={classes.tableContainer}>
        <Table>
          <TableHead className={classes.tableheader}>
            <TableRow>
              {columnas.map((data, index) => (
                <TableCell
                  align="left"
                  key={index}
                  className={classes.tablecell}
                >
                  <Typography variant="overline">{data.headerName}</Typography>
                </TableCell>
              ))}
              <TableCell className={classes.tablecell}>
                <Typography variant="overline">OPCIONES</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <ComprasTablaItems />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ComprasTabla
