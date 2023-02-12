import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Loading from "../../Components/Loading";
import { APICALLER } from "../../Services/api";
import Categorias from "../Components/Categorias";



const Home = () => {

  const [loading, setLoading] = useState(true);
  const [lista, setLista] = useState([]);

  const getLista = useCallback(async () => {
    setLoading(true);
    let res = await APICALLER.get({
      table: "categorias",
      include: "productos,productos_images",
      on: "id_categoria,id_categoria_producto,id_producto,id_image_producto",
      fields:
        "nombre_categoria,id_categoria,url_imagen",
      where: "portada_imagen_producto,=,1,and,tipo_producto,=,1",
      pagesize:3, sort:'id_producto'
    });
    if (res.response) {
      setLista(res.results);
      //console.log(res.results);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let isActive = true;
    const ca = new AbortController();
    if (isActive) {
      getLista();
    }
    return () => {
      isActive = false;
      ca.abort();
    };
  }, [getLista]);


  if (loading) {
    return <Loading />;
  }

  return (
    <Row>
      <Col xs={12}>
        <div  className="mt-5 pt-5 d-flex justify-content-center align-items-center">
        <Link to="/catalogo" className="text-center btn btn-primary rounded">
          Ver todos los productos
        </Link>
        </div>
      </Col>
      <Col xs={12}>
        <h1 className="text-center text-muted mt-5">ULTIMAS NOVEDADES</h1>
      </Col>
      <Col xs={12}>
      <Row className="gy-5 mx-auto mt-1">
        <Categorias lista={lista} />
      </Row>
      </Col>
    </Row>
  )
}

export default Home
