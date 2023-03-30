import { Avatar,  Card, CardActions, CardHeader, Icon,  MenuItem, Menu, Typography,Button } from "@mui/material";
import { green } from '@mui/material/colors'
import { useState } from "react";
import { funciones } from "../../../Functions";
function Dolar({cotizacion}) {

    const [moneda,setMoneda] = useState('GsxDolar')
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleChange = e=>{
        setAnchorEl(null);
        setMoneda(e)
    }
    const handleOpen = (event) => {setAnchorEl(event.currentTarget); }
    const handleClose = ()=>{ setAnchorEl(null);}



    return ( <Card sx={{ width: '100%',boxShadow:6,p:1,margin:'0 auto' }} >
    <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: green[400] }}><Icon >attach_money</Icon></Avatar>
        }
        
        title={<Typography gutterBottom variant="h6" component="div">
        {funciones.numberSeparator(cotizacion[moneda].compra)} {funciones.numberSeparator(cotizacion[moneda].venta)}
      </Typography>}
        subheader={<Typography gutterBottom variant="button" component="div">
        {moneda}
      </Typography>}
      />
      <CardActions>
        <Button onClick={handleOpen} endIcon={<Icon>navigate_next</Icon>}  >Seleccionar </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={()=>{handleChange("GsxDolar")}}>Gs x Dolar</MenuItem>
          <MenuItem onClick={()=>{handleChange("GsxReal")}}>Real x Dolar</MenuItem>
          <MenuItem onClick={()=>{handleChange("RealxDolar")}}>Real x Dolar</MenuItem>
        </Menu>
  </CardActions>
    </Card> );
}

export default Dolar;