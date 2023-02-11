import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Loading from "../../Components/Loading";
import { APICALLER } from "../../Services/api";



const Home = () => {

  const [loading, setLoading] = useState(true);
  const [lista, setLista] = useState([]);

  const getLista = useCallback(async () => {
    setLoading(true);
    let res = await APICALLER.get({
      table: "productos",
      include: "productos_images",
      on: "id_producto,id_image_producto",
      fields:
        "nombre_producto,id_producto,precio_producto,url_imagen,disponible_producto",
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
        <div  className="vh-100 d-flex justify-content-center align-items-center">
        <h1 className="text-center btn btn-primary rounded">
          Ver todos los productos
        </h1>
        </div>
      </Col>
      <Col xs={12}>
        <h1 className="text-center text-muted mt-5">ULTIMAS NOVEDADES</h1>
      </Col>
      <Col xs={12}>
      <Row className="gy-5 mx-auto mt-5">
        {lista.map((e, i) => (
          <Col key={i} sm={12} md={4} lg={4}>
            <Link
              to={`/producto/${e.id_producto}`}
              style={{ textDecoration: "none", color: "#000" }}
            >
              <img
                loading="lazy"
                className="img-thumbnail"
                alt={e.nombre_producto}
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                  height: "250px",
                }}
                src={e.url_imagen}
              />
              <h3 className="card-title my-2 text-center">{e.nombre_producto}</h3>
            </Link>
          </Col>
        ))}
      </Row>
      </Col>
    </Row>
  )
}

export default Home
