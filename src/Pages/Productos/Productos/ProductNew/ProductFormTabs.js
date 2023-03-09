import { Alert, Box,LinearProgress,Snackbar,Tab,Tabs,Stack } from '@mui/material';
import React, { useCallback } from 'react'

import Datos from './Datos';
import Imagenes from './Imagenes';
import Precios from './Precios';
import { useProductForm } from './ProductFormProvider'
import ProductButtonHead from './ProductButtonHead';

const ProductFormTabs = () => {
  const {tabValue,setTabValue,sendForm,snack,setSnack,cargas,lang} = useProductForm();
  const TabPanel = useCallback(({children,index})=>{
    return(
      tabValue === index && (<div style={{marginTop:"25px"}}>{children}</div>)
    )
  },[tabValue]);
  return (
    <form onSubmit={sendForm}>
      <Box p={2} boxShadow={4} borderRadius={4} m={1} bgcolor="background.paper" >
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
      
        
        <ProductButtonHead />

        <Stack sx={{ width: '100%', marginTop:"8px" }} spacing={2}>
          {
            cargas.guardar && <LinearProgress />
          }
        </Stack>
        {cargas.main ?  <LinearProgress /> : <> 
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        value={tabValue}
        onChange={(e, value) => {setTabValue(value);}}
        >
        <Tab label={lang.datos} />
        <Tab label={lang.valores_stock} />
        <Tab label={lang.imagenes} />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
       <Datos />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
       <Precios /> 
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
       <Imagenes /> 
      </TabPanel>
      </>}

      </Box>
    </form>
  )
}

export default ProductFormTabs
