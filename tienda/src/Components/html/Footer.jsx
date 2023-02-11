import { CiFacebook } from "react-icons/ci";
import {FaInstagram} from 'react-icons/fa'
import { BiEnvelope } from "react-icons/bi";
import { BsFillSuitHeartFill, BsTelephoneOutbound, BsWhatsapp } from "react-icons/bs";
import { Col, Container, Row } from "reactstrap";

function Footer({datos}) {
    return (
        <>
      <Container className="my-5 mx-auto text-center w-100 border p-5 rounded">
        <Row className="g-4">
          <Col xs={12} md={4}>
            <BsTelephoneOutbound size="2rem" color="#9934ad" />
            <h6 className="my-3"> {datos.tel} </h6>
            <p className="text-muted my-2">Teléfono</p>
          </Col>
          <Col xs={12} md={4}>
            <BiEnvelope size="2rem" color="#9b9999" />
            <h6 className="my-3"> {datos.email}</h6>
            <p className="text-muted my-2">E-mail</p>
          </Col>
          <Col xs={12} md={4}>
            <BsWhatsapp size="2rem" color="#05a342" />
            <h6 className="my-3"> {datos.whatsapp} </h6>
            <p className="text-muted my-2">Whatsapp</p>
          </Col>
        </Row>
      </Container>
      <Container>
        <div className="d-flex justify-content-center gap-3">
          <p><a href="https://facebook.com/" rel="noreferrer" target="_blank"> <CiFacebook color="#4267B2" size="2rem"  /></a></p>
          <p><a href="https://instagram.com/" rel="noreferrer" target="_blank"> <FaInstagram color="#833AB4" size="2rem"  /></a></p>
        </div>
      </Container> 
      <Container className="bg-muted w-100 rounded my-5" style={{ background:'#ebebeb' }}>
        <p className="text-center text-muted p-4">Copyright {datos.site_name} © 2023. Todos Los Derechos Reservados. Sitio hecho con <BsFillSuitHeartFill color="#ee1e1e" /> </p>
      </Container>
    </>
  );
}

export default Footer;