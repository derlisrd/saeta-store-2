import { useEffect, useState } from "react";
import { APICALLER } from "../../../Services/api";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

function BuscarProducto({setId}) {

    const [search,setSearch] = useState('');
    const [lista,setLista] = useState([]);
    const [loading,setLoading] = useState(false)
    const insertar =(e,val)=>{
        if(val){
            setId(val.id_producto)
        }
    }
    const getOption = (option)=>{
        if(option){
            return option.nombre_producto+" - "+option.codigo_producto
        }
    }
    useEffect(()=>{
        const timer = setTimeout(async()=>{
          if(search!==''){
            setLoading(true)
            let res = await APICALLER.get({
                table: "productos",
                fields:'nombre_producto,codigo_producto,id_producto',
                filtersField:"nombre_producto,codigo_producto",filtersSearch:search,pagesize:'20'
            });
            //console.log('busca');
            setLista(res.results);
            setLoading(false)
          }
        },1000)
        return ()=> clearTimeout(timer)
    },[search])

    return (<Autocomplete
        loadingText="Cargando..." loading={loading} noOptionsText="Sin productos en lista..."
        onChange={insertar} autoComplete autoHighlight autoSelect clearOnEscape selectOnFocus options={lista}
        getOptionLabel={getOption}
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar producto"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            onChange={(e)=>{ setSearch(e.target.value)}}
            placeholder="Escriba el nombre del producto"
          />
        )}
      />);
}

export default BuscarProducto;