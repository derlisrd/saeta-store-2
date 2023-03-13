import InsumosLista from "./InsumosLista";
import InsumosProvider from "./InsumosProvider";

function Insumos() {
  return (
    <InsumosProvider>
      <InsumosLista />
    </InsumosProvider>
  );
}

export default Insumos;
