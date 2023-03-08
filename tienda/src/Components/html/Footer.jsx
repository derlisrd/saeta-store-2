
import UseAnimations from "react-useanimations";
import instagram from 'react-useanimations/lib/instagram';
import facebook from 'react-useanimations/lib/facebook';
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
            <p><a href={`https://wa.me/${datos.whatsapp ?? ''}`}  rel="noreferrer" target="_blank"><BsWhatsapp size="2rem" color="#05a342" /></a></p>
            <h6 className="my-3"> {datos.whatsapp} </h6>
            <p className="text-muted my-2">Whatsapp</p>
          </Col>
        </Row>
      </Container>
      <Container>
        <div className="d-flex justify-content-center gap-3">
          <><a href={`https://facebook.com/${datos.facebook ?? ''}`}  rel="noreferrer" target="_blank"> 
          <UseAnimations strokeColor="#4267B2" animation={facebook} size={56} />
          </a></>
          <><a href={`https://instagram.com/${datos.instagram ?? ''}`} rel="noreferrer" target="_blank"> 
          <UseAnimations strokeColor="#833AB4" animation={instagram} size={56} />
          </a></>
        </div>
      </Container> 
      <Container className="bg-muted w-100 rounded my-5 p-2" style={{ background:'#ebebeb' }}>
        <p className="text-center text-muted mt-1">{datos.direccion ?? ''}</p>
        <p className="text-center text-muted">
          Copyright {datos.site_name} © 2023. Todos Los Derechos Reservados. Sitio hecho con <BsFillSuitHeartFill color="#ee1e1e" />
        </p>
      </Container>
    </>
  );
}

export default Footer;