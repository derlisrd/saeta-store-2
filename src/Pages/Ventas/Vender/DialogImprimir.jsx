import ImprimirFacturaA4 from "./Impresiones/ImprimirFacturaA4";
import ImprimirReciboA4 from "./Impresiones/ImprimirReciboA4";
import ImprimirTicketFactura from "./Impresiones/ImprimirTicketFactura";
import ImprimirTicketRecibo from "./Impresiones/ImprimirTicketRecibo";


import { useVentas } from "./VentasProvider";

const DialogImprimir = () => {
  const { dialogs } = useVentas();
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
    <></>
  );
};

export default DialogImprimir;
