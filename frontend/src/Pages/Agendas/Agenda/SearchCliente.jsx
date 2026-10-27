import { CircularProgress, Autocomplete, TextField } from '@mui/material';
import React, { useRef, useState,useCallback } from 'react'
import { APICALLER } from '../../../Services/api';
import { useAgenda } from './AgendaProvider';
/* InputProps={{
  startAdornment: (
    <InputAdornment position="start">
      {loads.inputbuscacliente ? (<CircularProgress size={24} />) : (
        <Tooltip TransitionComponent={Zoom} arrow title={<h2>Buscar cliente</h2>}>
          <IconButton onClick={() =>{ setDialogs({...dialogs,buscarCliente:true})}}>
            <Icon>search</Icon>
          </IconButton>
        </Tooltip>
      )}
    </InputAdornment>
  ),
  endAdornment: (
    <Tooltip TransitionComponent={Zoom} arrow title={<h2>Registrar cliente</h2>}>
      <IconButton onClick={() => {setDialogs({...dialogs,registrarCliente: true});}}>
        <Icon color="primary">person_add_alt_1</Icon>
      </IconButton>
    </Tooltip>
  ),
}} */


const SearchCliente = () => {

  const {dialogs,setDialogs,setCliente} = useAgenda()
  const [listaClientes, setListaClientes] = useState([]);
  const [load,setLoad] = useState(false)
  const inputBuscaCliente = useRef(null);
  const cerrar = () => setDialogs({ ...dialogs, buscarCliente: false });

  // buscador con con input text field
  const buscarClientes = useCallback(async (e) => {
    let txt = e.target.value;
    
    if(txt!==""){
      setLoad(true)
      setTimeout(async()=>{
        let res = await APICALLER.get({table: "clientes", filtersSearch:txt,filtersField:"nombre_cliente,ruc_cliente",pagesize:"10"});
        res.response ? setListaClientes(res.results) : console.log(res);
        setLoad(false)
      },700)
      
    }
    else{
      setListaClientes([]);
      setLoad(false)
    }
    
  },[])

  const insertClient = (e, value) => {
      
      setCliente({
        active:true,
        doc:value.ruc_cliente,
        nombre: value.nombre_cliente,
        id_cliente_agenda:value.id_cliente,
        telefono_cliente: value.telefono_cliente
      })
      cerrar();
    };
  


  return (
<Autocomplete
              loading={load}
              loadingText="Buscando..."
              noOptionsText="No hay clientes con ese nombre"
              onChange={insertClient}
              disableClearable
              options={listaClientes}
              getOptionLabel={(option) => option.nombre_cliente + " " +option.ruc_cliente}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  
                  label="Buscar cliente"
                  inputRef={inputBuscaCliente}
                  onChange={buscarClientes}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {load ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                  fullWidth
                  placeholder="Escriba el nombre del cliente"
                  variant="outlined"
                />
              )}
            />
  )
}

export default SearchCliente
