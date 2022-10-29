import { Tabs, Tab, Box } from "@mui/material";
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
    <Box p={2} boxShadow={4} borderRadius={4} m={1} bgcolor="background.paper">
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

    </Box>
  )
}

export default SettingsMain
