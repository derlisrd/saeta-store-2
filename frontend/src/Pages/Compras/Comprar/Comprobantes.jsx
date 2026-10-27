import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useCompras } from "../ComprasProvider";

function Comprobantes({form,setForm,error}) {
    const {lang} = useCompras()

    const change = e =>{
        setForm({...form,tipo_factura_compra:e.target.value});
    }

  return (
    <FormControl fullWidth>
      <InputLabel>{lang.seleccione_comprobante}</InputLabel>
      <Select
        error={error.id_error === 1}
        value={form.tipo_factura_compra} name="id_forma_pago"onChange={change} fullWidth
      >
        <MenuItem value="" disabled>
          <em>{lang.seleccione_comprobante}</em>
        </MenuItem>
        <MenuItem value="0" >
          {lang.recibo}
        </MenuItem>
        <MenuItem value="1" >
          {lang.factura_contado}
        </MenuItem>
        <MenuItem value="2" >
          {lang.factura_credito}
        </MenuItem>
        <MenuItem value="3" >
          {lang.credito}
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default Comprobantes;
