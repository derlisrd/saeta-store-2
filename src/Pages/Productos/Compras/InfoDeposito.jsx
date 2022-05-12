import React from 'react'
import { Button, Menu, MenuItem } from '@mui/material';
import { useCompras } from './ComprasProvider';

const InfoDeposito = () => {
    const {listaDepositos,cambiarDeposito,idDeposito} = useCompras();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleChange = e=>{
        cambiarDeposito(e.id_deposito)
        setAnchorEl(null);
    }
    const handleOpen = (event) => {setAnchorEl(event.currentTarget); }
    const handleClose = ()=>{ setAnchorEl(null);}
    let filter = listaDepositos.filter(e=> e.id_deposito === idDeposito);
    let NOMBRE = filter[0]?.nombre_deposito || "Selecciona deposito"
    return (
        <div>
        <Button
          onClick={handleOpen}
        >
          {NOMBRE}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {
            listaDepositos.map((e,i)=>(<MenuItem key={i} onClick={()=>{handleChange(e)}}>{e.nombre_deposito}</MenuItem>))
          }
        </Menu>
      </div>
      )
}

export default InfoDeposito