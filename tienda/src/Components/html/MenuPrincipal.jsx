import React from 'react'
import {AiOutlineHome} from 'react-icons/ai'
import { Link } from "react-router-dom";
import {Navbar,Collapse,Nav,NavItem,NavLink, NavbarBrand } from "reactstrap";

import {BsTelephoneOutbound,BsMinecart } from 'react-icons/bs';
import {BiCategory} from 'react-icons/bi'
import UseAnimations from "react-useanimations";
import menu2 from 'react-useanimations/lib/menu2';

const MenuPrincipal = ({toggle,isOpen,datos,...rest}) => {
  return (
    <Navbar expand="md"  {...rest} >
        <NavbarBrand tag={Link} to="/" className="mr-1 text-muted">
          {datos.site_name}
        </NavbarBrand>

        <UseAnimations role='button' speed={3} className='d-sm-block d-md-none' onClick={toggle} animation={menu2} size={56} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto border rounded" navbar >
            <NavItem>
              <NavLink tag={Link} onClick={toggle} to="/"><div className="d-flex justify-content-center align-items-center gap-2"><AiOutlineHome />  Inicio</div></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} onClick={toggle} to="/catalogo"><div className="d-flex justify-content-center align-items-center gap-2"> <BsMinecart /> Catalogo</div></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} onClick={toggle} to="/category"><div className="d-flex justify-content-center align-items-center gap-2"><BiCategory />  Categorias</div></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} onClick={toggle} to="/contacto"> <div className="d-flex justify-content-center align-items-center gap-2">  <BsTelephoneOutbound /> Contacto </div></NavLink>
            </NavItem>
          </Nav>
          {/* <NavbarText className="fw-bold text-dark uppercase"> {datos.site_name} </NavbarText> */}
        </Collapse>
      </Navbar>
  )
}

export default MenuPrincipal
