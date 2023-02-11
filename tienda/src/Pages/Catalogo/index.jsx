import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Loading from "../../Components/Loading";
import { APICALLER } from "../../Services/api";
import { functions } from "../../Utils/functions";

const Catalogo = () => {
  const [loading, setLoading] = useState(true);
  const [lista, setLista] = useState([]);
  const [search, setSearch] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    let res = await APICALLER.get({
      filtersField: "nombre_producto,codigo_producto",
      filtersSearch: `${search}`,
      table: "productos",
      include: "productos_images",
      on: "id_producto,id_image_producto",
      fields:
        "nombre_producto,id_producto,precio_producto,url_imagen,disponible_producto",
      where: "portada_imagen_producto,=,1,and,tipo_producto,=,1",
    });
    if (res.response) {
      setLista(res.results);
      //console.log(res.results);
    }
    setLoading(false);
  }

  const verLista = async () => {
    setSearch("");
    getLista();
  };

  const getLista = useCallback(async () => {
    setLoading(true);
    let res = await APICALLER.get({
      table: "productos",
      include: "productos_images",
      on: "id_producto,id_image_producto",
      fields:
        "nombre_producto,id_producto,precio_producto,url_imagen,disponible_producto",
      where: "portada_imagen_producto,=,1,and,tipo_producto,=,1",
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
    <>
      <Row className="gy-1 mt-3 mx-auto">
        <Col xs={12}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} sm={8}>
                <FormGroup floating>
                  <Input
                    id="search"
                    className="rounded"
                    name="search"
                    placeholder="Buscar"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  <Label for="search" className="text-muted">
                    Buscar...
                  </Label>
                </FormGroup>
              </Col>
              <Col xs={12} sm={4}>
                <Button
                  color="success"
                  outline
                  className="rounded"
                  type="submit"
                >
                  Buscar
                </Button>
              </Col>
            </Row>
          </Form>
          <Button
            onClick={verLista}
            color="primary"
            outline
            size="sm"
            className="mt-4 rounded"
          >
            Ver todos
          </Button>
        </Col>
        <Col xs={12}>
          {" "}
          <h3 className="text-uppercase text-muted text-center my-4">
            {" "}
            Productos{" "}
          </h3>{" "}
        </Col>
      </Row>
      <Row className="gy-5 mx-auto">
        {lista.map((e, i) => (
          <Col key={i} sm={12} md={6} lg={3}>
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
              <h6 className="card-title my-2">{e.nombre_producto}</h6>
              <p className="text-secondary fw-light">
                {functions.thousandSeparator(e.precio_producto)} Gs.{" "}
              </p>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Catalogo;
