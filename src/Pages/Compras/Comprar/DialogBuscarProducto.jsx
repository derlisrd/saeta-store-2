import React, { useState,useCallback } from 'react'
import {Dialog,DialogActions,DialogContent,DialogTitle,TextField,Button, Autocomplete, CircularProgress, Grid } from "@mui/material";

import { APICALLER } from '../../../Services/api';
//import swal from 'sweetalert';
import { useCompras } from '../ComprasProvider';


const DialogBuscarProducto = () => {


    const {dialogs,setDialogs} = useCompras()

    const [load,setLoad]= useState(false);
    const [cargando,setCargando]=useState(false);
    const [listaBuscaProducto,setListaBuscaProducto] = useState([]);
    
    
    const insertaProducto = async(e, valor) => {
      /* var codigo = valor.codigo_producto;
       let stock = parseFloat(value.stock_producto); 
      var tipo = parseInt(valor.tipo_producto);

      //let nombre = value.nombre_producto;
        let deposito = f.facturas[indexFactura].depositoActivo;
        var cantidadInput = parseFloat(inputCantidad.current.value);
        let fa = f.facturas[indexFactura].itemsFactura
        let index = fa.findIndex(e => e.codigo_producto.toLowerCase() === codigo.toLowerCase());
        let found = fa.filter(i => i.codigo_producto.toLowerCase() === codigo.toLowerCase());
        // si ya hay un producto tons aumenta la cantidad
        if (found.length > 0) {
          cantidadInput += fa[index].cantidad_producto;
          if(tipo===1){
            if(cantidadInput<=found[0].stock_producto){
              AgregarCantidad(cantidadInput, index);  
            }else{
              swal({text:"No hay suficiente stock."});
            }
          }else{
            AgregarCantidad(cantidadInput, index);
          }
        }else{
          setCargando(true);
          if(tipo===1){
          const [img,dep] = await Promise.all([ APICALLER.get({
            table: "productos",
            include: "impuestos,productos_images,productos_depositos",
            on: "id_impuesto_producto,id_impuesto,id_producto,id_image_producto,id_producto,id_producto_deposito",
            where: `codigo_producto,=,'${codigo}',and,id_deposito_deposito,=,${deposito}`,
          }), APICALLER.get({table:'productos', include: "impuestos,productos_depositos",
          on: "id_impuesto_producto,id_impuesto,id_producto,id_producto_deposito",
          where:`id_deposito_deposito,=,${deposito},and,codigo_producto,='${codigo}'`})]);
          if(img.response && img.found>0){
            if(cantidadInput<= parseFloat(dep.results[0].stock_producto_deposito) )
            {
              insertarProductoTabla(img.results[0]);  
            }else{
              swal({text:`No hay ${cantidadInput} en stock`});  
            }
          }
            else if(dep.response && dep.found>0){
              if(cantidadInput<= parseFloat(dep.results[0].stock_producto_deposito) )
              {
                insertarProductoTabla(dep.results[0]);
              }else{
                swal({text:`No hay ${cantidadInput} en stock`});  
              }
            }
            else{
              swal({text:"Sin stock en el deposito."});
            }
          
          }
          else{
            insertarProductoTabla(valor);
          }
      }   */
        cerrar();
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
              table: "productos",include:"impuestos",
              on: "id_impuesto_producto,id_impuesto",
              filtersField:"nombre_producto,codigo_producto",filtersSearch:txt,pagesize:'20'
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
