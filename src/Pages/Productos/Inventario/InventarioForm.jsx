import {Alert,Autocomplete,Container,Grid,TextField,Typography,Button,CircularProgress,LinearProgress,IconButton,Icon,List,ListItem,ListItemAvatar,ListItemText,FormControl,InputLabel,Select,MenuItem, Box} from "@mui/material";
import React, { useState, useRef } from "react";

import { APICALLER } from "../../../Services/api";
import NumberFormatCustom from "../../../Components/thirty/NumberFormatCustom";

import { useInventario } from "./InventarioProvider";

const Inventario = () => {
  
  const { setFormulario, formulario, initialForm,load,listaStock,setListaStock,listaDepositos,setIdDeposito,idDeposito,corregirLista,inputCorregir,setCantidadNueva,cantidadNueva,finalizarCorreccion } = useInventario();
  const buscaProductoTxt = useRef(null);
  
  
  const [listaBuscaProducto, setListaBuscaProducto] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [cargando, setCargando] = useState(false);
  const [load2, setLoad] = useState(false);


  
  const Cancelar = () => {
    setFormulario(initialForm);
    setIdDeposito("");
    setListaBuscaProducto([]);
    buscaProductoTxt.current.focus();
  };

  const Corregir = async () => {
      setLoad(true);
      finalizarCorreccion();
      setLoad(false);
      buscaProductoTxt.current.focus();
  };

  /* const buscarRegistro = async () => {
    let config = {
      table: "productos",
      filtersSearch: inputSearch,
      filtersField: "codigo_producto",
      pagesize: "1",
      where: `tipo_producto,=,1`,
    };
    let res = await APICALLER.get(config);
    if (res.response  && res.found > 0) {
      insertaProducto(null, res.results[0]);
    } else {
      swal({text: "No hay producto con ese codigo",timer: 1500, icon: "error"});
      setFormulario(initialForm);
    }
    <TextField
            label="Buscar por código" value={inputSearch}
            onKeyPress={e => {e.key === "Enter" &&  buscarRegistro();}}
            onChange={(e) => setInputSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => {buscarRegistro();}}>
                    <Icon>search</Icon>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
  }; */

  // buscador con con input text field
  const buscarProductos = async (e) => {
    let txt = e.target.value;
    setInputValue(txt);
    setCargando(true);
    if (txt.lenght === 0 || txt==="") {
      setListaBuscaProducto([]);
      setCargando(false);
    } else {
      setTimeout(async () => {
        let res = await APICALLER.get({table: "productos",filtersField:"nombre_producto,codigo_producto",filtersSearch:txt,pagesize:'20',where:"tipo_producto,=,1"});
        res.response  ? setListaBuscaProducto(res.results) : console.log(res);
        setCargando(false);
      }, 500);
    }
  };

  const insertaProducto = async(e, value) => {
    setListaBuscaProducto([]);
    let id = value.id_producto;
    let res = await APICALLER.get({table:'productos_depositos',include:'depositos',on:'id_deposito_deposito,id_deposito',where:`id_producto_deposito,=,${id}`});
    if(res.response){
      setListaStock(res.results);
      setFormulario(value);
    }else{console.log(res)}
    setInputValue("");
    setCargando(false);
    inputCorregir.current?.focus();
  };
  if(load){
    return <Grid container spacing={2} alignItems="center">
    <Grid item xs={12}>
      <CircularProgress />
    </Grid>
    </Grid>
  }
  return (
    <Container>
      <Box p={2} boxShadow={4} borderRadius={4} m={1} bgcolor="background.paper">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {load2 && <LinearProgress color="primary" />}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Corrección de inventario </Typography>
          <Typography variant="body">
            Módulo para corregir el inventario
          </Typography>
        </Grid>
        
        <Grid item sm={12} md={6}>
          <Autocomplete
            disabled={formulario?.nombre_producto ? true : false}
            loading={cargando} loadingText="Cargando..." noOptionsText="No hay productos con ese nombre"
            onChange={insertaProducto} fullWidth
            isOptionEqualToValue={(option, value) =>
              option?.id_producto === value?.id_producto
            }
            inputValue={inputValue} options={listaBuscaProducto}
            getOptionLabel={(option) => option.nombre_producto+" - "+option.codigo_producto }
            clearOnBlur disableClearable={true}
            renderInput={(params) => (
              <TextField
                {...params} autoFocus inputRef={buscaProductoTxt}
                onChange={buscarProductos} fullWidth placeholder="Escriba el nombre del producto"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: ( <>{cargando && (<CircularProgress color="inherit" size={20} />) }{params.InputProps.endAdornment}</>
                  ),
                }}
              />
            )}
          />
        </Grid>
        {formulario?.nombre_producto !== "" && (
          <>
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
            <Grid item sm={12} md={3} >
              <TextField fullWidth
                label="Cantidad" name="cantidadNueva" onChange={e=> setCantidadNueva(e.target.value)} value={cantidadNueva}
                inputRef={inputCorregir} InputProps={{inputComponent: NumberFormatCustom}}
              />
            </Grid>
            <Grid item sm={12} md={3} >
              <FormControl fullWidth>
                  <InputLabel variant="outlined">Elegir depósito</InputLabel>
                  <Select name="id_deposito_producto" value={idDeposito} onChange={(e)=>{setIdDeposito(e.target.value); inputCorregir.current?.focus();}} >
                    <MenuItem value="" disabled>Elegir depósito</MenuItem>
                    {
                      listaDepositos.map((d) => (
                        <MenuItem key={d.id_deposito} value={d.id_deposito}>
                          {d.nombre_deposito}
                        </MenuItem>
                      ))
                    }
                  </Select>
              </FormControl>
            </Grid>
            <Grid item sm={12} md={6} >
              <Button variant="outlined" onClick={corregirLista} size="large">Corregir</Button>
            </Grid>
            <Grid item xs={12}>
            <List>
            {listaStock.map((e, i) => (
              
              <ListItem key={i}>
                <ListItemAvatar>
                  <IconButton onClick={()=>{setIdDeposito(e.id_deposito)}}>
                    <Icon>chevron_right</Icon>
                  </IconButton>
                </ListItemAvatar>
                <ListItemText secondary={`Cantidad: ${e.stock_producto_deposito}`} primary={`${e.nombre_deposito}`} />
              </ListItem>              
            ))}
          </List>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" size="large" onClick={Corregir}>
                Finalizar
              </Button>
              {"  "}
              <Button variant="outlined" size="large" onClick={Cancelar}>
                Cancelar
              </Button>
            </Grid>
          </>
        )}
      </Grid>
      </Box>
    </Container>
  );
};

export default Inventario;
