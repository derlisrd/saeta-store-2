import { Alert, AlertTitle, TableCell, TableRow,Icon,IconButton,Typography,Stack,Tooltip } from "@mui/material";
import { StylesTabla } from "./StylesTabla";
import {funciones} from '../../../Functions'
import { green } from '@mui/material/colors';
import { useCompras } from "./ComprasProvider";
const ComprasTablaItems = () => {
  const classes = StylesTabla();
  const {datosCompra,Borrar,sumarItem,restarItem} = useCompras()
  const items_factura =  datosCompra.itemsFactura.slice(0).reverse();
  
  const Opciones = (codigo)=>(
    <div>
      <Tooltip title="Información del producto" arrow >
        <IconButton onClick={()=>{}} ><Icon style={{ color: green[500] }}>info</Icon></IconButton>
        </Tooltip>
      <Tooltip title="Remover" arrow ><IconButton onClick={()=>{Borrar(codigo)}} >
        <Icon color="secondary">delete</Icon></IconButton>
      </Tooltip>
    </div>
  )


  return (
    <>
      {items_factura.map((d, index) => (
              <TableRow key={index} className={classes.tablelist}>
                <TableCell className={classes.tableitem}>
                  <span className={classes.columname}>CÓDIGO:</span>
                  <span>{d.codigo_producto}</span>
                </TableCell>
                <TableCell className={classes.tableitem}>
                  <span className={classes.columname}>CANTIDAD:</span>
                  <span>
                <Stack direction="row">
                  <IconButton onClick={() => {restarItem(index)}}>
                    <Icon>remove_circle_outline</Icon>
                  </IconButton>
                  <Typography variant="h6">{d.stock_nuevo}</Typography>
                  <IconButton onClick={() => { sumarItem(index)}}>
                    <Icon>add_circle_outline</Icon>
                  </IconButton>
                </Stack>
                  </span>
                </TableCell>
                <TableCell className={classes.tableitem}>
                  <span className={classes.columname}>DESCRIP:</span>
                  <span><Typography variant="overline"> {d.nombre_producto}</Typography></span>
                </TableCell>

                <TableCell className={classes.tableitem}>
                  <span className={classes.columname}>PRECIO:</span>
                  <span>
                    {
                      funciones.numberSeparator( parseFloat(d.costo_producto) )
                    }
                  </span>
                </TableCell>
                
                
                <TableCell className={classes.tableitem}>
                  <span className={classes.columname}>SUBTOTAL:</span>
                  <span>
                    {
                      funciones.numberSeparator(parseFloat(d.costo_producto)*parseFloat(d.stock_nuevo))
                    }
                  </span>
                </TableCell>
                <TableCell className={classes.tableitem}>
                  <span className={classes.columname}>OPCIONES:</span>
                  <span>{Opciones(d.codigo_producto)}</span>
                </TableCell>
              </TableRow>
            ))}
            {
              items_factura.length===0 &&
              <>
                <TableRow>
                  <TableCell colSpan={7} align="center" >
                    <Alert severity="info" variant="outlined" icon={<Icon>shopping_basket</Icon>} >
                      <AlertTitle>FACTURA VACÍA</AlertTitle>
                    </Alert>
                  </TableCell>
                </TableRow>
              </>
            }
    </>
  );
};

export default ComprasTablaItems;
