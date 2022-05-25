import React from 'react'
import { Button, Tooltip } from '@mui/material';
import { useVentas } from './VentasProvider';

const InfoNota = () => {
    const {setDialogs,dialogs} = useVentas();
    const abrir = ()=> setDialogs({...dialogs,nota:true});
    return (
        <Tooltip arrow placement='top' title={<h3>Cargar una nota ya creada</h3>}>
        <Button variant="text" onClick={abrir}>
            Cargar nota . . .
        </Button>
        </Tooltip>
      )
}

export default InfoNota
