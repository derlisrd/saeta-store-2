import { Icon, IconButton, Stack, Tooltip } from "@mui/material";
import { useNotas } from "../../NotasProvider";
function Opciones({index}) {

    const {openCambiarPrecio,borrarItem} = useNotas()

    return ( <Stack direction="row" alignItems="center" spacing={1}>
      
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
    
  </Stack>);
}

export default Opciones;