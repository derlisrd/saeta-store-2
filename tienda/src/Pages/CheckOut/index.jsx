import React, { useState } from 'react'
import { Alert, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { useDatos } from '../../Providers/DatosProvider'

const CheckOut = () => {
    const {datos} = useDatos()
    const initialForm = {
        nombre:'',
        email:'',
        whatsapp:'',
        entrega: 1, // 0 es retira
        direccion:'',
        obs:''
    }

    const [form,setForm] = useState(initialForm)

  return (
    <Form>
    <Row>
        <Col xs={12}>
            <h2 className='mb-5 mt-3 text-center'>Completa estos datos</h2>
        </Col>
        <Col xs={12} sm={12} md={4}>
        <FormGroup floating>
        <Input
            autoFocus
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
      <Col xs={12} sm={12} md={4}>
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
      <Col xs={12} sm={12} md={4}>
        <FormGroup floating>
        <Input
            id="whatsapp"
            required
            name="whatsapp"
            placeholder="Whatsapp"
            className='rounded'
        />
        <Label for="whatsapp">
            Nro. whatsapp
        </Label>
        </FormGroup>
      </Col>
      <Col xs={12}>
        <h4 className='mt-3'>Forma de entrega</h4>
        <FormGroup check className='my-3'>
            <Input type="radio" id='delivery' checked={form.entrega === 1} onChange={()=>{setForm({...form,entrega:1})}} />
            <Label check for='delivery' role="button">
                Quiero delivery
            </Label>
        </FormGroup>
        <FormGroup check className='my-3'>
            <Input type="radio" id='retiro' checked={form.entrega === 0} onChange={()=>{setForm({...form,entrega:0})}} />
            <Label check for='retiro' role="button">
                Retiro de la tienda
            </Label>
        </FormGroup>
      </Col>
      <Col xs={12}>
        {
            form.entrega=== 0 ?
        
        <Alert color='info' className='rounded'>Direccion de tienda: {datos.direccion ?? ''} </Alert>
        :
        <FormGroup floating>
        <Input
            id="direccion"
            required
            name="direccion"
            placeholder="Dirección"
            className='rounded'
        />
        <Label for="direccion">
            Mi dirección de entrega
        </Label>
        </FormGroup>
        }
      </Col>
      <Col xs={12}>
      <FormGroup floating>
        <Input
            id="obs"
            required
            name="obs"
            placeholder="Observación"
            className='rounded'
        />
        <Label for="obs">
            Observación de pedido:
        </Label>
        </FormGroup>
      </Col>
    </Row>
    </Form>
  )
}

export default CheckOut
