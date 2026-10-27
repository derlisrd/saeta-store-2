import { Box, Tabs,Tab } from '@mui/material';
import React, { useCallback } from 'react'
import { useAsistencia } from './AsistenciasProvider';
import ListaAsistencias from './ListaAsistencias';
import TomadaAsistencia from './TomadaAsistencia';

const AsistenciasTabs = () => {

    const {tabValue,setTabValue} = useAsistencia(); 

    const TabPanel = useCallback(({children,index})=>{
        return(
        tabValue === index && (<div style={{marginTop:"25px"}}>{children}</div>)
        )
    },[tabValue]);

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        value={tabValue}
        onChange={(e, value) => {setTabValue(value);}}
        >
        <Tab label="Asistencia" />
        <Tab label="Asistencias tomadas" />
      </Tabs>
    </Box>
      <TabPanel value={tabValue} index={0}>
       <ListaAsistencias />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
       <TomadaAsistencia />
      </TabPanel>

    </>
  )
}

export default AsistenciasTabs
