import React from 'react'
import {AiOutlineHome} from 'react-icons/ai'
import { Link } from "react-router-dom";
import {Navbar,NavbarToggler,Collapse,Nav,NavItem,NavLink,NavbarText, NavbarBrand } from "reactstrap";
import {BsTelephoneOutbound,BsMinecart } from 'react-icons/bs';

const MenuPrincipal = ({toggle,isOpen,datos,...rest}) => {
  return (
    <Navbar expand="md"  {...rest} >
        <NavbarBrand tag={Link} to="/" className="mr-1 text-muted">
          {datos.site_name}
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto border rounded" navbar >
            <NavItem>
              <NavLink tag={Link} onClick={toggle} to="/"><div className="d-flex justify-content-center align-items-center gap-2"><AiOutlineHome />  Inicio</div></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} onClick={toggle} to="/catalogo"><div className="d-flex justify-content-center align-items-center gap-2"> <BsMinecart /> Catalogo</div></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} onClick={toggle} to="/catalogo"> <div className="d-flex justify-content-center align-items-center gap-2">  <BsTelephoneOutbound /> Contacto </div></NavLink>
            </NavItem>
          </Nav>
          <NavbarText className="fw-bold text-dark uppercase"> {datos.site_name} </NavbarText>
        </Collapse>
      </Navbar>
  )
}

export default MenuPrincipal
