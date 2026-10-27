import {
  Alert,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useVentas } from "./VentasProvider";

const ListaAguarda = ({outside}) => {
  const { datosFacturas, setearIndexFactura,indexFactura,dialogs,setDialogs } = useVentas();



  const volverAventa = i=>{
    if(outside){
      setDialogs({...dialogs,main:true});
      setearIndexFactura(i);
    }else{
      setearIndexFactura(i);
    }
  }

  return (
    <>
      {datosFacturas.facturas.length > 1 && (
        <>
          <Alert icon={false}>Pedidos en espera</Alert>
          <List>
            {datosFacturas.facturas.map((e, i) => (
              
                (i!==indexFactura && e.guardado  ) && 
                <ListItem disablePadding key={i}>
                <ListItemButton onClick={()=>{ volverAventa(i)}}>
                  <ListItemIcon>
                    <Icon>keyboard_arrow_right</Icon>
                  </ListItemIcon>
                  <ListItemText primary={`${e.itemsFactura.length} item(s) -  ${e.datosCliente.nombre_cliente}`} />
                </ListItemButton>
              </ListItem> 
              
            ))}
          </List>
        </>
      )}
    </>
  );
};

export default ListaAguarda;
