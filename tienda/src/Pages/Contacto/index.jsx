import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { useDatos } from "../../Providers/DatosProvider";

function Contacto() {

    const {datos} = useDatos()


    return (
    <Row >
        <Col xs={12}>
            <h1 className="text-center my-5">Contacto</h1>
        </Col>
        <Col xs={12} sm={12} md={6} >
            <h2 className="my-4">Formulario </h2>
            <FormGroup floating>
                <Input
                    className="rounded"
                    name="email"
                    placeholder="Email"
                    type="email"
                />
                <Label for="exampleEmail">
                    Email
                </Label>
            </FormGroup>
            <FormGroup floating>
                <Input
                    className="rounded"
                    name="tel"
                    placeholder="Teléfono"
                />
                <Label for="examplePassword">
                    Teléfono
                </Label>
            </FormGroup>
            <FormGroup>
                <Label for="exampleText">
                Duda o mensaje
                </Label>
                <Input className="rounded"
                id="exampleText"
                name="text"
                type="textarea"
                />
            </FormGroup>
            <Button color="primary" className="rounded" outline size="sm">Enviar mensaje</Button>
        </Col>
        <Col xs={12} sm={12} md={6} >
            <div className="p-2">
            <h3 className="my-4">Lineas habilitadas</h3>
            <p className="text-muted">Teléfono: {datos.tel} </p>
            <p className="text-muted">Whatsapp: {datos.whatsapp} </p>
            <p className="text-muted">Email: {datos.email} </p>
            </div>
        </Col>
    </Row>
    );
}

export default Contacto;