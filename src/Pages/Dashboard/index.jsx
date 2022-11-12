import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Icon,Container, Stack, Typography
} from "@mui/material";
import { green,deepOrange, blue } from '@mui/material/colors';
import { useEffect, useState,  useCallback } from "react";
import { useLang } from "../../Contexts/LangProvider";
//import { useLogin } from "../../Contexts/LoginProvider";
import { dashboardlist } from "./dashboardlist";
import useGoto from "../../Hooks/useGoto";
import { funciones } from "../../Functions";
import { APICALLER } from "../../Services/api";
import LoadingLinear from "../../Components/UI/LoadingLinear";


const DashBoard = () => {
  const { lang } = useLang();
  //const {userData} = useLogin();
  const navigate = useGoto();
  const [isLoading, setIsLoading] = useState(true);
  const [datas, setDatas] = useState({
    ventasHoy: 0,
    ventasMes: 0,
    movimientos:[],
    productos:[]
  });
  /* const [cotizacion,setCotizacion] = useState({
    bcp:{
      compra: 0,
      venta: 0
    },
    cambioschaco:{
      compra: 0,
      venta: 0
    },
    fecha:""
  }); */
  /* let ndate = new Date();
  let hours = ndate.getHours();
  let message = hours < 12 ? lang.buen_dia : hours < 18 ? lang.buenas_tardes : lang.buenas_noches; */

  const getCotizacion = useCallback(async () => {
    setIsLoading(true);
    //setCotizacion([])
    /* setLoading({general:true});
    let res = await fetch ('https://dolar.melizeche.com/api/1.0/');
    let data = await res.json();
    setCotizacion(data?.dolarpy);
    setLoading({general:false}); */
    let today = funciones.fechaActualYMD();
    let first = funciones.firstDayYMD();
    let res = await Promise.all([
      APICALLER.get({
        table: "facturas",
        fields: "SUM(monto_total_factura) as total",
        where: `fecha_factura,between,'${today} 00:00:00',and,'${today} 23:59:59'`,
      }),
      APICALLER.get({
        table: "facturas",
        fields: "SUM(monto_total_factura) as total",
        where: `fecha_factura,between,'${first} 00:00:00',and,'${today} 23:59:59'`,
      }),
      APICALLER.get({
        table: "cajas_movimientos", include:'cajas_registros',on:'id_cajas_registro,id_tipo_registro',
        fields: "monto_movimiento,monto_sin_efectivo,detalles_movimiento,descripcion_registro,fecha_movimiento",
        where: `id_tipo_registro,=,1`, pagesize:5,sort:'id_cajas_movimiento'
      }),
      APICALLER.get({
        table: "productos_vendidos", include:'productos',on:'id_producto,id_producto_vendido',
        fields: "precio_vendido,nombre_producto", sort:'id_productos_vendido',
        pagesize:5
      })
    ]);
    let ventashoy = res[0],ventasmes = res[1],mov = res[2], pro = res[3];
    
    if (ventashoy.response && ventasmes.response) {
      setDatas({
        ventasHoy: ventashoy.first.total ? parseFloat(ventashoy.first.total): 0,
        ventasMes: ventasmes.first.total? parseFloat(ventasmes.first.total): 0,
        movimientos:mov.results,
        productos: pro.results
      });
    }

    setIsLoading(false);
  }, []);



  useEffect(() => {
    const ca = new AbortController();
    let isActive = true;
    if (isActive) {
      getCotizacion();
    }
    return () => {
      isActive = false;
      ca.abort();
    };
  }, [getCotizacion]);

  if (isLoading) {
    return <LoadingLinear />;
  }

  return (
    <Container maxWidth='xl'>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={5}>
        <Card sx={{ bgcolor:'primary.light',p:2}}>
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
            <Icon sx={{ fontSize:90,color: deepOrange[600] }} >sell</Icon>
            </Stack>  
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={7}>
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
            <Icon sx={{ fontSize:100,color: green[600] }} >bar_chart</Icon>
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
        <Card>
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



      {dashboardlist.map((e) => (
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
};

export default DashBoard;
