import React, { Fragment, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Button, Modal, ModalBody, ModalFooter,Badge,  Row, Col, ModalHeader } from 'reactstrap';
import { useCart } from '../../Providers/CartProvider';
import { useDatos } from '../../Providers/DatosProvider';
import { functions } from '../../Utils/functions';
import { useNavigate } from "react-router-dom";

const Carrito = () => {
    const navigate = useNavigate();
    const {cart,addItem,restarItem} = useCart()
    const {datos} = useDatos()
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const lenght = cart.items.length

    const navegar = ()=>{
      setModal(false);
      navigate("/checkout")
    }

  return (
    <>
    <div className="w-100 p-0 d-flex flex-row-reverse sticky-top">
       <Button id='carrito' onClick={toggle}><AiOutlineShoppingCart size={20} /> {lenght>0 && <Badge color='danger' className='rounded'>{lenght}</Badge>} </Button>
    </div>
      <Modal isOpen={modal} toggle={toggle} centered fullscreen >
      <ModalHeader toggle={toggle}>Mi carrito</ModalHeader>
        <ModalBody>
          <Row>
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
        </ModalBody>
        <ModalFooter>
          <Button color="primary" className='rounded' size='sm' disabled={cart.total===0} outline onClick={navegar}>
            Proceder a pagar
          </Button>{' '}
          <Button color="secondary" className='rounded' size='sm' outline onClick={toggle}>
            Seguir comprando
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default Carrito
