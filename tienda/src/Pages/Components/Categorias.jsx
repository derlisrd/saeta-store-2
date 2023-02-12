import React from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'reactstrap'

const Category = ({lista}) => {
  return (
    <>
      {lista.map((e, i) => (
          <Col key={i} sm={12} md={4} lg={4}>
            <Link
              to={`/category/${e.id_categoria}`}
              style={{ textDecoration: "none", color: "#000" }}
            >
              <img
                loading="lazy"
                className="img-thumbnail"
                alt={e.nombre_categoria}
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                  height: "250px",
                }}
                src={e.url_imagen}
              />
              <h3 className="card-title my-2 text-center">{e.nombre_categoria}</h3>
            </Link>
          </Col>
        ))}
    </>
  )
}

export default Category
