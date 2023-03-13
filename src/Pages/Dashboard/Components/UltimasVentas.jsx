import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Icon,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { blue } from "@mui/material/colors";
import FechaMesDia from "../../../Components/UI/FechaMesDia";
import { funciones } from "../../../Functions";

function UltimasVentas({ movimientos }) {
  return (
    <Card sx={{ maxWidth: "100%", boxShadow: 3, p: 0,m:0 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[300] }}>
            <Icon>payments</Icon>
          </Avatar>
        }
        title={<Typography variant="button">Últimas ventas</Typography>}
      />
      <CardContent sx={{ p: 0,  '&:last-child': {p:0,mb:1} }}>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            pb:0,
          }}
        >
          {movimientos.map((e, i) => (
            <Fragment key={i}>
              <ListItem
                sx={{ pb:0, }}
                secondaryAction={<b>{funciones.numberFormat(parseFloat(e.monto_movimiento)===0 ? e.monto_sin_efectivo : e.monto_movimiento )}</b>}
              >
                <ListItemAvatar>
                  <FechaMesDia fecha={e.fecha_movimiento} />
                </ListItemAvatar>
                <ListItemText
                  primary={<b>{e.descripcion_registro}</b>}
                  secondary={e.detalles_movimiento}
                />
              </ListItem>
              
            </Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default UltimasVentas;
