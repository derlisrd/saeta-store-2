
import { Avatar, Button, Card, CardActions, CardHeader, Icon, Typography } from "@mui/material";
import { purple} from '@mui/material/colors'

function VentasTotales() {
    return ( <Card sx={{ width: '100%',boxShadow:3,p:1,margin:'0 auto' }} >
    <CardHeader avatar={<Avatar sx={{ bgcolor: purple[500] }}><Icon >credit_card</Icon></Avatar>}
        title={<Typography gutterBottom variant="h6" component="div">
        0
      </Typography>}
        subheader={<Typography gutterBottom variant="button" component="div">
        Conteo de venta
      </Typography>}
      />
      <CardActions>
    <Button endIcon={<Icon>navigate_next</Icon>} size="small">Ver todo   </Button>
  </CardActions>
    </Card>  );
}

export default VentasTotales;