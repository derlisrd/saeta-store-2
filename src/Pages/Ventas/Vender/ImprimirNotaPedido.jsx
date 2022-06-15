import React, { useRef } from "react";
import { useVentas } from "./VentasProvider";
import printJS from "print-js";
import { Dialog, DialogActions, DialogContent, DialogTitle, Icon, Zoom } from "@mui/material";
import ButtonCustom from "../../../Components/MuiCustom/ButtonCustom";
import ReactToPdf from "react-to-pdf";

function ImprimirNotaPedido() {
  const { datosFacturas, indexFactura, dialogs, setDialogs,Funciones,lang,IDNotaPedido } = useVentas();
  let da = { ...datosFacturas };
  let fa = da.facturas[indexFactura];
  const refPDF = useRef(null);
  const valorMoneda = parseFloat(fa.datosMoneda.valor_moneda);
  const cerrar = ()=> setDialogs({...dialogs,imprimirNotaPedido:false});
  const imprimir = () => {
    printJS({
      type: "html",
      printable: "print_nota",
      style: ` .collapse {border-collapse:collapse}`,
    });
  };

  return (
    <>
      {dialogs.imprimirNotaPedido && (
        <Dialog
          open={dialogs.imprimirNotaPedido}
          fullWidth
          maxWidth="md"
          onClose={cerrar}
          TransitionComponent={Zoom}
        >
            <DialogTitle>
                {lang.imprimir_nota_pedido}
            </DialogTitle>
            <DialogContent dividers>

            <div id="print_nota" className="print_nota" ref={refPDF}   style={{ display:"grid",gap:"2px" }}>
                <h2>{lang.nota_de_pedido}</h2>
                <h2>{lang.nro_de_pedido}: {IDNotaPedido}</h2>
                <p>{lang.nombre}: {fa.datosCliente.nombre_cliente}</p>
                <p>{lang.fecha}: {fa.datosFactura.fecha_factura}</p>
                <p>{lang.moneda}: {fa.datosMoneda.nombre_moneda}</p>
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

export default ImprimirNotaPedido;
