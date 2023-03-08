import React from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'reactstrap'
import { functions } from '../../Utils/functions'

const Listado = ({lista}) => {
  return (
    <>
    {lista.map((e, i) => (
        <Col key={i} xs={6} sm={6} md={6} lg={4}>
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
                height: "180px",
              }}
              src={e.url_imagen}
            />
            <h6 className="card-title my-2">{e.nombre_producto}</h6>
            <p className='text-muted'> {e.nombre_categoria}</p>
            <p className="text-secondary fw-light">
              {functions.thousandSeparator(e.precio_producto)} Gs.
            </p>
          </Link>
        </Col>
      ))}
      </>
  )
}

export default Listado
