import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEmpleados } from './EmpleadosProvider';

function SelectUser({onChange,name,value}) {
    const {lista} = useEmpleados()
    
    return (<FormControl fullWidth>
        <InputLabel>Usuario relacionado</InputLabel>
        <Select
            name={name}
          value={value}
          label="Usuario relacionado"
          onChange={onChange}
        >
          <MenuItem value={0} disabled>Seleccionar</MenuItem>
          {
            lista.users.map((e,i)=>(
                <MenuItem key={i} value={e.id_user}>{e.nombre_user}</MenuItem>
            ))
          }
        </Select>
      </FormControl>  );
}

export default SelectUser;