import { Button, Tooltip } from '@mui/material';
import { useNotas } from '../NotasProvider';

const InfoCliente = () => {
    const {datosNotas,indexFactura,setDialogs,dialogs} = useNotas();
    const cl = datosNotas.facturas[indexFactura].datosCliente;

    const abrir = ()=> setDialogs({...dialogs,cambioCliente:true});

  return (
    <Tooltip arrow placement='right' title={<h3>Cambiar cliente</h3>}>
    <Button onClick={abrir} variant="text">
        Cliente: {cl.nombre_cliente} 
    </Button>
    </Tooltip>
  )
}

export default InfoCliente
