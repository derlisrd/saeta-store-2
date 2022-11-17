import DashboardProvider from "./DashboardProvider";
import DashboardList from './DashboardList'

const DashBoard = () => {

  return(
    <DashboardProvider>
      <DashboardList />
    </DashboardProvider>
  )
  
};

export default DashBoard;
