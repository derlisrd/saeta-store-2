import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import CarritoItems from "../../Components/Carrito/CarritoItems";
import Loading from "../../Components/Loading";
import { useDatos } from "../../Providers/DatosProvider";

const CheckOut = () => {
  const { datos } = useDatos();
  const [isLoading,setIsLoading] = useState(false)
  const initialForm = {
    nombre: "",
    email: "",
    whatsapp: "",
    entrega: 1, // 0 es retira
    direccion: "",
    obs: "",
  };

  const [form, setForm] = useState(initialForm);

  const enviarPedido =(e)=>{
    e.preventDefault()
    setIsLoading(true)
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  if(isLoading){
    return <Loading />
  }

  return (
    <form onSubmit={enviarPedido}>
      <Row>
        <Col xs={12} md={6} className='d-none d-sm-none d-md-block'>
          <h3 className="my-5">Items: </h3>
          <CarritoItems />
        </Col>
        <Col xs={12} md={6}>
          <Row>
            <Col xs={12}>
              <h2 className="mb-5 mt-3 text-center">Completa datos</h2>
            </Col>
            <Col xs={12}></Col>

            <Col xs={12} sm={12}>
              <FormGroup floating>
                <Input
                  autoFocus
                  
                  id="nombre"
                  name="nombre"
                  placeholder="Nombre"
                  className="rounded"
                  required
                />
                <Label for="nombre">Nombre y Apellido</Label>
              </FormGroup>
            </Col>
            <Col xs={12} sm={12}>
              <FormGroup floating>
                <Input
                  id="email"
                  required
                  name="email"
                  placeholder="Email"
                  type="email"
                  className="rounded"
                />
                <Label for="email">Email</Label>
              </FormGroup>
            </Col>
            <Col xs={12} sm={12} md={6}>
              <FormGroup floating>
                <Input
                  id="doc"
                  required
                  name="doc"
                  placeholder="doc"
                  className="rounded"
                />
                <Label for="doc">Documento:</Label>
              </FormGroup>
            </Col>
            <Col xs={12} sm={12} md={6}>
              <FormGroup floating>
                <Input
                  id="whatsapp"
                  required
                  name="whatsapp"
                  placeholder="Whatsapp"
                  className="rounded"
                />
                <Label for="whatsapp">Nro. whatsapp</Label>
              </FormGroup>
            </Col>
            <Col xs={12}>
              <h4 className="mt-3">Forma de entrega</h4>
              <FormGroup check className="my-3">
                <Input
                  type="radio"
                  id="delivery"
                  checked={form.entrega === 1}
                  onChange={() => {
                    setForm({ ...form, entrega: 1 });
                  }}
                />
                <Label check for="delivery" role="button">
                  Quiero delivery
                </Label>
              </FormGroup>
              <FormGroup check className="my-3">
                <Input
                  type="radio"
                  id="retiro"
                  checked={form.entrega === 0}
                  onChange={() => {
                    setForm({ ...form, entrega: 0 });
                  }}
                />
                <Label check for="retiro" role="button">
                  Retiro de la tienda
                </Label>
              </FormGroup>
            </Col>
            <Col xs={12}>
              {form.entrega === 0 ? (
                <Alert color="info" className="rounded">
                  Direccion de tienda: {datos.direccion ?? ""}{" "}
                </Alert>
              ) : (
                <FormGroup floating>
                  <Input
                    id="direccion"
                    required
                    name="direccion"
                    placeholder="Dirección"
                    className="rounded"
                  />
                  <Label for="direccion">Mi dirección de entrega</Label>
                </FormGroup>
              )}
            </Col>
            <Col xs={12}>
              <FormGroup floating>
                <Input
                  id="obs"
                  required
                  name="obs"
                  placeholder="Observación"
                  className="rounded"
                />
                <Label for="obs">Observación de pedido:</Label>
              </FormGroup>
            </Col>
            <Col xs={12}>
              <Button
                
                onClick={enviarPedido}
                color="primary"
                className="rounded"
              >
                Hacer pedido
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </form>
  );
};

export default CheckOut;
