import React, { useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Button, Modal, ModalBody, ModalFooter,Badge, Table } from 'reactstrap';
import { useCart } from '../../Providers/CartProvider';
import { functions } from '../../Utils/functions';

const Carrito = () => {
    const {cart,addItem,restarItem} = useCart()
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const lenght = cart.items.length

  return (
    <>
    <div className="w-100 p-0 d-flex flex-row-reverse">
       <Button onClick={toggle}><AiOutlineShoppingCart size={20} /> {lenght>0 && <Badge color='danger' className='rounded'>{lenght}</Badge>} </Button>
    </div>
      <Modal isOpen={modal} toggle={toggle} centered >
        <ModalBody>
          <Table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((e,i)=>(
                <tr key={i}>
                <td>{e.nombre_producto}</td>
                <td>{e.cantidad}</td>
                <td>
                  <div className='d-flex flex-row gap-1'>
                  <Button outline className='rounded' onClick={()=>{restarItem(e.id_producto)}} color='danger' size='sm'> - </Button>
                  <Button outline className='rounded' onClick={()=>{addItem(e,1)}} color='success' size='sm'> + </Button>
                  </div>
                </td>
              </tr>
              ))}
              <tr>
                  <td colSpan={3}>
                    <b>Total: {functions.thousandSeparator( cart.total )}</b>
                  </td>
                </tr>
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" className='rounded' size='sm' outline onClick={toggle}>
            Proceder a comprar
          </Button>{' '}
          <Button color="secondary" className='rounded' size='sm' outline onClick={toggle}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default Carrito
