import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import {useState,useCallback,useRef} from 'react'
import { APICALLER } from '../../../Services/api';
import { useRecetas } from './RecetasProvider';

const SearchCliente = () => {
    const {setFormCliente} = useRecetas()
    const [load,setLoad] = useState(false)
    const [listaClientes, setListaClientes] = useState([]);
    const inputBuscaCliente = useRef(null);

    const buscarClientes = useCallback(async (e) => {
        let txt = e.target.value;
        if (txt !== "") {
          setLoad(true);
          setTimeout(async () => {
            let res = await APICALLER.get({
              table: "clientes",
              filtersSearch: txt,
              filtersField: "nombre_cliente,ruc_cliente",
              pagesize: "10",
            });
            res.response ? setListaClientes(res.results) : console.log(res);
            setLoad(false);
          }, 700);
        } else {
          setListaClientes([]);
          setLoad(false);
        }
      }, []);
    
      const insertClient = (e, val) => {
        

        if(val===null){
          setFormCliente({
            cliente_id_receta:"",
            nombre:"",
            doc:"",
            tel:"",
            active:false
          })
        }else{
          setFormCliente({
            cliente_id_receta:val.id_cliente,
            nombre:val.nombre_cliente,
            doc:val.ruc_cliente,
            tel:val.telefono_cliente,
            active:true
          })
        }
        setLoad(false)
        setListaClientes([])
      };

  return (
    <Autocomplete
      loading={load}
      loadingText="Buscando..."
      noOptionsText="No hay clientes con ese nombre"
      onChange={insertClient}
      autoHighlight
      /* clearIcon={<Icon>close</Icon>} */
      options={listaClientes}
      getOptionLabel={(option) =>
        option.nombre_cliente + " " + option.ruc_cliente
      }
      blurOnSelect
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
