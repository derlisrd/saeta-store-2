import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useLang } from "../../Contexts/LangProvider";
import { useLogin } from "../../Contexts/LoginProvider";
const DashBoard = () => {
  const {lang} = useLang();
  const {userData} = useLogin();
  
  let ndate = new Date();
  let hours = ndate.getHours();
  let message = hours < 12 ? lang.buen_dia : hours < 18 ? lang.buenas_tardes : lang.buenas_noches;

  return (
    <Grid container spacing={2} >
      <Grid item xs={12}  md={6}>
     <Card>
       <CardContent>
         <Typography variant="h5">{message} {userData.nombre_user}</Typography>
       </CardContent>
     </Card>
     </Grid>

    

    </Grid>
  )
}

export default DashBoard
