import React,{useCallback, useEffect, useState} from "react";
import { Container, Row, Col } from "reactstrap";
import {BiEnvelope  } from "react-icons/bi";
import {BsTelephoneOutbound,BsWhatsapp } from 'react-icons/bs';

import Loading from "../Components/Loading";
import MenuPrincipal from "../Components/MenuPrincipal";
import { APICALLER } from "../Services/api";

const Base = ({ children, ...args }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading,setLoading] = useState(true)
  const [datos,setDatos] = useState({
    site_name:'',
    tel: '',
    email:'',
    whatsapp:''
  })
  const toggle = () => setIsOpen(!isOpen);

  const getDatas = useCallback(async()=>{
    setLoading(true)
    let [site,tel,email,wa] = await Promise.all([
      APICALLER.get({table:'options',where:`option_key,=,'site_name'`,fields:'option_value'}),
      APICALLER.get({table:'options',where:`option_key,=,'tel'`,fields:'option_value'}),
      APICALLER.get({table:'options',where:`option_key,=,'email'`,fields:'option_value'}),
      APICALLER.get({table:'options',where:`option_key,=,'whatsapp'`,fields:'option_value'})
    ])
    console.log(site,tel)
    setDatos({
      site_name: site.response ? site.results[0].option_value : '',
      tel: tel.response ? tel.results[0].option_value : '',
      email:email.response ? email.results[0].option_value : '',
      whatsapp:wa.response ? wa.results[0].option_value : ''
    })
    setLoading(false)
  },[])
  
  useEffect(() => {
    let isActive = true;
    const ca = new AbortController();
    if (isActive) {
      getDatas();
    }
    return () => {
      isActive = false;
      ca.abort();
    };
  }, [getDatas]);



  if(loading) {
    return <Loading />
  }
  
  return (
    <Container>
      <MenuPrincipal toggle={toggle} isOpen={isOpen} datos={datos} />
      <Container>{children}</Container>
      
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

      <Container className="bg-muted w-100 rounded my-5" style={{ background:'#ebebeb' }}>
        <p className="text-center text-muted p-4">Copyright © 2023. Todos Los Derechos Reservados. Sitio web hecho por Saeta Sistemas</p>
      </Container>
    </Container>
  );
};

export default Base;
