import LoginProvider from "../Contexts/LoginProvider";
import { BrowserRouter } from "react-router-dom";
import RoutesMain from "./RoutesMain";
import MenuProvider from "../Contexts/MenuProvider";
import DatosEmpresaProvider from "../Contexts/DatosEmpresaProvider";

const Pages = () => {
  return (
    <BrowserRouter>
      <LoginProvider>
        <MenuProvider>
          <DatosEmpresaProvider>
            <RoutesMain />
          </DatosEmpresaProvider>
        </MenuProvider>
      </LoginProvider>
    </BrowserRouter>
  );
};

export default Pages;
