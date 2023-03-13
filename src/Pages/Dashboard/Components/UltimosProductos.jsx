import { Avatar, Card, CardContent, CardHeader, Icon, List } from "@mui/material";
import { red } from "@mui/material/colors";

function UltimosProductos({productos}) {
    return (<Card sx={{ maxWidth: "100%", boxShadow: 3, p: 0, margin: "0 auto" }}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[900] }}>
          <Icon>local_fire_department</Icon>
        </Avatar>
      }
      title={<h3>Últimos más vendidos</h3>}
    />
    <CardContent sx={{ p: 0 }}>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        
      </List>
    </CardContent>
  </Card>);
}

export default UltimosProductos;