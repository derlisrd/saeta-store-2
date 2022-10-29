import { Alert, Autocomplete, Box, Button, CircularProgress, Grid, Icon, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField, Tooltip, Typography } from '@mui/material'
import React, { useState,useRef } from 'react'
import { APICALLER } from '../../../Services/api';
import { useTransferencias } from './TransferenciasProvider';

const TransferenciasForm = () => {

  const [loadAuto,setLoadAuto] = useState(false);
  const [listaProductos,setListaProductos]=useState([]);
  const [inputValue,setInputValue]=useState("");
  const buscaProductoTxtRef = useRef(null);
  
  const {formulario,setFormulario,setDialogs,dialogs,setIdDepositoSelect} = useTransferencias();

  const buscarProductos = async (e) => {
    let txt = e.target.value;
    setInputValue(txt);
    setLoadAuto(true);
    if (txt === "") {
      setListaProductos([]);
      setLoadAuto(false);
    } else {
      setTimeout(async () => {
        let res = await APICALLER.get({table: "productos",filtersField:"nombre_producto,codigo_producto",filtersSearch:txt,pagesize:'20',fields:"nombre_producto,codigo_producto,id_producto"});
        res.response ? setListaProductos(res.results) : console.log(res);
        setLoadAuto(false);
      }, 500);
    }
  };
  const limpiar = ()=>{
    setInputValue("");
    setListaProductos([]);
    setLoadAuto(false);
    setFormulario({id_producto:"",codigo_producto:"",nombre_producto:"",stock:[]});
    buscaProductoTxtRef.current.focus();
  }
  const insertaProducto = async(e, value) => {
    setListaProductos([]);
    let id_producto = value.id_producto; let codigo_producto = value.codigo_producto; let nombre_producto = value.nombre_producto;
    let res = await APICALLER.get({table:'productos_depositos',include:'depositos',on:'id_deposito_deposito,id_deposito',where:`id_producto_deposito,=,${id_producto}`});
    if(res.response){
      setFormulario({
        id_producto,codigo_producto,nombre_producto,stock:res.results
      });
      
    }else{console.log(res)}
    setInputValue("");
    setLoadAuto(false);
  };

  const openTransferir = elem =>{
    setIdDepositoSelect(elem.id_deposito_deposito);
    setDialogs({...dialogs,transferir:true});
  }
  
  return (
    <Box p={2} borderRadius={4} m={1} boxShadow={4} bgcolor="background.paper">
      <h2>Transferencias de productos</h2>
      <Grid container spacing={2}>
        <Grid item sm={12}>
        <Autocomplete
            disabled={formulario.nombre_producto!==""}
            loading={loadAuto} loadingText="Cargando..." noOptionsText="No hay productos con ese nombre"
            onChange={insertaProducto} fullWidth
            isOptionEqualToValue={(option, value) =>
              option?.id_producto === value?.id_producto
            }
            inputValue={inputValue} options={listaProductos}
            getOptionLabel={(option) => option.nombre_producto+" - "+option.codigo_producto }
            clearOnBlur
            disableClearable={true}
            renderInput={(params) => (
              <TextField
                {...params} autoFocus inputRef={buscaProductoTxtRef}
                onChange={buscarProductos}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: ( <>{loadAuto && (<CircularProgress color="inherit" size={20} />) }{params.InputProps.endAdornment}</>
                  ),
                }}
                fullWidth  placeholder="Escriba el nombre o código del producto"
              />
            )}
          />
        </Grid>
        {formulario?.nombre_producto !== "" && (
          <>
          <Grid item xs={12}>
            <Button variant='outlined' onClick={limpiar}>Limpiar</Button>
          </Grid>
            <Grid item xs={12}>
              <Alert icon={false} severity="info">
                <Typography variant="button">
                  CODIGO: <u>{formulario?.codigo_producto}</u>
                </Typography>
              </Alert>
            </Grid>
            <Grid item xs={12}>
              <Alert icon={false} severity="success">
                <Typography variant="button">
                  Producto: <u>{formulario?.nombre_producto}</u>
                </Typography>
              </Alert>
            </Grid>
            <Grid item xs={12}>
            <List>
            {formulario.stock.map((e, i) => (
              
              <ListItem key={i}>
                <ListItemAvatar>
                  <Tooltip arrow title={<h3>Transferir</h3>} placement='top'>
                  <IconButton onClick={()=>{openTransferir(e)}}>
                    <Icon>sync_alt</Icon>
                  </IconButton>
                  </Tooltip>
                </ListItemAvatar>
                <ListItemText secondary={`Cantidad: ${e.stock_producto_deposito}`} primary={`${e.nombre_deposito}`} />
              </ListItem>              
            ))}
          </List>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  )
}

export default TransferenciasForm
