import useGoto from "../../Hooks/useGoto";
import { funciones } from "../../Functions";
import { useLang } from "../../Contexts/LangProvider";
import LoadingLinear from "../../Components/UI/LoadingLinear";
import ventas from '../../App/Assets/ventas.svg'
import dinero from '../../App/Assets/dinero.svg'
import {Avatar,Button,Card,CardActions,CardContent,CardHeader,Grid,Icon,Container, Stack, Typography} from "@mui/material";
import { green,deepOrange, blue } from '@mui/material/colors';
import {useDashboard} from './DashboardProvider'

const DashboardList = () => {

    const {isLoading,datas} = useDashboard()
    const { lang } = useLang();
    const navigate = useGoto();

    if (isLoading) {
        return <LoadingLinear />;
      }

      return (
        <Container maxWidth='xl'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} >
            <Card sx={{ bgcolor:'background.paper',p:2}}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: deepOrange[500] }} variant="rounded" >
                    <Icon>sell</Icon>
                  </Avatar>
                }
                title={<h2>Ventas del día</h2>}
               
              />
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Typography variant="h5">{funciones.numberFormat(datas.ventasHoy)} Gs</Typography>
                <img src={ventas} alt="ventas" width={120} height={120} />
                </Stack>  
              </CardContent>
            </Card>
          </Grid>
    
          <Grid item xs={12} sm={6} md={4} >
            <Card sx={{ height:'100%', p:2 }} >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: green[500]}} variant="rounded" >
                    <Icon sx={{ fontSize:30 }}>bar_chart</Icon>
                  </Avatar>
                }
                title={<h2>Ventas del mes</h2>}
              />
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Typography variant="h5">{funciones.numberFormat(datas.ventasMes)} Gs</Typography>
                <img src={dinero} alt="ventas" width={120} height={120} />
                </Stack>  
              </CardContent>
              
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={4} >
            <Card sx={{ height:'100%', p:2 }} >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: green[500]}} variant="rounded" >
                    <Icon sx={{ fontSize:30 }}>bar_chart</Icon>
                  </Avatar>
                }
                title={<h2>Dólar</h2>}
              />
              <CardContent>
                <Stack direction="column" justifyContent="space-between" alignItems="flex-start">
                <Typography variant="h6" display="block" >Compra: {datas.cotizacion.compra}  Gs</Typography>
                <Typography variant="h6">Venta: {datas.cotizacion.venta} Gs</Typography>
                
                </Stack>  
              </CardContent>
              
            </Card>
          </Grid>
    
          <Grid item xs={12} sm={12} md={6} lg={8}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: blue[300]}} variant="rounded" >
                    <Icon  >payments</Icon>
                  </Avatar>
                }
                title={<h3>Últimas ventas</h3>}
              />
              <CardContent>
              <Stack direction="column" spacing={3} >
              {
                    datas.movimientos.map((e,i)=>(
                      <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center" key={i}>
                        <Stack direction="row" spacing={1} alignItems="center" >
                        <Avatar><Icon>shopping_bag</Icon></Avatar>
                          <Stack>
                          <Typography variant="subtitle2">{e.descripcion_registro}</Typography>
                          <Typography variant="caption" >{e.detalles_movimiento}</Typography>
                          </Stack>
                        </Stack>
                      
                      <Typography variant="subtitle2" sx={{ color:'#00c292' }}>{funciones.numberFormat(parseFloat(e.monto_movimiento)===0 ? e.monto_sin_efectivo : e.monto_movimiento )} Gs.</Typography>
                    </Stack>
                    ))
                  }
              </Stack>
              </CardContent>
            </Card>
          </Grid>
    
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Card sx={{ minHeight:"100%" }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: blue[600]}} variant="rounded" >
                    <Icon >shopping_bag</Icon>
                  </Avatar>
                }
                title={<h4>Últimos productos vendidos</h4>}
              />
              <CardContent>
              <Stack direction="column" spacing={3} >
              {
                    datas.productos.map((e,i)=>(
                      <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center" key={i}>
    
                     <Stack direction="row" spacing={1} alignItems="center" >
                        <Avatar><Icon>shopping_bag</Icon></Avatar>
                        <Typography variant="caption">{e.nombre_producto}</Typography>                    
                      </Stack>
                      <Typography variant="subtitle2" sx={{ color:'#00c292' }}>{funciones.numberFormat(e.precio_vendido)}</Typography>
                    </Stack>
                    ))
                  }
              </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={6} >
            <Card>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: blue[600]}} variant="rounded" >
                    <Icon >shopping_bag</Icon>
                  </Avatar>
                }
                title={<h4>Productos más vendidos</h4>}
              />
              <CardContent>
              <Stack direction="column" spacing={3} >
              {
                    datas.masvendidos.map((e,i)=>(
                      <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center" key={i}>
    
                     <Stack direction="row" spacing={1} alignItems="center" >
                        <Avatar><Icon>shopping_bag</Icon></Avatar>
                        <Typography variant="caption">{e.nombre_producto}</Typography>                    
                      </Stack>
                      <Typography variant="subtitle2" sx={{ color:'#00c292' }}>{funciones.numberFormat(e.cantidad_vendido)}</Typography>
                    </Stack>
                    ))
                  }
              </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} >
            <Card>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: blue[600]}} variant="rounded" >
                    <Icon >shopping_bag</Icon>
                  </Avatar>
                }
                title={<h4>Productos en falta</h4>}
              />
              <CardContent>
              <Stack direction="column" spacing={3} >
              {
                    datas.falta.map((e,i)=>(
                      <Stack direction="row" spacing={3} justifyContent="space-between" alignItems="center" key={i}>
    
                     <Stack direction="row" spacing={1} alignItems="center" >
                        <Avatar><Icon>shopping_bag</Icon></Avatar>
                        <Typography variant="caption">{e.nombre_producto}</Typography>                    
                      </Stack>
                      <Typography variant="subtitle2" sx={{ color:'#00c292' }}>{funciones.numberFormat(e.stock_producto_deposito)}</Typography>
                    </Stack>
                    ))
                  }
              </Stack>
              </CardContent>
            </Card>
          </Grid>
    
    
    
          {[].map((e) => (
            <Grid key={e.id} item xs={12} sm={6} md={4} lg={4} xl={3}>
              <Card
                sx={{ p: 2, bgcolor: e.card ? e.card.bgcolor : "background.paper" }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: e.icon.color }}>
                      <Icon>{e.icon.name}</Icon>
                    </Avatar>
                  }
                  title={<h2>{lang[e.title]}</h2>}
                  subheader={e.description}
                />
                <CardContent>{e.text}</CardContent>
                <CardActions>
                  {e.button && (
                    <Button
                      fullWidth
                      startIcon={<Icon>{e.icon.name}</Icon>}
                      variant="contained"
                      onClick={() => {
                        navigate.to(e.url);
                      }}
                    >
                      {e.buttontext}
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        </Container>
      );
}

export default DashboardList
