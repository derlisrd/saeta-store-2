import React from 'react'
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'

const CheckOut = () => {
  return (
    <Form>
    <Row>
        <Col xs={12}>
            <h2 className='mb-5 mt-3 text-center'>Completa estos datos</h2>
        </Col>
        <Col xs={12} sm={6} md={4}>
        <FormGroup floating>
        <Input
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            className='rounded'
            required
        />
        <Label for="nombre">
            Nombre y Apellido
        </Label>
        </FormGroup>
      </Col>
      <Col xs={12} sm={6} md={4}>
        <FormGroup floating>
        <Input
            id="email"
            required
            name="email"
            placeholder="Email"
            type="email"
            className='rounded'
        />
        <Label for="email">
            Email
        </Label>
        </FormGroup>
      </Col>
    </Row>
    </Form>
  )
}

export default CheckOut
