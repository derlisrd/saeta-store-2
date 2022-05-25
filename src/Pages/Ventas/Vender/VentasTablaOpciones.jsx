import { Icon, IconButton, Stack,Tooltip } from "@mui/material";
import { useVentas } from "./VentasProvider";

const VentasTablaOpciones = ({index}) => {

    const {borrarItem,openCambiarPrecio,openImagen} = useVentas();

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      
      <IconButton color='success' onClick={()=>{openImagen(index)}} size="large">
        <Tooltip placement="top" title="Imagen" arrow>
        <Icon>image</Icon>
        </Tooltip>
      </IconButton>

      <IconButton color='warning' onClick={()=>{openCambiarPrecio(index)}} size="large">
      <Tooltip placement="top" title="Cambiar precio" arrow>
        <Icon>request_quote</Icon>
        </Tooltip>
      </IconButton>
      
      <IconButton color='error' onClick={()=>{borrarItem(index)}} size="large">
      <Tooltip placement="top" title="Borrar item" arrow>
        <Icon>delete</Icon>
        </Tooltip>
      </IconButton>
      
    </Stack>
  );
};

export default VentasTablaOpciones;
