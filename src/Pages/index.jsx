import LoginProvider from "../Contexts/LoginProvider";
import { BrowserRouter } from "react-router-dom";
import RoutesMain from "../Routes/RoutesMain";
import MenuProvider from "../Contexts/MenuProvider";
import DatosEmpresaProvider from "../Contexts/DatosEmpresaProvider";
import NotificationProvider from "../Contexts/NotificationProvider";

const Pages = () => {
  return (
    <BrowserRouter>
      <LoginProvider>
        <NotificationProvider>
          <MenuProvider>
            <DatosEmpresaProvider>
              <RoutesMain />
            </DatosEmpresaProvider>
          </MenuProvider>
        </NotificationProvider>
      </LoginProvider>
    </BrowserRouter>
  );
};

export default Pages;
