import { Autocomplete, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React,{useState,useRef,useCallback} from 'react'
import { APICALLER } from '../../../Services/api';
import { useProductosApartados } from './ProductosApartadosProvider';

const DialogBuscarCliente = () => {
    const {dialogs,setDialogs,setDatosCliente,setErrores,errores} = useProductosApartados();
    const [listaClientes, setListaClientes] = useState([]);
    const [load,setLoad] = useState(false)
    const inputBuscaCliente = useRef(null);
    const cerrar = ()=> {setDialogs({...dialogs,buscarCliente:false}); setListaClientes([]) }

    const buscarClientes = useCallback(async (e) => {
      let txt = e.target.value;
      if(txt!==""){
        setLoad(true)
        setTimeout(async()=>{
          let res = await APICALLER.get({table: "clientes", filtersSearch:txt,filtersField:"nombre_cliente,ruc_cliente",pagesize:"10"});
          res.response === "ok" ? setListaClientes(res.results) : console.log(res);
        },500)
      }
      else{
        setListaClientes([]);
      }
      setLoad(false)
    },[])

    const insertClient = (e, value) => {
      setDatosCliente(value);
      setErrores({...errores,error:true,color:"success",mensaje: `Cliente: ${value.nombre_cliente} - Doc: ${value.ruc_cliente}`})
      cerrar()
    };


    return (
      <Dialog open={dialogs.buscarCliente} fullWidth onClose={cerrar}>
        <DialogTitle>Buscar Cliente</DialogTitle>
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
              isOptionEqualToValue={ (option,value)=> option.id_cliente === value.id_cliente}
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
          <Button onClick={cerrar} variant='outlined'>Cerrar</Button>
        </DialogActions>
      </Dialog>
    )
}

export default DialogBuscarCliente
