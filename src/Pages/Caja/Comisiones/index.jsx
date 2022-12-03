import ComisionesLista from "./ComisionesLista";
import ComisionesProvider from "./ComisionesProvider";
import DialogPagar from "./DialogPagar";
import DialogPagarTodo from "./DialogPagarTodo";
import DialogRecibo from "./DialogRecibo";


function Comisiones(){
    return(<ComisionesProvider>
        <ComisionesLista />
        <DialogRecibo />
        <DialogPagar />
        <DialogPagarTodo />
    </ComisionesProvider>)
}
export default Comisiones;