import InformesProductosProvider from "./InformesProductosProvider";
import Lista from "./Lista";
import ShowDialog from "./ShowDialog";

function InformesProductos() {
  return (
    <InformesProductosProvider>
      <Lista />
      <ShowDialog />
    </InformesProductosProvider>
  );
}

export default InformesProductos;
