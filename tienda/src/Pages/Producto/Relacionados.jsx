import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import { functions } from '../../Utils/functions'

const Relacionados = ({lista}) => {
  return (
    <Row>
        <h4 className='text-muted my-4'>Productos relacionados </h4>
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
              style={{ width: "100%", maxHeight: "250px", objectFit: "cover", height:"250px" }}
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
  )
}

export default Relacionados
