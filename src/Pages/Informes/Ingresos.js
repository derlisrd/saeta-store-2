import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useInformes } from "./InformesProvider";
import { funciones as Funciones } from '../../Functions';

export default function Ingresos() {
  const { listaMensual } = useInformes();
  
  const FilterData =  listaMensual.filter((item) => item.tipo_registro === "1");

  const FilterArray = FilterData.reverse().slice(0,6);

  return (
    <TableContainer component={Paper}>
      <Table>
        <caption>Últimos ingresos</caption>
        <TableHead>
          <TableRow>
            <TableCell>Descripción</TableCell>
            <TableCell align="right">Fecha</TableCell>
            <TableCell align="right">Monto</TableCell>
            <TableCell align="right">Sin efectivo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {FilterArray.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {row.detalles_movimiento}
              </TableCell>
              <TableCell align="right">
                {" "}
                {Funciones.fechaActualDMY(row.fecha_movimiento)}
              </TableCell>
              <TableCell align="right">
                {" "}
                {Funciones.numberSeparator(row.monto_movimiento)}
              </TableCell>
              <TableCell align="right">
                {" "}
                {Funciones.numberSeparator(row.monto_sin_efectivo)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
