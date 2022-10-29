import { Tabs,Tab,Box  } from '@mui/material'
import {useState} from 'react'
import EntregasLista from "./EntregasLista"
import EntregasPendientes from './EntregasPendientes'

const EntregasMain = () => {
    const [tabValue, setTabValue] = useState(0)

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
            <Tab label="Buscar" />
            <Tab label="Pendientes de entrega" />
          </Tabs>
          
          <TabPanel value={tabValue} index={0}>
              <EntregasLista />
          </TabPanel>
    
          <TabPanel value={tabValue} index={1}>
            <EntregasPendientes />
          </TabPanel>
    
          
        </Box>
      )
}

export default EntregasMain
