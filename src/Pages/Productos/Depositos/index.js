import DepositosLista from './DepositosLista'
import DepositosProvider from './DepositosProvider'
import DialogDepositos from './DialogDepositos'

const Depositos = () => {
  return (
    <DepositosProvider>
      <DepositosLista />
      <DialogDepositos/>
    </DepositosProvider>
  )
}

export default Depositos
