import DashboardProvider from "./DashboardProvider";
import DashboardList from './DashboardList'
import { useLogin } from "../../Contexts/LoginProvider";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import DashboardMain from "./Components/DashboardMain";

const DashBoard = () => {

  const {userData} = useLogin()

  const {permisos} = userData

  if(permisos.some(e => parseInt(e.id_permiso_permiso) === parseInt(1)) ){
    return(
    <DashboardProvider>
      <DashboardMain />
    </DashboardProvider>
  )
  }

  return (
    <Container>
      <Typography variant="h6">Bienvenid@ {userData.nombre_user}</Typography>
    </Container>
  )
  
};

export default DashBoard;
