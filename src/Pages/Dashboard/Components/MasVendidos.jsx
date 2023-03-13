import { Avatar, Card, CardContent, CardHeader, Icon, List, ListItem, ListItemText, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { Fragment } from "react";

function MasVendidos({masvendidos}) {
    return ( <Card sx={{ maxWidth: "100%", boxShadow: 3, p: 0, margin: "0 auto", }}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: orange[900] }}>
          <Icon>local_fire_department</Icon>
        </Avatar>
      }
      title={<Typography variant="button">Últimos más vendidos</Typography>}
    />
    <CardContent sx={{ p: 0,'&:last-child': {p:0} }}>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          
        }}
      >
        {masvendidos.map((e, i) => (
          <Fragment key={i}>
            <ListItem
                sx={{ pb:0 }}
                secondaryAction={<b>{e.cantidad_vendido}</b>}
            >
              <ListItemText
                primary={<b>{e.nombre_producto}</b>}
              />
            </ListItem>
          </Fragment>
        ))}
      </List>
    </CardContent>
  </Card> );
}

export default MasVendidos;