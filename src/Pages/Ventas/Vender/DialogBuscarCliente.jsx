import { CircularProgress, Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useRef, useState,useCallback } from 'react'
import { APICALLER } from '../../../Services/api';
import { useVentas } from './VentasProvider';

const DialogBuscarCliente = () => {

    const {dialogs,setDialogs,datosFacturas,indexFactura,setearFactura,setErrors,errors} = useVentas()
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
          res.response  ? setListaClientes(res.results) : console.log(res);
          setLoad(false)
        },800)
        
      }
      else{
        setListaClientes([]);
      }
      //setLoad(false)
    },[])

    const insertClient = (e, value) => {
        let cl = value;
        
        let fa = {...datosFacturas}
            fa.facturas[indexFactura].datosCliente.id_cliente = cl.id_cliente;
            fa.facturas[indexFactura].datosCliente.ruc_cliente = cl.ruc_cliente;
            fa.facturas[indexFactura].datosCliente.nombre_cliente = cl.nombre_cliente;
            fa.facturas[indexFactura].datosCliente.direccion_cliente = cl.direccion_cliente;
            setErrors({...errors,error:false,mensaje:"",cliente:false,clienteMensaje: ""});
            setearFactura(fa);
            cerrar()

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
