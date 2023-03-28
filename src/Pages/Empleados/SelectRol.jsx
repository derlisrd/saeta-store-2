import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEmpleados } from './EmpleadosProvider';

function SelectRol({onChange,name,value,error}) {
    const {lista} = useEmpleados()
    
    return (<FormControl fullWidth>
        <InputLabel>Rol de empleado</InputLabel>
        <Select
            name={name}
            error={error.code===3}
          value={value}
          label="Usuario relacionado"
          onChange={onChange}
        >
          <MenuItem value='0' disabled>Seleccionar</MenuItem>
          {
            lista.rols.map((e,i)=>(
                <MenuItem key={i} value={e.id_empleados_rol}>{e.descripcion_rol}</MenuItem>
            ))
          }
        </Select>
      </FormControl>  );
}

export default SelectRol;