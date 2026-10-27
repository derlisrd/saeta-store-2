import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useCompras } from "../ComprasProvider";

const ListaCajas = ({ form, setForm,error }) => {
  const { lang, compras } = useCompras();
  const change = (e) => {
    setForm({ ...form, id_cajas_moneda: e.target.value });
  };


  return (
    <FormControl fullWidth>
      <InputLabel>{lang.seleccione_caja}</InputLabel>
      <Select
        error={error.id_error === 2}
        value={form.id_cajas_moneda}
        name="id_cajas_moneda"
        onChange={change}
        fullWidth
      >
        <MenuItem value="" disabled>
          <em>{lang.seleccione_caja}</em>
        </MenuItem>
       {
        compras.cajas.map((e,i)=>(
            <MenuItem key={i} value={e.id_cajas_moneda}>
                <b>{e.nombre_caja} - {e.nombre_moneda}</b>
            </MenuItem>
        ))
       }
       
      </Select>
    </FormControl>
  );
};

export default ListaCajas;
