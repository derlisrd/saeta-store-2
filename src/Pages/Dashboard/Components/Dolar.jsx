import { Avatar,  Card, CardActions, CardHeader, FormControl, Icon, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { green } from '@mui/material/colors'
import { useState } from "react";
import { funciones } from "../../../Functions";
function Dolar({cotizacion}) {

    const [moneda,setMoneda] = useState('GsxDolar')
    



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
      <FormControl fullWidth>
        <InputLabel>Moneda</InputLabel>
        <Select
          value={moneda}
          label="Moneda"
          onChange={e=>{ setMoneda(e.target.value);}}
        >
          <MenuItem value="GsxDolar">Gs x Dolar</MenuItem><MenuItem value="GsxReal">Real x Dolar</MenuItem><MenuItem value="RealxDolar">Real x Dolar</MenuItem>
        </Select>
      </FormControl>
  </CardActions>
    </Card> );
}

export default Dolar;