import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react'
import { useCompras } from '../ComprasProvider';

const ListaCajasTipoPago = ({form,setForm}) => {
    
    const { lang } = useCompras();
    
    const change = (e) => {
        setForm({ ...form, tipo_pago: e.target.value });
    };


  return (
    <FormControl fullWidth>
      <InputLabel>{lang.tipo_pago}</InputLabel>
      <Select
        value={form.tipo_pago}
        name="tipo_pago"
        onChange={change}
        fullWidth
      >
        <MenuItem value="" disabled>
          <em>{lang.seleccione_tipo_pago}</em>
        </MenuItem>

            <MenuItem value={1}>
                Efectivo
            </MenuItem>
            <MenuItem value={2}>
                Transacción sin Efectivo
            </MenuItem>
       
      </Select>
    </FormControl>
  )
}

export default ListaCajasTipoPago
