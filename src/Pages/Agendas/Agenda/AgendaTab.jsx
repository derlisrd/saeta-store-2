import { Box, Tab, Tabs } from "@mui/material";
import {useState} from 'react'
import AgendaDialog from "./AgendaDialog";
import AgendaDialogEdit from "./AgendaDialogEdit";
import AgendaLista from "./AgendaLista";
import AgendaListado from "./AgendaListado";
//import DialogBuscarCliente from "./DialogBuscarCliente";
import RegistraCliente from "./RegistraCliente";



const AgendaTabs = () => {

    const [tabValue, setTabValue] = useState(0);
    const TabPanel = ({children,index})=>{
        return(
          tabValue === index && (<div style={{marginTop:"25px"}}>{children}</div>)
        )
      }
  return (
    <Box >
    <Tabs
        indicatorColor="primary"
        textColor="primary"
        value={tabValue}
        onChange={(e, value) => {
          setTabValue(value);
        }}
      >
        <Tab label='Agendar' />
        <Tab label='Listado' />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <RegistraCliente />
        <AgendaLista />
        {/* <DialogBuscarCliente /> */}
        <AgendaDialog />
        <AgendaDialogEdit /> 
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <AgendaListado />
      </TabPanel>


    </Box>)
}

export default AgendaTabs
