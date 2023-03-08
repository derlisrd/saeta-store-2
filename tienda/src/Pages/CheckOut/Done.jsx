import React from 'react'
import UseAnimations from "react-useanimations";
import github from 'react-useanimations/lib/github';

const Done = () => {
  return (
    <div className='d-flex mt-5'>
      <h2>Pedido realizado con exito !  <UseAnimations autoplay animation={github} loop strokeColor="#0066cc" size={56} /> </h2>
    </div>
  )
}

export default Done
