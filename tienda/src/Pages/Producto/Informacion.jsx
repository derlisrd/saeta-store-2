import React from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Alert } from 'reactstrap'
import { functions } from '../../Utils/functions'

const Informacion = ({info}) => {
  return (
    <div className='border rounded p-4 h-100'>
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
        <Alert className='rounded' ><AiOutlineCheck color="#2d7345" /> Producto disponible en tienda</Alert> 
        : 
        <Alert className='rounded' color='danger'> Lástima, este producto está agotado</Alert>}
        
      </div>
  )
}

export default Informacion
