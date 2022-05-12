import LoginProvider from "../Contexts/LoginProvider";
import { BrowserRouter } from "react-router-dom";
import RoutesMain from "./RoutesMain";
import MenuProvider from "../Contexts/MenuProvider";

const Pages = () => {
  return (
    <BrowserRouter>
      <LoginProvider>
        <MenuProvider>
          <RoutesMain />
        </MenuProvider>
      </LoginProvider>
    </BrowserRouter>
  );
};

export default Pages;
