import DialogFinalizar from './DialogFinalizar';
import DialogMain from './DialogMain';
import { Fragment } from 'react';
import ComprasUnder from './ComprasUnder';
import DialogInsert from './DialogInsert';


const Comprar = () => {
  
  return (
    <Fragment>
      <ComprasUnder />
      <DialogInsert />
      <DialogFinalizar />
      <DialogMain />
    </Fragment>
  )
}

export default Comprar
