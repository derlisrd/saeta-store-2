import React from 'react'
import { Button, FormControlLabel, Menu, MenuItem, Switch } from '@mui/material';
import { useVentas } from './VentasProvider';

const InfoDeposito = () => {
    const {cambiarDeposito,datosFacturas,indexFactura,setearFactura} = useVentas();
    const df = {...datosFacturas};
    const fa = df.facturas[indexFactura]
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleChange = e=>{
        cambiarDeposito(e.id_deposito)
        setAnchorEl(null);
    }
    const handleOpen = (event) => {setAnchorEl(event.currentTarget); }
    const handleClose = ()=>{ setAnchorEl(null);}
    let filter = datosFacturas.listaDepositos.filter(e=> e.id_deposito === fa.depositoActivo);
    let NOMBRE = filter[0]?.nombre_deposito || "Depositos no habilitados"
    
    const changeSwitch = e =>{
      let f = {...datosFacturas}
      f.alldepositos = !f.alldepositos;
      setearFactura(f);
    }


    return (
        <div>
        <Button onClick={handleOpen} disabled={datosFacturas.alldepositos}>
          {NOMBRE}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {
              datosFacturas.listaDepositos.map((e,i)=>(<MenuItem key={i} onClick={()=>{handleChange(e)}}>{e.nombre_deposito}</MenuItem>))
          }
        </Menu>
          <FormControlLabel control={<Switch onChange={changeSwitch} checked={datosFacturas.alldepositos}  />} label="Todos" />
      </div>
      )
}

export default InfoDeposito