import {useState,useCallback} from 'react'
import {TextField, Autocomplete, CircularProgress} from "@mui/material";
import { APICALLER } from '../../../Services/api';

function BuscarProducto({form,setForm,error}) {

    const [load,setLoad]= useState(false);

    const [listaBuscaProducto,setListaBuscaProducto] = useState([]);

    const insertaProducto = async(e, valor) => {
        setForm({...form,id_producto_apartado:valor.id_producto,nombre_producto:valor.nombre_producto,
        codigo_producto:valor.codigo_producto})
        
        setListaBuscaProducto([])
    }

    const buscarProductos = useCallback(async (e) => {
        let txt = e.target.value;
        if(txt!=="" && txt.length>0){
          setLoad(true)
          setTimeout(async() => {
            let res = await Promise.all([APICALLER.get({
              table: "productos", fields:'id_producto,nombre_producto,codigo_producto',
              filtersField:"nombre_producto,codigo_producto",filtersSearch:txt,pagesize:'20'
            })]) ;
            setListaBuscaProducto(res[0].results);
            setLoad(false)
          }, 700);
        }else{
          setListaBuscaProducto([])
        }
    },[])

    
    return ( <Autocomplete
        loadingText="Cargando..." loading={load} noOptionsText="Sin productos en lista..."
        onChange={insertaProducto}
        disableClearable autoComplete autoHighlight autoSelect  options={listaBuscaProducto}
        getOptionLabel={(option) => option.nombre_producto+" - "+option.codigo_producto }
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            error={error.code===3}
            label="Producto"
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
            placeholder="Escriba el nombre o código del producto"
            variant="outlined"
          />
        )}
      />  );
}

export default BuscarProducto;