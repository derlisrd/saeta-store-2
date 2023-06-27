import CobrarProvider from "./CobrarProvider";
import DialogCobrar from "./DialogCobrar";
import DialogDetalles from "./DialogDetalles";
import ListaCobrar from "./ListaCobrar";

function Cobrar() {

    return (<CobrarProvider>
        <DialogCobrar />
        <DialogDetalles />
        <ListaCobrar /> 
    </CobrarProvider>  );
}

export default Cobrar ;