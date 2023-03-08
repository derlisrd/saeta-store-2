import { useDatos } from "../../Providers/DatosProvider";
import {Alert,Button,Col,FormFeedback,FormGroup,FormText,Input,Label,Row} from "reactstrap";
import CarritoItems from "../../Components/Carrito/CarritoItems";

function Formu({error,change,form,enviarPedido,setForm,total}) {
    const { datos } = useDatos();
    
    return ( <Row>
        <Col xs={12} md={6} className='d-none d-sm-none d-md-block'>
          <h3 className="my-5">Items: </h3>
          <CarritoItems />
        </Col>
        <Col xs={12} md={6}>
          <Row>
            <Col xs={12}>
              <h2 className="mb-5 mt-3 text-center">Completa datos</h2>
            </Col>
            <Col xs={12} sm={12}>
              <FormGroup floating>
                <Input
                  autoFocus
                  invalid={error.code===1}
                  onChange={change}
                  id="nombre"
                  name="nombre_pedido"
                  placeholder="Nombre"
                  className="rounded"
                  required
                />
                <FormFeedback>
                  {error.code===1 && error.message}
                </FormFeedback>
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
                /><FormText>
                Completa este campo si quieres factura
              </FormText>
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
                  invalid={error.code===3}
                />
                <FormFeedback>
                  {error.code===3 && error.message}
                </FormFeedback>
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
              {form.entrega_pedido === 0 ? (
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
                    invalid={error.code===4}
                  />
                  <FormFeedback>
                  {error.code===4 && error.message}
                  </FormFeedback>
                  <FormText>
                    Detalla tu dirección
                  </FormText>
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
                <FormText>
                  Si quieres detallar algo específico
                </FormText>
                <Label for="obs">Observación de pedido:</Label>
              </FormGroup>
            </Col>
            <Col xs={12}>
              <Button
                disabled={total===0}
                onClick={enviarPedido}
                color="primary"
                className="rounded"
              >
                Hacer pedido
              </Button>
            </Col>
          </Row>
        </Col>
      </Row> );
}

export default Formu;