import CuentasClienteProvider from "./CuentasClienteProvider";
import DialogFactura from "./DialogFactura";
import Lista from "./Lista";

function CuentasCliente() {


    return (<CuentasClienteProvider>
        <DialogFactura />
        <Lista />
    </CuentasClienteProvider>  );
}

export default CuentasCliente;