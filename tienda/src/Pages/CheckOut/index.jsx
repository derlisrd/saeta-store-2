import React, { Fragment, useState } from 'react'
import { Alert, Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { useCart } from '../../Providers/CartProvider'
import { useDatos } from '../../Providers/DatosProvider'
import { functions } from '../../Utils/functions'

const CheckOut = () => {
    const {datos} = useDatos()
    const {cart,addItem,restarItem} = useCart()
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
        <Col xs={12} >
        <Row className='my-5'>
            {cart.items.map((e,i)=>(
              <Fragment key={i}>
                <Col xs={12} md={3}>
                  <div className='d-flex align-items-center gap-2'>
                  <Button outline size='sm' className='rounded'  color='danger' onClick={()=>{restarItem(e)}} >-</Button>
                  <h3>{e.cantidad}</h3>
                  <Button outline size='sm' className='rounded'  color='success' onClick={()=>{addItem(e,1)}} >+</Button>
                  </div>
                </Col>
                <Col xs={12} md={6}><b>{e.nombre_producto}</b></Col>
                <Col xs={12} md={3}><b>{functions.thousandSeparator( e.precio_producto * e.cantidad)} {datos.moneda}</b></Col>
                <hr className='mt-1' />
              </Fragment>
            ))}
            <Col xs={12}>
              <b>Total: { functions.thousandSeparator( cart.total ) } {datos.moneda}</b>
            </Col>
          </Row>
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
            id="doc"
            required
            name="doc"
            placeholder="doc"
            className='rounded'
        />
        <Label for="doc">
            Documento:
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
      <Col xs={12}>
        <Button disabled type='submit' color='primary' className='rounded' >Cerrar pedido</Button>
      </Col>
    </Row>
    </Form>
  )
}

export default CheckOut
