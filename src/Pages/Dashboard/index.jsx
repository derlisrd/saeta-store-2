import DashboardProvider from "./DashboardProvider";
import DashboardList from './DashboardList'
import { useLogin } from "../../Contexts/LoginProvider";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";

const DashBoard = () => {

  const {userData} = useLogin()

  const {permisos} = userData

  if(permisos.some(e => parseInt(e.id_permiso_permiso) === parseInt(63)) ){
    return(
    <DashboardProvider>
      <DashboardList />
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
