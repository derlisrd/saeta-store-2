import { Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { useLang } from "../../../Contexts/LangProvider";
import DatosEmpresa from "./DatosdeEmpresa";


const SettingsMain = () => {

    const {lang}= useLang();
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
        <Tab label={lang.datos_empresa} />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <DatosEmpresa />
      </TabPanel>

    </>
  )
}

export default SettingsMain
