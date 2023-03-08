import React from 'react'
import UseAnimations from "react-useanimations";
import github from 'react-useanimations/lib/github';

const Done = () => {
  return (
    <div className='d-flex mt-5 justify-content-center'>
      <h2>Pedido realizado con exito !</h2>
      <UseAnimations autoplay animation={github} loop strokeColor="#0066cc" size={56} />
    </div>
  )
}

export default Done
