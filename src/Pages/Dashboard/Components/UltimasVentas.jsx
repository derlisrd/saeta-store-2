import { Avatar, Card, CardContent, CardHeader, Icon } from "@mui/material";
import { blue } from "@mui/material/colors";
import FechaMesDia from "../../../Components/UI/FechaMesDia";

function UltimasVentas() {
    return ( <Card sx={{ maxWidth: "100%",boxShadow:3,p:1,margin:'0 auto' }} >
        <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: blue[300]}} variant="rounded" >
                    <Icon>payments</Icon>
                  </Avatar>
                }
                title={<h3>Últimas ventas</h3>}
              />
              <CardContent>
                <FechaMesDia />
              </CardContent>
    </Card> );
}

export default UltimasVentas;