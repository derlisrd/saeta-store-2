import React, { Fragment } from "react";
import { Button, Col, Row } from "reactstrap";
import { useCart } from "../../Providers/CartProvider";
import { useDatos } from "../../Providers/DatosProvider";
import { functions } from "../../Utils/functions";

const CarritoItems = () => {
  const { cart, restarItem, addItem } = useCart();
  const { datos } = useDatos();
  return (
    <Row>
      {cart.items.map((e, i) => (
        <Fragment key={i}>
          <Col xs={12} md={3}>
            <div className="d-flex align-items-center gap-2">
              <Button
                outline
                size="sm"
                className="rounded"
                color="danger"
                onClick={() => {
                  restarItem(e);
                }}
              >
                -
              </Button>
              <h3>{e.cantidad}</h3>
              <Button
                outline
                size="sm"
                className="rounded"
                color="success"
                onClick={() => {
                  addItem(e, 1);
                }}
              >
                +
              </Button>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <b>{e.nombre_producto}</b>
          </Col>
          <Col xs={12} md={3}>
            <b>
              {functions.thousandSeparator(e.precio_producto * e.cantidad)}{" "}
              {datos.moneda}
            </b>
          </Col>
          <hr className="mt-1" />
        </Fragment>
      ))}
      <Col xs={12}>
        <b>
          Total: {functions.thousandSeparator(cart.total)} {datos.moneda}
        </b>
      </Col>
    </Row>
  );
};

export default CarritoItems;
