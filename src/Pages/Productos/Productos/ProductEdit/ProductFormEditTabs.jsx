import { Alert, Box,LinearProgress,Snackbar,Tab,Tabs,Stack } from '@mui/material';
import React, { useCallback } from 'react';
import { useProductFormEdit } from './ProductFormEditProvider';
import ProductButtonHead from './ProductButtonHead';
import Datos from './Datos';
import LoadingBackDrop from '../../../../Components/UI/LoadingBackDrop';
import Precios from './Precios';
import Imagenes from './Imagenes';
import { Navigate } from 'react-router-dom';
const ProductFormEditTabs = () => {
    const {tabValue,setTabValue,cargas,snack,setSnack,sendForm,exists} = useProductFormEdit();
    const TabPanel = useCallback(({children,index})=>{
        return(
          tabValue === index && (<div style={{marginTop:"25px"}}>{children}</div>)
        )
      },[tabValue]);
      if(!exists){
        return <Navigate to={"/404"} />
      }
  return (
    <form onSubmit={sendForm}>
      <Box p={2} boxShadow={4} borderRadius={4} m={1} bgcolor="background.paper" >
      {cargas.main && <LoadingBackDrop /> }
      <Snackbar
        open={snack.open}
        onClose={() => setSnack({...snack,open:false})}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
      >
        <Alert severity={snack.severity} variant="filled">
          {snack.mensaje}
        </Alert>
      </Snackbar>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        
        <ProductButtonHead />

        <Stack sx={{ width: '100%', marginTop:"8px" }} spacing={2}>
          {
            cargas.guardar && <LinearProgress />
          }
        </Stack>
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        value={tabValue}
        onChange={(e, value) => {setTabValue(value);}}
        >
        <Tab label="DATOS" />
        <Tab label="VALORES" />
        <Tab label="IMAGENES" />
      </Tabs>
    </Box>

      <TabPanel value={tabValue} index={0}>
       <Datos />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Precios />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <Imagenes />
      </TabPanel>
      </Box>
    </form>
  )
}

export default ProductFormEditTabs
