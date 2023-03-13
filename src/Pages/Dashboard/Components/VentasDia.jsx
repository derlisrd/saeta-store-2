import { Avatar, Button, Card, CardActions, CardHeader, Icon, Typography } from "@mui/material";
import { red } from '@mui/material/colors'
import { funciones } from "../../../Functions";
function VentasDia({valor}) {
    return ( <Card sx={{ width: '100%',boxShadow:3,p:1,margin:'0 auto' }} >
        <CardHeader avatar={<Avatar sx={{ bgcolor: red[500] }}><Icon >sell</Icon></Avatar>}
            title={<Typography gutterBottom variant="h6" component="div">
            {funciones.numberSeparator(valor)}
          </Typography>}
            subheader={<Typography gutterBottom variant="button" component="div">
            Ventas del dia
          </Typography>}
          />
          <CardActions>
        <Button endIcon={<Icon>navigate_next</Icon>} size="small">Ver todo   </Button>
      </CardActions>
        </Card> );
}

export default VentasDia;