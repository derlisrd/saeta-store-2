import { Avatar, Button, Card, CardActions, CardHeader, Icon, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { useDatosEmpresa } from "../../../Contexts/DatosEmpresaProvider";

function MonedaPrincipal() {
    const {MONEDA_PRINCIPAL} = useDatosEmpresa()

    

    return ( <Card sx={{ width: '100%',boxShadow:3,p:1,margin:'0 auto' }} >
    <CardHeader avatar={<Avatar sx={{ bgcolor: orange[500] }}><Icon >monetization_on</Icon></Avatar>}
        title={<Typography gutterBottom variant="h6" component="div">
        {MONEDA_PRINCIPAL.nombre_moneda} {MONEDA_PRINCIPAL.abreviatura_moneda}
      </Typography>}
        subheader={<Typography gutterBottom variant="button" component="div">
        Moneda Principal
      </Typography>}
      />
      <CardActions>
    <Button endIcon={<Icon>navigate_next</Icon>} size="small">Ver todo</Button>
  </CardActions>
    </Card>  );
}

export default MonedaPrincipal;