import Comprar from './Comprar';
import ComprasProvider from './ComprasProvider';

export default function Compras() {
  return (
    <ComprasProvider>
      <Comprar />
    </ComprasProvider>
  );
}
