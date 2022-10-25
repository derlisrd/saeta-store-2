import { CircularProgress, Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useRef, useState,useCallback } from 'react'
import { APICALLER } from '../../Services/api';
import { useAgenda } from './AgendaProvider';

const DialogBuscarCliente = () => {

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
        },500)
      }
      else{
        setListaClientes([]);
      }
      setLoad(false)
    },[])

    const insertClient = (e, value) => {
        
        setCliente({
          active:true,
          doc:value.ruc_cliente,
          nombre: value.nombre_cliente,
          id_cliente_agenda:value.id_cliente
        })
        cerrar();
      };
    


    return (
        <Dialog fullWidth open={dialogs.buscarCliente} onClose={cerrar}>
          <DialogTitle>Buscar cliente por nombre</DialogTitle>
          <DialogContent dividers>
            <Autocomplete
              loading={load}
              loadingText="Cargando..."
              noOptionsText="No hay clientes con ese nombre"
              onChange={insertClient}
              disableClearable
              options={listaClientes}
              getOptionLabel={(option) => option.nombre_cliente + " " +option.ruc_cliente}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  autoFocus
                  label="Buscar cliente"
                  inputRef={inputBuscaCliente}
                  onChange={buscarClientes}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {load ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                  fullWidth
                  placeholder="Escriba el nombre del cliente"
                  variant="outlined"
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={cerrar} variant="outlined" color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      );
}

export default DialogBuscarCliente
