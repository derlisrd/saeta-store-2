import { Tabs, Tab } from "@mui/material";
import { useState } from "react";
import DatosEmpresa from "./DatosdeEmpresa";


const SettingsMain = () => {

    
    const [tabValue, setTabValue] = useState(0);
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
        <Tab label="DATOS DE EMPRESA" />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <DatosEmpresa />
      </TabPanel>

    </>
  )
}

export default SettingsMain
