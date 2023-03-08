import React from 'react'
import UseAnimations from "react-useanimations";

import checkmark from 'react-useanimations/lib/checkmark';
import { Button } from 'reactstrap';
import {useNavigate} from 'react-router-dom'

const Done = ({message}) => {
  const navigate = useNavigate()
  const navegar = ()=>{
    navigate('/catalogo')
  }
  return (
    <div>
    <div className='d-flex mt-5 justify-content-center align-items-center'>
      <h2>{message}</h2>
      <UseAnimations autoplay animation={checkmark} loop strokeColor="#03a318" size={56} />
      </div>
      <Button onClick={navegar} outline >Comprar más</Button>
    </div>
  )
}

export default Done
