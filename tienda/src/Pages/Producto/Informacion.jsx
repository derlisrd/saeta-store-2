import React from 'react'
import { AiOutlineCheck,AiOutlineWhatsApp,AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Alert, Button } from 'reactstrap'
import { useCart } from '../../Providers/CartProvider'
import { useDatos } from '../../Providers/DatosProvider'
import { functions } from '../../Utils/functions'

const Informacion = ({info,stock}) => {
  const {addItem} = useCart()
  
  const {datos} = useDatos()
  const link = `https://wa.me/${datos.whatsapp}?text=Hola que tal? Quiero hacer pedido de este producto: ${info.codigo_producto}`
  return (
    <div className='border rounded p-4 h-100'>
        <p>Cod: {info.codigo_producto}</p>
        <h4 className='text-uppercase text-muted my-3'>
            {info.nombre_producto}
        </h4>
        <h5 className='my-3'>
          <Link className='text-decoration-none' to={`/category/${info.id_categoria_producto}`}>
          {info.nombre_categoria}
          </Link>
        </h5>
        <h6 className='text-muted my-3'>
           {info.descripcion_producto} 
        </h6>
        <h2 className='my-3'>
            {functions.thousandSeparator(info.precio_producto)} Gs.
        </h2>
        {info.disponible_producto==='1' ? 
        <Alert className='rounded' ><AiOutlineCheck color="#2d7345" />
         Disponible en stock: {stock}
        </Alert> 
        :
        <Alert className='rounded' color='danger'> Lástima, este producto está agotado. Pero puedas hacer pedido</Alert>
        }
        <Button color='primary' onClick={()=>{addItem(info,1)}} outline className='rounded my-4'><AiOutlineShoppingCart /> Agregar al carrito</Button>
        <div> 
        <a href={link} target="_blank" className='text-decoration-none' rel='noreferrer'> <AiOutlineWhatsApp color='#128c7e' size="2rem" /> Hacer pedido de este producto</a>
        </div>
        
      </div>
  )
}

export default Informacion
