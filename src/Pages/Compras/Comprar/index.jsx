import DialogFinalizar from './DialogFinalizar';
import DialogMain from './DialogMain';
import { Fragment } from 'react';
import ComprasUnder from './ComprasUnder';
import DialogInsert from './DialogInsert';
import DialogBuscarProducto from './DialogBuscarProducto';


const Comprar = () => {
  
  return (
    <Fragment>
      <ComprasUnder />
      <DialogBuscarProducto />
      <DialogInsert />
      <DialogFinalizar />
      <DialogMain />
    </Fragment>
  )
}

export default Comprar
