import { Box } from '@mui/material';

import { env } from "../../App/Config/config";
import DrawerDesktop from './DrawerDesktop';
import DrawerMobile from './DrawerMobile';




export default function DrawerMainMenu() {

  const {DRAWER_WIDTH} = env


  return (
    <Box
        component="nav"
        sx={{ width: { md:DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        <DrawerDesktop />
        <DrawerMobile />
      </Box>
  );
}
