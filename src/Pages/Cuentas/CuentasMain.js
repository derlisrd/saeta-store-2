import { Tabs,Tab,  } from '@mui/material'
import {useState} from 'react'
import CuentasCobrarLista from './CuentasCobrarLista'
import CuentasCobrarDialog from './CuentasCobrarDialog'
import CuentasPagarDialog from './CuentasPagarDialog'
import CuentasPagarLista from './CuentasPagarLista'
import DetallesCobrarDialog from './DetallesCobrarDialog'

//import { useLocation } from "react-router-dom";

const CuentasMain = () => {
    //const location = useLocation();
    //const query = location.search && new URLSearchParams(location.search);
    //const [tabURL,setTabURL] = useState((query && query.get("tab")) ? query.get("tab") : "" )
    
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
        <Tab label="Cuentas a cobrar" />
        {/* <Tab label="Cuentas a pagar" /> */}
      </Tabs>
      
      <TabPanel value={tabValue} index={0}>
          <DetallesCobrarDialog />
          <CuentasCobrarLista />
          <CuentasCobrarDialog />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <CuentasPagarLista />
        <CuentasPagarDialog />
      </TabPanel>

      
    </>
  )
}

export default CuentasMain
