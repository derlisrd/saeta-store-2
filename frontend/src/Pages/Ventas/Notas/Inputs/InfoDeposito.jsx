import React from 'react'
import { Button, FormControlLabel, Menu, MenuItem, Switch } from '@mui/material';

import { useNotas } from '../NotasProvider';

const InfoDeposito = () => {
    const {cambiarDeposito,datosNotas,indexFactura,setearNota} = useNotas();
    const df = {...datosNotas};
    const fa = df.facturas[indexFactura]
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleChange = e=>{
        cambiarDeposito(e.id_deposito)
        setAnchorEl(null);
    }
    const handleOpen = (event) => {setAnchorEl(event.currentTarget); }
    const handleClose = ()=>{ setAnchorEl(null);}
    let filter = datosNotas.listaDepositos.filter(e=> e.id_deposito === fa.depositoActivo);
    let NOMBRE = filter[0]?.nombre_deposito || "Depositos no habilitados"
    
    const changeSwitch = e =>{
      let f = {...datosNotas}
      f.alldepositos = !f.alldepositos;
      setearNota(f);
    }


    return (
        <div>
        <Button onClick={handleOpen} disabled={datosNotas.alldepositos}>
          {NOMBRE}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {
              datosNotas.listaDepositos.map((e,i)=>(<MenuItem key={i} onClick={()=>{handleChange(e)}}>{e.nombre_deposito}</MenuItem>))
          }
        </Menu>
          <FormControlLabel control={<Switch onChange={changeSwitch} checked={datosNotas.alldepositos}  />} label="Todos" />
      </div>
      )
}

export default InfoDeposito