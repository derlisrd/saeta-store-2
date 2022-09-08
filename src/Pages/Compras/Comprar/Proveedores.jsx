import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useCompras } from "../ComprasProvider";

function Proveedores({form,setForm,error}) {
    const {lang,compras} = useCompras()

    const change = e =>{
        setForm({...form,id_proveedor_compra:e.target.value});
    }

  return (
    <FormControl fullWidth>
      <InputLabel>{lang.seleccione_proveedor}</InputLabel>
      <Select
        error={error.id_error === 4}
        value={form.id_proveedor_compra} name="id_proveedor_compra" onChange={change} fullWidth
      >
        <MenuItem value="" disabled>
          <em>{lang.seleccione_proveedor}</em>
        </MenuItem>
        {
            compras.proveedores.map((e,i)=>(
                <MenuItem value={e.id_proveedor} key={i} >
                    {e.nombre_proveedor} {e.ruc_proveedor}
                </MenuItem>
            ))
        }
        
      </Select>
    </FormControl>
  );
}

export default Proveedores;