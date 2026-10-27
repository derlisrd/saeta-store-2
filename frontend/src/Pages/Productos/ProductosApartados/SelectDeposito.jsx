import { useProductosApartados } from "./ProductosApartadosProvider";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SelecDeposito({form,onChange,error}) {

    const {listas} = useProductosApartados()

    

    return ( <FormControl fullWidth>
        <InputLabel id="id_deposito_apartado">Depósito</InputLabel>
        <Select
          name="id_deposito_apartado"
          value={form.id_deposito_apartado}
          label="Depósito"
          error={error.code===2}
          onChange={onChange}
        >
            <MenuItem value="" disabled>Seleccionar</MenuItem>
          {listas.depositos.map((e,i)=>(
            <MenuItem key={i} value={e.id_deposito}>{e.nombre_deposito}</MenuItem>
          ))}
          
          
        </Select>
      </FormControl> );
}

export default SelecDeposito;