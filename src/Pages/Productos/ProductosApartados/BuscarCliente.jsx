import {useState,useCallback} from 'react'
import {TextField, Autocomplete, CircularProgress} from "@mui/material";

import { APICALLER } from '../../../Services/api';
function BuscarCliente({form,setForm,error}) {
    const [load,setLoad]= useState(false);

    const [lista,setLista] = useState([]);

    const insertaProducto = async(e, valor) => {
        setForm({...form,id_cliente_apartado:valor.id_cliente,nombre_cliente:valor.nombre_cliente})
        
        setLista([])
    }

    const buscarProductos = useCallback(async (e) => {
        let txt = e.target.value;
        if(txt!=="" && txt.length>0){
          setLoad(true)
          setTimeout(async() => {
            let res = await Promise.all([APICALLER.get({
              table: "clientes", fields:'id_cliente,ruc_cliente,nombre_cliente',
              filtersField:"ruc_cliente,nombre_cliente",filtersSearch:txt,pagesize:'20'
            })]) ;
            setLista(res[0].results);
            setLoad(false)
          }, 700);
        }else{
          setLista([])
        }
    },[])

    
    return ( <Autocomplete
        loadingText="Cargando..." loading={load} noOptionsText="Sin productos en lista..."
        onChange={insertaProducto}
        disableClearable autoComplete autoHighlight autoSelect  options={lista}
        getOptionLabel={(option) => option.ruc_cliente+" - "+option.nombre_cliente }
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            autoFocus
            label="Cliente"
            error={error.code===1}
            id="buscar_producto"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {load ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            onChange={buscarProductos}
            fullWidth
            placeholder="Escriba el nombre o doc. de cliente"
          />
        )}
      />  );
}

export default BuscarCliente;