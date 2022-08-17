import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Grid,Icon,Typography } from "@mui/material";
import { useCallback } from "react";
import { useEffect,/* useState */ } from "react";
import { useLang } from "../../Contexts/LangProvider";
import { useLogin } from "../../Contexts/LoginProvider";
import { dashboardlist } from "./dashboardlist";
import useGoto from "../../Hooks/useGoto"
const DashBoard = () => {
  const {lang} = useLang();
  const {userData} = useLogin();
  const navigate = useGoto()
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
  let ndate = new Date();
  let hours = ndate.getHours();
  let message = hours < 12 ? lang.buen_dia : hours < 18 ? lang.buenas_tardes : lang.buenas_noches;

  const getCotizacion = useCallback( async()=>{
    //setCotizacion([])
    /* setLoading({general:true});
    let res = await fetch ('https://dolar.melizeche.com/api/1.0/');
    let data = await res.json();
    setCotizacion(data?.dolarpy);
    setLoading({general:false}); */
  },[])

  useEffect(() => {
    const ca = new AbortController();
    let isActive = true;
    if (isActive) {
      getCotizacion()
    }
    return () => {
      isActive = false;
      ca.abort();
    };
  }, [getCotizacion]);

  return (
    <Grid container spacing={2} >
      <Grid item xs={12} >
        <Card sx={{ bgcolor: "primary.light"}}>
          <CardContent>
            <Typography variant="button">{message}, {userData.nombre_user}.</Typography>
            <br />
            <Typography variant="overline">Bienvenido nuevamente</Typography>
            <br />
            <Button variant="contained">{lang.iniciar}</Button>
          </CardContent>
        </Card>
     </Grid>
     {
      dashboardlist.map((e)=>(
        <Grid key={e.id} item xs={12} sm={6} md={4} lg={4} xl={3} >
          <Card sx={{ p:2,bgcolor:e.card ? e.card.bgcolor : "background.paper" }} >
          <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: e.icon.color }}  >
                  <Icon>{e.icon.name}</Icon>
                </Avatar>
              }
              title={<h2>{lang[e.title]}</h2>} 
              subheader={e.description}
            />
          <CardContent>
            {e.text}
          </CardContent>
          <CardActions>
            {e.button && <Button fullWidth startIcon={<Icon>{e.icon.name}</Icon>} variant="contained" onClick={()=>{navigate.to(e.url)}}>{e.buttontext}</Button>}
          </CardActions>
        </Card>
     </Grid>
      ))
     }
    </Grid>
  )
}

export default DashBoard
