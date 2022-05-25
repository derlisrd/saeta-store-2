import { Tabs, Tab } from "@mui/material";
import { useState } from "react";
import ComprasFacturar from "./ComprasFacturar";
import ComprasLista from "./ComprasLista";
import DialogCompra from "./DialogCompra";
import DialogSearchProduct from "./DialogSearchProduct";
import ImprimirCompra from "./ImprimirCompra";


const ComprasMain = () => {
  
    const [tabValue, setTabValue] = useState(0)
    
    const TabPanel = ({children,index})=>{
      return(
        tabValue === index && (<div style={{marginTop:"25px"}}>{children}</div>)
      )
    }

  return (
    <>
    <Tabs
        indicatorColor="primary"
        textColor="primary"
        value={tabValue}
        onChange={(e, value) => {
          setTabValue(value);
        }}
      >
        <Tab label="Nueva compra" />
        <Tab label="Lista de compras" />
      </Tabs>
      
      <TabPanel value={tabValue} index={0}>
          <ComprasFacturar />
          <ImprimirCompra />
          <DialogSearchProduct />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <ComprasLista />
      </TabPanel>

      <DialogCompra />
    </>
  )
}

export default ComprasMain
