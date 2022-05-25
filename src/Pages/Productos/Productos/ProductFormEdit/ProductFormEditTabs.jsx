import { Alert, Box,LinearProgress,Snackbar,Tab,Tabs,Stack } from '@mui/material';
import React, { useCallback } from 'react';
import { useProductFormEdit } from './ProductFormEditProvider';
import ProductButtonHead from './ProductButtonHead';
import Datos from './Datos';
import { Loading } from '../../../../Components';
import Precios from './Precios';
import Imagenes from './Imagenes';

const ProductFormEditTabs = () => {
    const {tabValue,setTabValue,cargas,snack,setSnack,sendForm} = useProductFormEdit();
    const TabPanel = useCallback(({children,index})=>{
        return(
          tabValue === index && (<div style={{marginTop:"25px"}}>{children}</div>)
        )
      },[tabValue]);
  return (
    <form onSubmit={sendForm}>
      {cargas.main && <Loading /> }
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
    </form>
  )
}

export default ProductFormEditTabs
