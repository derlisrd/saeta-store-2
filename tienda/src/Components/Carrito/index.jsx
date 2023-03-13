import React, { Fragment, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Button, Modal, ModalBody, ModalFooter,Badge, ModalHeader } from 'reactstrap';
import { useCart } from '../../Providers/CartProvider';
import { useNavigate } from "react-router-dom";
import CarritoItems from './CarritoItems';
import  { Toaster } from 'react-hot-toast';

const Carrito = () => {
    const navigate = useNavigate();
    const {cart} = useCart()
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const lenght = cart.items.length

    const navegar = ()=>{
      setModal(false);
      setTimeout(()=>{
        navigate("/checkout")
      },300)
    }

  return (
    <>
    <Toaster />

    <div className="w-100 p-0 d-flex flex-row-reverse sticky-top rounded" style={{ marginTop:"3px" }}>
       <Button id='carrito' onClick={toggle}><AiOutlineShoppingCart size={20} /> {lenght>0 && <Badge color='danger' className='rounded'>{lenght}</Badge>} </Button>
    </div>
      <Modal isOpen={modal} toggle={toggle} centered fullscreen >
      <ModalHeader toggle={toggle}>Mi carrito</ModalHeader>
        <ModalBody>
          <CarritoItems />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" className='rounded' size='sm' disabled={cart.total===0} outline onClick={navegar}>
            Finalizar pedido
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
