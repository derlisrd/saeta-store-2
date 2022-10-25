import InformesProductosProvider from "./InformesProductosProvider";
import Lista from "./Lista";

function InformesProductos() {
  return (
    <InformesProductosProvider>
      <Lista />
    </InformesProductosProvider>
  );
}

export default InformesProductos;
