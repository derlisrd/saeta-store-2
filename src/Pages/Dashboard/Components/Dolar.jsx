import { Avatar, Button, Card, CardActions, CardHeader, Icon, Typography } from "@mui/material";
import { green } from '@mui/material/colors'
import { funciones } from "../../../Functions";
function Dolar({compra,venta}) {
    return ( <Card sx={{ width: '100%',boxShadow:6,p:1,margin:'0 auto' }} >
    <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: green[400] }}><Icon >attach_money</Icon></Avatar>
        }
        
        title={<Typography gutterBottom variant="h6" component="div">
        {funciones.numberSeparator(compra)} {funciones.numberSeparator(venta)}
      </Typography>}
        subheader={<Typography gutterBottom variant="button" component="div">
        Dolar
      </Typography>}
      />
      <CardActions>
    <Button endIcon={<Icon>navigate_next</Icon>} size="small">Aplicar</Button>
  </CardActions>
    </Card> );
}

export default Dolar;