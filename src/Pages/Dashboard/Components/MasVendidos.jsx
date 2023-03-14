import { Avatar, Card, CardContent, CardHeader, Icon, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { Fragment } from "react";

function MasVendidos({masvendidos}) {
    return ( <Card sx={{ maxWidth: "100%", height:'100%', boxShadow: 3, p: 0, margin: "0 auto", }}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: orange[900] }}>
          <Icon>sell</Icon>
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
                sx={{ pb:1, ':hover':{background:'none'} }}
                secondaryAction={<b>{e.cantidad_vendido}</b>}
            >
              <ListItemAvatar>
                <Avatar><Icon >shopping_bag</Icon></Avatar>
              </ListItemAvatar>
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