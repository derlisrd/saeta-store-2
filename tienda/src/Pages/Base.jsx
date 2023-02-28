import React,{useState} from "react";
import { Container } from "reactstrap";
import Footer from "../Components/html/Footer";


import Loading from "../Components/Loading";
import MenuPrincipal from "../Components/html/MenuPrincipal";

import { useDatos } from "../Providers/DatosProvider";
import Carrito from "../Components/Carrito";

const Base = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const {loadingPage,datos} = useDatos()

  if(loadingPage) {
    return <Loading />
  }
  
  return (
    <Container>
      <Carrito />
      <MenuPrincipal toggle={toggle} isOpen={isOpen} datos={datos} />
      <Container>{children}</Container>
      <Footer datos={datos} />
    </Container>
  );
};

export default Base;
