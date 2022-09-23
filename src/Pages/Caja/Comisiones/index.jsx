import ComisionesLista from "./ComisionesLista";
import ComisionesProvider from "./ComisionesProvider";


function Comisiones(){
    return(<ComisionesProvider>
        <ComisionesLista />
    </ComisionesProvider>)
}
export default Comisiones;