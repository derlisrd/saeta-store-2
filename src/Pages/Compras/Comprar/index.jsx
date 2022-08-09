import DialogFinalizar from './DialogFinalizar';
import DialogMain from './DialogMain';
import { Fragment } from 'react';
import ComprasUnder from './ComprasUnder';


const Comprar = () => {
  
  return (
    <Fragment>
      <ComprasUnder />
      <DialogFinalizar />
      <DialogMain />
    </Fragment>
  )
}

export default Comprar
