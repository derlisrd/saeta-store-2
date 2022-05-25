import React, { useRef } from "react";
import { useVentas } from "./VentasProvider";
import printJS from "print-js";
import { Dialog, DialogActions, DialogContent, DialogTitle, Icon, Zoom } from "@mui/material";
import ButtonCustom from "../../../Components/MuiCustom/ButtonCustom";
import ReactToPdf from "react-to-pdf";
function ImprimirPresupuesto() {
  const { datosFacturas, indexFactura, dialogs, setDialogs,Funciones } = useVentas();
  let da = { ...datosFacturas };
  let fa = da.facturas[indexFactura];
  const refPDF = useRef(null);
  const valorMoneda = parseFloat(fa.datosMoneda.valor_moneda);
  const cerrar = ()=> setDialogs({...dialogs,imprimirPresupuesto:false});
  const imprimir = () => {
    printJS({
      type: "html",
      printable: "print_presupuesto",
      style: ` .collapse {border-collapse:collapse}`,
    });
  };

  return (
    <>
      {dialogs.imprimirPresupuesto && (
        <Dialog
          open={dialogs.imprimirPresupuesto}
          fullWidth
          maxWidth="md"
          onClose={cerrar}
          TransitionComponent={Zoom}
        >
            <DialogTitle>
                Imprimir Presupuesto
            </DialogTitle>
            <DialogContent dividers>

            <div id="print_presupuesto" className="print_presupuesto" ref={refPDF}   style={{ display:"grid",gap:"2px" }}>
                <h4>Presupuesto</h4>
                <p>Nombre: {fa.datosCliente.nombre_cliente}</p>
                <p>Fecha: {fa.datosFactura.fecha_factura}</p>
                <p>Moneda: {fa.datosMoneda.nombre_moneda}</p>
                <table className="collapse"  cellPadding={2} border="1" style={{borderCollapse:"collapse"  }}>
                    <thead>
                        <tr>
                            <td>Cod.</td>
                            <td>Cant.</td>
                            <td>Desc.</td>
                            <td>Prec</td>
                            <td>Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            fa.itemsFactura.map((e,i)=>(
                                <tr key={i}>
                            <td>{e.codigo_producto}</td>
                            <td>{e.cantidad_producto}</td>
                            <td>{e.nombre_producto}</td>
                            <td>{Funciones.numberSeparator(e.precio_guardado / valorMoneda)}</td>
                            <td>{Funciones.numberSeparator(parseFloat(e.precio_guardado * e.cantidad_producto)/valorMoneda)}</td>
                        </tr>
                            ))
                        }
                        <tr>
                            <td colSpan={3}>

                            </td>
                            <td>
                            Total: 
                            </td>
                            <td>
                               {Funciones.numberFormat(fa.total/valorMoneda)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </DialogContent>
            <DialogActions>
            <ReactToPdf
              targetRef={refPDF}
              filename={`${fa.datosCliente.nombre_cliente}.pdf`}
            >
              {({ toPdf }) => (
                <ButtonCustom
                  variant="outlined"
                  startIcon={<Icon>picture_as_pdf</Icon>}
                  onClick={toPdf}
                >
                  PDF
                </ButtonCustom>
              )}
            </ReactToPdf>
                <ButtonCustom variant="outlined" onClick={imprimir}>Imprimir</ButtonCustom>
                <ButtonCustom variant="outlined" onClick={cerrar}>Cerrar</ButtonCustom>
            </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default ImprimirPresupuesto;
