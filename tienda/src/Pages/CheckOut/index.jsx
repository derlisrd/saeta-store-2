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
  const [error,setError]= useState({
    active:false,
    code:0,
    message:''
  })
  const [isLoading,setIsLoading] = useState(false)
  const initialForm = {
    nombre_pedido: "",
    email_pedido: "",
    doc_pedido:"",
    whatsapp_pedido: "",
    entrega_pedido: 1, // 0 es retira
    direccion_pedido: "",
    obs_pedido: "",
  };

  const [form, setForm] = useState(initialForm);

  const change = e=>{
    setForm({...form,[e.target.name]:e.target.value})
  }

  const enviarPedido =()=>{
    if(form.nombre_pedido === ""){
      setError({active:true,code:1,message:'Complete el nombre por favor'})
      return false;
    }
    setError({active:false,code:0,message:''})
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
    <>
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
            <Col xs={12}>
              {error.active && <Alert> {error.message}</Alert> }
            </Col>

            <Col xs={12} sm={12}>
              <FormGroup floating>
                <Input
                  autoFocus
                  onChange={change}
                  id="nombre"
                  name="nombre_pedido"
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
                  onChange={change}
                  name="email_pedido"
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
                  onChange={change}
                  name="doc_pedido"
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
                  onChange={change}
                  name="whatsapp_pedido"
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
                  checked={form.entrega_pedido === 1}
                  onChange={() => {
                    setForm({ ...form, entrega_pedido: 1 });
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
                  checked={form.entrega_pedido === 0}
                  onChange={() => {
                    setForm({ ...form, entrega_pedido: 0 });
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
                    onChange={change}
                    name="direccion_pedido"
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
                  onChange={change}
                  name="obs_pedido"
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
    </>
  );
};

export default CheckOut;
