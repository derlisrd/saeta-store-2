import printJS from "print-js";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Zoom } from "@mui/material";
import { useCompras } from "./ComprasProvider";
import {funciones} from "../../../Functions";

function ImprimirCompra() {
  const { datosCompra, dialogs, setDialogs,LimpiarTodo } = useCompras();
  let da = { ...datosCompra };
  const cerrar = ()=> {setDialogs({...dialogs,imprimir:false}); LimpiarTodo(); }
  const imprimir = () => {
    printJS({
      type: "html",
      printable: "print_compra",
      style: ` .collapse {border-collapse:collapse}`,
    });
  };

  return (
    <>
      
        <Dialog
          open={dialogs.imprimir}
          fullWidth
          maxWidth="md"
          onClose={cerrar}
          TransitionComponent={Zoom}
        >
            <DialogTitle>
                Imprimir
            </DialogTitle>
            <DialogContent dividers>

            <div id="print_compra" className="print"  style={{ display:"grid",gap:"2px" }}>
                <h4>Compra</h4>
                <p>Fecha: {da.fecha_compra}</p>
                <table className="collapse" border="1" style={{borderCollapse:"collapse"  }}>
                    <thead>
                        <tr>
                            <td>Cod.</td>
                            <td>Cant.</td>
                            <td>Desc.</td>
                            <td>Cost</td>
                            <td>Prec</td>
                            <td>Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            da.itemsFactura.map((e,i)=>(
                            <tr key={i}>
                              <td>{e.codigo_producto}</td>
                              <td>{e.stock_nuevo}</td>
                              <td>{e.nombre_producto}</td>
                              <td>{e.costo_producto}</td>
                              <td>{funciones.numberSeparator(e.precio_producto)}</td>
                              <td>{funciones.numberSeparator(parseFloat(e.precio_producto) * parseFloat(e.stock_nuevo))}</td>
                            </tr>
                            ))
                        }
                        <tr>
                            <td colSpan={4}>

                            </td>
                            <td>
                            Total: 
                            </td>
                            <td>
                               {funciones.numberFormat(da.total_factura)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={imprimir}>Imprimir</Button>
                <Button variant="outlined" onClick={cerrar}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    </>
  );
}

export default ImprimirCompra;

