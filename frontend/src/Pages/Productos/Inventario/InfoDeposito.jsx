import React from 'react'
import { Button, Menu, MenuItem } from '@mui/material';
import { useInventario } from './InventarioProvider';

const InfoDeposito = () => {
    const {listaDepositos,cambiarDeposito,idDeposito,lang} = useInventario();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleChange = e=>{
        cambiarDeposito(e.id_deposito)
        setAnchorEl(null);
    }
    const handleOpen = (event) => {setAnchorEl(event.currentTarget); }
    const handleClose = ()=>{ setAnchorEl(null);}
    let filter = listaDepositos.filter(e=> e.id_deposito === idDeposito);
    let NOMBRE = filter[0].nombre_deposito || "Depositos no habilitados"
    return (
        <div>
        <Button
          onClick={handleOpen}
        >
          {lang.deposito}: {NOMBRE}
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