import { useFacturas } from './FacturasProvider'
import ImprimirFacturaA4 from './Imprimir/ImprimirFacturaA4';
import ImprimirReciboA4 from './Imprimir/ImprimirReciboA4';
import ImprimirTicketFactura from './Imprimir/ImprimirTicketFactura';
import ImprimirTicketRecibo from './Imprimir/ImprimirTicketRecibo';


const Impresion = () => {

    const {dialogs} = useFacturas();

    if(dialogs.imprimirTicketRecibo){
      return <ImprimirTicketRecibo />
    }
    
    if(dialogs.imprimirTicketFactura){
      return <ImprimirTicketFactura />
    }
  
    if(dialogs.imprimirFacturaA4){
      return <ImprimirFacturaA4 />
    }
  
    if(dialogs.imprimirReciboA4){
      return <ImprimirReciboA4 />
    }
    

  return (
    <>
      
    </>
  )
}

export default Impresion
