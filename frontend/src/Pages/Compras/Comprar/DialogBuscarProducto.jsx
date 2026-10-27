import React, { useState,useCallback } from 'react'
import {Dialog,DialogActions,DialogContent,DialogTitle,TextField,Button, Autocomplete, CircularProgress, Grid } from "@mui/material";

import { APICALLER } from '../../../Services/api';
//import swal from 'sweetalert';
import { useCompras } from '../ComprasProvider';


const DialogBuscarProducto = () => {


    const {dialogs,setDialogs,enfocarInput,inputCodigo} = useCompras()

    const [load,setLoad]= useState(false);
    const [cargando,setCargando]=useState(false);
    const [listaBuscaProducto,setListaBuscaProducto] = useState([]);
    
    
    const insertaProducto = async(e, valor) => {
      inputCodigo.current.value = (valor.codigo_producto)
      enfocarInput();
      };
    
      const cerrar = () => {
        setDialogs({ ...dialogs, buscarProducto: false });
        setCargando(false);
      };
    


      // buscador con con input text field
      const buscarProductos = useCallback(async (e) => {
        
        let txt = e.target.value;
        if(txt!=="" && txt.length>0){
          setLoad(true)
          setTimeout(async() => {
            let res = await Promise.all([APICALLER.get({
              table: "productos",include:"impuestos,proveedors",
              on: "id_impuesto_producto,id_impuesto,id_proveedor,id_proveedor_producto",
              filtersField:"nombre_producto,codigo_producto",filtersSearch:txt,pagesize:'20',where:'tipo_producto,=,1',
              fields:'nombre_producto,preciom_producto,precio_producto,costo_producto,codigo_producto,nombre_proveedor,id_proveedor',
            })]) ;
            setListaBuscaProducto(res[0].results);
            setLoad(false)

          }, 700);

        }else{
          setListaBuscaProducto([])
        }
        
      },[])

    return (
        <Dialog fullWidth open={dialogs.buscarProducto} onClose={cerrar}>
          <DialogTitle>Buscar producto</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {cargando ? <CircularProgress /> : 
                <Autocomplete
                loadingText="Cargando..." loading={load} noOptionsText="Sin productos en lista..."
                onChange={insertaProducto}
                disableClearable autoComplete autoHighlight autoSelect  options={listaBuscaProducto}
                getOptionLabel={(option) => option.nombre_producto+" - "+option.codigo_producto }
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    autoFocus
                    label="Buscar producto"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {load ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                    onChange={buscarProductos}
                    fullWidth
                    placeholder="Escriba el nombre del producto"

                  />
                )}
              />
                }
              </Grid>
            </Grid>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={cerrar} variant="outlined" color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      );
}

export default DialogBuscarProducto
