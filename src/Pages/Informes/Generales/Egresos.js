

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useInformes} from './InformesProvider';
import { funciones } from '../../../Functions';


export default function Egresos() {


  const {listaMensual} = useInformes();
  
 
  const FilterData =  listaMensual.filter(
    (item) => item.tipo_registro==="0"
  );

  const FilterArray = FilterData.reverse()

  return (
    <TableContainer component={Paper}>
      <Table>
        <caption>Pagos realizados</caption>
        <TableHead>
          <TableRow>
            <TableCell>Descripción</TableCell>
            <TableCell align="right">Fecha</TableCell>
            <TableCell align="right">Monto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {FilterArray.map((row,i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {row.detalles_movimiento}
              </TableCell>
              <TableCell align="right"> { funciones.fechaActualDMY(row.fecha_movimiento)}</TableCell>
              <TableCell align="right"> { funciones.numberSeparator( row.monto_movimiento)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}