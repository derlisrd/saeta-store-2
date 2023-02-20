import { Box, Tab, Tabs } from "@mui/material";
import { useLang } from "../../Contexts/LangProvider";
import {useState} from 'react'
import DatosWeb from "./DatosWeb";
import DatosContacto from "./DatosContacto";
import DatosRedes from "./DatosRedes";
import DatosColor from "./DatosColor";


const WebTabs = () => {
    const {lang} = useLang()
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
        <Tab label={lang.datos_web} />
        <Tab label={lang.contacto} />
        <Tab label={lang.redes_sociales} />
        <Tab label={lang.colores} />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <DatosWeb />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <DatosContacto />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <DatosRedes />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <DatosColor />
      </TabPanel>

    </Box>)
}

export default WebTabs
