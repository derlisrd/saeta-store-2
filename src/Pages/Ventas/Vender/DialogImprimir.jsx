import React from "react";

import ImprimirFactura from "./ImprimirFactura";
import ImprimirTicket from "./ImprimirTicket";
import { useVentas } from "./VentasProvider";

const DialogImprimir = () => {
  const { dialogs } = useVentas();

  

  if(dialogs.imprimirTicket){
    return <ImprimirTicket />
  }
  
  if(dialogs.imprimirFactura){
    return <ImprimirFactura />
  }

  return (
    <></>
  );
};

export default DialogImprimir;
