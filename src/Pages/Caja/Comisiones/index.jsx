import ComisionesLista from "./ComisionesLista";
import ComisionesProvider from "./ComisionesProvider";
import DialogPagar from "./DialogPagar";
import DialogRecibo from "./DialogRecibo";


function Comisiones(){
    return(<ComisionesProvider>
        <ComisionesLista />
        <DialogRecibo />
        <DialogPagar />
    </ComisionesProvider>)
}
export default Comisiones;