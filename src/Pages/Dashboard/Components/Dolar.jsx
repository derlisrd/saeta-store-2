import { Avatar, Button, Card, CardActions, CardHeader, Icon, Typography } from "@mui/material";
import { green } from '@mui/material/colors'
function Dolar() {
    return ( <Card sx={{ maxWidth: 500,boxShadow:3,p:1,margin:'0 auto' }} >
    <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: green[400] }}><Icon >attach_money</Icon></Avatar>
        }
        
        title={<Typography gutterBottom variant="h6" component="div">
        7.350 7.350
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