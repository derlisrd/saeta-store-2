import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { useCallback } from "react";
import { useEffect,/* useState */ } from "react";
import { useLang } from "../../Contexts/LangProvider";
import { useLogin } from "../../Contexts/LoginProvider";
const DashBoard = () => {
  const {lang} = useLang();
  const {userData} = useLogin();
  //const [cotizacion,setCotizacion] = useState([]);
  let ndate = new Date();
  let hours = ndate.getHours();
  let message = hours < 12 ? lang.buen_dia : hours < 18 ? lang.buenas_tardes : lang.buenas_noches;

  const getCotizacion = useCallback( async()=>{
    let res = await fetch ('https://dolar.melizeche.com/api/1.0/');
    let data = await res.json();
    console.log(data)
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
      <Grid item xs={12} sm={12} md={12} lg={4} xl={3} >
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
     <Grid item xs={12} sm={12} md={12} lg={4} xl={3} >
        <Card >
          <CardContent>
            <Typography variant="button">Cotizacion del dia</Typography>
            <br />
            <Typography variant="overline">Bienvenido nuevamente</Typography>
            <br />
            <Button variant="contained">{lang.iniciar}</Button>
          </CardContent>
        </Card>
     </Grid>
    

    </Grid>
  )
}

export default DashBoard
